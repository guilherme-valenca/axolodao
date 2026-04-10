# Inteli - Instituto de Tecnologia e Liderança 

[![Imagem-Inteli](assets/sprint5/Inteli.png)](https://www.inteli.edu.br/)

# Blockchain - Projeto AmbyData

## Axobots (Grupo 2)

### Integrantes 

- [Alessandra Sena](https://www.linkedin.com/in/alessandra-ns-sena/)
- [Aira Souza](https://www.linkedin.com/in/aira-mel/)
- [Paulo Vitor Almeida](https://www.linkedin.com/in/paulo-vitor-barros-de-almeida/)
- [Guilherme Valença](https://www.linkedin.com/in/guilherme-valenca/)
- [Matheus Scapolan](https://www.linkedin.com/in/matheusscapolan/)
- [Eduarda Dias](https://www.linkedin.com/in/eduarda-nunes-/)

### Descrição

&emsp;O **AmbyData** é uma infraestrutura digital descentralizada voltada ao monitoramento, rastreabilidade e validação de dados científicos relacionados à conservação do gênero *Ambystoma*, com foco no axolote mexicano. O projeto busca resolver problemas estruturais como fragmentação de informações, baixa auditabilidade e dependência de validações centralizadas.

&emsp; A solução combina base de dados estruturada, smart contracts, identidade digital onchain e mecanismos de atestação verificável, garantindo integridade, transparência e continuidade histórica dos registros ambientais e biológicos.

&emsp; Ao integrar ciência ambiental e tecnologia blockchain, o AmbyData propõe um modelo de governança de dados mais confiável, auditável e replicável para iniciativas de conservação.

### Estrutura de pastas

&emsp; A atual estrutura de pastas do projeto AmbyData é composta da seguinte forma:

```
G02
 ┣ assets
 ┣ documentos
 ┃ ┗ outros
 ┣ src
 ┃ ┣ axolodao-relayer
 ┃ ┣ frontend
 ┃ ┣ scripts
 ┃ ┗ smart_contract
 ┣ .gitignore
 ┣ gitlab-ci.yml
 ┣ dependencias.json
 ┣ foundry.lock
 ┣ package.json
 ┗ README.MD

``` 

&emsp; Para a melhor compreensão sobre como a atual estrutura funciona, separamos os seguintes pontos:

- *assets*: a pasta assets comporta todas as figuras presentes na documentação do projeto AmbyData.
- *documentos*: a pasta documentos comporta a documentação desenvolvida para o projeto AmbyData. 
- *src*: a pasta src é a pasta principal que guarda todo o código fonte, estilos e etc. 
  - *axolodao-relayer*:  a pasta relayer contém toda a lógica ```gasless``` da plataforma AmbyData. 
  - *frontend*: pasta principal do frontend que guarda toda a estrutura de código do frontend da aplicação. Você pode encontrar os códigos-fonte de cada página acessando a pasta ```src``` -> ```app``` -> ```components```. 
  - *smart_contract*: a pasta smart_contract comporta todos os quatro contratos desenvolvidos para o funcionamento da aplicação.   


### Guia de Instalação e Configuração do Projeto

_Vídeo demonstração do projeto: [a adicionar](link_aleatório)_


&emsp; A arquitetura completa da AxoloDAO conta com a integração de três frentes:
- **Smart Contracts (On-chain):** 4 contratos principais (`AxoloAccess`, `AxoloMonitoring`, `AxoloEAS` e `AxoloRegistry`) que gerenciam regras de negócio, ENS e atestações.
- **Backend Relayer (Off-chain):** Uma API Node.js que assina e custeia (paga o gás) das transações dos usuários via meta-transactions (ERC-2771).
- **Frontend (DApp):** Interface web (Angular/Ethers.js) para interação de Cuidadores, Auditores e Administradores.

> *Para mais detalhes da arquitetura, acesse a documentação na pasta `/documentos`.*

#### Índice Navegável
1. [Pré-requisitos](#1-pré-requisitos)
2. [Instalação](#2-instalação)
3. [Configuração de Ambiente (RPC e ETH)](#3-configuração-de-ambiente-rpc-e-eth)
4. [Deploy dos Smart Contracts](#4-deploy-dos-smart-contracts)
5. [Pós-Deploy: Configuração do ENS](#5-pós-deploy-configuração-do-ens)
6. [Inicializando o Backend Relayer](#6-inicializando-o-backend-relayer)
7. [Configuração e Execução do Frontend (Angular)](#7-configuração-e-execução-do-frontend-angular)

#### 1. Pré-requisitos

&emsp; Certifique-se de ter as seguintes ferramentas instaladas e configuradas antes de prosseguir:

<div align = "center"> <p> Quadro 1 - Guia de pré-requisitos para instalação. </p> </div>

| Ferramenta / Recurso | Descrição da Utilidade | Link / Comando de Instalação |
| :--- | :--- | :--- |
| **Node.js & npm** | Gerenciador de pacotes para scripts e relayer. | [Download Node.js](https://nodejs.org/) |
| **Foundry** | Framework de desenvolvimento e deploy de contratos. | `curl -L https://foundry.paradigm.xyz \| bash` (use `foundryup` após instalar) |
| **Angular CLI** | Framework para desenvolvimento da interface web (Frontend) | No terminal: `npm install -g @angular/cli` |
| **Conta Alchemy** | Provedor de nós para conectar à rede Sepolia. | [Criar conta Alchemy](https://www.alchemy.com/) |
| **Sepolia Testnet ETH** | Criptomoeda de testes para pagar as taxas de deploy. | [Sepolia Faucet](https://metamask.io/) |

<div align = "center"> Fonte: material produzido pelos proprios alunos (2026). </div>

#### 2. Instalação

**Passo 1:** Clone este repositório para a sua máquina local.

&emsp;Abra o terminal na sua área de trabalho e rode o seguinte comando:

```bash
git clone https://git.inteli.edu.br/graduacao/2026-1a/t18/g02.git
```

**Passo 2:** Abra o repositório pelo vscode e instale as dependências Node (necessárias para os scripts de sincronização):

```bash
npm install
```

**Passo 3:** Navegue até a pasta dos Smart Contracs:

``` bash
cd src
cd smart_contract
```

#### 3. Configuração de Ambiente (RPC e ETH)

- **Passo 1:** Obter a Chave Privada e ETH

&emsp; Na sua MetaMask, selecione a rede Sepolia e exporte a chave privada da sua carteira (Conta -> Detalhes da Conta -> Mostrar Chave Privada). Garanta que esta carteira possui saldo em Sepolia ETH.

- **Passo 2:** Obter a URL do RPC

&emsp; No seu painel do Alchemy ou Infura, crie um novo App para a rede "Ethereum Sepolia" e copie a URL HTTP.

- **Passo 3:** Criar o arquivo .env

&emsp; Dentro da pasta smart_contract, crie um arquivo chamado .env e insira suas credenciais:

``` bash
DEPLOYER_PRIVATE_KEY=sua_chave_privada_aqui_sem_o_0x
SEPOLIA_RPC_URL=sua_url_rpc_da_sepolia_aqui
```

#### 4. Deploy dos Smart Contracts

_Video de deploy: [clique aqui](https://youtu.be/pKDQvIuv0F4)_

&emsp; Com as variáveis configuradas, mantenha seu terminal na pasta smart_contract e execute:

- **Passo 1:** Compile os contratos.

```bash
forge build
```

*O que esperar:* O terminal exibirá ```[⠒] Compiling...``` e finalizará indicando sucesso

**Passo 2:** Execute o script de deploy na rede Sepolia.

``` bash
source .env && forge script deploy/Deploy.s.sol \
  --rpc-url $SEPOLIA_RPC_URL \
  --private-key $DEPLOYER_PRIVATE_KEY \
  --broadcast
```

- **Passo 3:** Sincronize os endereços dos novos contratos com os arquivos do frontend e relayer.

```bash
node deploy/sync-addresses.js
```
*O que esperar:* Uma mensagem de confirmação indicando que o arquivo HTML e o .env do relayer foram atualizados com os novos endereços.

#### 5. Pós-Deploy: Configuração do ENS

&emsp; Para que o contrato `AxoloAccess` gerencie as instituições e crie subdomínios automaticamente, ele deve ser o **Controller** do seu domínio base na Sepolia.

1. Copie o endereço do contrato `AxoloAccess` (exibido no terminal após o Passo 2).
2. Acesse o [App oficial do ENS](https://app.ens.domains/) e conecte a carteira MetaMask dona do domínio (ex: `axolodao.eth`).
3. Abra a página de gerenciamento do seu domínio, vá na aba **More** (ou **Records/Ownership**) e localize **Manager/Controller**.
4. Clique em **Edit**, cole o endereço do contrato `AxoloAccess` e salve, aprovando a transação na MetaMask.

### 6. Inicializando o Backend Relayer

&emsp; O Relayer recebe a assinatura do usuário e paga a taxa de gás por ele usando o padrão ERC-2771. Para isso, ele precisa de uma conexão RPC (Alchemy/Infura) para transmitir as transações à rede.

**Passo 1:** Retorne à pasta raiz e acesse o relayer:
```bash
cd ..
cd axolodao-relayer
```

**Passo 2:** Instale as dependências e inicie a API:

```bash
npm install
npm start
```

*O que esperar:* O terminal exibirá ```Servidor Relayer rodando na porta 3000```. Mantenha este terminal aberto

#### 7. Configuração e Execução do Frontend (Angular)

&emsp; O nosso DApp utiliza o framework **Angular** para a interface de utilizador e a **MetaMask como Provider** principal. A MetaMask injeta a ligação Web3 diretamente no navegador, permitindo que o utilizador assine mensagens e interaja com os contratos.

- **Passo 1: Verificação dos Endereços dos Contratos**

&emsp; Antes de arrancar o frontend, certifique-se de que os endereços dos contratos gerados no deploy foram atualizados no projeto Angular. Geralmente, estes devem ser inseridos no ficheiro de configuração (`src/frontend/src/environments/environment.ts`).

- **Passo 2: Aceder à pasta do Frontend**

&emsp; Abra um novo terminal (mantenha o terminal do Relayer a correr) e navegue até à pasta onde o projeto Angular está localizado:

```bash
cd frontend
```

- **Passo 3:** Instalar as dependências

&emsp; Instale todos os pacotes e bibliotecas necessários para o Angular:

```bash
npm install
```

- **Passo 4:** Iniciar o servidor de desenvolvimento

&emsp; Arranque a aplicação Angular executando o seguinte comando:

```bash
ng serve
```

_(Nota: Se não tiver o Angular CLI instalado globalmente, pode utilizar o comando npm start, caso esteja configurado no seu package.json)_

- **Passo 5:** Ligar e Testar a Aplicação

1. O servidor iniciará e a aplicação estará disponível no endereço padrão: http://localhost:4200 (ou no porto indicado no terminal).

2. Abra este endereço no seu navegador.

3. Garanta que a sua extensão da MetaMask está ligada à rede Sepolia.

4. Clique em Conectar MetaMask no menu da aplicação.

5. Verifique se os indicadores de estado da Rede e do Backend Relayer estão a verde. A plataforma está pronta a ser utilizada!

----

### Histórico de lançamentos

- **0.5.0 - 10/04/2026** - Entrega da versão final do MVP .
- **0.4.0 - 27/03/2026** - Realização de testes automatizados, implementação de EAS, ENS para adição de Instituições, deploy de Smart Contract, integração do Relayer/Safe a solução.
- **0.3.0 - 13/03/2026** - Integração do Smart Contract com o Frontend, planejamento de integração com ENS. 
- **0.2.0 - 27/02/2026** - Desenvolvimento e documentação dos Smart Contracts.
- **0.1.0 - 13/02/2026** - Entendimento do negócio, experiência do usuário, análise de risco (segurança da informação). 


## Licença/License

<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"><p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title" rel="cc:attributionURL" href="https://git.inteli.edu.br/graduacao/2026-1a/t18/g02">Axobots</a> _by_ <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://www.inteli.edu.br/">Inteli, <a href="https://git.inteli.edu.br/alessandra.sena">Alessandra Sena</a>, <a href="https://git.inteli.edu.br/aira.souza">Aira Souza</a>, <a href="https://git.inteli.edu.br/paulo.almeida">Paulo Vitor Almeida</a>, <a href="https://git.inteli.edu.br/guilherme.valenca">Guilherme Valença</a>, <a href="https://git.inteli.edu.br/matheus.scapolan">Matheus Scapolan</a> and <a href="https://git.inteli.edu.br/eduarda.dias">Eduarda Dias</a></a> _is_ _licensed_ _under_ <a href="http://creativecommons.org/licenses/by/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">Attribution 4.0 International</a>.</p>
