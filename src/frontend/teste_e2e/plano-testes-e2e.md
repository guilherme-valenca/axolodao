# Plano de Testes E2E — AmbyData Frontend
**Stack:** Angular 21 · Playwright · GitLab CI
**Data:** Março 2026
**Autor:** Guilherme Valença

---

## 1. Contexto e Desafio Principal

O frontend da AmbyData tem uma particularidade que diferencia este setup da maioria dos projetos: **todos os fluxos críticos dependem de MetaMask e chamadas a smart contracts na blockchain Sepolia.** Isso significa que não podemos simplesmente abrir o browser e clicar — precisamos resolver o problema do `window.ethereum` antes de qualquer coisa.

A MetaMask roda como extensão de browser. Ela exibe popups nativos que nenhum framework de automação consegue controlar. A solução padrão da indústria para isso é **injetar um mock de `window.ethereum` antes do carregamento da página**, simulando o comportamento da carteira sem depender da extensão real.

---

## 2. Por que Playwright (e não Cypress)

| Critério | Playwright | Cypress |
|---|---|---|
| Injeção de scripts antes do carregamento | `page.addInitScript()` — nativo | Requer plugin extra (`cy.intercept` + workarounds) |
| Mock de requests Web3 / JSON-RPC | `page.route()` para interceptar `eth_*` calls | Possível, mas mais verboso |
| Execução em CI sem GUI | Headless nativo, sem config adicional | Precisa do `cypress run` com `--headless` |
| Suporte TypeScript nativo | Sim | Sim (mas configuração mais complexa) |
| Múltiplos contextos de browser | Sim (útil para simular dois usuários) | Não (Cypress usa um único contexto) |
| Compatibilidade Angular 21 | Excelente | Boa, mas com quirks em standalone components |

**Veredicto:** Playwright é a escolha natural para apps Web3. O `addInitScript` resolve o problema da MetaMask de forma elegante e é a abordagem documentada pela comunidade Ethereum para testes.

---

## 3. Estratégia de Mock do Web3

### 3.1 O problema

O `Login.ts` faz:
```typescript
this.provider = new ethers.BrowserProvider((window as any).ethereum);
await this.provider.send('eth_requestAccounts', []);
```

Se `window.ethereum` não existir, o app lança erro. Se existir mas for a MetaMask real, ela abre um popup que o Playwright não consegue controlar.

### 3.2 A solução: `window.ethereum` sintético

Vamos criar um arquivo `e2e/fixtures/mock-ethereum.ts` que define um objeto compatível com a API EIP-1193 (interface padrão da MetaMask), retornando valores pré-definidos conforme o cenário.

```
                ┌─────────────────────────────────┐
                │   Playwright addInitScript()     │
                │   injeta ANTES do Angular boot   │
                └──────────────┬──────────────────┘
                               │
                    window.ethereum = mockProvider
                               │
                ┌──────────────▼──────────────────┐
                │         Angular App              │
                │  ethers.BrowserProvider(         │
                │    window.ethereum  ← mock       │
                │  )                               │
                └──────────────────────────────────┘
```

O mock expõe:
- `eth_requestAccounts` → retorna endereço de carteira pré-definido
- `eth_accounts` → retorna o mesmo endereço (checkConnection)
- `eth_chainId` → retorna `0xaa36a7` (Sepolia)
- `eth_call` → intercepta chamadas de leitura aos contratos (`hasRole`, `CARETAKER_ROLE`, etc.)
- `eth_sendTransaction` → simula envio de transação sem broadcast real

### 3.3 Fixtures por role

Teremos 3 fixtures principais:

| Fixture | Endereço | Role retornado | Cenário |
|---|---|---|---|
| `operadorWallet` | `0xOPER...` | `CARETAKER_ROLE` | Registro de medição e cadastros |
| `adminWallet` | `0xADMI...` | `DEFAULT_ADMIN_ROLE` | Login ADM |

> ℹ️ `auditorWallet` (AUDITOR_ROLE) está no backlog aguardando implementação do EAS no contrato.

---

## 4. Caminhos Críticos a Testar

### 4.1 Caminho 1: Login com MetaMask

**Por que é crítico:** É a porta de entrada do sistema. Se o login falha, nada mais funciona. O fluxo também é incomum (sem senha, sem e-mail) e pode quebrar silenciosamente se a detecção de carteira falhar.

**Fluxo feliz:**
1. Usuário acessa `/login`
2. Clica em "Conectar Carteira"
3. Mock aprova `eth_requestAccounts`
4. Formulário ENS aparece com badge do endereço
5. Usuário preenche Label ENS e seleciona Instituição
6. Clica em "Registrar Acesso"
7. Mock confirma transação `registrarAcesso()`
8. App redireciona para `/tela-inicial`

**Casos negativos:**
- MetaMask não instalada (`window.ethereum` ausente) → deve exibir mensagem de erro
- Usuário rejeita conexão → deve exibir erro gracioso
- Formulário ENS incompleto → botão deve estar desabilitado / exibir validação

**Verificações:**
- Badge com endereço abreviado visível (`0x1234...5678`)
- Mensagem de log atualizada em cada etapa

---

### 4.2 Caminho 2: Registro de Medição (Operador/CARETAKER_ROLE)

**Por que é crítico:** É o fluxo de maior volume de uso — operadores registram medições múltiplas vezes por dia. Tem lógica de alerta biológico embutida que pode bloquear submissões. Uma falha silenciosa aqui significa dados não chegando à blockchain.

**Fluxo feliz:**
1. Entra em `/monitoramento` com `operadorWallet`
2. Mock retorna `isCaretaker = true` → interface de operador renderiza
3. Select de tanques é populado (mock retorna lista de tanques)
4. Seleciona tanque, preenche 11 parâmetros dentro dos limites ideais
5. Clica em "Registrar Medição da Água"
6. Sem alertas biológicos → transação enviada diretamente
7. SweetAlert2 "Sucesso!" aparece
8. Formulário é resetado

**Casos negativos:**
- Parâmetros fora dos limites (temp > 20°C, pH < 6.5, NH₃ > 0) → deve aparecer SweetAlert de confirmação
  - Sub-caso: usuário confirma → transação é enviada
  - Sub-caso: usuário cancela → formulário permanece preenchido
- Formulário incompleto → botão desabilitado
- Falha na transação (mock retorna revert) → SweetAlert de erro com motivo

**Aba de Axolotes:**
- Troca de aba "Água → Indivíduo" funciona
- Formulário de saúde do axolote renderiza e submete corretamente

---

### 4.3 Caminho 3: Cadastro de Tanque e Axolote (Operador/CARETAKER_ROLE)

**Por que é crítico:** O cadastro é o pré-requisito de tudo — sem tanques e axolotes registrados, não há medição possível. Um erro no registro (dados corrompidos, transação não confirmada) invalida toda a cadeia de dados subsequente.

**Fluxo feliz — Cadastro de Tanque:**
1. Entra com `operadorWallet`
2. Navega para o formulário de cadastro de tanque
3. Preenche nome e localização
4. Submete → mock confirma `registerTank()`
5. SweetAlert de sucesso
6. Tanque aparece disponível na lista/select de monitoramento

**Fluxo feliz — Cadastro de Axolote:**
1. Preenche nome, espécie, data de nascimento, tanque associado, dados morfológicos
2. Submete → mock confirma `registerAxolotl()`
3. Axolote aparece disponível no select do monitoramento

**Casos negativos:**
- Campos obrigatórios vazios → validação do formulário impede submissão
- Falha na transação → SweetAlert de erro

---

## 5. Estrutura de Arquivos

```
frontend/
└── e2e/
    ├── plano-testes-e2e.md         # Este documento
    ├── fixtures/
    │   ├── mock-ethereum.ts        # Mock EIP-1193 configurável por role
    │   └── test-data.ts            # Dados de tanques, axolotes, medições mockadas
    ├── pages/                      # Page Object Model
    │   ├── login.page.ts
    │   ├── monitoramento.page.ts
    │   ├── cadastro.page.ts
    │   └── tela-inicial.page.ts
    ├── tests/
    │   ├── login.spec.ts
    │   ├── medicao.spec.ts
    │   └── cadastro.spec.ts
    └── playwright.config.ts
```

### Por que Page Object Model (POM)?

O POM encapsula os seletores e ações de cada página em classes reutilizáveis. Quando o HTML muda (ex: id de um botão), corrigimos em um único lugar e não em todos os testes. Para um app Angular em desenvolvimento ativo como este, isso é essencial.

---

## 6. Configuração do Playwright (`playwright.config.ts`)

```typescript
// Pontos-chave da configuração:
baseURL: 'http://localhost:4200',   // ng serve padrão
testDir: './e2e/tests',
use: {
  headless: true,                   // CI sempre headless
  screenshot: 'only-on-failure',    // Screenshots apenas quando falha
  video: 'retain-on-failure',       // Vídeo apenas quando falha (economiza espaço no CI)
  trace: 'on-first-retry',          // Trace para debugging
},
webServer: {
  command: 'npm run start',         // Inicia o app automaticamente
  url: 'http://localhost:4200',
  reuseExistingServer: true,        // Não reinicia se já estiver rodando localmente
}
```

### Browsers

Rodaremos apenas **Chromium** na primeira versão. A razão: a maioria dos usuários de Web3/MetaMask usa Chrome. Adicionar Firefox e WebKit é trivial depois, mas aumentaria o tempo de CI sem benefício imediato.

---

## 7. Integração com GitLab CI

Ver seção dedicada no `backlog.md` para detalhes sobre o que é GitLab CI e como configurar.

O arquivo `.gitlab-ci.yml` ficará na raiz do repositório e terá um stage `e2e` que:
1. Usa a imagem oficial do Playwright (já inclui Chromium)
2. Instala dependências com `npm ci`
3. Inicia o app Angular em background
4. Executa `npx playwright test`
5. Publica o relatório HTML como artefato acessível pelo GitLab

---

## 8. O que NÃO testar nesta primeira fase

- **Atestação EAS (auditor):** aguardando implementação do contrato — ver backlog
- **Cadastro de instituições/ENS:** feature em outra branch — ver backlog
- **Histórico validado:** depende de dados na blockchain, melhor coberto por testes de integração
- **Mobile/responsividade:** não há suporte mobile documentado
- **Múltiplos browsers:** apenas Chromium na v1

---

## 9. Ordem de Implementação

1. Setup do Playwright (`package.json` + `playwright.config.ts`)
2. Mock do `window.ethereum` — a peça mais crítica e mais reutilizável
3. Testes de Login — base para todos os outros
4. Testes de Cadastro (tanque + axolote) — pré-requisito funcional para medição
5. Testes de Registro de Medição — fecha o ciclo operador
6. Configuração do `.gitlab-ci.yml`

---

## 10. Estimativa de Cobertura

| Fluxo | Casos de teste | Cobertura |
|---|---|---|
| Login | ~5 specs | 100% do componente Login |
| Cadastro (tanque + axolote) | ~6 specs | ~85% dos componentes de cadastro |
| Medição | ~7 specs | ~85% do componente Monitoramento (operador) |
| **Total** | **~18 specs** | **Todos os caminhos críticos ativos** |
