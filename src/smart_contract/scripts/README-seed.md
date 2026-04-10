# Seed Data — AxoloDAO

Script para popular a blockchain Sepolia com dados de teste.

## Pré-requisitos

1. Contratos deployados (endereços em `seed-config.json`)
2. Relayer rodando: `cd axolodao-relayer && node server.js`
3. Admin e gerente com Sepolia ETH
4. AxoloAccess é o manager atual de `axolodao2.eth` no ENS Registry

## Configuração

```bash
# Copiar e preencher (ou usar o seed-config.json já preenchido)
cp seed-config.example.json seed-config.json
```

## Uso

```bash
node smart_contract/scripts/seed-data.js
```

## O que o script faz

| Fase | Ator | Método | Dados |
|------|------|--------|-------|
| 1 | Admin | direto on-chain | Cria 2 instituições (labcuidadores, labauditores) |
| 2 | Gerente | direto on-chain | Registra joao e maria no ENS |
| 3 | Cuidador/Auditor | via relayer | registrarAcesso (recebem roles) |
| 4 | Cuidador | via relayer | 3 tanques + 5 axolotes |
| 5 | Cuidador | via relayer | 6 medições ambientais |
| 6 | Auditor | via relayer | Valida 4, contesta 1, deixa 1 pendente |

## Dados criados

- **2 instituições**: labcuidadores (CARETAKER), labauditores (AUDITOR)
- **2 membros ENS**: joao.labcuidadores.axolodao2.eth, maria.labauditores.axolodao2.eth
- **3 tanques**: Principal A, Quarentena, Reprodução
- **5 axolotes**: Totli, Xochitl, Atl, Citlali, Quetzal
- **6 medições**: 4 validadas, 1 contestada, 1 pendente

## Re-execução

O script é tolerante a re-execuções: se uma instituição já existe, ele pula e continua.
Tanques, axolotes e medições serão criados novamente (IDs incrementais).

## Troubleshooting

- **"Relayer offline"**: Inicie o relayer com `cd axolodao-relayer && node server.js`
- **"Access: instituicao ja existe"**: Normal em re-execução, o script pula automaticamente
- **"ENS: resolver nao configurado"**: Verifique se a fase 2 completou corretamente
- **Insufficient funds**: Admin e gerente precisam de Sepolia ETH para txs diretas
