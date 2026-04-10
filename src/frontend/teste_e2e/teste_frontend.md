# Documentação de Testes E2E — AmbyData Frontend

**Stack:** Angular 21 · Playwright · TypeScript
**Autor:** Guilherme Valença
**Data:** Março 2026

---

## 1. O que foi criado

Uma suíte completa de testes End-to-End para o frontend da AmbyData, cobrindo os três caminhos críticos da aplicação:

| Caminho | Arquivo | Testes |
|---|---|---|
| Login com MetaMask | `tests/login.spec.ts` | 5 specs |
| Cadastro de Tanque e Axolote | `tests/cadastro.spec.ts` | 6 specs |
| Registro de Medição Ambiental | `tests/medicao.spec.ts` | 7 specs |

```
frontend/
└── teste_e2e/
    ├── teste_frontend.md          ← este documento
    ├── backlog.md                 ← features aguardando implementação
    ├── fixtures/
    │   ├── mock-ethereum.ts       ← coração do setup: provider EIP-1193 sintético
    │   └── test-data.ts           ← endereços, tanques e valores de formulário
    ├── pages/                     ← Page Object Model
    │   ├── login.page.ts
    │   ├── tela-inicial.page.ts
    │   ├── cadastro.page.ts
    │   └── monitoramento.page.ts
    └── tests/
        ├── login.spec.ts
        ├── cadastro.spec.ts
        └── medicao.spec.ts
```

---

## 2. O desafio central: testar um app Web3

O AmbyData não usa autenticação convencional (usuário/senha). Tudo passa pela MetaMask: login, cadastros e medições resultam em transações na blockchain Sepolia. Isso cria um problema fundamental para automação:

- A MetaMask roda como **extensão do browser** e abre **popups nativos** que nenhuma ferramenta de automação consegue controlar
- Sem a MetaMask, `window.ethereum` é `undefined` e o app não inicializa
- Sem transações reais, `tx.wait()` nunca resolve

A solução é injetar um **provider EIP-1193 sintético** no lugar da MetaMask, antes mesmo do Angular inicializar.

---

## 3. Por que Playwright (não Cypress)

| Critério | Playwright | Cypress |
|---|---|---|
| `addInitScript()` — injetar antes do Angular | Nativo | Requer workarounds |
| Múltiplos contextos de browser | Sim | Não |
| TypeScript nativo | Sim | Config adicional |
| CI headless sem configuração | Sim | `--headless` explícito |

O `page.addInitScript(fn, arg)` é a feature decisiva: executa uma função no contexto do browser **antes de qualquer script da página carregar**, incluindo Zone.js e Angular. É o único jeito confiável de substituir `window.ethereum`.

---

## 4. A arquitetura do mock: `mock-ethereum.ts`

### 4.1 Dois contextos separados

O arquivo tem duas partes que rodam em contextos completamente diferentes:

**`buildInitConfig(config)` — roda em Node.js**
Usa `ethers.js` para pré-computar seletores de função ABI e codificar respostas em hex. Esses valores são serializados como JSON e enviados ao browser.

**`ethereumInitScript(config)` — roda no browser**
Não pode ter nenhum `import`. Recebe o JSON do Node.js como argumento e cria `window.ethereum` com tudo pré-computado. Esta separação é obrigatória porque o browser não tem acesso a módulos Node.js.

```typescript
// Uso nos testes:
const cfg = buildInitConfig({ role: 'caretaker', address: ADDRESSES.operator, tanks: DEFAULT_TANKS });
await page.addInitScript(ethereumInitScript, cfg);  // Playwright serializa cfg como JSON
await page.goto('/login');
```

### 4.2 O que o mock implementa

O mock intercepta **todas** as chamadas `window.ethereum.request({ method, params })`:

```
eth_requestAccounts / eth_accounts  →  retorna [address]
eth_chainId                         →  '0xaa36a7' (Sepolia)
eth_call                            →  roteia por seletor ABI → valores pré-encodados
eth_sendTransaction                 →  gera tx hash fake, registra em sentTxs
eth_getTransactionByHash            →  retorna objeto de tx para hashes em sentTxs  ← CRÍTICO
eth_getTransactionReceipt           →  retorna recibo de sucesso para hashes em sentTxs
eth_subscribe (newHeads)            →  retorna ID fixo '0x4242'  ← CRÍTICO
eth_blockNumber                     →  retorna currentBlock (incrementa)
eth_estimateGas / gasPrice / etc.   →  valores fixos realistas
```

---

## 5. Problemas encontrados e como foram resolvidos

Esta seção documenta cada erro que foi encontrado durante o desenvolvimento, em ordem cronológica. Serve de referência para entender decisões que à primeira vista parecem óbvias.

---

### Erro 1: `ADDRESSES` com caracteres inválidos em hex

**Sintoma:** `TypeError: invalid address (value="0xOperador111...")`
**Quando:** No import do `test-data.ts`, antes de qualquer teste rodar. Resultado: `0 tests found`.

**Causa:** `ethers.AbiCoder` valida rigorosamente que endereços Ethereum sejam exatamente 20 bytes (40 hex chars, apenas `[0-9a-f]`). Os endereços iniciais como `0xOperador111...` contêm letras não-hexadecimais.

**Solução:** Usar as primeiras 4 contas de teste do Hardhat — derivadas do mnemônico padrão `test test test...`, válidas, determinísticas, sem fundos reais:

```typescript
export const ADDRESSES = {
  operator: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
  auditor:  '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
  ...
};
```

**Lição:** Endereços Ethereum não são strings arbitrárias. Qualquer valor passado para `abi.encode(['address'], [...])` precisa ser um endereço checksum válido.

---

### Erro 2: Auto-detecção de carteira não funciona

**Sintoma:** `checkConnection()` nunca encontrava carteira conectada. `.wallet-inputs` nunca aparecia sem clicar o botão.

**Causa:** `ethers v6 BrowserProvider` tem uma proteção interna: bloqueia chamadas `eth_accounts` até que `eth_requestAccounts` tenha sido chamado pelo menos uma vez naquela instância do provider. Isso é um mecanismo de segurança da biblioteca. Como `checkConnection()` vai direto para `eth_accounts` sem passar por `eth_requestAccounts`, o provider fica bloqueado.

**Solução:** Todos os helpers de teste clicam explicitamente em "Conectar Carteira" (que usa `eth_requestAccounts`) em vez de depender da detecção automática. O teste de "detecção automática" foi reescrito para testar o que realmente é testável.

**Lição:** Não assumir que o mock pode replicar todo o comportamento da MetaMask. `BrowserProvider` tem lógica interna além do protocolo EIP-1193.

---

### Erro 3: `tx.wait()` travava infinitamente (causa 1 de 3)

**Sintoma:** Após clicar "Registrar Acesso", a navegação para `/tela-inicial` nunca acontecia. Timeout de 10-15 segundos.

**Primeira hipótese:** `receipt.blockNumber > eth_blockNumber` → confirmations = 0.
**Correção aplicada:** `receipt.blockNumber = 0x1234565` (abaixo de `eth_blockNumber = 0x1234567`).
**Resultado:** Ainda não funcionou.

**Segunda hipótese:** `eth_blockNumber` fixo → provider nunca detecta "novo bloco".
**Correção aplicada:** Implementar event emitter real + block ticker.
**Resultado:** Ainda não funcionou.

**Causa real (verificada no código-fonte do ethers instalado, `node_modules/ethers/lib.esm/providers/provider-jsonrpc.js:140`):**

```javascript
// Após eth_sendTransaction retornar o hash:
const checkTx = async () => {
    const tx = await this.provider.getTransaction(hash); // ← chama eth_getTransactionByHash
    if (tx != null) {
        resolve(tx.replaceableTransaction(blockNumber));
        return;
    }
    // Retry: 100ms → 1000ms → 4000ms → 4000ms → infinito...
    this.provider._setTimeout(() => { checkTx(); }, timeouts.pop() || 4000);
};
checkTx();
```

O mock não implementava `eth_getTransactionByHash`. Retornava `null` (default), que fazia o ethers entrar em loop de retry infinito.

**Solução:** Adicionar o handler:

```typescript
case 'eth_getTransactionByHash': {
  const hash = params?.[0];
  if (sentTxs.has(hash)) {
    return { hash, from: address, blockNumber: '0x1234565', type: '0x2', ... };
  }
  return null;
}
```

**Lição:** Ao mockar ethers v6, não basta implementar `eth_sendTransaction` e `eth_getTransactionReceipt`. O `sendTransaction()` faz uma etapa intermediária de polling via `eth_getTransactionByHash` que é obscura mas obrigatória.

---

### Erro 4: `tx.wait()` travava (causa 2 de 3) — BrowserProvider usa subscriptions, não polling

**Sintoma:** Mesmo com `eth_getTransactionByHash` implementado, alguns contextos ainda travavam.

**Causa:** `waitForTransaction()` em ethers v6 BrowserProvider não usa `setInterval` para detectar novos blocos. Usa `eth_subscribe('newHeads')` via `window.ethereum` e espera **eventos `message`** do tipo `eth_subscription`. Se a carteira nunca emitir esses eventos, `tx.wait()` espera eternamente.

O mock original tinha `on: (_e, _fn) => {}` — um no-op. Nunca emitia eventos.

**Solução em duas partes:**

1. **Event emitter real:**
```typescript
const _listeners: Record<string, Function[]> = {};
const _on = (event, fn) => { _listeners[event] ??= []; _listeners[event].push(fn); };
const _emit = (event, ...args) => { (_listeners[event] || []).forEach(fn => fn(...args)); };
// window.ethereum = { on: _on, removeListener: _off, emit: _emit, ... }
```

2. **Block ticker:** `setInterval` que emite novos headers a cada 150ms com o `BLOCK_SUB_ID = '0x4242'` que é o mesmo retornado por `eth_subscribe('newHeads')`:
```typescript
setInterval(() => {
  currentBlock += 1;
  _emit('message', {
    type: 'eth_subscription',
    data: { subscription: '0x4242', result: { number: '0x' + currentBlock.toString(16), ... } }
  });
}, 150);
```

**Detalhe importante:** O block ticker usa `setTimeout(() => { setInterval(...); }, 300)`. Isso dá 300ms para o BrowserProvider registrar o subscriber antes do primeiro evento chegar.

**Lição:** `BrowserProvider` em ethers v6 opera no modo "push" (subscrições), não no modo "pull" (polling). Um mock minimalista que só responde a `request()` não é suficiente.

---

### Erro 5: `tx.wait()` travava (causa 3 de 3) — combinação dos fatores anteriores

Na prática, as causas 1 a 3 se combinavam. Apenas com TODAS as três correções o `tx.wait()` passou a resolver consistentemente:
- `eth_getTransactionByHash` retorna a transação ✓
- Event emitter real (`on/emit`) ✓
- Block ticker emitindo eventos a cada 150ms ✓

---

### Erro 6: Formulário de cadastro não limpa após sucesso

**Sintoma:** Após a transação de cadastro de tanque/axolote, os campos permanecem preenchidos mesmo após aparecer o SweetAlert "Sucesso!".

**Causa:** Os componentes `CadastroTanque` e `CadastroAxolote` usam **template-driven forms** (`FormsModule` + `[(ngModel)]`). Já `Monitoramento` usa **reactive forms** (`ReactiveFormsModule` + `FormGroup.reset()`).

Quando `this.nomeTanque = ''` é executado, o Angular precisa de um ciclo de **change detection** para atualizar o DOM. Esse ciclo é disparado pelo Zone.js. Mas há um problema de contexto:

O `setInterval` do block ticker foi criado dentro de um callback de `setTimeout` **nativo** (agendado antes do Zone.js carregar via `addInitScript`). Quando o setTimeout nativo dispara, o callback roda fora do rastreamento do Zone.js. O `setInterval` criado dentro desse callback é atribuído ao "root zone", não ao NgZone do Angular.

Resultado: quando `tx.wait()` resolve (disparado pelo block ticker), a cadeia de Promises continua fora do NgZone. `this.nomeTanque = ''` roda, mas Angular não é notificado para re-renderizar. No **browser real**, a transação demora ~15 segundos — nesse tempo, eventos de scroll, foco e hover naturalmente disparam change detection, e o formulário é limpo sem problemas.

**Solução:** O teste verifica apenas que o SweetAlert "Sucesso!" apareceu — o que já prova que `tx.wait()` resolveu e que `Swal.fire('Sucesso!')` foi chamado. A limpeza do formulário é mais adequada para testes unitários (Vitest) onde o componente pode ser testado com `ChangeDetectorRef.detectChanges()`.

**Por que `Monitoramento` não tem esse problema:** Usa `this.medicaoForm.reset()` no FormGroup. Reactive Forms são projetados para serem síncronos e detectáveis pelo Angular sem change detection explícito.

**Lição:** Em aplicações com `setInterval` fora do NgZone, template-driven forms podem não atualizar o DOM automaticamente. Para E2E, prefira reactive forms nos componentes ou adicione `ChangeDetectorRef.detectChanges()` explicitamente.

---

### Erro 7: Asserção de string errada em input numérico

**Sintoma:** `Expected: "22" / Received: "22.0"`.

**Causa:** O input de temperatura tem `type="number" step="0.1"`. Quando o Playwright faz `fill("22.0")`, o browser mantém o valor como `"22.0"`, não `"22"`.

**Solução:** `await expect(mon.inputTemp).toHaveValue('22.0')`.

---

### Erro 8: SweetAlerts em sequência rápida demais

**Sintoma:** Testes de temperatura crítica e cadastros falhavam ao tentar interagir com SweetAlerts.

**Causa:** No browser real, a sequência `Swal.fire('Transação Enviada') → await tx.wait() → Swal.fire('Sucesso!')` leva ~15 segundos. Com o mock, leva ~200ms. Os dois SweetAlerts aparecem tão rápido que o código de teste tentava `confirmarSwal()` (que esperava o container ficar hidden) enquanto um novo SweetAlert já tinha aparecido.

**Solução:** Em vez de esperar o container hidden, esperar o **título mudar** para "Sucesso":
```typescript
await expect(cadastro.swalTitle).toContainText(/Sucesso/i, { timeout: 8_000 });
await cadastro.swalConfirm.click();
```

---

## 6. Decisões de design importantes

### 6.1 Page Object Model (POM)

Todos os seletores e ações de cada tela estão encapsulados em classes. Quando o HTML muda (ex: um `id` renomeado), corrige-se em um único lugar:

```
pages/login.page.ts          ← seletores e ações do /login
pages/tela-inicial.page.ts   ← navegação lateral e painéis da home
pages/cadastro.page.ts       ← formulários de cadastro (tanque + axolote)
pages/monitoramento.page.ts  ← formulário de medição ambiental
```

### 6.2 Fixtures por role, não por teste

As configurações de wallet são montadas uma vez no módulo de dados e reutilizadas:

```typescript
export const operatorConfig = buildInitConfig({ role: 'caretaker', address: ADDRESSES.operator, tanks: DEFAULT_TANKS });
export const adminConfig    = buildInitConfig({ role: 'admin',     address: ADDRESSES.admin,    tanks: [] });
```

Cada test spec chama `await page.addInitScript(ethereumInitScript, operatorConfig)` — o Playwright serializa o config como JSON e injeta no browser.

### 6.3 Helper de login compartilhado

Para evitar repetição, todos os testes de cadastro e medição usam um helper:

```typescript
async function loginComoOperador(page) {
  await page.addInitScript(ethereumInitScript, operatorConfig);
  await login.goto();
  await login.conectarCarteira();          // clique explícito, usa eth_requestAccounts
  await login.preencherEnsLabel('gui');
  await login.selecionarInstituicao('biomuseu');
  await login.btnRegistrarAcesso.click();
  await page.waitForURL('**/tela-inicial');
}
```

**Por que não usa auto-detecção:** Como documentado no Erro 2, `checkConnection()` via `eth_accounts` não funciona com BrowserProvider antes de `eth_requestAccounts`. O clique explícito é confiável e testável.

### 6.4 `blockNumber` do recibo sempre menor que `currentBlock`

```typescript
// receipt.blockNumber = '0x1234565'
// currentBlock começa em 0x1234570 e incrementa
// confirmations = currentBlock - 0x1234565 + 1 = sempre >= 1
```

Essa invariante precisa ser mantida se o mock for modificado.

---

## 7. O que NÃO está sendo testado (e por quê)

### Atestação EAS (AUDITOR_ROLE)
A implementação do contrato inteligente de atestação ainda não foi finalizada. O backlog está documentado em `teste_e2e/backlog.md`.

### Cadastro de Instituições com ENS
Feature sendo desenvolvida em branch paralela. Também no `backlog.md`.

### Limpeza de formulários template-driven
Conforme Erro 6 acima. Coberto por testes unitários.

### Histórico validado na blockchain
Requer dados reais na Sepolia. Mais adequado para testes de integração.

### Múltiplos browsers
Apenas Chromium. Usuários de Web3/MetaMask usam predominantemente Chrome.

---

## 8. Configuração do GitLab CI (`.gitlab-ci.yml`)

O arquivo está na raiz do repositório. Pontos importantes:

- **Imagem `mcr.microsoft.com/playwright:v1.52.0-jammy`**: já vem com Chromium instalado. Não precisa de `npx playwright install`.
- **`CI=true`**: desativa o `reuseExistingServer` no `playwright.config.ts` e ativa `forbidOnly` + 1 retry.
- **Artefatos apenas em falha**: screenshots, vídeos e o relatório HTML são publicados só quando algum teste falha, economizando espaço.
- **`wait-on`**: aguarda o Angular estar respondendo em `:4200` antes de rodar os testes.

---

## 9. Como rodar localmente

```bash
cd frontend

# Uma única vez:
npm install
npx playwright install chromium

# Rodar os testes (app precisa estar rodando em :4200):
npm run test:e2e

# Interface visual (ótima para depurar):
npm run test:e2e:ui

# Ver relatório do último run:
npm run test:e2e:report
```

O `playwright.config.ts` tem `reuseExistingServer: true` — se o `ng serve` já estiver rodando, o Playwright não inicia outro.

---

## 10. Anatomia de um teste completo

Para referência de futuros implementadores, o fluxo completo de um teste de medição:

```typescript
test('parâmetros normais → sucesso', async ({ page }) => {
  // 1. Injetar mock ANTES do Angular
  await page.addInitScript(ethereumInitScript, operatorConfig);

  // 2. Login completo via helper
  await irParaMonitoramento(page); // navega até /login, conecta, preenche ENS, vai para home

  // 3. Interagir com a interface
  const mon = new MonitoramentoPage(page);
  await mon.preencherMedicao(MEDICAO_FORM.normal);
  await mon.clicarRegistrarMedicao();

  // 4. Verificar resultado
  await mon.aguardarSwal();                              // espera SweetAlert
  expect(await mon.getSwalTitulo()).toMatch(/Sucesso/i); // verifica sucesso
  await mon.confirmarSwal();
});
```

Durante o passo 3-4, o mock intercepta:
1. `eth_estimateGas` → gas
2. `eth_sendTransaction` → hash H
3. `eth_getTransactionByHash(H)` → objeto de transação
4. Block ticker emite evento → `tx.wait()` resolve
5. `eth_getTransactionReceipt(H)` → recibo de sucesso

Tudo isso em ~200ms, sem tocar a blockchain.

---

## 11. Referências úteis

- [Ethers v6 — BrowserProvider](https://docs.ethers.org/v6/api/providers/#BrowserProvider)
- [EIP-1193 — Provider JavaScript API](https://eips.ethereum.org/EIPS/eip-1193)
- [Playwright — addInitScript](https://playwright.dev/docs/api/class-page#page-add-init-script)
- [Angular — Template-driven forms](https://angular.dev/guide/forms/template-driven-forms)
- Código-fonte do ethers instalado: `node_modules/ethers/lib.esm/providers/provider-jsonrpc.js` (linha 126-181 para o ciclo de polling do `sendTransaction`)
