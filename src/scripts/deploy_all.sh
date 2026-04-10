#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SMART_CONTRACT_DIR="$ROOT_DIR/smart_contract"
RELAYER_DIR="$ROOT_DIR/axolodao-relayer"
ENV_FILE="$SMART_CONTRACT_DIR/.env"
RELAYER_ENV_FILE="$RELAYER_DIR/.env"
DEPLOY_BROADCAST_FILE="$SMART_CONTRACT_DIR/broadcast/Deploy.s.sol/11155111/run-latest.json"

banner() {
  printf '\n============================================================\n'
  printf '%s\n' "$1"
  printf '============================================================\n'
}

die() {
  printf 'ERRO: %s\n' "$1" >&2
  exit 1
}

require_cmd() {
  command -v "$1" >/dev/null 2>&1 || die "Comando obrigatório não encontrado: $1"
}

verify_broadcasted_deploy() {
  local broadcast_file="$1"
  local rpc_url="$2"

  [[ -f "$broadcast_file" ]] || return 1

  node - "$broadcast_file" "$rpc_url" <<'NODE'
const fs = require('fs');

const [, , broadcastFile, rpcUrl] = process.argv;
const expectedContracts = ['AxoloAccess', 'AxoloRegistry', 'AxoloMonitoring'];

function normalizeContractName(rawName) {
  return String(rawName).split(/[\\/]/).pop();
}

async function rpc(method, params) {
  const response = await fetch(rpcUrl, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method,
      params,
    }),
  });

  if (!response.ok) {
    throw new Error(`RPC HTTP ${response.status}`);
  }

  const json = await response.json();
  if (json.error) {
    throw new Error(json.error.message || JSON.stringify(json.error));
  }

  return json.result;
}

async function main() {
  const broadcast = JSON.parse(fs.readFileSync(broadcastFile, 'utf8'));
  const deployed = {};

  for (const tx of broadcast.transactions ?? []) {
    if (tx.transactionType !== 'CREATE' || !tx.contractName || !tx.contractAddress) {
      continue;
    }

    const normalizedName = normalizeContractName(tx.contractName);
    if (expectedContracts.includes(normalizedName)) {
      deployed[normalizedName] = tx.contractAddress;
    }
  }

  for (const name of expectedContracts) {
    if (!deployed[name]) {
      throw new Error(`broadcast incompleto: faltou ${name}`);
    }
  }

  for (const name of expectedContracts) {
    const address = deployed[name];
    const code = await rpc('eth_getCode', [address, 'latest']);
    if (!code || code === '0x') {
      throw new Error(`sem bytecode on-chain para ${name} em ${address}`);
    }

    console.log(`${name}: ${address}`);
  }
}

main().catch((error) => {
  console.error(error.message || String(error));
  process.exit(1);
});
NODE
}

load_smart_contract_env() {
  if [[ ! -f "$ENV_FILE" ]]; then
    die "Missing $ENV_FILE"
  fi

  set -a
  # shellcheck disable=SC1090
  source "$ENV_FILE"
  set +a
}

extract_env_value() {
  local file="$1"
  local key="$2"

  [[ -f "$file" ]] || return 0
  awk -F= -v key="$key" '$1 == key {print substr($0, index($0, "=") + 1)}' "$file" | tail -n 1
}

wait_for_enter() {
  local prompt="$1"
  if ! read -r -p "$prompt" _; then
    printf '\nExecução interrompida.\n' >&2
    exit 130
  fi
}

check_prereqs() {
  banner "ETAPA 1: Verificando pré-requisitos"

  require_cmd forge
  require_cmd node
  require_cmd npm

  [[ -d "$SMART_CONTRACT_DIR" ]] || die "Diretório não encontrado: $SMART_CONTRACT_DIR"
  [[ -d "$RELAYER_DIR" ]] || die "Diretório não encontrado: $RELAYER_DIR"
  [[ -f "$RELAYER_DIR/package.json" ]] || die "Arquivo não encontrado: $RELAYER_DIR/package.json"
  [[ -f "$SMART_CONTRACT_DIR/foundry.toml" ]] || die "Arquivo não encontrado: $SMART_CONTRACT_DIR/foundry.toml"
  [[ -f "$ENV_FILE" ]] || die "Arquivo não encontrado: $ENV_FILE"

  printf 'OK: forge, node, npm e arquivos principais foram encontrados.\n'
}

ensure_foundry_libs() {
  banner "ETAPA 2: Verificando dependências do Foundry"

  if [[ -f "$SMART_CONTRACT_DIR/lib/forge-std/src/Test.sol" ]] && \
     [[ -f "$SMART_CONTRACT_DIR/lib/openzeppelin-contracts/contracts/access/AccessControl.sol" ]]; then
    printf 'OK: bibliotecas do Foundry já estão disponíveis em smart_contract/lib.\n'
    return
  fi

  printf 'Bibliotecas não encontradas.\n'
  printf 'Executando instalação em: %s\n' "$SMART_CONTRACT_DIR"
  printf 'Comandos:\n'
  printf '  forge install --root "%s" --no-git foundry-rs/forge-std@v1.15.0\n' "$SMART_CONTRACT_DIR"
  printf '  forge install --root "%s" --no-git OpenZeppelin/openzeppelin-contracts@v5.6.0\n' "$SMART_CONTRACT_DIR"
  (
    cd "$SMART_CONTRACT_DIR"
    forge install --root "$SMART_CONTRACT_DIR" --no-git foundry-rs/forge-std@v1.15.0
    forge install --root "$SMART_CONTRACT_DIR" --no-git OpenZeppelin/openzeppelin-contracts@v5.6.0
  )
}

ensure_relayer_deps() {
  banner "ETAPA 3: Verificando dependências do relayer"

  if [[ -d "$RELAYER_DIR/node_modules" ]]; then
    printf 'OK: dependências do relayer já estão instaladas em axolodao-relayer/node_modules.\n'
    return
  fi

  printf 'Dependências do relayer não encontradas.\n'
  printf 'Executando instalação em: %s\n' "$RELAYER_DIR"
  printf 'Comando:\n'
  printf '  npm install\n'
  (
    cd "$RELAYER_DIR"
    npm install
  )
}

wait_for_private_key() {
  while true; do
    banner "ETAPA 4: Verificando DEPLOYER_PRIVATE_KEY"
    load_smart_contract_env

    if [[ -n "${DEPLOYER_PRIVATE_KEY:-}" ]]; then
      if [[ -z "${SEPOLIA_RPC_URL:-}" ]]; then
        die "SEPOLIA_RPC_URL está vazio em $ENV_FILE"
      fi
      printf 'OK: DEPLOYER_PRIVATE_KEY e SEPOLIA_RPC_URL estão preenchidos.\n'
      return
    fi

    printf 'ATENÇÃO: DEPLOYER_PRIVATE_KEY está vazio em:\n'
    printf '  %s\n' "$ENV_FILE"
    printf '\n'
    printf 'Ação necessária:\n'
    printf '1. Abra o arquivo smart_contract/.env\n'
    printf '2. Preencha DEPLOYER_PRIVATE_KEY com a chave privada de deploy\n'
    printf '3. Salve o arquivo\n'
    printf '4. Volte para este terminal\n'
    printf '\n'
    wait_for_enter "Depois de salvar o arquivo, pressione Enter para verificar novamente. Para cancelar, use Ctrl+C: "
  done
}

wait_for_ens_owner_private_key() {
  while true; do
    banner "ETAPA 5: Verificando ENS_OWNER_PRIVATE_KEY"
    load_smart_contract_env

    if [[ -n "${ENS_OWNER_PRIVATE_KEY:-}" ]]; then
      printf 'OK: ENS_OWNER_PRIVATE_KEY está preenchido.\n'
      return
    fi

    printf 'ATENÇÃO: ENS_OWNER_PRIVATE_KEY está vazio em:\n'
    printf '  %s\n' "$ENV_FILE"
    printf '\n'
    printf 'Ação necessária:\n'
    printf '1. Abra o arquivo smart_contract/.env\n'
    printf '2. Preencha ENS_OWNER_PRIVATE_KEY com a chave privada da carteira dona real de axolodao2.eth\n'
    printf '3. Salve o arquivo\n'
    printf '4. Volte para este terminal\n'
    printf '\n'
    wait_for_enter "Depois de salvar o arquivo, pressione Enter para verificar novamente. Para cancelar, use Ctrl+C: "
  done
}

deploy_contracts() {
  banner "ETAPA 6: Build e deploy dos contratos"
  printf 'Diretório: %s\n' "$SMART_CONTRACT_DIR"
  printf 'Comandos:\n'
  printf '  forge build\n'
  printf '  forge script deploy/Deploy.s.sol --rpc-url \"$SEPOLIA_RPC_URL\" --private-key \"$DEPLOYER_PRIVATE_KEY\" --broadcast\n'
  local forge_status=0

  if (
    cd "$SMART_CONTRACT_DIR"
    forge build
    forge script deploy/Deploy.s.sol \
      --rpc-url "$SEPOLIA_RPC_URL" \
      --private-key "$DEPLOYER_PRIVATE_KEY" \
      --broadcast
  ); then
    return
  else
    forge_status=$?
  fi

  printf '\nAVISO: forge script retornou código %s.\n' "$forge_status"
  printf 'Verificando se os contratos já foram publicados com sucesso na Sepolia...\n'

  if verify_broadcasted_deploy "$DEPLOY_BROADCAST_FILE" "$SEPOLIA_RPC_URL"; then
    printf 'OK: os três contratos já possuem bytecode on-chain.\n'
    printf 'Continuando o fluxo com base no broadcast salvo em:\n'
    printf '  %s\n' "$DEPLOY_BROADCAST_FILE"
    return
  fi

  die "Deploy falhou e não foi possível comprovar os contratos on-chain via $DEPLOY_BROADCAST_FILE"
}

sync_addresses() {
  banner "ETAPA 7: Sincronizando endereços gerados pelo deploy"
  printf 'Diretório: %s\n' "$SMART_CONTRACT_DIR"
  printf 'Comando:\n'
  printf '  node deploy/sync-addresses.js\n'
  (
    cd "$SMART_CONTRACT_DIR"
    node deploy/sync-addresses.js
  )
}

reset_ens_state() {
  banner "ETAPA 8: Limpando o ENS e rotacionando managers"
  printf 'Diretório: %s\n' "$SMART_CONTRACT_DIR"
  printf 'Comando:\n'
  printf '  node deploy/reset-ens.js\n'
  printf 'Observação:\n'
  printf '  O deploy normal usa apenas o inventário local em smart_contract/deploy/ens-inventory/sepolia.json.\n'
  printf '  Se esse inventário estiver vazio, a etapa faz só a rotação rápida do manager, sem varrer histórico do ENS.\n'
  printf '  A limpeza pesada inicial ficou separada em node deploy/export-ens-baseline.js e node deploy/reset-ens-baseline.js.\n'
  (
    cd "$SMART_CONTRACT_DIR"
    node deploy/reset-ens.js
  )
}

pause_for_ens_step() {
  local access_contract

  banner "ETAPA 9: Conferência final do ENS"

  access_contract="$(extract_env_value "$RELAYER_ENV_FILE" "ACCESS_CONTRACT")"
  printf 'O reset do ENS já foi executado automaticamente.\n'
  printf '\n'
  printf 'Antes de continuar, faça apenas uma conferência manual:\n'
  printf '1. Abra a interface onde você administra o domínio axolodao2.eth\n'
  printf '2. Verifique se a carteira humana continua como owner real do nome\n'
  printf '3. Verifique se o manager atual no ENS Registry agora é o novo AxoloAccess\n'
  printf '4. Verifique se todos os subdomínios históricos sob axolodao2.eth foram limpos\n'
  printf '5. Se estiver tudo certo, volte para este terminal\n'
  printf '\n'
  if [[ -n "$access_contract" ]]; then
    printf 'Endereço do AxoloAccess que deve terminar como manager no ENS Registry:\n'
    printf '  %s\n' "$access_contract"
  else
    printf 'Não foi possível encontrar ACCESS_CONTRACT em:\n'
    printf '  %s\n' "$RELAYER_ENV_FILE"
  fi
  wait_for_enter "Depois de conferir owner real e manager do ENS, pressione Enter para continuar. Para cancelar, use Ctrl+C: "
}

start_relayer() {
  banner "ETAPA 10: Iniciando o relayer"
  printf 'Diretório: %s\n' "$RELAYER_DIR"
  printf 'Comando:\n'
  printf '  npm start\n'
  printf '\n'
  printf 'O processo ficará em primeiro plano neste terminal.\n'
  cd "$RELAYER_DIR"
  exec npm start
}

main() {
  cd "$ROOT_DIR"
  check_prereqs
  ensure_foundry_libs
  ensure_relayer_deps
  wait_for_private_key
  wait_for_ens_owner_private_key
  deploy_contracts
  sync_addresses
  reset_ens_state
  pause_for_ens_step
  start_relayer
}

main "$@"
