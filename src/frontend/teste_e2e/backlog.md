# Backlog — Testes E2E AmbyData
**Atualizado:** Março 2026

Este documento registra features que ainda não podem ser testadas porque dependem de implementações em andamento em outras branches ou contratos.

---

## 1. Atestação EAS (Auditor/AUDITOR_ROLE)

**Status:** Aguardando implementação do contrato inteligente
**Bloqueio:** A funcionalidade de atestação via EAS (Ethereum Attestation Service) ainda não foi implementada no smart contract de monitoramento. O frontend tem a UI de auditoria parcialmente construída (aceitar/recusar medição), mas o contrato não expõe as funções de atestação definitivas.

**O que já está mapeado para quando desbloquear:**

Fluxo feliz — Aceitar medição:
1. Entra com `auditorWallet` (AUDITOR_ROLE)
2. Tela inicial exibe lista de medições pendentes
3. Auditor clica em uma medição pendente → abre view de auditoria
4. Dados da medição são exibidos (temperatura, pH, O₂, etc.)
5. Auditor clica "Aceitar"
6. Mock confirma `validateMeasurement()` / função EAS equivalente
7. SweetAlert de sucesso → retorna para lista de pendentes

Fluxo feliz — Contestar medição:
1. Auditor visualiza medição pendente
2. Clica "Recusar"
3. SweetAlert com input de texto aparece pedindo motivo
4. Preenche motivo (ex: "Sensores descalibrados")
5. Mock confirma `contestMeasurement()`
6. Retorna para lista

Casos negativos a cobrir:
- Auditor tenta acessar `/monitoramento` diretamente → deve ver "Área Restrita"
- Contestação sem motivo → não deve submeter
- Falha na transação de validação → SweetAlert de erro

**Estimativa:** ~5 specs quando desbloqueado.

---

## 2. Cadastro de Instituições e Pessoas com ENS

**Status:** Feature em desenvolvimento em outra branch
**Bloqueio:** O fluxo de onboarding de novas instituições (ex: registrar `biomuseu` ou `unam` no ENS da AxoloDAO) e de novos usuários via registro ENS hierárquico está sendo implementado em paralelo. Quando disponível, precisará de testes E2E próprios.

**O que já está mapeado para quando desbloquear:**

Fluxo — Cadastro de Instituição (Admin):
1. Entra com `adminWallet` (DEFAULT_ADMIN_ROLE)
2. Acessa painel de administração
3. Preenche nome da instituição e parent node ENS
4. Submete → contrato registra subdomínio em `axolodao2.eth`
5. Instituição disponível no select de login

Fluxo — Cadastro de Pessoa (Instituição):
1. Novo usuário conecta carteira
2. Seleciona instituição à qual pertence
3. Preenche label ENS pessoal
4. Sistema atribui role correspondente (`CARETAKER_ROLE` ou `AUDITOR_ROLE`) conforme a instituição

**Dependências técnicas a resolver antes de testar:**
- ABI final do contrato de acesso com função de registro de instituição
- Tela/rota de administração no frontend
- Hierarquia ENS definida (quem pode registrar quem)

**Estimativa:** ~6 specs quando desbloqueado.

---

## Notas Gerais

Quando qualquer item acima for desbloqueado, o processo é:
1. Mover o item deste backlog para `frontend/e2e/plano-testes-e2e.md` como novo caminho crítico
2. Criar o arquivo `.spec.ts` correspondente na pasta `frontend/e2e/tests/`
3. Adicionar fixture de wallet/role se necessário em `frontend/e2e/fixtures/mock-ethereum.ts`
