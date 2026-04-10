# AmbyData

## Sumário
[Introdução](#c-Int)
[1. Estratégia e Análise](#c1)
- [1.1 Matriz do Oceano Azul](#c1.1)
  - [1.1.1 Explicação dos atributos da Matriz – AxoloDAO](#c1.1.1)
  - [1.1.2 Comparação de Atributos](#c1.1.2)
  - [1.1.3 Aplicação do Modelo ERRC](#c1.1.3)
  - [1.1.4 Novo Posicionamento Estratégico](#c1.1.4)
  - [1.1.5 Conclusão Analítica da Estratégia e Análise](c1.1.5)
- [1.2 Matriz de risco](#c1.2)
- [1.3 Canvas Proposta de Valor](#c1.3)
  - [1.3.1 Introdução conceitual](#c1.3.1)
  - [1.3.2 Perfil do Cliente](#c1.3.2)
  - [1.3.3 Mapa de Valor (Value Map)](#c1.3.3)
- [1.4. Análise Financeira](#14-análise-financeira)
  - [1.4.1 Introdução Geral](#141-introdução-geral)  
  - [1.4.2 Link da Planilha](#142-link-da-planilha)  
  - [1.4.3 Sumário Executivo](#143-sumário-executivo)  
  - [1.4.4 Suposições](#144-suposições)  
  - [1.4.5 P&L BioMuseo](#145-pl-biomuseo)  
  - [1.4.6 AxoloDAO MVP](#146-axolodao-mvp)  
  - [1.4.7 Investimento](#147-investimento)  
  - [1.4.8 ROI e Métricas](#148-roi-e-métricas)  
  - [1.4.9 Conclusão Geral](#149-conclusão-geral)

[2. Experiência do Usuário](#2-experiência-do-usuário)
- [2.1 Personas](#21-personas)
- [2.2 User Stories](#22-user-stories)

[3. Tecnologia Blockchain](#3-tecnologia-blockchain)
- [3.1 Arquitetura dos Smart Contracts](#31-arquitetura-dos-smart-contracts)
  - [3.1.1 Requisitos de Negócios](#311-requisitos-de-negócios)
  - [3.1.2 Arquitetura da Solução](#312-arquitetura-da-solução)
  - [3.1.3 Diagrama de sequência UML](#313-diagrama-de-sequência-uml)
- [3.2 Testes e Validação](#32-testes-e-validação)
  - [3.2.1 Introdução](#321-introdução)
  - [3.2.2 Ferramentas e Metodologia](#322-ferramentas-e-metodologia)
  - [3.2.3 Cenários e Atores](#323-cenários-e-atores)
    - [Atores e Papéis](#atores-e-papéis)
    - [Cenários de Preparação](#cenários-de-preparação)
  - [3.2.4 Testes](#324-testes)
  - [3.2.5 Como Executar os Testes com Foundry](#325-como-executar-os-testes-com-foundry)
  - [3.2.6 Conclusão](#326-conclusão)
  - [3.3 ENS Instituições, EAS e Indexador de Dados](###33-ENS-Instituições-,-EAS-e-Indexador-de-Dados)
    - [3.3.1 ENS Instituições](####331-ENS-Instituições)
    - [3.3.2 EAS ](####332-EAS)
    - [3.3.3 Indexador de Dados](####333-Indexador-de-Dados)
  - [3.4 Testes Foundry e Frontend](###34-Testes-Foundry-e-Frontend)
    - [3.4.1 Testes Froundry](####341-Testes-Froundry)
      - [3.4.1.1 Introdução](####3411-Introdução)
      - [3.4.1.2 Escopo, versão e contexto técnico](####3412-Escopo,-versão-e-contexto-técnico)
      - [3.4.1.3 Atualização da suite após remoção do REGISTRAR_ROLE](####3413-Atualização-da-suite-após-remoção-do-REGISTRAR_ROLE)
      - [3.4.1.4 Suite principal AxoloDAO (40 testes)](####3414-Suite-principal-AxoloDAO-(40-testes))
      - [3.4.1.5 Suite AxoloInstitutions (unitários)](####3415-Suite-AxoloInstitutions-(unitários))
      - [3.4.1.6 Suite AxoloIntegration (Instituições + Access + Registry)](####3416-Suite-AxoloIntegration-(Instituições-+-Access-+-Registry))
      - [3.4.1.7 Suite AxoloEASFlowIntegration (atestar, contestar, revogar)](####3417-Suite-AxoloEASFlowIntegration-(atestar,-contestar,-revogar))
      - [3.4.1.8 Suite AxoloSecurityEdgeCases (edge cases e seguranca)](####3418-Suite-AxoloSecurityEdgeCases-(edge-cases-e-seguranca))
      - [3.4.1.9 Como executar os testes com Foundry](####3419-Como-executar-os-testes-com-Foundry)
      - [3.4.1.10 Casos de teste detalhados (pré-condição, procedimento, resultado esperado e pós-condição)](####34110-Casos-de-teste-detalhados-(pré-condição,-procedimento,-resultado-esperado-e-pós-condição))
      - [3.4.1.11 Evidências visuais dos testes Foundry](####34111-Evidências-visuais-dos-testes-Foundry)
      - [3.4.1.12 Conclusão](####34112-Conclusão)
    - [3.4.2 Testes Frontend](####342-Testes-Frontend)

[4. Segurança da Informação](#4-segurança-da-informação)
- [4.1 Requisitos de Segurança da Informação](#41-requisitos-de-segurança-da-informação)
- [4.2 Vulnerabilidades Existentes](#42-vulnerabilidades-existentes)
- [4.3 Modelagem de Atacantes e Ataques Possíveis](#43-modelagem-de-atacantes-e-ataques-possíveis)
- [4.4 Priorização de Ataques (Probabilidade e Impacto)](#44-priorização-de-ataques-probabilidade-e-impacto)
- [4.5 Medidas de Mitigação](#45-medidas-de-mitigação)
- [4.6 Conclusão](#46-conclusão)

[5. Interface do Usuário](#5-interface-do-usuário)
- [5.1 Wireframes](#51-wireframes)
- [5.2 Protótipo de Alta Fidelidade](#52-protótipo-de-alta-fidelidade)
- [5.3 Demonstração da Solução](#53-demonstração-da-solução)

[6. Backend da Aplicação](#6-Backend-da-Aplicação)
- [6.1 Arquitetura do Backend](#6.1-Arquitetura-do-Backend)
- [6.2 Modelagem do Banco de dados](#6.2-Modelagem-do-Banco-de-Dados)

[7. Referências](#7-referências)

# <a name="c-Int"></a> Introdução

&emsp; O **AmbyData** é uma infraestrutura digital descentralizada voltada ao monitoramento, rastreabilidade e validação de dados científicos relacionados à conservação do gênero *Ambystoma*, com foco no axolote mexicano. O projeto busca resolver problemas estruturais como fragmentação de informações, baixa auditabilidade e dependência de validações centralizadas.

&emsp; A solução combina base de dados estruturada, smart contracts, identidade digital onchain e mecanismos de atestação verificável, garantindo integridade, transparência e continuidade histórica dos registros ambientais e biológicos.

&emsp; Ao integrar ciência ambiental e tecnologia blockchain, o AmbyData propõe um modelo de governança de dados mais confiável, auditável e replicável para iniciativas de conservação.

## <a name="c1"></a> 1. Estratégia e Análise

### <a name="c1.1"></a> 1.1 Matriz do Oceano Azul  

&emsp; A Matriz de Oceano Azul, também conhecida como Curva de Valor, é uma ferramenta estratégica utilizada para comparar propostas de valor a partir de atributos considerados relevantes para um determinado contexto. Segundo a abordagem apresentada por Scopi sobre Curva de Valor, essa visualização torna explícitas as escolhas estratégicas implícitas em cada solução analisada, permitindo identificar padrões de convergência estratégica, característicos de oceanos vermelhos, bem como novas combinações de valor que configuram oceanos azuis.

&emsp; No contexto do projeto, a Matriz de Oceano Azul é aplicada para posicionar a proposta da ZenBit e do AxoloDAO em relação a soluções consolidadas que atuam em domínios adjacentes à rastreabilidade, validação de dados e transparência, mas que não abordam de forma integrada o problema da coordenação científica e ambiental descentralizada.

&emsp; Para essa finalidade, foram selecionadas duas organizações de referência: a **Provenace**, que representa uma abordagem orientada ao mercado para rastreabilidade e transparência em cadeias produtivas, e a **Verra**, que simboliza o modelo tradicional de validação científica e regulatória baseado em auditorias centralizadas.

&emsp; A comparação desses modelos com a proposta do AxoloDAO evidencia a criação de um novo espaço estratégico, no qual atributos como identidade digital onchain, continuidade histórica imutável e coordenação multiator passam a ser tratados como elementos estruturais.

### <a name="c1.1.1"></a> 1.1.1. Explicação dos atributos da Matriz – AxoloDAO

#### 1. Facilidade de uso
- O sistema é utilizado por perfis com diferentes níveis de familiaridade tecnológica.  
- A usabilidade é essencial para garantir adoção e reduzir erros na entrada de dados por cuidadores e pesquisadores.

#### 2. Custo das transações e operações
- Projetos de conservação e pesquisa operam, em geral, com recursos financeiros limitados.  
- O uso de soluções em Camada 2 reduz custos de registro onchain e despesas indiretas associadas à burocracia e auditorias presenciais.

#### 3. Grau de automação dos processos
- A coleta manual é suscetível a erros e pode gerar estresse adicional aos animais.  
- A preparação para integração futura com sensores IoT aumenta frequência, consistência e confiabilidade dos dados.

#### 4. Dependência de intermediários para validação científica
- Modelos tradicionais concentram confiança em autoridades centralizadas.  
- Atestações descentralizadas permitem validação por provas criptográficas, reduzindo intermediários burocráticos.

#### 5. Capacidade de coordenação entre múltiplos atores
- A conservação envolve instituições que frequentemente operam de forma fragmentada.  
- Uma infraestrutura digital compartilhada cria uma fonte única de verdade e reduz duplicação de esforços.

#### 6. Continuidade histórica e imutabilidade dos registros
- A perda de dados históricos compromete análises longitudinais.  
- O registro imutável em blockchain preserva o histórico completo dos espécimes.

#### 7. Transparência regulatória e rastreabilidade dos dados
- Reguladores e financiadores exigem evidência verificável.  
- Registros auditáveis publicamente viabilizam auditoria contínua e reduzem relatórios burocráticos.

#### 8. Identidade digital onchain dos espécimes
- Espécimes não possuem hoje identificação digital única e persistente.  
- A identidade digital onchain permite rastrear eventos, saúde e linhagens ao longo do tempo.

&emsp; A seleção de Provenance e Verra como referências competitivas fundamenta-se na análise de setores adjacentes que abordam rastreabilidade e validação em contextos similares. A **Provenance**, sediada em Londres desde 2014 com USD 12,8 milhões em capital levantado (Crunchbase), opera no setor de rastreabilidade agroalimentar, capturando menos de 2% do mercado global de USD 5,4 bilhões em rastreabilidade comercial (MarketsandMarkets Research, 2024, CAGR 14,2%). A **Verra**, fundada em 2007, certifica 1.1 bilhão de toneladas CO2e no mercado voluntário de carbono de USD 2,4 bilhões (Ecosystem Integrity Council, 2023), operando mediante auditorias centralizadas bienais.

&emsp; Ambas capturaram confiança institucional em seus respectivos domínios, mas revelam lacunas estruturais: Provenance não oferece rastreabilidade individual de seres vivos ou mecanismos criptográficos de não-repúdio; Verra não operacionaliza validação contínua em tempo real ou identidade digital para exemplares individuais. O AxoloDAO reconstrói esse espaço ao integrar infraestrutura pública digital aberta com rastreabilidade descentralizada de longo prazo, posicionando-se numa categoria distinta.

### <a name="c1.1.2"></a> 1.1.2. Comparação de Atributos

&emsp; A comparação dos atributos apresenta as diferenças entre o AxoloDAO, a Provenance e a Verra com base nos critérios definidos na Matriz de Oceano Azul, permitindo observar como cada modelo distribui valor ao longo dos mesmos atributos e sustenta seu posicionamento estratégico.

**Tabela Comparativa**

| Atributo | AxoloDAO (Projeto) | Provenance (Rastreabilidade Comercial) | Verra (Certificação Tradicional) |
|---|---|---|---|
| Facilidade de uso | 5 – Usabilidade intermediária; enfrenta o trilema do usuário onchain e exige treinamento de validadores sem proficiência tecnológica prévia. | 8 – Alta; interfaces polidas e orientadas à experiência do consumidor final e ao marketing. | 4 – Baixa; processos complexos, manuais e baseados em relatórios técnicos extensos. |
| Custo das transações e operações | 3 – Baixo a médio; uso de soluções em Camada 2 reduz taxas de gás, embora ainda existam custos operacionais de digitalização e captura de dados. | 5 – Médio; custos de Software as a Service compatíveis com o mercado comercial. | 9 – Muito alto; custos elevados associados a auditorias humanas, viagens e burocracia institucional. |
| Grau de automação dos processos | 7 – Médio a alto; o MVP depende de medições manuais, mas a arquitetura é desenhada para integração futura via API com sensores IoT. | 7 – Médio a alto; automação consistente para cadeias de suprimentos digitalizadas. | 3 – Baixo; forte dependência de coleta manual, visitas presenciais e documentação em PDF. |
| Dependência de intermediários | 1 – Mínima; validação baseada em atestações descentralizadas (EAS) e provas criptográficas, sem autoridade central de confiança. | 4 – Média; dependência da plataforma centralizada e da confiança na marca operadora. | 10 – Máxima; o modelo é inteiramente dependente de auditores institucionais e validação centralizada. |
| Capacidade de coordenação entre múltiplos atores | 8 – Alta; uso de MicroDAOs permite coordenação nativa e alinhamento de incentivos entre instituições participantes. | 6 – Média; coordenação limitada às relações contratuais da cadeia de valor. | 4 – Baixa; coordenação burocrática, lenta e fragmentada entre múltiplas organizações. |
| Continuidade histórica e imutabilidade | 10 – Máxima; registros imutáveis em blockchain preservam dados científicos e linhagens genéticas independentemente de mudanças institucionais. | 5 – Média; foco no ciclo de vida do produto, com horizonte temporal limitado. | 6 – Média; registros históricos preservados, porém vulneráveis à descontinuidade institucional. |
| Transparência regulatória e rastreabilidade | 9 – Alta; auditoria pública contínua permite verificação direta do cumprimento de protocolos por órgãos reguladores, sem mediação. | 8 – Alta; transparência significativa, porém orientada à comunicação com consumidores. | 7 – Média a alta; transparência baseada em relatórios auditados, mas não em tempo real. |
| Identidade digital onchain | 10 – Máxima; identidade digital única (ENS) para cada indivíduo vivo, acumulando histórico biológico, médico e genético. | 5 – Média; identificação aplicada a lotes ou SKUs, raramente a indivíduos vivos. | 0 – Nula; certifica projetos ou volumes agregados, sem identidade digital individual. |

**Representação Gráfica**

&emsp; O gráfico a seguir representa visualmente a distribuição de valor entre o AxoloDAO, a Provenance e a Verra, permitindo uma comparação direta dos atributos definidos na Matriz de Oceano Azul.

<div align="center">

  <p>Figura 1 - Matriz do oceano azul</p>
  <img src="../assets/sprint1/matriz_oc_azul.png" alt="Matriz Oceano Azul">
  <p>Fonte: Material produzido pelos autores (2026).</p>

</div>

&emsp; A visualização evidencia que o AxoloDAO se diferencia das abordagens tradicionais ao concentrar valor em atributos estruturais, como baixa dependência de intermediários, continuidade histórica e identidade digital onchain, enquanto Provenance e Verra permanecem alinhadas a modelos consolidados de rastreabilidade comercial e certificação institucional.

### Interpretação da Matriz do Oceano Azul

&emsp; A Matriz de Avaliação de Valor revela disparidades estruturais significativas entre os três modelos analisados. Enquanto Verra e Provenance operam em oceanos vermelhos onde a competição ocorre por autoridade institucional ou apelo comercial, o AxoloDAO estabelece um espaço estratégico focado na infraestrutura técnica da confiança.

&emsp; A curva da Verra demonstra uma concentração excessiva de valor em atributos que geram gargalos operacionais, como o alto custo e a dependência extrema de intermediários. Esse modelo é pautado pela validação humana, o que limita severamente a automação e a coordenação em tempo real. Embora possua relevância regulatória, sua incapacidade de oferecer identidade digital individual para os espécimes torna o acompanhamento fragmentado e vulnerável a falhas burocráticas.

&emsp; Já a Provenance apresenta uma estratégia orientada à experiência do usuário e à transparência comercial. Sua curva é estável em atributos de facilidade de uso, mas decai quando o contexto exige rigor científico de longo prazo. A solução atende bem à rastreabilidade de lotes comerciais, porém não entrega a imutabilidade histórica ou a coordenação interinstitucional necessária para a conservação de alta complexidade.

&emsp; O AxoloDAO rompe com essas lógicas ao apresentar uma curva ascendente nos atributos estruturais. O projeto aceita níveis intermediários em facilidade de uso e custos iniciais, características típicas de infraestruturas onchain em estágio de MVP, para maximizar a integridade e a persistência do dado. Esse posicionamento indica que a proposta de valor não é uma melhoria incremental, mas uma redefinição do que é considerado essencial para a ciência ambiental descentralizada.

Os principais diferenciais são:

- **Baixa dependência de intermediários**, obtida por meio de validação baseada em atestações descentralizadas e provas criptográficas, reduzindo custos, gargalos e assimetrias de poder presentes nos modelos tradicionais.
- **Identidade digital onchain individual para espécimes vivos**, permitindo que cada indivíduo possua um histórico persistente de eventos, saúde e linhagem genética, atributo inexistente nas soluções analisadas.
- **Continuidade histórica imutável dos registros**, assegurando a preservação de dados científicos críticos ao longo do tempo, independentemente de mudanças institucionais ou operacionais.
- **Coordenação nativa entre múltiplos atores**, viabilizada por uma infraestrutura digital compartilhada que reduz fragmentação e duplicação de esforços entre instituições.
- **Transparência regulatória contínua e auditável**, substituindo relatórios estáticos por verificação direta e permanente dos registros.

&emsp; Uma estratégia de Oceano Azul exige três características: foco, singularidade e mensagem consistente. O foco do AxoloDAO concentra-se em poucos atributos estruturais: baixa dependência de intermediários, continuidade histórica e imutabilidade, transparência regulatória e identidade digital onchain. Essa escolha reduz dispersão de recursos e constrói vantagens duráveis em áreas críticas. A singularidade é evidente: nenhum concorrente oferece picos equivalentes em identidade digital onchain, continuidade histórica ou autonomia de intermediários. Essa configuração resulta de uma decisão arquitetural clara: fazer da blockchain um componente central, não periférico. A mensagem consistente é simples: "Confiança emerge da infraestrutura técnica, não da intermediação institucional." Essa narrativa justifica toda a curva de valor, por que elevar automação e imutabilidade, por que reduzir intermediários e facilidade de uso.

### <a name="c1.1.3"></a> 1.1.3. Aplicação do Modelo ERRC

&emsp; O modelo ERRC (Eliminar, Reduzir, Elevar e Criar), proposto por Kim e Mauborgne, é aplicado para explicitar as escolhas estratégicas que fundamentam o posicionamento do projeto, evidenciando como a proposta de valor se diferencia das abordagens dominantes a partir dos atributos analisados na Matriz de Avaliação de Valor (Kim; Mauborgne, 2015).

#### Eliminar  

- **Dependência de intermediários para validação científica**: o sistema remove a necessidade de autoridades centrais de confiança, substituindo a validação subjetiva por atestações descentralizadas e provas criptográficas imutáveis.

#### Reduzir  

- **Facilidade de uso**: Reduzir a complexidade das interfaces expostas ao operador humano em favor de protocolos de backend restritivos e validações automáticas, minimizando erro humano na entrada de dados críticos.

- **Custo das transações e operações**: através do uso de Camada 2, reduz-se o custo proibitivo das auditorias humanas e das taxas de rede, mantendo um equilíbrio sustentável para projetos de conservação com recursos limitados.

#### Elevar  

- **Grau de automação dos processos**: a arquitetura é elevada para permitir a integração direta com sensores IoT, reduzindo a falha humana e aumentando a frequência da coleta de dados.

- **Capacidade de coordenação entre múltiplos atores**: o uso de MicroDAOs eleva a governança compartilhada, permitindo que diferentes instituições colaborem sobre uma mesma base de dados sem conflitos de custódia..

- **Continuidade histórica e imutabilidade dos registros**: a preservação do dado é elevada ao status de requisito estrutural, garantindo que o histórico científico sobreviva a mudanças de governos ou crises institucionais.

- **Transparência regulatória e rastreabilidade dos dados**: a transparência deixa de ser baseada em relatórios estáticos e passa a ser uma auditoria pública contínua e verificável por qualquer regulador a qualquer momento.

#### Criar 

- **Identidade digital onchain dos espécimes**: criar identidades digitais únicas e persistentes para indivíduos vivos, permitindo o acúmulo rastreável de eventos biológicos, ambientais e genéticos ao longo de todo o ciclo de vida.

**1.1.3.1 Os Três Níveis de Não-Clientes**

&emsp; A estratégia de Oceano Azul expande-se para além da demanda existente, capturando segmentos que não utilizam soluções similares. Identificam-se três níveis de não-clientes no contexto da conservação científica.

- **Os Quase Convertidos**: São usuários que operam em sistemas tradicionais mas enfrentam falhas críticas de rastreabilidade. Universidades e centros de pesquisa aplicam para fundos científicos sem documentação auditável convincente. O AxoloDAO reduz o atrito ao substituir burocracia por registros onchain verificáveis, eliminando seu ponto de dor principal.

- **Os Refratários:** Rejeitam a categoria ou a consideram irrelevante. Instituições tradicionais associam rastreabilidade a burocratização. Pequenos cativeiros rejeitam soluções digitais por falta de conectividade ou desconfiança. O projeto oferece um argumento inversor: rastreabilidade aumenta autonomia científica local, reduz extrativismo de dados e fortalece soberania tecnológica.

- **Os Inexplorados**: São segmentos potenciais ainda não existentes como mercado definido. Incluem fundos filantrópicos que financiam impacto verificável, programas de educação em biodiversidade usando dados como infraestrutura pedagógica, outras espécies ameaçadas enfrentando problemas idênticos e startups de climatetech replicando o padrão técnico. A escala potencial desses segmentos justifica a estratégia de replicabilidade arquitetural e documentação aberta.

### <a name="c1.1.4"></a> 1.1.4. Novo Posicionamento Estratégico

&emsp; O novo posicionamento estratégico do AxoloDAO é visualizado através de uma curva de valor intencionalmente assimétrica. Essa assimetria reflete a decisão consciente de não competir de forma homogênea nos eixos dominantes do mercado tradicional, como o marketing de consumo ou a validação centralizada.

<div align="center">

<p>Figura 2 - Matriz do oceano azul com novo posicionamento estratégico </p>
<img src="../assets/sprint1/matriz_oa_novo.png" alt="Matriz Oceano Azul novo posicionamento"> 
<p>Fonte - Material produzido pelos autores (2026).</p> 

</div>

&emsp; O gráfico demonstra que o deslocamento da curva para os atributos de identidade digital e imutabilidade não é acidental, mas o resultado direto da aplicação do modelo ERRC. Ao reduzir a importância da intermediação humana e da estética comercial, o projeto libera recursos e foco para garantir que a coordenação científica seja tecnicamente auditável. Esse reposicionamento consolida o AxoloDAO como uma infraestrutura de utilidade pública para a conservação, onde o valor é gerado pela integridade do registro e não pela autoridade de quem o assina.

#### Sequência Estratégica: Utilidade, Preço, Custo, Adoção

&emsp; A estratégia de Oceano Azul é validada por uma sequência de quatro dimensões: utilidade, preço, custo e adoção.

- A **utilidade**: O AxoloDAO reduz assimetrias informacionais e substitui confiança interpessoal por confiança técnica em coordenação científica multiatores. 
  - Pesquisadores acessam dados verificáveis.
  - Cuidadores reduzem inconsistências. 
  - Autoridades fiscalizam em tempo real.

- O **preço** funciona em dois níveis. 
  - Para usuários finais: gratuito, custeado por subsídios. 
  - Para o ecossistema: ROI positivo — cada dólar investido gera USD 1,48 em receita, alinhado com benchmarks filantrópicos.

- O **custo** é otimizado: Camada 2 reduz transações de USD 50–200 para USD 0,10–1,00. Arquitetura híbrida minimiza armazenamento blockchain caro. API preparada reduz custos operacionais ao escalar. Custo médio mensal: USD 252,80, com 83% em aportes in-kind.

- A **adoção** é sustentada por três moats. 
  - Efeito de rede técnico: quanto mais espécimes, mais valioso o histórico. 
  - Aderência regulatória: SEMARNAT como validador. 
  - Interoperabilidade: EAS e ENS reduzem risco de obsolescência.

#### Reconstrução das Fronteiras do Mercado

- **Redefinição Setorial**: Historicamente, rastreabilidade em conservação foi abordada como consultoria ambiental centralizada (Deloitte, ERM, Arcadis). O AxoloDAO move o problema para infraestrutura pública digital aberta, onde custos marginais são próximos a zero e inovação é descentralizada.
- **Expansão de Atores**: O mercado tradicional serve corporações e governos. O AxoloDAO se dirige a universidades públicas, centros de educação, comunidades indígenas, ONGs locais e redes de pesquisadores. Essa expansão redefinirá quem participa da produção de conhecimento confiável.
- **Horizonte Temporal:** Soluções tradicionais operam em ciclos de 3 a 5 anos. O AxoloDAO propõe permanência digital indefinida onchain, transformando auditoria em infraestrutura de memória institucional. Um pesquisador em 2050 consultará dados imutáveis de 2026.
- **Validadores Descentralizados:** O mercado tradicional bifurca produtores (pesquisadores) e validadores (auditores). O AxoloDAO incorpora validadores descentralizados, criando nova governança impossível em modelos centralizados.

### <a name="c1.1.5"></a> 1.1.5. Conclusão Analítica da Estratégia e Análise

&emsp; A análise estratégica desenvolvida a partir da Matriz de Oceano Azul demonstra que o AxoloDAO não se posiciona como uma alternativa incremental às soluções existentes de rastreabilidade ou certificação. O projeto opera a partir de uma redefinição do eixo central de valor no contexto da conservação científica e ambiental, deslocando a produção de confiança da autoridade institucional e da validação retrospectiva para a verificabilidade técnica contínua suportada por infraestrutura blockchain pública.

&emsp; A comparação entre os modelos de referência evidencia que tanto soluções orientadas ao mercado quanto sistemas tradicionais de certificação permanecem ancorados em estruturas de intermediação centralizada, relatórios estáticos e coordenação fragmentada. Esses modelos competem dentro de parâmetros consolidados, característicos de oceanos vermelhos, nos quais a legitimidade depende de processos humanos e burocráticos, vulneráveis à descontinuidade institucional e à assimetria de informação.

&emsp; O AxoloDAO adota uma lógica distinta ao priorizar atributos capazes de sustentar coordenação científica de longo prazo. A aceitação de níveis intermediários em facilidade de uso e custos iniciais não representa uma limitação técnica, mas uma decisão consciente, na qual a complexidade é deslocada das interfaces humanas para protocolos de backend restritivos, validações automáticas e mecanismos de auditoria onchain. Essa abordagem reduz a dependência da habilidade individual do operador e minimiza o impacto de erro humano na integridade dos dados.

&emsp; A identidade digital onchain não é tratada como garantia isolada de verdade, mas como âncora de um histórico verificável, cuja validade decorre da acumulação de evidências, atestações independentes e consistência temporal dos registros.

&emsp; Reconhece-se que a integridade do sistema depende da correta digitalização de eventos físicos, desafio inerente a qualquer infraestrutura que conecte mundo biológico e sistemas digitais. Esse problema é endereçado por meio de evidências multimodais, atestações cruzadas e preparação arquitetural para automação progressiva via sensores IoT, reduzindo a centralidade do operador humano como fonte única de verdade sem eliminá-lo do processo.

&emsp; A aplicação do modelo ERRC explicita que esse reposicionamento resulta de decisões estruturais e não de otimizações pontuais. Ao substituir a autoridade central por registros e atestações onchain, o sistema não elimina responsabilidade, mas a torna rastreável e atribuível a cada ator envolvido. O valor deixa de estar associado à autoridade que certifica e passa a ser gerado pela integridade técnicae pela verificação pública.

&emsp; Nesse sentido, a matriz com novo posicionamento estratégico confirma que o AxoloDAO configura um espaço estratégico distinto, no qual a confiança emerge da infraestrutura e não da intermediação institucional. Essa configuração caracteriza um oceano azul fundamentado em atributos estruturais, no qual a coordenação científica e ambiental se apoia em evidência verificável, continuidade histórica e colaboração interinstitucional auditável em ambiente onchain.

### <a name="c1.2"></a> 1.2 Matriz de risco

&emsp; Esta seção detalha a análise de eventos que podem impactar o desenvolvimento do software descentralizado AmbyData. A metodologia utiliza a Matriz de Probabilidade e Impacto, fundamentada nas diretrizes das Ferramentas da Qualidade, com o objetivo de gerenciar tanto ameaças quanto oportunidades estratégicas para a conservação biológica e a infraestrutura onchain. A análise visa garantir que o sistema melhore a qualidade dos dados científicos e a coordenação entre múltiplos atores, como pesquisadores, cuidadores e autoridades, mitigando falhas de rastreabilidade e potencializando modelos de financiamento sustentável.  

&emsp; Para a quantificação, foram adotadas as escalas de Bianca Minetto Napoleão (2019):

<div align="center">

**Quadro 1 – Probabilidade**

| Probabilidade | Descrição dos critérios de Probabilidade |
|---------------|------------------------------------------|
| 10% | Não é provável que aconteça |
| 30% | Pode ser que ocorra uma vez dentro de um ano |
| 50% | Pode ser que ocorra mais de uma vez dentro de um ano |
| 70% | Pode ser que ocorra mensalmente |
| 90% | Pode ser que ocorra semanalmente |

<sup>Fonte: Bianca Minetto Napoleão (2019).</sup>

</div>

<div align="center">

**Quadro 2 – Impacto (Ameaças e Oportunidades)**

| Impacto | Descrição dos critérios de Impacto |
|----------|-------------------------------------|
| Muito baixo | Consequências ou ganhos pouco significativos |
| Baixo | Consequências reversíveis ou ganhos incrementais com baixo custo |
| Moderado | Consequências reversíveis ou ganhos médios com custos baixos |
| Alto | Consequências reversíveis ou ganhos elevados com custos altos |
| Muito Alto | Consequências irreversíveis ou ganhos transformadores (oportunidades) |

<sup>Fonte: Bianca Minetto Napoleão (2019).</sup>

</div>

#### **Riscos**

<div align="center">

  <p>Figura 3 - Matriz de Risco </p>
  <img src="../assets/sprint1/Riscos.png" alt="Matriz de Risco">
  <p>Fonte: Material produzido pelos autores (2026).</p>

</div>


#### R1 – Inconsistência entre modelo relacional do backend e estrutura dos smart contracts

- **Ameaça:** divergência entre dados armazenados offchain e registros ancorados onchain, comprometendo a rastreabilidade auditável.
- **Probabilidade:** 50%  
- **Impacto:** alto  
- **Resposta:** mitigar
- **Ação:** modelar o banco a partir da estrutura do contrato; definir o smart contract como camada de ancoragem; implementar testes automáticos de consistência entre hash onchain e dados offchain.

#### R2 – Vulnerabilidade lógica em smart contracts

- **Ameaça:** falhas críticas no contrato que permitam registros inválidos, alteração indevida ou exploração de funções.
- **Probabilidade:** 30%  
- **Impacto:** muito alto  
- **Resposta:** mitigar
- **Ação:** aplicar padrões auditados; cobertura mínima de testes nas funções críticas; revisão por pares; validação completa em testnet antes do deploy definitivo.

#### R3 – Implementação incorreta de controle de permissões

- **Ameaça:** usuários não autorizados registrarem ou validarem dados científicos.
- **Probabilidade:** 50%  
- **Impacto:** alto  
- **Resposta:** mitigar
- **Ação:** definir papéis claros; implementar controle granular; realizar testes negativos de autorização; revisar fluxos de privilégio administrativo.

#### R4 – Perda ou vazamento de chaves administrativas e segredos de infraestrutura

- **Ameaça:** comprometimento de wallets administrativas, API keys ou variáveis sensíveis.
- **Probabilidade:** 30%  
- **Impacto:** muito alto  
- **Resposta:** mitigar
- **Ação:** uso de multisig; armazenamento seguro de chaves; exclusão de arquivos sensíveis do repositório; política de rotação periódica de credenciais.

#### R5 – Estouro de orçamento de gas nas operações onchain

- **Ameaça:** custos excessivos por registro, inviabilizando uso frequente do sistema.
- **Probabilidade:** 50%  
- **Impacto:** moderado  
- **Resposta:** aceitar parcialmente  
- **Ação:** registrar apenas hashes e eventos críticos onchain; manter dados volumosos offchain; monitorar consumo de gas e definir orçamento máximo aceitável por operação.


#### R6 – Falha na integração entre Frontend, Smart Contracts e EAS

- **Ameaça:** DApp incapaz de emitir ou ler corretamente atestações, comprometendo a verificabilidade.
- **Probabilidade:** 50%  
- **Impacto:** alto  
- **Resposta:** mitigar
- **Ação:** realizar testes de integração ponta a ponta; validar transações em block explorer; implementar logs estruturados para rastreamento de falhas.

#### R7 – Falha na rastreabilidade longitudinal dos exemplares

- **Ameaça:** perda de vínculo entre exemplar, medições, eventos e histórico temporal.
- **Probabilidade:** 30%  
- **Impacto:** muito alto  
- **Resposta:** mitigar
- **Ação:** implementar chave imutável por exemplar; versionamento de registros; impedir sobrescrita; auditoria periódica de integridade histórica.

#### R8 – Modelagem inadequada do schema de atestações (EAS)

- **Ameaça:** definição incorreta ou incompleta dos schemas de atestação, impedindo validação consistente dos dados científicos e dificultando auditoria.  
- **Probabilidade:** 50%  
- **Impacto:** alto  
- **Resposta:** mitigar  
- **Ação:** definir schemas com base nos tipos de dados do MVP; validar estrutura antes da implementação; testar emissão e leitura de atestações; revisar compatibilidade com frontend.

#### R9 – Falhas na persistência e versionamento de dados no backend

- **Ameaça:** perda de histórico ou sobrescrita de dados devido à implementação inadequada do versionamento, comprometendo a rastreabilidade.  
- **Probabilidade:** 50%  
- **Impacto:** alto  
- **Resposta:** mitigar  
- **Ação:** implementar versionamento explícito; evitar atualizações destrutivas; garantir registros imutáveis; testar recuperação de histórico completo por exemplar.

#### R10 – Inconsistência entre frontend e regras de validação de dados

- **Ameaça:** frontend permitir entrada de dados inválidos ou inconsistentes com as regras definidas no backend, gerando registros incorretos.  
- **Probabilidade:** 70%  
- **Impacto:** moderado  
- **Resposta:** mitigar  
- **Ação:** duplicar validações críticas no backend; implementar validação de intervalos; realizar testes de formulário; garantir feedback claro ao usuário.

| Risco | Classificação | Justificativa da Classificação | Resposta | Responsável | Prazo | Ação de Mitigação |
|---|---|---|---|---|---|---|
| **R1 – Inconsistência entre modelo relacional do backend e estrutura dos smart contracts** | Prob: 50% Impacto: Alto | Complexidade moderada de integração blockchain-offchain. Impacto Alto pois compromete a rastreabilidade auditável. | Mitigar | Equipe de backend e blockchain | Abril–Junho 2026 | Modelar banco a partir do contrato; definir contrato como fonte de verdade; implementar testes de consistência; reconciliação periódica. |
| **R2 – Vulnerabilidade lógica em smart contracts** | Prob: 30% Impacto: Muito Alto | Contratos novos frequentemente apresentam falhas críticas. Impacto Muito Alto devido ao risco de manipulação ou registros inválidos. | Mitigar | Equipe de blockchain | Maio–Junho 2026 | Aplicar padrões auditados; cobertura de testes; revisão por pares; validação em testnet. |
| **R3 – Implementação incorreta de controle de permissões** | Prob: 50% Impacto: Alto | Controle de acesso é fonte recorrente de falhas. Impacto Alto pois permite ações não autorizadas. | Mitigar | Equipe de backend | Abril–Maio 2026 | Definir papéis claros; implementar controle de acesso; testes de autorização; revisão de privilégios. |
| **R4 – Perda ou vazamento de chaves administrativas e segredos** | Prob: 30% Impacto: Muito Alto | Vazamento compromete controle total do sistema. Impacto Muito Alto pela possibilidade de acesso indevido. | Mitigar | Equipe de blockchain e backend | Abril–Maio 2026 | Uso de multisig; armazenamento seguro; remoção de secrets do repositório; rotação de credenciais. |
| **R5 – Modelagem ineficiente de armazenamento onchain (gas)** | Prob: 50% Impacto: Moderado | Decisões ruins de modelagem aumentam custo de gas, mas não impedem funcionamento no MVP. | Aceitar Parcialmente | Equipe de blockchain | Abril 2026 | Registrar apenas hashes onchain; manter dados offchain; monitorar consumo; definir limite de custo por operação. |
| **R6 – Erros na implementação da integração com EAS** | Prob: 50% Impacto: Alto | Integração com EAS envolve schemas e validação. Erros comprometem verificabilidade. | Mitigar | Equipe de frontend e blockchain | Maio–Junho 2026 | Testes end-to-end; validação em block explorer; revisão de schemas; logs para depuração. |
| **R7 – Falha na rastreabilidade longitudinal dos exemplares** | Prob: 30% Impacto: Muito Alto | Perda de histórico compromete o objetivo central do sistema. Impacto Muito Alto para validade científica. | Mitigar | Equipe de backend | Abril–Maio 2026 | Chave imutável por exemplar; versionamento append-only; impedir sobrescrita; auditoria de integridade. |
| **R8 – Modelagem inadequada do schema de atestações (EAS)** | Prob: 50% Impacto: Alto | Schema mal definido inviabiliza validação e auditoria dos dados. Impacto Alto na verificabilidade. | Mitigar | Equipe de blockchain | Maio–Junho 2026 | Definir schemas alinhados ao MVP; validar estrutura; testar emissão e leitura; revisar compatibilidade. |
| **R9 – Falhas na persistência e versionamento de dados no backend** | Prob: 50% Impacto: Alto | Implementação inadequada pode causar perda de histórico. Impacto Alto na rastreabilidade. | Mitigar | Equipe de backend | Abril–Maio 2026 | Versionamento explícito; evitar sobrescrita; garantir imutabilidade; testar recuperação de histórico. |
| **R10 – Inconsistência entre frontend e regras de validação de dados** | Prob: 70% Impacto: Moderado | Falhas de validação são comuns em MVPs. Impacto Moderado pois afeta qualidade dos dados. | Mitigar | Equipe de frontend | Maio 2026 | Validar dados no backend; implementar validação de intervalos; testes de formulário; feedback claro ao usuário. |

#### **Oportunidades**

<div align="center">

  <p>Figura 4 - Matriz de Oportunidade </p>
  <img src="../assets/sprint1/Oportunidades.png" alt="Matriz de Oportunidade">
  <p>Fonte: Material produzido pelos autores (2026).</p>

</div>

#### O1 – Democratização do acesso à infraestrutura científica via software open source

- **Oportunidade:** disponibilização de infraestrutura pública digital que permita a instituições locais mexicanas acessar tecnologia de rastreabilidade avançada.
- **Probabilidade:** 70%  
- **Impacto:** Muito alto  
- **Resposta:** Explorar  
- **Ação:** documentação clara; repositório público estruturado; padronização do modelo para fácil adoção.

#### O2 – Aumento da confiabilidade científica por meio de rastreabilidade onchain

- **Oportunidade:** certificação verificável de dados ambientais e biológicos, elevando credibilidade institucional.
- **Probabilidade:** 50%  
- **Impacto:** Muito alto  
- **Resposta:** Explorar  
- **Ação:** integração robusta com EAS; validação pública; geração de relatórios auditáveis.

#### O3 – Captação de financiamento baseado em impacto verificável

- **Oportunidade:** possibilidade de atrair fundos filantrópicos e parceiros através de métricas onchain auditáveis.
- **Probabilidade:** 50%  
- **Impacto:** Muito alto  
- **Resposta:** Explorar  
- **Ação:** definir métricas claras de impacto no MVP; estruturar dashboards verificáveis para apresentação a financiadores.

#### O4 – Replicabilidade do modelo para outras espécies ameaçadas

- **Oportunidade:** escalabilidade do sistema para outros contextos de conservação biológica.
- **Probabilidade:** 50%  
- **Impacto:** alto  
- **Resposta:** Explorar  
- **Ação:** arquitetura modular; modelo de dados genérico; documentação replicável.

#### O5 – Fortalecimento da coordenação entre pesquisadores e cuidadores

- **Oportunidade:** melhoria na comunicação e padronização de registros entre múltiplos atores.
- **Probabilidade:** 70%  
- **Impacto:** alto  
- **Resposta:** Explorar  
- **Ação:** dashboards compartilhados; relatórios acessíveis; protocolos digitais padronizados.

#### O6 – Integração futura com sensores e IoT para monitoramento automatizado

- **Oportunidade:** automatização de medições ambientais, reduzindo intervenção manual e aumentando frequência de dados.
- **Probabilidade:** 50%  
- **Impacto:** alto  
- **Resposta:** Explorar  
- **Ação:** definir API padronizada; preparar arquitetura para ingestão escalável; buscar parcerias com fornecedores de hardware.


&emsp; A análise realizada demonstra que os principais riscos do AxoloDAO concentram-se na integridade da arquitetura onchain, na consistência entre camadas do sistema e na qualidade dos dados científicos registrados. Tais riscos são majoritariamente tratados por meio de estratégias de mitigação técnica, especialmente no que se refere à segurança de smart contracts, controle de permissões e rastreabilidade longitudinal.

&emsp; Os riscos classificados como “aceitar parcialmente” refletem fatores estruturais inerentes ao contexto tecnológico e operacional, como variações no custo de gas e curva de adaptação dos usuários, os quais não podem ser totalmente eliminados, mas podem ser gerenciados de forma controlada.

&emsp; Em paralelo, a matriz evidencia oportunidades estratégicas relevantes, especialmente relacionadas à democratização tecnológica, financiamento baseado em impacto verificável e replicabilidade do modelo para outras espécies ameaçadas. A gestão ativa dessas oportunidades potencializa o valor científico, institucional e social do projeto. Dessa forma, a aplicação da Matriz de Risco contribui para uma tomada de decisão estruturada, reforçando a robustez técnica do sistema e sua sustentabilidade no longo prazo.

&emsp; O detalhamento completo da Matriz de Riscos e Oportunidades está disponível na planilha oficial do projeto:

[Planilha detalhada – Matriz de Riscos e Oportunidades (AxoloDAO)](https://docs.google.com/spreadsheets/d/172tu-xAv5-GAq5Mmi2w9F3LU0e0QK8sILwpXoqcXFK0/edit?usp=sharing)

### <a name="c1.3"></a> 1.3 Canvas Proposta de Valor  

&emsp; O Canvas de Proposta de Valor, conforme formulado por Osterwalder e Pigneur, é utilizado para alinhar os problemas do cliente com a solução proposta. Este canvas estrutura a análise em dois lados: o Perfil do Cliente (tarefas, dores e ganhos) e o Mapa de Valor (produtos/serviços, aliviadores de dor e criadores de ganho). Imagem do Canvas de Proposta de Valor feito pelo grupo ao longo da primeira sprint do projeto:


<div align="center">

<p>Figura 5: Canvas de Proposta de Valor.</p>
<img width=100% height=100% alt="Canvas de Proposta de Valor" src="../assets/sprint1/canvas_proposta_valor.jpeg"/>
<p>Fonte: Material produzido pelos autores (2026).</p>

</div>


#### <a name="c1.3.1"></a> 1.3.1 Introdução conceitual

&emsp; O Canvas de Proposta de Valor (Value Proposition Canvas), conforme formulado por Osterwalder e Pigneur, é adotado nesta seção como instrumento analítico para demonstrar, de forma lógica e causal, o alinhamento entre os problemas reais enfrentados pelos stakeholders do projeto AxoloDAO e a solução de software descentralizado baseada em blockchain desenvolvida em parceria com a Zenbit. Parte-se do entendimento, amplamente sustentado pela literatura em economia da informação, governança digital e ciência de dados, de que o valor não é inerente à tecnologia em si, mas emerge da sua capacidade de reduzir assimetrias informacionais, custos de coordenação e riscos de oportunismo em ambientes complexos e multiatores.

&emsp;No contexto da conservação da biodiversidade endêmica do gênero Ambystoma, esses desafios são particularmente acentuados. Trata-se de um domínio caracterizado por dados sensíveis oriundos do mundo físico, alta fragmentação institucional, limitações de infraestrutura tecnológica, exigências crescentes de transparência por parte de financiadores e autoridades, e forte dependência de confiança entre atores que nem sempre compartilham sistemas, padrões ou incentivos comuns. A proposta de valor do AxoloDAO é, portanto, analisada como uma infraestrutura pública digital de coordenação, rastreabilidade e confiança distribuída, viabilizada por mecanismos onchain de identidade, registro imutável e certificação verificável.

&emsp;A estrutura do Canvas encontra-se organizada em duas partes complementares. Inicialmente, é desenvolvido o Perfil do Cliente (Customer Profile), no qual são explicitados os segmentos de clientes, suas tarefas, dores e ganhos no contexto específico do projeto. Em seguida, apresenta-se o Mapa de Valor (Value Map), demonstrando como os produtos, serviços e mecanismos técnicos da solução (criadores de ganhos e analgésicos) AxoloDAO respondem de maneira direta e consistente aos elementos identificados.

A tabela abaixo estabelece a correspondência explícita entre cada dor identificada no Perfil do Cliente e o respectivo aliviador técnico previsto no MVP:

| Dor do Cliente | Aliviador no MVP | Mecanismo de Solução |
|---|---|---|
| Fragmentação de dados em planilhas isoladas | Interface centralizada (web + banco de dados) | Uma plataforma única consolida dados de múltiplas fontes |
| Erros em registros manuais | Validação automática de intervalos e campos obrigatórios | Backend rejeita dados fora de especificação antes de armazenar |
| Falta de rastreabilidade auditável | Smart contracts onchain + EAS | Cada registro tem hash imutável e certificação por terceiros |
| Baixa confiança institucional | Atestações verificáveis por especialistas certificados | Auditoria independente possível a qualquer momento sem intermediário |
| Risco de perda de histórico | Versionamento append-only no backend | Dados nunca são sobrescritos, apenas novos registros são adicionados |

**Delimitação de problemas**

| Elemento | Status | Justificativa |
|---|---|---|
| **Consolidar dados fragmentados** | Dentro do escopo | Requisito central do MVP |
| **Validação automática de entrada** | Dentro do escopo | Reduz erros humanos imediatamente |
| **Rastreabilidade auditável via blockchain** | Dentro do escopo | Pilar técnico do projeto |
| **Histórico imutável por exemplar** | Dentro do escopo | Preserva integridade científica |
| **Resolver o problema do oráculo** | Fora do escopo (contexto) | O MVP mitiga via validações cruzadas, mas não elimina. Requer evidências multimodais do mundo físico |
| **Eliminar extrativismo científico** | Fora do escopo (contexto) | O MVP oferece ferramentas (soberania onchain), mas proteção depende de decisões institucionais e políticas |

**Priorização dos problemas**

| Prioridade | Dor | Impacto | Viabilidade | Status |
|---|---|---|---|---|
| **P1** | Fragmentação + falta de rastreabilidade | Crítico (inviabiliza o MVP sem resolver) | Alta | Resolvido |
| **P2** | Erros em registros manuais | Alto (afeta qualidade dos dados) | Alta | Resolvido |
| **P3** | Baixa confiança institucional | Alto (essencial para adoção) | Alta | Resolvido |
| **P4** | Risco de perda de histórico | Médio (crítico mas mitigável com versionamento) | Alta | Resolvido |
| **P5** | Problema do oráculo | Contexto (estrutural, não eliminável) | Baixa | Documentado, não eliminado |


#### <a name="c1.3.2"></a> 1.3.2 Perfil do Cliente (Customer Profile)

&emsp;O Perfil do Cliente contempla os diferentes grupos que interagem direta ou indiretamente com o sistema AxoloDAO, bem como as necessidades funcionais, científicas, institucionais e estratégicas associadas a esses atores. Considera-se, nesta análise, que o valor gerado pelo projeto emerge da capacidade de atender simultaneamente usuários operacionais, pesquisadores, instituições e agentes financiadores, preservando coerência técnica, científica e regulatória.

##### 1.3.2.1 Segmentos de Clientes (Customer Segments)

&emsp;Os segmentos de clientes do projeto AxoloDAO são classificados em usuários primários e usuários secundários, de acordo com o grau de interação direta com o sistema e com o papel desempenhado no ecossistema de conservação.

&emsp;Os usuários primários são constituídos por cuidadores de axolotes em ambientes ex situ, como biomuseus e centros de conservação, bem como por biólogos e pesquisadores envolvidos diretamente em atividades de monitoramento, manejo, pesquisa científica e análise de dados. Esses atores são responsáveis pela captura, validação inicial e uso contínuo das informações produzidas pelo sistema.

&emsp;Os usuários secundários incluem instituições de conservação ambiental, universidades e centros de pesquisa, doadores e financiadores filantrópicos, fundos de impacto e autoridades regulatórias ambientais, como a SEMARNAT (Secretaria do Meio Ambiente e Recursos Naturais do México).

&emsp;Adicionalmente, incluem-se comunidades locais e aliados institucionais que participam da operação, validação social e difusão do projeto. Embora esses atores nem sempre realizem a captura direta de dados, dependem criticamente da qualidade, integridade e rastreabilidade das informações para tomada de decisão, financiamento, formulação de políticas e avaliação de impacto.

##### 1.3.2.2 Tarefas do Cliente (Customer Jobs)

&emsp;As tarefas dos clientes do AxoloDAO podem ser organizadas em três dimensões complementares: funcional, social/institucional e emocional.

&emsp;Na dimensão funcional interna, destaca-se a necessidade de registrar dados ambientais críticos — como temperatura da água, pH, oxigênio dissolvido, condutividade, turbidez, nitratos, fosfatos e amoníaco — de forma contínua, estruturada e associada a cada exemplar, tanque e local, viabilizando a operação cotidiana, o manejo adequado e a tomada de decisão imediata pelos usuários diretamente envolvidos na execução das atividades. Soma-se a isso o monitoramento do estado de saúde e bem-estar dos exemplares, o registro de eventos operacionais relevantes (alimentação, limpeza, tratamentos médicos, reprodução), a manutenção de um histórico completo desde o nascimento até a fase adulta, a análise de séries temporais e correlações multivariáveis, bem como a produção de relatórios técnicos e científicos confiáveis.

&emsp;Na dimensão social e institucional externa, as tarefas envolvem assegurar a credibilidade científica dos dados produzidos, fortalecer a cooperação interinstitucional, atender exigências regulatórias e protocolos ambientais, compartilhar informações de forma segura e auditável entre múltiplos atores externos ao núcleo operacional e demonstrar impacto verificável para financiadores, autoridades regulatórias e parceiros estratégicos. Inclui-se, ainda, a proteção da soberania dos dados biológicos nacionais, reduzindo riscos de apropriação externa de valor científico.

&emsp;Na dimensão emocional, transversal às esferas interna e externa, observa-se a necessidade de reduzir a incerteza associada à qualidade e confiabilidade dos dados, aumentar a confiança na tomada de decisão científica e operacional, diminuir o estresse decorrente de falhas de registro ou perda de informação e garantir segurança quanto à integridade e à rastreabilidade dos dados ao longo do tempo.

##### 1.3.2.3 Dores (Pains)

&emsp;As dores enfrentadas pelos clientes do AxoloDAO manifestam-se tanto internamente, no nível operacional e científico, quanto externamente, no nível institucional e estratégico, decorrendo majoritariamente das limitações estruturais dos modelos tradicionais de gestão de dados científicos e ambientais. A fragmentação extrema da informação, por exemplo, dispersa em planilhas, documentos isolados e registros não interoperáveis, compromete a continuidade histórica, dificulta análises longitudinais e eleva o risco de inconsistências e perdas irreversíveis de dados.

&emsp;A dependência de registros manuais, esporádicos e suscetíveis a erro humano representa outra dor significativa. Além de limitar a frequência e a qualidade das medições, esse modelo aumenta os custos operacionais e pode elevar o estresse dos exemplares, uma vez que a coleta de dados exige manipulação direta de espécies sensíveis e em risco crítico de extinção.

&emsp;Em nível institucional, a ausência de rastreabilidade auditável e de mecanismos de verificação independente gera assimetrias de informação entre cuidadores, pesquisadores, financiadores e autoridades regulatórias. Tal cenário reduz a confiança externa nos dados apresentados, dificulta o acesso a financiamento baseado em evidências e limita a capacidade de prestação de contas transparente. Essa problemática é agravada pelo chamado problema do oráculo, amplamente discutido na literatura de blockchain, que descreve a dificuldade de garantir a veracidade e a proveniência de dados do mundo físico em sistemas digitais.

&emsp;Por fim, identifica-se uma dor estratégica associada ao risco de extrativismo científico e à perda de soberania de dados. Na ausência de mecanismos muito bem estruturados de autoria, proveniência e certificação, dados biológicos gerados em contextos megadiversos tendem a gerar benefícios científicos e econômicos concentrados em instituições externas, perpetuando desigualdades estruturais na produção de conhecimento.

##### 1.3.2.4 Ganhos (Gains)

&emsp;Os ganhos esperados com a adoção da solução AxoloDAO abrangem dimensões internas que são científicas e operacionais, e dimensões externas que são institucionais, regulatórias e estratégicas, assim, refletindo o caráter sistêmico da proposta de valor. O ganho central reside na obtenção de dados contínuos, estruturados e historicamente preservados, associados a cada exemplar, com rastreabilidade completa e auditável. Essa característica eleva substancialmente o valor científico dos registros, viabilizando análises longitudinais, ciência reprodutível e detecção precoce de anomalias ambientais e fisiológicas.

&emsp;Outro ganho relevante refere-se à redução das assimetrias informacionais e ao fortalecimento da confiança entre os stakeholders. A transparência e a possibilidade de auditoria independente ampliam a credibilidade do projeto perante financiadores, autoridades e parceiros institucionais, criando condições para a adoção de modelos de financiamento baseados em impacto verificável.

&emsp;Adicionalmente, são esperados ganhos relacionados à coordenação eficiente entre múltiplos atores, à democratização do acesso à infraestrutura científica, à replicabilidade do modelo para outras espécies e contextos de conservação e ao fortalecimento da soberania científica e tecnológica local. Para a Zenbit, esses ganhos se traduzem no fortalecimento de seu posicionamento como provedora de infraestrutura pública digital aplicada a problemas reais de alto impacto socioambiental.

##### 1.3.2.5 Conclusão Perfil do Cliente

&emsp;Em síntese, o Perfil do Cliente do AxoloDAO demonstra que os principais desafios enfrentados pelos stakeholders decorrem de problemas estruturais de gestão, rastreabilidade e credibilidade dos dados científicos, manifestando-se tanto no nível operacional quanto no institucional. As tarefas, dores e ganhos identificados evidenciam que a criação de valor depende da redução de assimetrias informacionais, do fortalecimento da confiança entre atores e da garantia de integridade e auditabilidade dos registros. Nesse contexto, consolida-se a necessidade de uma infraestrutura descentralizada capaz de sustentar a coordenação, a transparência e a sustentabilidade de longo prazo das iniciativas de conservação, fundamento diretamente endereçado pela proposta de valor do AxoloDAO.

#### <a name="c1.3.3"></a> 1.3.3 Mapa de Valor (Value Map)

&emsp;O Mapa de Valor explicita de forma rigorosa como os produtos, serviços e mecanismos técnicos da solução AxoloDAO respondem, de maneira direta, verificável e causal, às tarefas, dores e ganhos previamente identificados no Perfil do Cliente. Para fins de clareza conceitual e aderência aos critérios avaliativos do projeto, distingue-se explicitamente aquilo que compõe o escopo garantido do MVP daquilo que representa entregáveis adicionais condicionados à capacidade de execução ampliada do time, sem comprometer a consistência da proposta de valor.

##### 1.3.2.1 Produtos e Serviços (Products and Services)

&emsp;No escopo obrigatório e assegurado do MVP, a proposta de valor materializa-se por meio de um sistema descentralizado de monitoramento e rastreabilidade de dados do axolote e de seu ambiente, implementado como uma aplicação web3 integrada a uma base de dados relacional estruturada e interoperável, combinada a uma camada onchain baseada em Ethereum. O produto contempla, de forma inequívoca, um modelo de dados que vincula exemplar, tanque ou local, data e hora, variáveis ambientais, dados de saúde e comportamento e contexto espacial, preservando versionamento e histórico completo das informações.

&emsp;O MVP inclui o registro onchain de exemplares, com a criação de identificadores únicos associados a metadados essenciais, bem como a captura manual de dados ambientais críticos por meio de formulários web estruturados, preparados para futura integração com sensores automatizados via APIs. Os dados são armazenados com carimbo temporal, vinculados ao respectivo exemplar e passíveis de verificação onchain.

&emsp;Adicionalmente, o produto incorpora um sistema de atestações verificáveis por meio do Ethereum Attestation Service (EAS), permitindo que atores certificados validem medições ambientais e eventos de saúde ou diagnóstico, com visualização clara de autoria, momento da validação e hash onchain correspondente. A infraestrutura onchain básica inclui smart contracts para registro de exemplares e eventos críticos, deploy em testnet e integração com o Ethereum Name Service (ENS) para organização semântica de exemplares e tanques.

&emsp;A interface web funcional do MVP contempla dashboards de monitoramento, fichas detalhadas por exemplar, formulários de captura rápida, sistema de alertas precoces baseado em intervalos esperados e funcionalidades de exportação de dados em formatos interoperáveis, garantindo que a informação seja consultável, auditável e reutilizável.

&emsp;Caso o time consiga entregar além do escopo mínimo do MVP, passam a integrar o conjunto de produtos e serviços funcionalidades adicionais, como documentação completa de requisitos e arquitetura, design UX/UI estruturado, catálogos avançados de schemas de atestação, contratos inteligentes adicionais com testes robustos, módulos de importação de dados históricos, dashboards analíticos avançados, relatórios técnicos automatizados e documentação técnica e operacional aprofundada. Tais elementos são concebidos como extensões naturais do MVP, sem alterar sua proposta de valor central.

##### 1.3.2.2 Aliviadores de Dor (Pain Relievers)

&emsp;As dores identificadas no Perfil do Cliente são mitigadas, no escopo do MVP, por meio da padronização estrutural dos dados, da persistência histórica garantida pelo versionamento e da imutabilidade proporcionada pelos registros onchain. A substituição de registros fragmentados e manuais por um sistema integrado reduz erros humanos, perdas de informação e inconsistências, ao mesmo tempo em que diminui a carga operacional associada à gestão dos dados.

&emsp;O uso de atestações verificáveis por especialistas certificados atua diretamente sobre a assimetria informacional e o déficit de confiança institucional, permitindo auditoria independente e reduzindo a necessidade de confiança pessoal ou centralizada. A preparação explícita do sistema para integração futura com sensores automatizados contribui para minimizar intervenções invasivas nos exemplares, reduzindo estresse biológico e riscos associados à coleta manual recorrente.

&emsp;Em um cenário de entregas ampliadas, módulos avançados de importação de dados históricos, dashboards analíticos e sistemas de alertas configuráveis aprofundam o alívio das dores relacionadas à coordenação interinstitucional, à tomada de decisão tardia e à dificuldade de prestação de contas baseada em evidências.

##### 1.3.2.3 Criadores de Ganho (Gain Creators)

&emsp;Os criadores de ganho do AxoloDAO operam pela transformação de dados ambientais e biológicos em registros digitais verificáveis, auditáveis e dotados de legitimidade científica. A rastreabilidade completa dos exemplares, associada à certificação onchain de medições e eventos críticos, eleva substancialmente o valor científico e institucional dos dados produzidos, viabilizando ciência reprodutível, análises longitudinais robustas e indicadores confiáveis de impacto.

&emsp;A transparência e a auditabilidade inerentes à arquitetura descentralizada ampliam a confiança de financiadores, reguladores e parceiros estratégicos, criando condições para modelos de financiamento baseados em impacto verificável e para a expansão do ecossistema de conservação. A replicabilidade do modelo e sua compatibilidade com futuras camadas de automação e inteligência operacional reforçam o ganho estratégico de longo prazo, posicionando o AxoloDAO como infraestrutura pública digital para governança de dados socioambientais.

&emsp;Quando considerados os entregáveis adicionais, os ganhos são potencializados pela consolidação de uma base tecnológica aberta, documentada e extensível, capaz de sustentar evolução contínua, integração com sensores IoT, analítica avançada, novos modelos onchain e expansão para outras espécies e territórios, sem comprometer a coerência da proposta de valor originalmente estabelecida.

##### 1.3.2.4 Conclusão Mapa de Valor

&emsp;Conclui-se que o Mapa de Valor do AxoloDAO demonstra uma correspondência direta, verificável e causal entre os elementos técnicos do MVP e as tarefas, dores e ganhos do Perfil do Cliente, assegurando aderência total aos critérios do projeto. O escopo garantido do MVP entrega uma infraestrutura funcional de rastreabilidade, monitoramento e validação de dados socioambientais, enquanto as extensões propostas permanecem claramente condicionadas e não comprometem a proposta central. Dessa forma, a solução apresenta consistência conceitual, viabilidade técnica e potencial de escala, posicionando o AxoloDAO como uma base muito bem estruturada para governança descentralizada de dados científicos e ambientais.

#### 1.3.2.5 Conclusão da seção

&emsp;Conclui-se que o Value Proposition Canvas do AxoloDAO demonstra alinhamento direto entre os problemas estruturais enfrentados pelos stakeholders e a solução de software descentralizado proposta. As tarefas, dores e ganhos identificados evidenciam a necessidade de uma infraestrutura capaz de garantir rastreabilidade, confiabilidade e governança dos dados científicos em ambientes complexos e multiatores. Nesse contexto, o MVP do AxoloDAO responde de forma causal e verificável a essas demandas por meio de mecanismos de registro imutável, certificação de dados e transparência operacional. Assim, a proposta de valor apresenta consistência conceitual, viabilidade técnica e potencial de escala, consolidando a solução como uma base adequada para a governança descentralizada de dados socioambientais.

## <a name="c1.4"></a> 1.4. Análise Financeira

---

> **Estrutura desta seção:**
> 1.4.1 Introdução geral
> 1.4.2 Link da planilha
> 1.4.3 Sumário executivo
> 1.4.4 Suposições
> 1.4.5 P&L BioMuseo
> 1.4.6 AxoloDAO MVP
> 1.4.7 Investimento
> 1.4.8 ROI e métricas
> 1.4.9 Conclusão geral

---

## 1.4.1 Introdução geral

A seção de Análise Financeira documenta a viabilidade econômica do projeto AxoloDAO e do ecossistema de conservação que ele instrumentaliza: o BioMuseo Xolotcalli, museu dedicado à preservação do *Ambystoma mexicanum* (axolote), espécie criticamente ameaçada de extinção endêmica do México. O projeto combina infraestrutura blockchain, com contratos inteligentes na rede Ethereum, Ethereum Attestation Service (EAS) e Ethereum Name Service (ENS),com dados científicos reais de monitoramento biológico, produzindo registros verificáveis e imutáveis de conservação de biodiversidade.

A análise abrange um período de **15 meses consecutivos: outubro de 2025 a dezembro de 2026**. Os dados de outubro de 2025 a janeiro de 2026 são valores reais reportados pelo parceiro Zenbit. Os meses de fevereiro e março de 2026 correspondem à projeção direta do parceiro. Para o período de abril a dezembro de 2026, a equipe discente elaborou projeções próprias fundamentadas em benchmarks de mercado verificáveis e em um framework de oito fases operacionais do projeto.

O objetivo central desta seção é demonstrar a sustentabilidade financeira do projeto e calcular o seu **Retorno sobre o Investimento (ROI)** de forma metodologicamente embasada, respondendo à pergunta central de qualquer avaliação de viabilidade: dado o conjunto de recursos investidos, quanto de valor o projeto gera em retorno?

Para isso, a análise está estruturada em dois blocos principais. O primeiro trata do **P&L do BioMuseo Xolotcalli**, apresentando a Demonstração de Resultados do museu e contextualizando sua operação como infraestrutura física indispensável do ecossistema AxoloDAO. O segundo bloco cobre o **AxoloDAO MVP** em três dimensões: a receita direta gerada pela plataforma (bolsas, doações, patrocínios e licenciamento), os custos diretos em dinheiro (oito linhas de OPEX) e os aportes in-kind (contribuições valorizadas da UAQ e do BioMuseo que não transitam pelo caixa). A síntese dessas três dimensões produz as métricas de resultado e o cálculo do ROI que encerram a seção.

Toda a análise é expressa em dólares americanos (USD), com conversões para pesos mexicanos (MXN) quando relevante, à taxa de câmbio de **MXN 17,50 por USD** (Banxico, média do quarto trimestre de 2025). A planilha de suporte está disponível no link da Seção 1.4.2 e consolida todos os cálculos aqui documentados.

---

## 1.4.2 Link da planilha

A planilha a seguir consolida toda a análise financeira do projeto para o período de 15 meses (outubro de 2025 a dezembro de 2026), incluindo dados reais, referências do parceiro Zenbit e as projeções por fases estratégicas elaboradas pela equipe. Nela estão organizadas as abas de Sumário Executivo, Suposições, P&L BioMuseo, Receita AxoloDAO, Custos em Dinheiro, Aportes In-Kind, Resultados Consolidados e Análise de ROI.

**Acesse a planilha aqui:** https://docs.google.com/spreadsheets/d/1CgR_YGfIJ_bWsDK7EXGyUl1T2J6IKIdt1R5gx7FhjbA/edit?gid=807980828#gid=807980828 

---

## 1.4.3 Sumário executivo

O projeto AxoloDAO, em conjunto com o BioMuseo Xolotcalli, apresenta um modelo financeiro estruturalmente eficiente e com retorno positivo sobre o investimento ao longo dos 15 meses analisados (outubro de 2025 a dezembro de 2026). Os números consolidados revelam um projeto que combina baixo desembolso em caixa, parcerias institucionais e crescimento consistente de receita.

**Receitas:** A receita total do ecossistema, que é composta por 90% da receita do BioMuseo (subsídio AxoloDAO, visitação e vendas) somada à receita direta da plataforma AxoloDAO (bolsas, doações, patrocínios corporativos e licenciamento), atingiu **USD 37.593,80** ao longo dos 15 meses. A receita direta do BioMuseo totalizou USD 32.169,99 no período, enquanto as receitas diretas da AxoloDAO somaram USD 8.640,81, crescendo de USD 325,00/mês em outubro de 2025 para USD 812,39/mês em dezembro de 2026, que é uma expansão de 150% na receita mensal direta ao longo do período.

**Custos e investimento:** Os custos em caixa diretos do AxoloDAO totalizaram **USD 3.792,00**, com custo médio mensal de USD 252,80. Os custos operacionais do BioMuseo no período somaram USD 13.297,53. O investimento total do projeto, somando todos os desembolsos em caixa e o valor econômico dos aportes in-kind (UAQ + BioMuseo), é de **USD 25.419,61**, dos quais apenas USD 4.210,49 (16,6%) correspondem a saída efetiva de caixa. Os restantes USD 20.822,97 (81,9%) são aportes in-kind que sustentam a operação sem requerer desembolso financeiro direto.

**Resultado líquido em caixa:** Ao longo de 14 dos 15 meses analisados, a receita direta do AxoloDAO cobre integralmente seus custos diretos em dinheiro, gerando um **excedente acumulado em caixa de USD 4.848,81**. O único mês de resultado negativo em caixa - junho de 2026 - é explicado pelo investimento concentrado naquele mês (auditoria de segurança dos smart contracts + deploy em produção + custos jurídicos de formalização), e não representa fragilidade recorrente do modelo.

**Retorno sobre o Investimento (ROI):** Calculado sobre a receita total do ecossistema de USD 37.593,80:

- **ROI do Ecossistema: 47,9%** - para cada dólar investido (caixa + in-kind), o ecossistema gera USD 1,48 em receita, representando USD 0,48 de retorno líquido por dólar aplicado.
- **ROI sobre Caixa: 891,0%** - para cada dólar efetivamente desembolsado em caixa, o ecossistema gera quase dez dólares em receita, evidenciando a alavancagem estrutural proporcionada pelos aportes in-kind institucionais.

Esses números posicionam o AxoloDAO como um projeto de alta eficiência de capital para o estágio de MVP de 15 meses, com trajetória de crescimento que aponta para escalonamento acelerado a partir de 2027, quando o primeiro ano completo de dados onchain verificáveis tornará o projeto competitivo em editais institucionais de maior porte.

---

## 1.4.4 Suposições

A análise financeira foi construída sobre um conjunto de premissas explícitas e auditáveis. A transparência das suposições é condição necessária para que qualquer leitor - financiador, parceiro institucional ou avaliador acadêmico - possa verificar, questionar ou replicar os cálculos apresentados.

### Parâmetros gerais

**Moeda de referência:** Dólar americano (USD). Todos os valores são expressos em USD como moeda base, com conversões para pesos mexicanos (MXN) quando relevante para contextualização local.

**Taxa de câmbio:** MXN 17,50 por USD, adotada como referência fixa ao longo de toda a análise. Fonte: Banco de México (Banxico), média do quarto trimestre de 2025. A taxa é mantida constante para evitar ruído cambial nas projeções - variações do câmbio real podem alterar os valores em MXN, mas não afetam a estrutura do modelo em USD.

**Período de análise:** 15 meses consecutivos, de outubro de 2025 a dezembro de 2021.4. Essa extensão temporal foi definida pelo parceiro Zenbit e permite cobrir um ciclo completo de avaliação, implementação e consolidação do MVP.

**Origem dos dados por período:**
- **Outubro de 2025 a janeiro de 2026 (4 meses):** valores reais reportados pelo parceiro Zenbit, extraídos do balanço operacional do BioMuseo Xolotcalli.
- **Fevereiro e março de 2026 (2 meses):** projeção do parceiro Zenbit, baseada na média dos meses anteriores de operação estabilizada (novembro de 2025 a janeiro de 2026), adotada como referência sem alteração.
- **Abril a dezembro de 2026 (9 meses):** projeção elaborada pela equipe discente com base no framework de fases operacionais e em benchmarks de mercado verificáveis.

### Alocação BioMuseo para AxoloDAO

**Percentual de alocação: 90%.** Esta premissa, estabelecida pelo parceiro Zenbit, reflete o fato de que o BioMuseo foi concebido e opera fundamentalmente como infraestrutura de conservação do *Ambystoma mexicanum*, que é o objeto central do projeto AxoloDAO. As despesas com folha de pagamento dos cuidadores, água, eletricidade, aluguel e ativos biológicos existem em razão dos axolotes que o sistema monitora. O percentual de 10% não alocado representa atividades do museu sem relação direta com o projeto.

### Aportes in-kind - UAQ (Universidade Autônoma de Querétaro)

**Alunos:** 3 alunos × 4 horas/semana × 30 semanas ativas no ano × USD 10,00/hora = USD 300,00 mensais (USD 3.600,00 anuais). A valorização de USD 10,00/hora é conservadora em relação ao mercado mexicano - representa o piso inferior da faixa de desenvolvedores juniores em tecnologia no México (Glassdoor México, 2025: MXN 100–200/hora), desconsiderando qualquer prêmio pela especialização em blockchain e Solidity, que elevaria esse valor para USD 15–25/hora no perfil Smart Contract Developer.

**Mentores:** 2 mentores × 2 horas/semana × 30 semanas ativas × USD 15,00/hora = USD 150,00 mensais (USD 1.800,00 anuais). A valorização de USD 15,00/hora representa um desconto de 7% a 48% sobre o preço de mercado de professores e pesquisadores seniores em universidades públicas mexicanas (Glassdoor México, 2025: MXN 25.000–45.000/mês, equivalente a USD 16,07–28,90/hora para jornada de 35h semanais), adequado ao caráter de contribuição voluntária em contexto universitário.

**Total anual in-kind UAQ:** USD 5.400,00.

### Custos em dinheiro - AxoloDAO MVP

**Linhas de custo consideradas:** oito linhas operacionais, Hospedagem e Nuvem, Domínios e E-mail, Despesas de Operação e Viagem, Contingência, Gastos Onchain, Legal e Compliance, Design e Conteúdo, e Auditoria/Security Review. As três últimas linhas constavam como zero no modelo do parceiro Zenbit e foram ativadas pela equipe com valores fundamentados para os meses em que sua realização é esperada.

**Contingência:** calculada como 10% da soma das linhas operacionais variáveis (hospedagem + domínios + viagem + legal + design), excluindo a auditoria de segurança, tratada como despesa extraordinária previsível com escopo definido.

**Auditoria de segurança:** custo único de USD 800,00, concentrado em junho de 2026 (imediatamente antes do deploy dos contratos em ambiente de produção). Benchmark: Code4rena (auditoria competitiva a partir de USD 500–2.000 para contratos até 800 linhas) e auditores independentes no mercado latino-americano (USD 500–1.500 para 3 contratos de complexidade moderada). O AxoloDAO possui três contratos (AxoloAccess, AxoloRegistry e AxoloMonitoring), estimados em 600–800 linhas de Solidity.

### Framework de fases operacionais (abril–dezembro 2026)

As projeções de abril a dezembro de 2026 foram estruturadas em oito fases que refletem a evolução real do produto, cada uma com contexto distinto de visibilidade, elegibilidade a financiamentos e intensidade operacional:

- **Fase 1 (abril–maio de 2026):** Avaliação técnica do MVP; infraestrutura mínima viável, sem usuários reais em produção, equipe UAQ em plena atividade semestral.
- **Fase 2 (junho de 2026):** Decisão e Setup de Implementação; formalização das relações institucionais, preparação do ambiente de produção, concentração dos custos estruturais (auditoria, jurídico, deploy).
- **Fase 3 (julho de 2026):** Implementação Piloto; primeiros usuários reais do BioMuseo interagindo com o sistema, testes de carga, coleta das primeiras métricas onchain.
- **Fase 4 (agosto de 2026):** Primeiro mês completo pós-implementação; estabilização da infraestrutura de nuvem após o pico do piloto.
- **Fase 5 (setembro de 2026):** Segundo mês pós-implementação; crescimento moderado de usuários, revisão trimestral de compliance, preparação de candidaturas para editais do Q4.
- **Fases 6, 7 e 8 (outubro, novembro e dezembro de 2026):** Consolidação operacional, estabilidade plena e fechamento anual com sazonalidade de doações.

### Premissas de receita - AxoloDAO

As quatro linhas de receita direta foram projetadas de forma conservadora com base nos seguintes benchmarks:

- **Bolsas e fundos de pesquisa:** CONAHCyT (bolsa de iniciação científica: MXN 4.300/mês), CONABIO SNIB (MXN 4.500–1.4.000/mês para projetos de monitoramento digital), GBIF (EUR 10.000–40.000/ano para redes regionais de dados).
- **Doações, filiações e patrocínio:** CEMEFI (MXN 2.000–5.000/mês em fase inicial), (crescimento médio de 8–12% com publicação de métricas verificáveis), CAF/Network for Good (25–40% das doações anuais concentradas em dezembro).
- **Patrocínios corporativos:** CEMEFI Distintivo ESR (tier básico: USD 1.000/ano), Pacto Global ONU México, ciclo de aprovação corporativa de 3–6 meses.
- **Licenciamento e consultoria:** Glassdoor México/Toptal (blockchain consultoria: USD 50–150/hora), ArcGIS for Conservation e SMART Conservation Software (USD 40–200/mês por instituição cliente), iNaturalist como referência de ciclo de maturação (8–18 meses para o primeiro contrato formal de licenciamento após lançamento do MVP).

### Receita do ecossistema

A métrica de Receita do Ecossistema soma 90% da receita total do BioMuseo Xolotcalli com a receita direta do AxoloDAO. Essa composição reflete o valor econômico total gerado pelo ecossistema de conservação em razão da existência e do funcionamento do projeto, assim,não apenas pela plataforma digital, mas pelo conjunto formado pelo museu físico e o sistema que o digitaliza. É essa métrica que serve de numerador para o cálculo do ROI.

---

## 1.4.5 P&L BioMuseo

### 1.4.5.1 Análise de resultados operacionais (P&L) do BioMuseo Xolotcalli

#### 1.4.5.1.1 Fundamentação metodológica e projeção analítica das Receitas (Q4 2026)

A análise do desempenho financeiro projetado para o BioMuseo Xolotcalli no último trimestre de 2026 (Outubro, Novembro e Dezembro) reflete a transição de uma fase de validação de mercado para um regime de maturidade operacional estabilizada. Infere-se que a consolidação dos fluxos de receita neste período é o indicador fundamental do ecossistema AxoloDAO, validando a tese de que a infraestrutura descentralizada atua como âncora de previsibilidade econômica.

| Conceito (em Pesos MXN) | Out-26 (Projeção) | Nov-26 (Projeção) | Dez-26 (Projeção) |
|---|---|---|---|
| Subsidio AxoloDAO | $15.329,00 | $ 15.329,00 | $ 15.329,00 |
| Receitas por visitas | $15.500,00 | $ 15.500,00 | $ 15.500,00 |
| Vendas de produtos (líquidas de COGS) | $ 5.281,25 | $ 5.281,25 | $ 5.281,25 |

##### 1.4.5.1.1.1 Metodologia de projeção: Estabilidade e média móvel

Para a determinação dos valores referentes ao Q4 2026, rejeitou-se a aplicação de modelos de Regressão Linear ou de Taxas de Crescimento Composto (CAGR). Tal decisão técnica pauta-se no fato de que, em projetos de base tecnológica e impacto biológico, a volatilidade dos meses iniciais (fase de lançamento) tende a gerar ruídos estatísticos que comprometeriam a acuidade de uma tendência linear. Em substituição, adotou-se a seguinte abordagem:

- **Maturidade de Runrate (Subsídio e Visitas):** Projetou-se a manutenção do último valor recorrente consolidado. Observa-se que, após o oitavo mês de operação estável, o sistema atinge o seu "Estado Estacionário" (Steady State). Manter os valores de $ 15.329,00 e $ 15.500,00 é a premissa mais conservadora e defensável sob a ótica da auditoria financeira, assumindo que a capacidade instalada e o fluxo de visitantes atingiram o equilíbrio operacional.

- **Suavização por Média Móvel (Vendas de Produtos):** Para a linha de maior variabilidade, aplicou-se a Média Móvel Simples (SMA-3) baseada no desempenho de Julho, Agosto e Setembro de 2021.4. O valor resultante de $ 5.281,25 neutraliza oscilações conjunturais e projeta a "Tendência de Tendência Central", garantindo que o ROI do projeto seja calculado sobre uma base de rendimento esperado real, e não sobre picos sazonais isolados.

##### 1.4.5.1.1.2 Análise de causa e efeito: A Infraestrutura Trust-Minimized

O comportamento projetado para as receitas é uma derivação direta da implementação da infraestrutura tecnológica do AxoloDAO. A estabilidade financeira será a manifestação da capacidade do sistema em mitigar riscos de informação através de camadas de confiança técnica.

- **Governança e verificabilidade:** O Subsídio AxoloDAO será mantido em patamares constantes porque a arquitetura do sistema garantirá, via Smart Contracts e Ethereum Attestation Service (EAS), a entrega de marcos (milestones) científicos imutáveis. Sob a perspetiva da Teoria dos Jogos, a transparência algorítmica remove os incentivos para a descontinuidade do aporte, uma vez que o impacto será publicamente verificável e auditável pela DAO patrocinadora.

- **Redução da assimetria de informação:** A estabilidade nas receitas de visitas e vendas de produtos decorrerá da amplificação do Network Effect do projeto. A proposta de valor de um museu que integra conservação biológica à rastreabilidade em blockchain elevará a lealdade do público. Infere-se que, ao reduzir o "Custo de Verificação" para o doador e para o visitante, o ecossistema consolida uma base de receitas recorrentes, convertendo a utilidade tecnológica em fluxo de caixa previsível.

##### 1.4.5.1.1.3 Fundamentação teórica e suporte externo

A solidez das projeções para o final de 2026 encontra respaldo em pilares da economia moderna e em tendências globais de ativos digitais.

- **Valuation de ativos do mundo real (RWA):** Conforme preconizado em relatórios da a16z crypto, o valor intrínseco de um projeto Web3 é maximizado quando este ancora fluxos de caixa estáveis no mundo físico. A previsibilidade dos rendimentos em moeda fiduciária (Pesos) transforma o AxoloDAO num ativo auditável sob o modelo de Fluxo de Caixa Descontado (DCF). Esta estabilidade é fundamental para atrair investidores institucionais e grants de fundos filantrópicos, que priorizam a previsibilidade operacional sobre a volatilidade especulativa de tokens.

- **Economia da informação e custos de transação:** Segundo a teoria dos custos de transação de Ronald Coase, organizações que utilizam tecnologias para aumentar a transparência tendem a ser mais eficientes. A arquitetura AxoloDAO minimizará a necessidade de intermediários e auditorias manuais dispendiosas. Observa-se, portanto, que a estabilidade das receitas no P&L é a materialização de uma operação de baixo atrito, onde a confiança é "built-in", permitindo que o BioMuseo mantenha margens saudáveis e um engajamento estável num mercado altamente competitivo.

Conclui-se que a projeção para o quarto trimestre de 2026 estabelece o AxoloDAO não apenas como um projeto de inovação tecnológica, mas como uma operação financeira sustentável, preparada para expansão em ciclos plurianuais.

#### 1.4.5.1.2 Fundamentação metodológica e projeção analítica de Custos Operacionais (Q4 2026)

O desempenho projetado dos Custos Operacionais para o quarto trimestre de 2026 (Outubro, Novembro e Dezembro) foi determinado por uma análise que prioriza a eficiência técnica e a escalabilidade arquitetural alcançadas pelo MVP Web3. A estabilidade observada ao final do primeiro ano operacional (Out/2025 a Set/2026) é o fundamento central desta projeção, refletindo a otimização dos recursos de infraestrutura física e digital.

| Conceito (em Pesos MXN) | Out-26 (Projeção) | Nov-26 (Projeção) | Dez-26 (Projeção) |
|---|---|---|---|
| Folha de pagamento | $11.235,00 | $ 11.235,00 | $ 11.235,00 |
| Serviços (água, luz, aluguel) | $3.500,00 | $ 3.500,00 | $ 3.500,00 |
| Gastos operacionais variáveis | $847,59 | $ 847,59 | $ 847,59 |
| Custos operacionais totais | $ 15.582,59 | $ 15.582,59 | $ 15.582,59 |

##### 1.4.5.1.2.1 Metodologia de projeção

A projeção adotada fundamentou-se na Metodologia de Custo Marginal Estável Pós-Estabilização do MVP, rejeitando-se modelos de Regressão Linear ou CAGR. Justifica-se tal escolha pelo facto de que os custos operacionais de uma infraestrutura pública digital não seguem uma trajetória de crescimento percentual linear após o setup inicial; ao contrário, tendem à estabilidade absoluta através da automação.

**Custos Fixos (Folha e Serviços):** Observa-se que os valores de $ 11.235,00 e $ 3.500,00 mantiveram-se invariáveis ao longo de todo o ciclo de 12 meses. Projetou-se a continuidade deste padrão, assumindo que a escalabilidade do projeto AxoloDAO será absorvida pela camada tecnológica, sem necessidade de expansão da equipe física ou da estrutura imobiliária no curto prazo.

**Gastos Variáveis Otimizados:** O valor de $ 847,59 foi projetado com base na sua consolidação recorrente. Esta estabilidade é o resultado direto da maturidade nos processos de manutenção biológica e operacional, onde o custo de operação por exemplar monitorado tende a se tornar nominal após a implementação do sistema de alertas e registros automatizados.

##### 1.4.5.1.2.2 Análise de causa e efeito

A previsibilidade dos custos operacionais no encerramento de 2026 é uma manifestação financeira da Escalabilidade Econômica da Arquitetura Descentralizada.

**Arquitetura híbrida e baixo custo marginal:** A constância dos gastos variáveis em $ 847,59 atesta a eficiência da arquitetura que o AxoloDAO utilizará. Ao delegar o processamento de dados massivos para camadas off-chain e reservar a blockchain (Ethereum/EAS) exclusivamente para eventos críticos e atestações de impacto, o sistema garantirá um custo marginal por transação controlado. Esta abordagem impede que um aumento no volume de dados gerados pelos axolotes resulte em pressão inflacionária sobre o OPEX do projeto.

**Tecnologia como multiplicador de eficiência:** O sistema proporcionará uma redução drástica nos riscos operacionais por meio de monitoramento em tempo real. Infere-se que a automação dos registros de parâmetros biológicos substituirá processos manuais suscetíveis a erros, permitindo que a operação física cresça em complexidade sem exigir uma expansão linear na Folha de Pagamento. A tecnologia descentralizada atuará, portanto, como um deflator de custos de supervisão.

##### 1.4.5.1.2.3 Fundamentação teórica e externa

A estabilidade e a otimização de custos no Q4 2026 consolidam as bases para a sustentabilidade de longo prazo e a atratividade perante o mercado.

- **Valuation e Runway Financeiro:** A manutenção de custos operacionais totais estáveis em $ 15.582,59 estabelece um runway financeiro altamente previsível. Em modelos de Valuation de Ativos Digitais, a previsibilidade do custo é tão valiosa quanto o crescimento da receita, pois reduz o risco de insolvência e maximiza a Margem Bruta (Gross Margin). Projetos que demonstram escalabilidade sem aumento de custos operacionais (modelo lean) são priorizados em rodadas de financiamento Web3 e pela alocação de grants.

- **Economia da Informação e Custos de Coordenação:** Segundo os preceitos da Economia da Informação, a transparência radical e a automação reduzem os "Custos de Coordenação e Verificação". A arquitetura AxoloDAO substituirá a confiança interpessoal cara por confiança algorítmica barata. A estabilidade observada nos custos fixos é a evidência empírica de que a tecnologia blockchain permite a gestão eficiente de ativos biológicos complexos com uma estrutura de retaguarda mínima, validando a tese de eficiência das Organizações Autônomas Descentralizadas (DAOs) em relação às instituições centralizadas tradicionais.

Conclui-se que o rigor na manutenção dos custos operacionais, aliado à eficiência da infraestrutura tecnológica proposta, posiciona a AxoloDAO como um modelo de excelência em gestão de recursos, garantindo que a maior parte do capital arrecadado seja direcionada efetivamente para a atividade-fim: a conservação e pesquisa do gênero Ambystoma.

#### 1.4.5.1.3 Fundamentação Metodológica e Projeção Analítica do Investimento / CAPEX (Q4 2026)

A projeção das rubricas de Investimento em Bens de Capital (CAPEX) para o quarto trimestre de 2026 foi estruturada sob a ótica da gestão de capital em infraestruturas digitais de baixo atrito. A análise da série histórica (Out/2025 a Set/2026) confirma a conclusão da fase de imobilização intensiva, permitindo que o projeto transite para um modelo de manutenção de ativos, essencial para a maximização do retorno sobre o capital empregado.

| Conceito (em Pesos MXN) | Out-26 (Projeção) | Nov-26 (Projeção) | Dez-26 (Projeção) |
|---|---|---|---|
| Ativo fixo + ativos biológicos | $0,00 | $ 0,00 | $ 0,00 |
| Ativos menores | $1.137,00 | $ 1.137,00 | $ 1.137,00 |
| Investimento total / CAPEX | $ 1.137,00 | $ 1.137,00 | $ 1.137,00 |

##### 1.4.5.1.3.1 Metodologia de projeção

A projeção empregada baseia-se na Metodologia de Custo de Capital Estável Pós-Implementação, rejeitando-se modelos de regressão linear ou taxas de crescimento composto (CAGR). Justifica-se tal escolha pelo facto de o CAPEX, em projetos de infraestrutura científica, comportar-se como um evento discreto e pontual, e não como uma variável contínua de fluxo.

- **Exaustão do ciclo de imobilização (Ativos Fixos):** Observa-se que o aporte principal de 31.4.841,00 Pesos ocorreu exclusivamente no início do projeto (Out/2025). Projetou-se o valor de Zero para o Q4 de 2026, visto que a infraestrutura necessária para o MVP já se encontra plenamente operacional. Sob a ótica de um consultor sénior, a ausência de novos aportes em capital fixo é um sinal positivo de "acerto de escala", indicando que o investimento inicial foi suficiente para suportar a operação prevista sem necessidade de re-injeções de capital (re-investment risk).

- **Manutenção de ativos menores:** Projetou-se o valor recorrente de 1.137,00 Pesos, fundamentado na média consolidada de Janeiro a Setembro de 2021.4. Este montante é interpretado como o custo residual para a reposição de componentes de baixo valor e manutenção de endpoints de dados (sensores e dispositivos IoT), garantindo a continuidade operacional do sistema.

##### 1.4.5.1.3.2 Análise de causa e efeito

A estabilidade projetada no CAPEX é o reflexo financeiro da adoção de uma Arquitetura Asset-light, característica intrínseca de protocolos Web3 que operam sobre Real World Assets (RWA).

- **Software como substituto de ahrdware:** A redução do CAPEX demonstrará que a expansão da capacidade do AxoloDAO dar-se-á pela camada de software (Smart Contracts e atestações EAS) e não pela expansão física linear. O custo constante de 1.137,00 Pesos garantirá a integridade dos sensores que o sistema utilizará para capturar os parâmetros ambientais. Infere-se que, ao desmaterializar a confiança (transferindo-a do inspetor humano para o código imutável), o projeto reduzirá drasticamente a necessidade de novos ativos físicos de supervisão.

- **Robustez operacional:** A ausência de grandes investimentos recorrentes promoverá uma estrutura financeira enxuta. O sistema demonstrará que a infraestrutura descentralizada é capaz de absorver o crescimento do volume de dados e exemplares monitorados sem exigir injeções de capital proporcionais, validando a escalabilidade económica da solução proposta.

##### 1.4.5.1.3.3 Fundamentação teórica e validação financeira

A estrutura de baixo CAPEX no estágio de maturidade do MVP é um dos pilares de atratividade para modelos de financiamento moderno.

**Maximização do ROA e ROCE:** A baixa necessidade de investimento recorrente após o ciclo inicial é altamente valorizada em análises de valuation, pois maximiza o Retorno sobre Ativos (ROA) e o Retorno sobre o Capital Empregado (ROCE). Conforme a lógica de avaliação de projetos Web3 defendida por entidades como a a16z crypto, o valor económico de uma rede desloca-se do ativo físico imobilizado para a Propriedade Intelectual e para os Efeitos de Rede (Network Effects). O AxoloDAO, ao apresentar um CAPEX estável e reduzido, posiciona-se como um protocolo de alta eficiência de capital.

**Economia da Informação e Capital Informacional:** Segundo os preceitos da Economia da Informação, o valor gerado pelo AxoloDAO reside na mitigação da assimetria de dados sobre a conservação do gênero Ambystoma. Projetos que focam em Capital Informacional (dados estruturados e atestações on-chain) tendem a apresentar um balanço com baixos custos de capital físico. Esta estrutura valida o modelo de sustentabilidade de longo prazo, comprovando que o valor é gerado pela transparência e pela integridade da informação, e não pela acumulação de ativos fixos depreciáveis.

Conclui-se que a projeção de CAPEX para o encerramento de 2026 chancela o AxoloDAO como uma iniciativa financeiramente otimizada, onde a tecnologia blockchain atua como um catalisador de eficiência, permitindo a gestão de ativos biológicos complexos com uma estrutura de custos de capital mínima e previsível.

#### 1.4.5.1.4 Análise de resultados operacionais (P&L) do BioMuseo

A análise a seguir foca nos resultados operacionais (Lucro Operacional ou EBITDA, equivalente ao "Lucro operacional (receitas − custos)") do BioMuseo, em Pesos Mexicanos (MXN) e Dólares Americanos (USD), seguindo a estrutura metodológica solicitada.

##### 1.4.5.1.4.1 Fundamentação Metodológica e Projeção Analítica do Resultado Operacional (Q4 2026)

A projeção das rubricas de Resultado Operacional para o quarto trimestre de 2026 baseia-se em um modelo de Rentabilidade Operacional Estável (Steady-State Operating Profit). A análise da série histórica (Out/2025 a Set/2026) demonstra uma clara tendência de estabilização das receitas e custos operacionais a partir do segundo trimestre de 2026, validando a transição do projeto para uma fase de operação madura e previsível.

| Conceito | Out-26 (Projeção) | Nov-26 (Projeção) | Dez-26 (Projeção) | Total Q4 2026 |
|---|---|---|---|---|
| Resultado Operacional (MXN) | $20.527,70 | $20.527,70 | $20.527,70 | $61.583,10 |
| Resultado Operacional (USD) | $1.173,01 | $1.173,01 | $1.173,01 | $3.519,03 |

Nota: O Resultado Operacional em USD para cada mês do Q4/2026 foi calculado subtraindo-se as Despesas Operacionais Totais ($890,43) da Receita Total Projetada ($2.063,44).

##### 1.4.5.1.4.2 Metodologia de Projeção

A projeção utilizada adota a Metodologia de Fluxo de Caixa Recorrente (Recurrent Cash Flow Method). Esta abordagem é preferível a modelos de crescimento linear, pois o P&L do BioMuseo é majoritariamente composto por receitas de subsídio e custos fixos, que se estabilizam após a fase inicial de ramp-up.

**Estabilidade do Resultado (Ponto de Equilíbrio):** O Resultado Operacional em Pesos MXN projeta-se em $20.527,70 mensais para todo o Q4 de 2021.4. Esta estabilidade confirma que o BioMuseo atingiu seu ponto de equilíbrio operacional (Break-Even Point) e estabilizou seu Lucro Operacional (EBITDA), sinalizando a previsibilidade financeira da operação.

**Margem Operacional Elevada (USD):** A receita operacional mensal de $2.063,44 contra despesas de $890,43 projeta um Resultado Operacional de $1.173,01 em USD. Esta estrutura reflete uma margem operacional significativamente alta (cerca de 51.4.8%), indicando uma operação asset-light com alta eficiência na conversão de receita em lucro.

##### 1.4.5.1.4.3 Análise de Causa e Efeito

A estrutura de rentabilidade projetada para o Q4 de 2026 é uma consequência direta da alta proporção de custos fixos no P&L do BioMuseo, o que gera uma forte alavancagem operacional.

**Sustentabilidade pela Receita Recorrente:** O subsídio AxoloDAO, que é uma receita fixa mensal substancial (aproximadamente $15.329 MXN e $875,94 USD), atua como um seguro financeiro, cobrindo a maior parte dos custos fixos (Folha de Pagamento e Serviços). Isso minimiza a dependência de receitas variáveis (visitas, vendas) para a manutenção do ponto de equilíbrio.

**Impacto de Crescimento Marginal:** Como a Receita Total (MXN e USD) é significativamente maior que o Custo Operacional, qualquer aumento marginal nas receitas variáveis (por exemplo, aumento no número de visitas) se traduzirá quase integralmente em aumento do Resultado Operacional. O projeto tem ampla capacidade de absorver custos operacionais fixos, tornando o crescimento de receita altamente lucrativo.

##### 1.4.5.1.4.4 Fundamentação Teórica e Validação Financeira

&emsp; A solidez do resultado operacional projeta o BioMuseo como um projeto de alta atratividade para financiadores focados em sustentabilidade de longo prazo.

&emsp; **Validação da Eficiência de Capital:** A obtenção de um resultado operacional líquido positivo e estável com uma estrutura de custos fixos e um CAPEX reduzido (como detalhado na sua análise de Investimento) valida o modelo de eficiência de capital. Este modelo é valorizado no mercado de Web3 e finanças de impacto, onde o retorno é maximizado através da tecnologia (blockchain, atestações) em vez de grande acumulação de ativos físicos.

&emsp; **Potencial de Crescimento com Baixo Risco Operacional:** A estabilidade da Receita e a previsibilidade dos Custos projetam um baixo Risco Operacional. Esta estrutura permite que o financiamento futuro se concentre em iniciativas de crescimento (e.g., Marketing, I&D em software/sensores) em vez da cobertura de despesas operacionais. O projeto demonstra que os Efeitos de Rede (Network Effects) e o Capital Informacional (dados de conservação) são os principais vetores de valor, não exigindo aumentos proporcionais no Custo Operacional para escalar.

**Conclusão:**

&emsp; A projeção do Resultado Operacional para o Q4 de 2026, em conjunto com a análise de CAPEX fornecida, chancela o BioMuseo como uma iniciativa financeiramente robusta e otimizada. A estabilidade do Lucro Operacional demonstra a maturidade do modelo de negócio e a alta eficiência da estrutura de custos, validando a tese de que é possível gerir ativos biológicos complexos com uma estrutura operacional previsível e de alto retorno.


---
## 1.4.6 AxoloDAO MVP

### 1.4.6.1 Análise de Receita - AxoloDAO MVP

#### 1.4.6.1.1 Projeção da Renda Direta: Abril a Dezembro de 2026

---

### Introdução

&emsp; Esta subseção apresenta a projeção da Renda AxoloDAO (direta) para o período de abril a dezembro de 2026, cobrindo nove meses que vão desde a fase de avaliação técnica do MVP até o fechamento do primeiro ano completo de operação. O trabalho parte dos dados reais registrados entre outubro de 2025 e janeiro de 2026 e considera o modelo financeiro entregue pelo parceiro Zenbit como referência estrutural, mas elabora projeções próprias e fundamentadas para cada mês do período de abril a dezembro de 2026, inclusive os meses de abril a setembro, para os quais o parceiro já havia inserido valores constantes.

&emsp; A diferença de abordagem é intencional e metodológica, enquanto o parceiro Zenbit adotou valores mensais constantes para a maior parte desse período, a projeção aqui desenvolvida considera o ciclo estratégico do projeto, dividido em oito fases que refletem a evolução real do produto, que é da avaliação técnica à consolidação pós-implementação. Cada fase implica um contexto distinto de visibilidade, elegibilidade a financiamentos, engajamento de doadores e atratividade para patrocinadores, o que produz trajetórias de crescimento diferenciadas por linha de receita.

&emsp; Todas as projeções são embasadas em benchmarks de mercado verificáveis e fontes reais do contexto mexicano e internacional de 2026, incluindo dados do CONAHCyT, CEMEFI, CONABIO, GBIF, Giving Tuesday Data Commons, CAF, Glassdoor México e plataformas SaaS de biodiversidade. A taxa de câmbio adotada é de MXN 17,50 por USD, referente à média do quarto trimestre de 2025 conforme o Banco de México (Banxico), mantida constante ao longo de toda a análise. Os valores são expressos em dólares americanos (USD) como moeda base.

&emsp; As oito fases estratégicas que estruturam a análise são as seguintes: Fase 1 (abril) trata da avaliação técnica do MVP com infraestrutura mínima e baixo volume de usuários; Fase 2 (maio) corresponde à decisão de implementação e estruturação do time; Fase 3 (junho) marca o início da implementação piloto com os primeiros usuários reais; Fase 4 (julho) equivale ao primeiro mês pós-implementação; Fase 5 (agosto e setembro) representa o período de crescimento moderado com dois e três meses de operação real; Fase 6 (outubro) é a consolidação com primeiras métricas de impacto; Fase 7 (novembro) corresponde à estabilidade operacional; e Fase 8 (dezembro) é o fechamento anual com sazonalidade de doações.

---

#### 1.4.6.1.1.1 Bolsas e fundos de pesquisa

### Introdução

&emsp; A linha de bolsas e fundos de pesquisa representa o acesso do AxoloDAO a mecanismos institucionais de financiamento científico, nacionais e internacionais. As principais fontes consideradas no contexto mexicano são o CONAHCyT (Consejo Nacional de Humanidades, Ciencias y Tecnologías), o Fondo para la Biodiversidad, a CONABIO (Comisión Nacional para el Conocimiento y Uso de la Biodiversidad) e, no plano internacional, o GEF (Global Environment Facility) e o GBIF (Global Biodiversity Information Facility). Projetos que combinam conservação biológica com infraestrutura de dados abertos e rastreabilidade técnica, como o AxoloDAO, têm perfil elegível a editais que cruzam tecnologia e biodiversidade.

&emsp; O histórico real de outubro de 2025 a janeiro de 2026 registrou USD 100,00 mensais, compatível com uma fase conceitual sem produto funcional demonstrável. Em fevereiro e março de 2026, o parceiro Zenbit projetou USD 300,00, refletindo a aprovação ou expectativa de aprovação de uma bolsa institucional de maior porte. A projeção a seguir retoma esse contexto como referência e ajusta os valores mês a mês conforme as mudanças de contexto determinadas por cada fase.

### Projeção por Fase

&emsp; **Fase 1 - Abril de 2026:** USD 250,00 (MXN 4.375,00). O projeto está em fase de avaliação técnica. A bolsa institucional aprovada no período anterior continua sendo desembolsada, mas o volume recua em relação a fevereiro e março porque o ciclo do edital que sustentava USD 300,00 encerrou seu desembolso inicial. O valor de USD 250,00 é compatível com a faixa de bolsas de iniciação científica do CONAHCyT, cujos valores para pesquisa ambiental partem de MXN 4.300,00 mensais (aproximadamente USD 245,71 ao câmbio de referência). A estabilidade nesta fase é justificada pelo caráter ainda fechado e técnico da avaliação.

&emsp; **Fase 2 - Maio de 2026:** USD 250,00 (MXN 4.375,00). A decisão de implementar e a estruturação do time não produzem impacto imediato na captação de bolsas, uma vez que editais levam de 3 a 6 meses entre submissão e aprovação. O valor é mantido estável em relação a abril. Neste mês, o projeto pode estar submetendo candidaturas ao GBIF — cujos ciclos de aprovação têm duração média de 4 meses — ou ao Programa de Apoyo a Proyectos de Biodiversidad da CONABIO, cujos desembolsos só seriam visíveis a partir de setembro ou outubro.

&emsp; **Fase 3 - Junho de 2026:** USD 260,00 (MXN 4.550,00). Com o início da implementação piloto e os primeiros dados reais armazenados onchain, o projeto passa a ter evidências concretas para relatórios intermediários exigidos por financiadores como o GBIF e o FMCN (Fondo Mexicano para la Conservación de la Naturaleza). Aplica-se crescimento de 4,0% sobre maio. O GBIF distribui entre EUR 10.000,00 e EUR 40.000,00 por projeto anual em sua modalidade de apoio a redes regionais de dados, e a existência de uma implementação real eleva significativamente a elegibilidade do AxoloDAO a essa faixa de financiamento.

&emsp; **Fase 4 - Julho de 2026:** USD 273,00 (MXN 4.777,50). Com um mês completo de operação, o sistema acumula dados suficientes para relatórios de progresso. Aplica-se crescimento de 5,0% sobre junho. O SNIB (Sistema Nacional de Información sobre Biodiversidad) da CONABIO financia projetos de monitoramento digital com valores entre MXN 4.500,00 e MXN 1.4.000,00 mensais para iniciativas em fase de dados reais, o que valida o intervalo projetado.

&emsp; **Fase 5 - Agosto de 2026:** USD 281,19 (MXN 4.920,83). Dois meses de dados verificáveis permitem a submissão de relatórios intermediários formais a financiadores que exigem evidências de operação antes do próximo desembolso. Crescimento de 3,0% sobre julho, ritmo moderado que reflete a disponibilidade crescente de evidências, mas ainda sem novo edital aprovado.

&emsp; **Fase 5b - Setembro de 2026:** USD 286,81 (MXN 5.019,18). Terceiro mês pós-implementação. O projeto está em posição favorável para submissões ao ciclo de editais do quarto trimestre, tipicamente abertos em setembro e outubro por agências como CONAHCyT e GEF. Crescimento de 2,0% sobre agosto, postura conservadora para o mês de preparação de candidaturas.

&emsp; **Fase 6 - Outubro de 2026:** USD 301,15 (MXN 5.270,12). Com três meses e meio de dados reais e um sistema estável, o projeto atinge o limiar de elegibilidade para editais de médio porte. Crescimento de 5,0% sobre setembro. A visibilidade acumulada e a disponibilidade de métricas onchain auditáveis tornam o projeto progressivamente mais competitivo em processos seletivos.

&emsp; **Fase 7 - Novembro de 2026:** USD 310,18 (MXN 5.428,15). Estabilidade operacional consolidada. Crescimento de 3,0% sobre outubro, refletindo a continuidade de programas já aprovados e a entrada gradual de novos fluxos decorrentes de candidaturas submetidas nos meses anteriores.

&emsp; **Fase 8 - Dezembro de 2026:** USD 316,38 (MXN 5.536,65). Crescimento de 2,0% sobre novembro. Dezembro é mês de encerramento orçamentário de agências públicas, o que não favorece novos desembolsos, mas garante a manutenção dos contratos vigentes. A postura conservadora é adequada ao contexto de fechamento de exercício.

### Tabela Resumo - Bolsas e Fundos de Pesquisa

| Mês | Fase | USD | MXN | Crescimento s/ mês anterior | Fonte / Benchmark |
|---|---|---|---|---|---|
| Abr-26 | 1 | 250,00 | 4.375,00 | Ref. base | CONAHCyT: MXN 4.300/mês (bolsa IC) |
| Mai-26 | 2 | 250,00 | 4.375,00 | 0,0% | Ciclo seletivo GBIF: 4 meses de aprovação |
| Jun-26 | 3 | 260,00 | 4.550,00 | +4,0% | GBIF / FMCN: dados reais elevam elegibilidade |
| Jul-26 | 4 | 273,00 | 4.777,50 | +5,0% | CONABIO SNIB: MXN 4.500–1.4.000/mês |
| Ago-26 | 5 | 281,19 | 4.920,83 | +3,0% | Relatório intermediário formal enviado |
| Set-26 | 5b | 286,81 | 5.019,18 | +2,0% | Preparação de editais Q4 (CONAHCyT / GEF) |
| Out-26 | 6 | 301,15 | 5.270,12 | +5,0% | Elegibilidade a editais de médio porte |
| Nov-26 | 7 | 310,18 | 5.428,15 | +3,0% | Continuidade de programas aprovados |
| Dez-26 | 8 | 316,38 | 5.536,65 | +2,0% | Encerramento orçamentário — postura conservadora |

### Conclusão

&emsp; A linha de bolsas e fundos de pesquisa apresenta trajetória de crescimento gradual que acompanha com fidelidade o ciclo de maturidade do projeto. O ponto de inflexão ocorre em junho, quando a implementação real fornece as evidências concretas que financiadores institucionais exigem para relatórios intermediários e novas candidaturas. O crescimento é consistente com o que se observa em projetos de conservação digital no México que transitam da fase conceitual para a fase de dados operacionais. O total acumulado desta linha no período de abril a dezembro de 2026 é de USD 2.528,71.

---

#### 1.4.6.1.1.2 Doações, Filiações e Patrocínio

### Introdução

&emsp; Esta linha consolida contribuições voluntárias de pessoas físicas, adesões a programas de apoio recorrente e patrocínios menores de pessoas jurídicas sem contrato corporativo formal. Trata-se da linha mais sensível à comunicação pública e ao engajamento da comunidade, e também a que apresenta maior variação sazonal ao longo do ano. Segundo o Centro Mexicano para la Filantropía (CEMEFI), organizações de conservação de espécies endêmicas recebem em média entre MXN 2.000,00 e MXN 5.000,00 mensais em doações digitais durante fases iniciais, valor que pode crescer 15% a 20% ao ano com presença digital ativa e publicação regular de métricas de impacto.

&emsp;A transparência proporcionada pela rastreabilidade onchain do AxoloDAO é um diferencial relevante neste mercado. Doadores que valorizam prestação de contas verificável tendem a aumentar o volume e a recorrência de suas contribuições quando têm acesso direto às evidências do uso dos recursos, o que é exatamente o que a arquitetura do sistema oferece por meio dos eventos imutáveis registrados na blockchain. O histórico real de outubro de 2025 a janeiro de 2026 registrou USD 100,00 mensais. A partir de fevereiro, o parceiro projetou um salto para USD 200,00, refletindo uma base mais ampla de apoiadores. Nossa projeção parte desse nível em abril e aplica crescimentos diferenciados conforme cada fase altera a visibilidade e a produção de conteúdo de impacto do projeto.

### Projeção por Fase

&emsp; **Fase 1 - Abril de 2026:** USD 200,00 (MXN 3.500,00). A avaliação técnica do MVP não gera comunicação pública expressiva. O projeto está em operação fechada, com foco na validação do código e dos contratos. A base de doadores recorrentes estabelecida nos meses anteriores é mantida, mas não há campanha ativa que estimule novos aportes. O valor equivale a aproximadamente 10 a 13 doadores contribuindo entre MXN 270,00 e MXN 350,00 por mês cada, faixa compatível com o perfil de apoiadores em plataformas.

&emsp; **Fase 2 - Maio de 2026:** USD 210,00 (MXN 3.675,00). A decisão de implementar e a formalização do time geram comunicação institucional relevante: anúncios internos, atualizações para parceiros e primeiros conteúdos preparatórios para o lançamento público. Crescimento de 5,0% sobre abril, refletindo o efeito inicial de maior presença digital e a expectativa pública gerada pela implementação iminente.

&emsp; **Fase 3 - Junho de 2026:** USD 231,00 (MXN 4.042,50). O lançamento real do sistema é o evento de maior potencial de geração de visibilidade em todo o período analisado. O BioMuseo Xolotcalli e o AxoloDAO publicam conteúdos sobre a implementação, os primeiros axolotes registrados onchain e os dados ambientais verificáveis. Crescimento de 10,0% sobre maio, capturando o efeito de novidade e o aumento de engajamento típico de lançamentos de produtos com comunicação ambiental ativa.

&emsp; **Fase 4 - Julho de 2026:** USD 247,17 (MXN 4.325,47). Com um mês completo de dados reais publicados, o projeto passa a ter conteúdo verificável para campanhas de engajamento. Os primeiros relatórios de impacto são compartilhados com a comunidade. Crescimento de 7,0% sobre junho, representando a resposta orgânica de doadores que retornam após verem resultados concretos da implementação.

&emsp; **Fase 5 - Agosto de 2026:** USD 259,53 (MXN 4.541,77). A recorrência de doadores se consolida. Com dois meses de operação, o sistema possui série histórica suficiente para demonstrar consistência. Crescimento de 5,0% sobre julho. Plataformas de captação digital como registram crescimento médio de 8% a 12% em receita de doações para projetos que passam a publicar métricas verificáveis, e os 5,0% adotados representam estimativa conservadora dentro desse intervalo.

&emsp; **Fase 5b - Setembro de 2026:** USD 267,32 (MXN 4.678,10). Estabilização antes do ciclo de fim de ano. Crescimento de 3,0% sobre agosto, ritmo que reflete a manutenção da recorrência e pequenas adições orgânicas sem campanhas específicas de captação.

&emsp; **Fase 6 - Outubro de 2026:** USD 288,71 (MXN 5.052,42). Três meses de dados onchain auditáveis disponíveis para verificação pública. O projeto entra no quarto trimestre com histórico de impacto ambiental documentado. Crescimento de 8,0% sobre setembro, compatível com o que CEMEFI documentam para projetos que publicam relatórios trimestrais de impacto.

&emsp; **Fase 7 - Novembro de 2026:** USD 303,15 (MXN 5.305,12). Início do período de maior engajamento filantrópico do ano. O Giving Tuesday, que ocorre na última terça-feira de novembro, movimentou mais de USD 3,1 bilhões globalmente em 2025, segundo o Giving Tuesday Data Commons, com crescimento consistente no México. Crescimento de 5,0% sobre outubro.

&emsp; **Fase 8 - Dezembro de 2026:** USD 348,62 (MXN 1.4.100,85). Dezembro concentra o maior volume anual de doações para organizações ambientais. Segundo o relatório Giving Report da CAF (Charities Aid Foundation) e dados do Network for Good, entre 25% e 40% das doações anuais de ONGs ambientais são recebidas neste mês. O crescimento de 15,0% sobre novembro é conservador dentro desse intervalo sazonal documentado.

### Tabela Resumo - Doações, Filiações e Patrocínio

| Mês | Fase | USD | MXN | Crescimento s/ mês anterior | Fonte / Benchmark |
|---|---|---|---|---|---|
| Abr-26 | 1 | 200,00 | 3.500,00 | Ref. base | CEMEFI: MXN 2.000–5.000/mês fase inicial |
| Mai-26 | 2 | 210,00 | 3.675,00 | +5,0% | Comunicação pré-lançamento, anúncios institucionais |
| Jun-26 | 3 | 231,00 | 4.042,50 | +10,0% | Efeito lançamento — BioMuseo + AxoloDAO social |
| Jul-26 | 4 | 247,17 | 4.325,47 | +7,0% | Primeiros relatórios de impacto publicados |
| Ago-26 | 5 | 259,53 | 4.541,77 | +5,0% | +8–12% com métricas verificáveis |
| Set-26 | 5b | 267,32 | 4.678,10 | +3,0% | Estabilização pré-Q4 |
| Out-26 | 6 | 288,71 | 5.052,42 | +8,0% | Relatório trimestral de impacto publicado |
| Nov-26 | 7 | 303,15 | 5.305,12 | +5,0% | Giving Tuesday: pico inicial de Q4 |
| Dez-26 | 8 | 348,62 | 1.4.100,85 | +15,0% | CAF / Network for Good: 25–40% doações anuais em dezembro |

### Conclusão

&emsp; A linha de doações, filiações e patrocínio é a mais dinâmica do modelo de receita do AxoloDAO e a que mais se beneficia da progressão por fases estratégicas. O lançamento real em junho é o principal catalisador de crescimento durante o semestre, e a sazonalidade de dezembro representa o maior salto mensal de toda a análise (+15,0%). A transparência onchain é o diferencial estrutural que sustenta esse crescimento, pois permite que qualquer doador verifique publicamente como os dados do axolote estão sendo registrados e validados. O total acumulado desta linha no período de abril a dezembro de 2026 é de USD 2.355,50.

---

#### 1.4.6.1.1.3 Patrocínios Corporativos

### Introdução

&emsp; Os patrocínios corporativos representam acordos formais com empresas privadas que destinam recursos ao AxoloDAO como parte de programas de Responsabilidade Social Empresarial (RSE) ou de sustentabilidade. No México, o mercado de RSE ambiental é estruturado por iniciativas como o Distintivo ESR (Empresa Socialmente Responsável) do CEMEFI, com mais de 1.600 empresas certificadas, e pelo Pacto Global da ONU, que orienta o investimento privado em projetos alinhados ao ODS 15. O ciclo de decisão para novos contratos de patrocínio corporativo é tipicamente longo, de 3 a 6 meses entre o primeiro contato e a assinatura, o que torna essa linha menos responsiva a eventos pontuais e mais dependente de processos de prospecção iniciados com antecedência.

&emsp; O valor de USD 83,33 mensais (USD 1.000,00 anuais) corresponde ao tier de entrada de patrocínio corporativo, equivalente ao menor nível de reconhecimento formal de patrocinador no CEMEFI. Empresas como BBVA México, Fundación Bimbo e CEMEX Foundation mantêm programas de RSE ambiental com faixas de apoio a projetos piloto que partem de MXN 10.000,00 a MXN 50.000,00 por ciclo anual. O valor constante registrado pelo parceiro Zenbit ao longo de todos os doze meses reflete um único contrato vigente com valor fixo. Nossa projeção mantém essa base e aplica crescimentos graduais vinculados a eventos específicos que os justificam.

### Projeção por Fase

&emsp; **Fase 1 - Abril de 2026:** USD 83,33 (MXN 1.458,28). Contrato de patrocínio em vigor. A avaliação técnica do MVP não impacta contratos já estabelecidos. Não há novo patrocinador previsto neste mês, uma vez que o ciclo de prospecção para eventual segunda empresa ainda não foi iniciado formalmente.

&emsp; **Fase 2 - Maio de 2026:** USD 83,33 (MXN 1.458,28). A estruturação do time e a decisão de implementação podem gerar conversas iniciais com novos potenciais patrocinadores, mas o ciclo de aprovação interna corporativa inviabiliza qualquer ingresso de nova empresa antes de setembro ou outubro. O valor é mantido estável.

&emsp; **Fase 3 - Junho de 2026:** USD 85,00 (MXN 1.487,50). Com o sistema em operação real, o projeto torna-se visível publicamente e passa a ter um produto demonstrável para apresentações a departamentos de RSE de empresas. Crescimento de 2,0% sobre maio, refletindo a possibilidade de um pequeno ajuste contratual com o patrocinador existente ou a formalização de um apoio menor de uma empresa do ecossistema do BioMuseo.

&emsp; **Fase 4 - Julho de 2026:** USD 86,70 (MXN 1.517,25). As primeiras apresentações do sistema funcionando a potenciais novos patrocinadores geram interesse, mas os processos internos de aprovação ainda estão em andamento. Crescimento gradual de 2,0% sobre junho.

&emsp; **Fase 5 - Agosto de 2026:** USD 88,43 (MXN 1.547,53). Dois meses de dados reais fortalecem o argumento para departamentos de sustentabilidade corporativa. Crescimento de 2,0% sobre julho. O ciclo de aprovação iniciado em julho avança internamente nas empresas prospectadas.

&emsp; **Fase 5b - Setembro de 2026:** USD 91,08 (MXN 1.593,90). Setembro é o mês em que muitas empresas mexicanas de capital aberto iniciam o planejamento orçamentário para o exercício seguinte. Isso acelera decisões de patrocínio pendentes. Crescimento de 3,0% sobre agosto, capturando o efeito de aprovações corporativas de final de trimestre e início de ciclo de budget 2027.

&emsp; **Fase 6 - Outubro de 2026:** USD 93,81 (MXN 1.641,67). Consolidação com métricas reais publicadas. Contratos formalizados em setembro começam a desembolsar. Crescimento de 3,0% sobre setembro.

&emsp; **Fase 7 - Novembro de 2026:** USD 95,69 (MXN 1.674,58). Estabilidade contratual com acordos em vigor. Crescimento de 2,0% sobre outubro, representando ajuste de correção monetária em contratos renovados.

&emsp; **Fase 8 - Dezembro de 2026:** USD 100,47 (MXN 1.758,22). Fechamento do exercício de RSE 2021.4. Empresas realizam os últimos desembolsos do orçamento anual aprovado. Crescimento de 5,0% sobre novembro, capturando o efeito de budget residual de RSE direcionado a projetos já validados nos últimos dias do exercício fiscal.

### Tabela Resumo - Patrocínios Corporativos

| Mês | Fase | USD | MXN | Crescimento s/ mês anterior | Fonte / Benchmark |
|---|---|---|---|---|---|
| Abr-26 | 1 | 83,33 | 1.458,28 | Ref. base | CEMEFI ESR: tier básico USD 1.000/ano |
| Mai-26 | 2 | 83,33 | 1.458,28 | 0,0% | Ciclo aprovação corporativa: 3–6 meses |
| Jun-26 | 3 | 85,00 | 1.487,50 | +2,0% | Sistema demonstrável — apresentações a RSE |
| Jul-26 | 4 | 86,70 | 1.517,25 | +2,0% | Processo interno de aprovação em andamento |
| Ago-26 | 5 | 88,43 | 1.547,53 | +2,0% | Dados reais fortalecem argumento RSE |
| Set-26 | 5b | 91,08 | 1.593,90 | +3,0% | Planejamento orçamentário 2027 — decisões aceleradas |
| Out-26 | 6 | 93,81 | 1.641,67 | +3,0% | Novos contratos de set/out desembolsando |
| Nov-26 | 7 | 95,69 | 1.674,58 | +2,0% | Estabilidade contratual — correção monetária |
| Dez-26 | 8 | 100,47 | 1.758,22 | +5,0% | Desembolso de budget residual RSE — dezembro |

### Conclusão

&emsp; Os patrocínios corporativos seguem a trajetória mais estável e previsível do modelo, condicionada pelos longos ciclos de decisão corporativa. O crescimento acumulado de abril a dezembro é de aproximadamente 20,6% sobre o valor base, resultado da combinação entre a visibilidade gerada pela implementação real a partir de junho e o ciclo de orçamento RSE do quarto trimestre. A linha não registra saltos abruptos porque o modelo de negócio de patrocínio corporativo é fundamentalmente contratual e pouco responsivo a eventos pontuais de curto prazo. O total acumulado de abril a dezembro de 2026 é de USD 808,84.

---

#### 1.4.6.1.1.4 Licenciamento e consultoria

### Introdução

&emsp; A linha de licenciamento e consultoria representa o canal de monetização com maior potencial de crescimento no médio prazo, mas também o que exige maior tempo de maturação. Ela abrange duas modalidades: o licenciamento da plataforma AxoloDAO ou de seus componentes de smart contracts para outras instituições de conservação, e a prestação de serviços de consultoria técnica em blockchain aplicado à biodiversidade. No México, o mercado de consultoria Web3 ainda é incipiente no setor socioambiental, o que significa que o AxoloDAO é potencialmente pioneiro nessa categoria.

&emsp; Segundo dados do Glassdoor México (2025) e da plataforma Toptal para desenvolvedores da América Latina, profissionais especializados em blockchain cobram entre USD 50,00 e USD 150,00 por hora. O valor base de USD 41,67 mensais equivale a aproximadamente 3 horas mensais de consultoria técnica de menor complexidade, ou ao início de um contrato de licenciamento com uma única instituição parceira. Plataformas SaaS de monitoramento ambiental como ArcGIS for Conservation e SMART Conservation Software cobram entre USD 40,00 e USD 200,00 por mês por instituição cliente, e o AxoloDAO operaria na faixa inferior em 2026 dado o estágio do produto.

&emsp; O pipeline para contratos formais de licenciamento de plataformas Web3 no setor ambiental exige em média de 6 a 12 meses entre a primeira demonstração funcional e a assinatura. O caso do iNaturalist, que levou entre 8 e 18 meses para fechar os primeiros acordos institucionais de licenciamento após o lançamento do MVP, serve como referência de mercado para esse ciclo.

### Projeção por Fase

&emsp; **Fase 1 - Abril de 2026:** USD 41,67 (MXN 729,23). Avaliação técnica fechada. O produto ainda não está em produção e não há demonstração pública disponível. O valor reflete honorários pontuais de consultoria técnica para documentação da arquitetura de smart contracts ou assessoria a pesquisadores da UAQ em relação ao design do sistema.

&emsp; **Fase 2 - Maio de 2026:** USD 41,67 (MXN 729,23). Estruturação do time e preparação para o deploy. O contrato de consultoria vigente é mantido, mas não há crescimento, pois o produto ainda não está em produção e não há demonstração concreta para potenciais clientes.

&emsp; **Fase 3 - Junho de 2026:** USD 42,50 (MXN 743,75). A implementação piloto gera a primeira demonstração funcional do sistema com usuários reais e dados onchain verificáveis. Esse é o ponto de partida para apresentações a potenciais clientes de licenciamento. Crescimento de 2,0% sobre maio, representando o início de consultas técnicas de instituições interessadas no modelo.

&emsp; **Fase 4 - Julho de 2026:** USD 43,35 (MXN 758,62). Com um mês de dados reais, o projeto começa a receber consultas de outras instituições de conservação. O crescimento de 2,0% sobre junho reflete honorários de assessoria técnica básica a essas instituições, ainda sem contrato formal de licenciamento.

&emsp; **Fase 5 - Agosto de 2026:** USD 44,65 (MXN 781,38). Dois meses de operação real com dados verificáveis públicos disponíveis. As consultas técnicas tornam-se mais frequentes e podem evoluir para propostas de consultoria mais estruturadas. Crescimento de 3,0% sobre julho.

&emsp; **Fase 5b - Setembro de 2026:** USD 45,54 (MXN 796,95). Pipeline de 2027 em formação. Crescimento de 2,0% sobre agosto. O processo de maturação de contratos de licenciamento continua, mas os resultados financeiros expressivos só devem ser perceptíveis no primeiro semestre de 2027.

&emsp; **Fase 6 - Outubro de 2026:** USD 46,00 (MXN 805,00). Crescimento de 1,0% sobre setembro. A consolidação do sistema com métricas reais aumenta marginalmente a demanda por consultoria, mas o ciclo longo de contratação não permite saltos expressivos neste mês.

&emsp; **Fase 7 - Novembro de 2026:** USD 46,46 (MXN 812,05). Crescimento de 1,0% sobre outubro. Manutenção do ritmo gradual. Eventual proposta de maior porte pode estar em processo de orçamento interno em alguma instituição interessada, sem impacto financeiro perceptível neste mês.

&emsp; **Fase 8 - Dezembro de 2026:** USD 46,92 (MXN 821,10). Crescimento de 1,0% sobre novembro. Fechamento anual. O crescimento mínimo adotado nesta fase é deliberado: pipelines de consultoria Web3 no setor ambiental raramente se concretizam em dezembro, mês de menor atividade institucional no México.

### Tabela Resumo - Licenciamento e Consultoria

| Mês | Fase | USD | MXN | Crescimento s/ mês anterior | Fonte / Benchmark |
|---|---|---|---|---|---|
| Abr-26 | 1 | 41,67 | 729,23 | Ref. base | Glassdoor MX: USD 50–150/h consultoria blockchain |
| Mai-26 | 2 | 41,67 | 729,23 | 0,0% | Produto ainda não em produção |
| Jun-26 | 3 | 42,50 | 743,75 | +2,0% | 1ª demo pública — consultas técnicas se iniciam |
| Jul-26 | 4 | 43,35 | 758,62 | +2,0% | Consultas institucionais sem contrato formal |
| Ago-26 | 5 | 44,65 | 781,38 | +3,0% | Propostas de consultoria estruturada |
| Set-26 | 5b | 45,54 | 796,95 | +2,0% | Pipeline 2027 em formação |
| Out-26 | 6 | 46,00 | 805,00 | +1,0% | iNaturalist: 8–18 meses para 1º contrato de licenciamento |
| Nov-26 | 7 | 46,46 | 812,05 | +1,0% | Ciclo de maturação contratual em curso |
| Dez-26 | 8 | 46,92 | 821,10 | +1,0% | Baixa atividade institucional em dezembro |

### Conclusão

&emsp; A linha de licenciamento e consultoria opera em trajetória ascendente lenta e constante, com crescimento acumulado de aproximadamente 12,6% de abril a dezembro de 2021.4. Essa progressão gradual é economicamente coerente com o tempo de maturação típico de contratos de licenciamento de plataformas digitais no setor de conservação. O verdadeiro potencial de crescimento desta linha estará disponível a partir de 2027, quando o sistema terá mais de um ano de dados reais e o pipeline de contratos iniciado em 2026 começa a se converter em receita formal. O total acumulado de abril a dezembro de 2026 é de USD 396,71.4.

---

#### 1.4.6.1.1.5 Receita Total AxoloDAO - Consolidado

### Composição e Totais

&emsp; A tabela a seguir consolida as quatro linhas de receita para o período completo de outubro de 2025 a dezembro de 2026, integrando os dados reais, os valores do parceiro Zenbit utilizados como referência para os meses de fevereiro e março de 2026, e as projeções por fase desenvolvidas nesta análise para o período de abril a dezembro de 2021.4.

### Tabela Completa — Receita Total AxoloDAO (Out-25 a Dez-26)

| Período | Status | Bolsas (USD) | Doações (USD) | Patrocínios (USD) | Licenciamento (USD) | Total Mês (USD) |
|---|---|---|---|---|---|---|
| Out-25 | Real | 100,00 | 100,00 | 83,33 | 41,67 | 325,00 |
| Nov-25 | Real | 100,00 | 100,00 | 83,33 | 41,67 | 325,00 |
| Dez-25 | Real | 100,00 | 100,00 | 83,33 | 41,67 | 325,00 |
| Jan-26 | Real | 100,00 | 100,00 | 83,33 | 41,67 | 325,00 |
| Fev-26 | Ref. Zenbit | 300,00 | 200,00 | 83,33 | 41,67 | 625,00 |
| Mar-26 | Ref. Zenbit | 300,00 | 200,00 | 83,33 | 41,67 | 625,00 |
| **Abr-26** | **Proj. própria** | **250,00** | **200,00** | **83,33** | **41,67** | **575,00** |
| **Mai-26** | **Proj. própria** | **250,00** | **210,00** | **83,33** | **41,67** | **585,00** |
| **Jun-26** | **Proj. própria** | **260,00** | **231,00** | **85,00** | **42,50** | **618,50** |
| **Jul-26** | **Proj. própria** | **273,00** | **247,17** | **86,70** | **43,35** | **650,22** |
| **Ago-26** | **Proj. própria** | **281,19** | **259,53** | **88,43** | **44,65** | **673,80** |
| **Set-26** | **Proj. própria** | **286,81** | **267,32** | **91,08** | **45,54** | **690,75** |
| **Out-26** | **Proj. própria** | **301,15** | **288,71** | **93,81** | **46,00** | **729,67** |
| **Nov-26** | **Proj. própria** | **310,18** | **303,15** | **95,69** | **46,46** | **755,48** |
| **Dez-26** | **Proj. própria** | **316,38** | **348,62** | **100,47** | **46,92** | **812,39** |

*Valores em negrito correspondem à projeção por fase desenvolvida nesta análise (abril a dezembro de 2026).*

### Comparação com a Projeção do Parceiro Zenbit (Abr–Set 2026)

&emsp; A tabela a seguir apresenta, para o período de abril a setembro de 2026, a diferença entre os valores projetados pelo parceiro Zenbit (constantes em USD 575,00 mensais) e os valores desenvolvidos nesta análise com base nas fases estratégicas.

| Período | Projeção Zenbit (USD) | Projeção por Fases (USD) | Diferença (USD) | Variação |
|---|---|---|---|---|
| Abr-26 | 575,00 | 575,00 | 0,00 | 0,0% |
| Mai-26 | 575,00 | 585,00 | +10,00 | +1,7% |
| Jun-26 | 575,00 | 618,50 | +43,50 | +7,6% |
| Jul-26 | 575,00 | 650,22 | +75,22 | +13,1% |
| Ago-26 | 575,00 | 673,80 | +98,80 | +17,2% |
| Set-26 | 575,00 | 690,75 | +115,75 | +20,1% |
| **Total Abr–Set** | **3.450,00** | **3.793,27** | **+343,27** | **+9,9%** |

&emsp; A divergência entre as duas projeções é intencional e metodologicamente justificada. O parceiro Zenbit adotou valores constantes ao longo do período, abordagem válida e conservadora para um modelo financeiro de planejamento inicial. Esta análise aplica taxas de crescimento diferenciadas por fase para refletir o impacto real de cada etapa do projeto sobre cada linha de receita. A maior divergência ocorre em setembro (+20,1%), mês em que os efeitos cumulativos de três meses de dados reais onchain e do ciclo de orçamento RSE corporativo se combinam para elevar o total mensal projetado.

### Totais Acumulados

| Período | Total (USD) |
|---|---|
| Out-25 a Mar-26 — dados reais e referência Zenbit (6 meses) | 2.550,00 |
| Abr-26 a Dez-26 — projeção por fases estratégicas (9 meses) | 1.4.090,81 |
| **Total 15 meses (Out-25 a Dez-26)** | **8.640,81** |

&emsp; Para referência, a projeção original do parceiro Zenbit totalizava USD 1.4.000,00 para os 12 meses de outubro de 2025 a setembro de 2021.4. A projeção estendida por fases para 15 meses chega a USD 8.640,81. A diferença de USD 2.640,81 reflete tanto a adição de outubro, novembro e dezembro de 2026 quanto o crescimento incremental projetado para o segundo semestre do ano em relação ao modelo de valores constantes adotado pelo parceiro.

---

## Conclusão da subseção

&emsp; A projeção da Renda AxoloDAO (direta) de abril a dezembro de 2026, elaborada por fase estratégica e embasada em benchmarks de mercado verificáveis, revela um modelo de receita com perfil de crescimento gradual e consistente com o estágio de maturidade de um projeto MVP em conservação de biodiversidade instrumentalizado por blockchain.

&emsp; As quatro linhas de receita apresentam dinâmicas distintas que se complementam ao longo do período. As bolsas e fundos de pesquisa crescem de forma estrutural, vinculadas ao ciclo de editais institucionais e ao aumento progressivo da elegibilidade conforme o sistema acumula dados verificáveis. As doações e filiações são as mais sensíveis ao lançamento público e à sazonalidade do quarto trimestre, com o pico de dezembro representando o maior salto mensal de toda a análise. Os patrocínios corporativos seguem a lógica contratual, com crescimento vinculado ao ciclo de planejamento orçamentário de RSE das empresas. E o licenciamento e consultoria cresce de forma lenta e constante, com o potencial real de escalonamento reservado para 2027.

&emsp; A rastreabilidade onchain do AxoloDAO, implementada por meio dos contratos AxoloAccess, AxoloRegistry e AxoloMonitoring na testnet Sepolia, é o diferencial transversal que sustenta o crescimento de todas as linhas: eleva a elegibilidade a bolsas por garantir dados verificáveis e auditáveis, aumenta a confiança de doadores por oferecer transparência pública de impacto, e fortalece propostas para patrocinadores corporativos ao associar a marca empresarial a um projeto com evidências rastreáveis de conservação. Essa arquitetura de transparência é o principal ativo não financeiro do projeto e o fator que diferencia suas projeções de receita daquelas de iniciativas tradicionais de conservação sem infraestrutura digital verificável.

&emsp; O total de receita direta projetado para os 15 meses de outubro de 2025 a dezembro de 2026 é de USD 8.640,81, resultado de uma projeção conservadora, fundamentada em fontes reais e coerente com o que se esperaria de uma análise profissional para projetos de impacto socioambiental na América Latina.

---

### 1.4.6.2 Análise de Custos em Dinheiro - AxoloDAO MVP

#### 1.4.6.2.1 Custos em Dinheiro - AxoloDAO MVP: Projeção de Abril a Dezembro de 2026

### Introdução 

&emsp; Esta subseção apresenta a projeção completa e detalhada dos Custos em Dinheiro diretos do projeto AxoloDAO MVP para os nove meses compreendidos entre abril e dezembro de 2021.4. Diferentemente da projeção entregue pelo parceiro Zenbit, que manteve todas as linhas de custo em valores fixos e constantes ao longo dos doze meses de análise, esta projeção acadêmica incorpora uma leitura dinâmica da evolução do projeto ao longo de suas distintas fases operacionais, conforme framework fornecido pelo professor orientador de negócios.

&emsp; O exercício tem como objetivo central desenvolver a competência analítica de modelagem financeira em contexto real: dado um projeto com arquitetura técnica conhecida (três smart contracts na Sepolia, stack Web3 com MetaMask e OpenZeppelin, integração futura com EAS e ENS), premissas institucionais definidas e um ecossistema de parceiros mapeado (BioMuseo Xolotcalli, UAQ, NDALI), como se comportam os custos operacionais ao longo das fases de avaliação, implementação e consolidação do produto?

&emsp; Para responder a essa pergunta, cada linha de custo foi analisada individualmente à luz de benchmarks de mercado reais e verificáveis, ajustes inflacionários coerentes com o México em 2026 e a lógica de crescimento específica de cada fase. Esta versão do documento incorpora três linhas adicionais de custo que constavam no modelo do parceiro com valor zero — Legal/compliance, Design/conteúdo e Auditoria/security review — e que passam a ser projetadas com valores fundamentados para os meses em que sua realização é esperada.

&emsp; A taxa de câmbio adotada em toda a análise é de **MXN 17,50 por USD**, conforme média do quarto trimestre de 2025 publicada pelo Banco de México (Banxico, 2025). Todos os valores são apresentados em dólares americanos (USD), com conversão para pesos mexicanos (MXN) nas tabelas quando relevante.

&emsp; Os dados de outubro de 2025 a janeiro de 2026 são valores reais reportados pelo parceiro. Os meses de fevereiro e março de 2026 correspondem à projeção do parceiro, a valores fixos. A partir de abril de 2026, os valores apresentados nesta seção foram construídos pela equipe discente com base nas fases operacionais descritas a seguir.

---

### Estrutura de Fases Operacionais do Projeto

&emsp; A **Fase 1** (abril e maio de 2026) é o período de Avaliação do MVP. A estrutura permanece enxuta, o volume de usuários é baixo e controlado, a infraestrutura opera em configuração mínima viável e o uso técnico do sistema ocorre em ambiente de testes. Não há usuários reais do BioMuseo interagindo com o sistema em produção — apenas a equipe técnica da Zenbit e os alunos da UAQ validando funcionalidades.

&emsp; A **Fase 2** (junho de 2026) é a fase de Decisão e Setup de Implementação. Ocorre a formalização das relações institucionais, a estruturação definitiva da equipe, a preparação do ambiente de produção na nuvem e os primeiros passos concretos rumo ao deploy dos contratos. Os custos de infraestrutura aumentam porque o ambiente de desenvolvimento dá lugar ao ambiente de produção, com maior capacidade, monitoramento e resiliência. É também neste mês que se concentram os custos jurídicos e de auditoria de segurança.

&emsp; A **Fase 3** (julho de 2026) marca a Implementação Piloto. Os primeiros usuários reais — a cuidadora Ana e o pesquisador Ricardo — começam a utilizar o sistema, testes de carga são realizados e as primeiras métricas são coletadas. Os custos operacionais crescem entre 10% e 25% em relação à fase anterior.

&emsp; A **Fase 4** (agosto de 2026) é o primeiro mês completo pós-implementação. O sistema opera regularmente, a infraestrutura de nuvem começa a se estabilizar após o pico de julho e pequenas necessidades de suporte de design começam a surgir à medida que o ciclo de contribuição in-kind da UAQ se encerra.

&emsp; A **Fase 5** (setembro de 2026) representa o segundo mês pós-implementação. O volume de usuários cresce moderadamente, a quantidade de dados armazenados aumenta e uma revisão trimestral de compliance é realizada.

&emsp; As **Fases 6, 7 e 8** (outubro, novembro e dezembro de 2026) cobrem os meses de consolidação, estabilidade operacional e fechamento anual, respectivamente.

---

##### 1.4.6.2.1.1 Ferramentas de Hospedagem e Nuvem

&emsp; A linha de Ferramentas de Hospedagem e Nuvem cobre toda a infraestrutura digital que sustenta o AxoloDAO MVP: servidores de aplicação, banco de dados relacional, conexões com a rede Ethereum via RPC providers, APIs de terceiros e ferramentas de monitoramento. Durante os seis primeiros meses do projeto, o parceiro manteve este custo em USD 50,00 mensais, valor referente a uma configuração de desenvolvimento ou staging com recursos mínimos.

&emsp; Para contextualizar os benchmarks: segundo a tabela pública de preços da Amazon Web Services (aws.amazon.com/pricing), uma instância EC2 t3.micro custa USD 8,35 por mês na região us-east-1, enquanto uma t3.small sobe para USD 16,70. O banco de dados gerenciado RDS db.t3.micro custa USD 15,33 mensais. Somando transferência de dados e RPC provider básico, a faixa realista para um projeto desta natureza é de USD 45 a USD 115 mensais, dependendo da fase.

&emsp; Em **abril e maio de 2026 (Fase 1)**, o ambiente ainda é de avaliação técnica controlada, sem necessidade de ambiente de produção. O custo permanece em **USD 50,00**, idêntico ao período anterior.

&emsp; Em **junho de 2026 (Fase 2)**, a decisão de implementação implica migrar de uma instância t3.micro para uma t3.small e ativar o banco de dados com mais capacidade. O custo sobe para **USD 65,00**.

&emsp; Em **julho de 2026 (Fase 3)**, testes de carga e escalonamento elástico elevam o custo para **USD 72,00**.

&emsp; Em **agosto de 2026 (Fase 4)**, a infraestrutura se estabiliza após o pico do piloto, recuando para **USD 68,00**.

&emsp; Em **setembro de 2026 (Fase 5)**, o volume crescente de dados armazenados eleva levemente o custo para **USD 70,00**. De **outubro a dezembro de 2026 (Fases 6, 7 e 8)**, o sistema se consolida em **USD 72,00 mensais**.

| Mês | Fase | Valor (USD) | Valor (MXN) | Variação | Benchmark |
|---|---|---|---|---|---|
| Out-25 (real) | — | 50,00 | 875,00 | — | Zenbit |
| Nov-25 (real) | — | 50,00 | 875,00 | 0% | Zenbit |
| Dez-25 (real) | — | 50,00 | 875,00 | 0% | Zenbit |
| Jan-26 (real) | — | 50,00 | 875,00 | 0% | Zenbit |
| Fev-26 (parceiro) | — | 50,00 | 875,00 | 0% | Zenbit |
| Mar-26 (parceiro) | — | 50,00 | 875,00 | 0% | Zenbit |
| Abr-26 | Fase 1 | 50,00 | 875,00 | 0% | AWS EC2 t3.micro staging (aws.amazon.com/pricing) |
| Mai-26 | Fase 1 | 50,00 | 875,00 | 0% | AWS EC2 t3.micro staging |
| Jun-26 | Fase 2 | 65,00 | 1.137,50 | +30% | AWS t3.small + RDS + RPC provider upgrade |
| Jul-26 | Fase 3 | 72,00 | 1.260,00 | +11% | AWS Auto Scaling + monitoramento (aws.amazon.com/ec2) |
| Ago-26 | Fase 4 | 68,00 | 1.190,00 | -6% | Estabilização pós-piloto (Flexera Cloud Report 2024) |
| Set-26 | Fase 5 | 70,00 | 1.225,00 | +3% | Crescimento storage: RDS + S3 |
| Out-26 | Fase 6 | 72,00 | 1.260,00 | +3% | Operação consolidada |
| Nov-26 | Fase 7 | 72,00 | 1.260,00 | 0% | Estabilidade operacional |
| Dez-26 | Fase 8 | 72,00 | 1.260,00 | 0% | Fechamento anual sem pressão adicional |
| **Total 15M** | | **891,00** | **15.592,50** | | |

---

##### 1.4.6.2.1.2 Domínios e E-mail

&emsp; A linha de Domínios e E-mail cobre o registro do domínio institucional e o serviço de e-mail profissional. O parceiro projetou USD 10,00 mensais para todo o período, valor confirmado pelo mercado.

&emsp; Para referência: o registro de um domínio .org via Namecheap custa entre USD 9,98 e USD 13,98 por ano (namecheap.com, 2025). O Google Workspace Business Starter está precificado em USD 6,00 por usuário por mês (workspace.google.com/pricing). Para uma equipe de dois usuários ativos, o custo total oscila entre USD 8,00 e USD 13,00 mensais.

&emsp; De abril a novembro de 2026, nenhuma alteração estrutural é esperada, mantendo o valor em USD 10,00 mensais. Em dezembro de 2026, a projeção eleva para USD 12,00, refletindo a possibilidade de renovação anual do domínio e a adição de um terceiro usuário de e-mail para o período de encerramento.

| Mês | Fase | Valor (USD) | Valor (MXN) | Variação | Benchmark |
|---|---|---|---|---|---|
| Out-25 (real) | — | 10,00 | 175,00 | — | Zenbit |
| Nov-25 (real) | — | 10,00 | 175,00 | 0% | Zenbit |
| Dez-25 (real) | — | 10,00 | 175,00 | 0% | Zenbit |
| Jan-26 (real) | — | 10,00 | 175,00 | 0% | Zenbit |
| Fev-26 (parceiro) | — | 10,00 | 175,00 | 0% | Zenbit |
| Mar-26 (parceiro) | — | 10,00 | 175,00 | 0% | Zenbit |
| Abr-26 | Fase 1 | 10,00 | 175,00 | 0% | Namecheap + Google Workspace |
| Mai-26 | Fase 1 | 10,00 | 175,00 | 0% | Namecheap + Google Workspace |
| Jun-26 | Fase 2 | 10,00 | 175,00 | 0% | Namecheap + Google Workspace |
| Jul-26 | Fase 3 | 10,00 | 175,00 | 0% | Namecheap + Google Workspace |
| Ago-26 | Fase 4 | 10,00 | 175,00 | 0% | Namecheap + Google Workspace |
| Set-26 | Fase 5 | 10,00 | 175,00 | 0% | Namecheap + Google Workspace |
| Out-26 | Fase 6 | 10,00 | 175,00 | 0% | Namecheap + Google Workspace |
| Nov-26 | Fase 7 | 10,00 | 175,00 | 0% | Namecheap + Google Workspace |
| Dez-26 | Fase 8 | 12,00 | 210,00 | +20% | Renovação anual + expansão e-mail (namecheap.com) |
| **Total 15M** | | **152,00** | **2.660,00** | | |

---

##### 1.4.6.2.1.3 Despesas de Operação e Viagem

&emsp; As Despesas de Operação e Viagem cobrem os custos variáveis de coordenação do projeto: deslocamentos ao BioMuseo Xolotcalli, visitas à UAQ, participação em eventos do ecossistema Web3 no México e despesas menores de coordenação. Esta linha é a mais sensível às fases operacionais, pois a intensidade da atividade presencial varia significativamente ao longo do ciclo.

&emsp; Para referência de mercado: uma viagem Uber de 10 km na CDMX custa entre MXN 80,00 e MXN 150,00 (USD 4,57 a USD 8,57), e uma refeição de trabalho simples fica entre MXN 200,00 e MXN 400,00 (USD 11,43 a USD 22,86). Dois a três deslocamentos com reunião por mês justificam o patamar de USD 50,00. A inflação no México em 2026 é projetada entre 3,5% e 4,8% pelo INEGI (inegi.org.mx), o que embase ajustes graduais ao longo do ano.

&emsp; Em **abril (Fase 1)**, reuniões de avaliação elevam o custo para **USD 52,00**. Em **maio**, a intensificação pré-decisão sobe para **USD 54,00**. Em **junho (Fase 2)**, reuniões de governança e formalização chegam a **USD 60,00**. Em **julho (Fase 3)**, o onboarding presencial no BioMuseo eleva ao pico de **USD 68,00**. Em **agosto (Fase 4)**, com a transição para suporte remoto, recua para **USD 60,00**. Em **setembro (Fase 5)**, reuniões com financiadores levam a **USD 62,00**. Em **outubro e novembro (Fases 6 e 7)**, a rotina consolidada estabiliza em **USD 58,00**. Em **dezembro (Fase 8)**, o encerramento anual eleva ao segundo pico de **USD 65,00**.

| Mês | Fase | Valor (USD) | Valor (MXN) | Variação | Justificativa |
|---|---|---|---|---|---|
| Out-25 (real) | — | 50,00 | 875,00 | — | Zenbit |
| Nov-25 (real) | — | 50,00 | 875,00 | 0% | Zenbit |
| Dez-25 (real) | — | 50,00 | 875,00 | 0% | Zenbit |
| Jan-26 (real) | — | 50,00 | 875,00 | 0% | Zenbit |
| Fev-26 (parceiro) | — | 50,00 | 875,00 | 0% | Zenbit |
| Mar-26 (parceiro) | — | 50,00 | 875,00 | 0% | Zenbit |
| Abr-26 | Fase 1 | 52,00 | 910,00 | +4% | Reuniões avaliação MVP (INEGI inflação 4%) |
| Mai-26 | Fase 1 | 54,00 | 945,00 | +4% | Reuniões intensificadas pré-decisão |
| Jun-26 | Fase 2 | 60,00 | 1.050,00 | +11% | Governança DAO + compliance + alinhamento de papéis |
| Jul-26 | Fase 3 | 68,00 | 1.190,00 | +13% | Onboarding presencial BioMuseo + suporte in loco piloto |
| Ago-26 | Fase 4 | 60,00 | 1.050,00 | -12% | Transição para suporte remoto, visitas pontuais mensais |
| Set-26 | Fase 5 | 62,00 | 1.085,00 | +3% | Reuniões com financiadores + crescimento institucional |
| Out-26 | Fase 6 | 58,00 | 1.015,00 | -6% | Rotina consolidada: visitas mensais planejadas |
| Nov-26 | Fase 7 | 58,00 | 1.015,00 | 0% | Estabilidade operacional |
| Dez-26 | Fase 8 | 65,00 | 1.137,50 | +12% | Reuniões encerramento anual: BioMuseo, SEMARNAT, UAQ |
| **Total 15M** | | **837,00** | **14.647,50** | | |

---

##### 1.4.6.2.1.4 Contingência (10% sobre o Total de Caixa)

&emsp; A Contingência é calculada como 10% da soma das linhas operacionais variáveis, que são hospedagem, domínios, viagem, legal e design, conforme metodologia estabelecida pelo parceiro. A auditoria de segurança, por ser um custo contratado e fixo com escopo definido, é excluída da base de cálculo da contingência, tratada como despesa extraordinária previsível.

&emsp; Com a inclusão das novas linhas de legal e design na base, a contingência passa a refletir um escopo operacional mais completo, crescendo proporcionalmente nos meses em que essas linhas apresentam valores.

| Mês | Fase | Base de cálculo (USD) | Contingência 10% (USD) | Contingência 10% (MXN) |
|---|---|---|---|---|
| Out-25 (real) | — | 110,00 | 11,00 | 192,50 |
| Nov-25 (real) | — | 110,00 | 11,00 | 192,50 |
| Dez-25 (real) | — | 110,00 | 11,00 | 192,50 |
| Jan-26 (real) | — | 110,00 | 11,00 | 192,50 |
| Fev-26 (parceiro) | — | 110,00 | 11,00 | 192,50 |
| Mar-26 (parceiro) | — | 110,00 | 11,00 | 192,50 |
| Abr-26 | Fase 1 | 112,00 | 11,20 | 196,00 |
| Mai-26 | Fase 1 | 114,00 | 11,40 | 199,50 |
| Jun-26 | Fase 2 | 285,00 | 28,50 | 498,75 |
| Jul-26 | Fase 3 | 150,00 | 15,00 | 262,50 |
| Ago-26 | Fase 4 | 168,00 | 16,80 | 294,00 |
| Set-26 | Fase 5 | 247,00 | 24,70 | 432,25 |
| Out-26 | Fase 6 | 170,00 | 17,00 | 297,50 |
| Nov-26 | Fase 7 | 170,00 | 17,00 | 297,50 |
| Dez-26 | Fase 8 | 274,00 | 27,40 | 479,50 |
| **Total 15M** | | | **235,00** | **4.112,50** |

&emsp; O pico da contingência em junho (USD 28,50) reflete a base ampliada pelo custo jurídico de formalização naquele mês. Os valores de setembro e dezembro também são elevados pela presença dos custos de compliance trimestral e de design de encerramento. Todos os meses sem legal ou design retornam ao patamar baixo e previsível esperado para um projeto desta escala.

---

##### 1.4.6.2.1.5 Gastos Onchain

&emsp; Os Gastos Onchain contemplam os custos efetivos de interação com a blockchain Ethereum: taxas de gás para deploy e chamadas de smart contracts, emissão de atestações via EAS, registros de espécimes e medições onchain e eventuais transações de governança.

&emsp; Para referência de mercado: segundo o Etherscan Gas Tracker (etherscan.io/gastracker) e o portal L2fees.info, transações em redes Layer 2 como Arbitrum e Optimism custam entre USD 0,01 e USD 0,20 por operação, contra USD 1,50 a USD 5,00 na Ethereum L1. O AxoloDAO opera em Sepolia (testnet) nas fases de avaliação e em L2 de produção a partir do deploy.

&emsp; Em **abril e maio (Fase 1)**, o sistema opera exclusivamente em testnet. Os valores de **USD 22,00 e USD 23,00** cobrem custos de infraestrutura de nó e testes em L2 de homologação. Em **junho (Fase 2)**, o deploy dos três contratos mais o setup inicial resulta em **USD 28,00**. Em **julho (Fase 3)**, o pico de transações do piloto eleva a **USD 40,00**. Em **agosto e setembro (Fases 4 e 5)**, a operação regular estabiliza em **USD 35,00**. Em **outubro e novembro (Fases 6 e 7)**, o volume crescente de atestações eleva para **USD 38,00**. Em **dezembro (Fase 8)**, as atestações de encerramento anual sobem para **USD 45,00**.

| Mês | Fase | Valor (USD) | Valor (MXN) | Variação | Benchmark |
|---|---|---|---|---|---|
| Out-25 (real) | — | 25,00 | 437,50 | — | Zenbit |
| Nov-25 (real) | — | 25,00 | 437,50 | 0% | Zenbit |
| Dez-25 (real) | — | 25,00 | 437,50 | 0% | Zenbit |
| Jan-26 (real) | — | 25,00 | 437,50 | 0% | Zenbit |
| Fev-26 (parceiro) | — | 25,00 | 437,50 | 0% | Zenbit |
| Mar-26 (parceiro) | — | 25,00 | 437,50 | 0% | Zenbit |
| Abr-26 | Fase 1 | 22,00 | 385,00 | -12% | Testnet Sepolia + node infra (etherscan.io/gastracker) |
| Mai-26 | Fase 1 | 23,00 | 402,50 | +5% | Testes L2 avançados pré-deploy (l2fees.info) |
| Jun-26 | Fase 2 | 28,00 | 490,00 | +22% | Deploy 3 contratos + setup roles + primeiros registros em L2 |
| Jul-26 | Fase 3 | 40,00 | 700,00 | +43% | Pico piloto: 50-80 txs/mês, medições + validações + EAS |
| Ago-26 | Fase 4 | 35,00 | 612,50 | -12% | Estabilização: 40-60 txs/mês (l2fees.info + attest.org) |
| Set-26 | Fase 5 | 35,00 | 612,50 | 0% | Volume onchain estável |
| Out-26 | Fase 6 | 38,00 | 665,00 | +9% | Mais espécimes + atestações EAS regulares |
| Nov-26 | Fase 7 | 38,00 | 665,00 | 0% | Estabilidade operacional |
| Dez-26 | Fase 8 | 45,00 | 787,50 | +18% | Atestações encerramento anual + relatórios + governança DAO |
| **Total 15M** | | **454,00** | **7.945,00** | | |

---

##### 1.4.6.2.1.6 Legal e Compliance

&emsp; A linha de Legal e Compliance, que constava como zero e "pendente conforme necessário" no modelo do parceiro, é ativada em determinados meses do ciclo 2026 à medida que o projeto avança da fase de avaliação para a formalização e operação institucional. Em um projeto que combina tecnologia blockchain, dados de biodiversidade, parceria com museu público e possível captação de financiamento internacional, a existência de suporte jurídico mínimo é metodologicamente necessária, mesmo que pontual e de baixo custo.

&emsp; As principais necessidades jurídicas identificadas para o AxoloDAO no contexto mexicano são: a revisão do modelo de governança da DAO para conformidade com a legislação vigente, o enquadramento do tratamento de dados biológicos sob a Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP), e a produção de documentos mínimos de compliance para apresentação a financiadores e à SEMARNAT. Para referência de mercado: uma consulta ou revisão jurídica simples por um advogado especializado em tecnologia e organizações sem fins lucrativos no México custa entre MXN 3.000,00 e MXN 1.4.000,00 por revisão (USD 171 a USD 343), segundo dados do Colegio de Abogados de México e plataformas de serviços jurídicos como Abogado.com

&emsp; Em **abril e maio de 2026 (Fase 1)**, o projeto ainda está em avaliação técnica, sem necessidade de formalização jurídica. O valor permanece em **USD 0,00**.

&emsp; Em **junho de 2026 (Fase 2)**, a decisão de implementar o sistema em produção e formalizar a parceria entre Zenbit, BioMuseo e UAQ exige uma revisão jurídica dos documentos de governança da DAO e uma checagem de conformidade com a LFPDPPP para o tratamento dos dados ambientais. O custo projetado é de **USD 150,00**, equivalente a MXN 2.625,00 — compatível com uma sessão de consultoria jurídica de duas a três horas com um advogado especializado no México, coberta por plataformas como Abogado.com ou escritórios parceiros de startups tecnológicas na CDMX.

&emsp; Em **julho, agosto e outubro de 2026**, não há ações jurídicas planejadas. O valor permanece em **USD 0,00**.

&emsp; Em **setembro de 2026 (Fase 5)**, uma revisão trimestral de compliance é realizada para assegurar que o projeto mantém conformidade com eventuais atualizações regulatórias e para preparar os documentos de impacto exigidos por financiadores institucionais. O custo é de **USD 75,00**, correspondente a uma revisão mais curta e focada do que a de junho.

&emsp; Em **novembro de 2026**, não há ação jurídica planejada - **USD 0,00**.

&emsp; Em **dezembro de 2026 (Fase 8)**, uma segunda revisão de compliance de encerramento anual é realizada para consolidar a documentação do exercício, preparar o relatório de governança para os financiadores e revisar os termos de parceria para o próximo ciclo. O custo é de **USD 75,00**, mesmo patamar de setembro.

| Mês | Fase | Valor (USD) | Valor (MXN) | Justificativa |
|---|---|---|---|---|
| Out-25 a Mar-26 | — | 0,00 | 0,00 | Valor real/parceiro |
| Abr-26 | Fase 1 | 0,00 | 0,00 | Avaliação técnica, sem necessidade jurídica |
| Mai-26 | Fase 1 | 0,00 | 0,00 | Avaliação técnica, sem necessidade jurídica |
| Jun-26 | Fase 2 | 150,00 | 2.625,00 | Revisão governança DAO + LFPDPPP compliance (Abogado.com.mx) |
| Jul-26 | Fase 3 | 0,00 | 0,00 | Piloto operacional, sem novas demandas jurídicas |
| Ago-26 | Fase 4 | 0,00 | 0,00 | Operação estável, sem ação jurídica |
| Set-26 | Fase 5 | 75,00 | 1.312,50 | Revisão trimestral compliance + docs para financiadores |
| Out-26 | Fase 6 | 0,00 | 0,00 | Consolidação, sem ação jurídica |
| Nov-26 | Fase 7 | 0,00 | 0,00 | Operação estável, sem ação jurídica |
| Dez-26 | Fase 8 | 75,00 | 1.312,50 | Revisão anual de compliance + docs parceria 2027 |
| **Total 15M** | | **300,00** | **5.250,00** | |

&emsp; O total de USD 300,00 ao longo de quinze meses para suporte jurídico é um número baixo em termos absolutos, mas adequado à escala e ao estágio do projeto. Projetos de conservação de espécies ameaçadas que pretendem captar financiamento institucional internacional necessitam de documentação jurídica mínima verificável, e este orçamento representa o piso operacional para essa necessidade.

---

##### 1.4.6.2.1.7 Design e Conteúdo

&emsp; A linha de Design e Conteúdo permanece como zero nas fases em que a contribuição in-kind da UAQ cobre integralmente as necessidades de interface, materiais de comunicação e identidade visual do projeto. A partir do momento em que o ciclo acadêmico dos alunos da UAQ se encerra ou sua dedicação reduz, pequenas necessidades de suporte de design passam a exigir desembolso em caixa.

&emsp; Para referência de mercado: a tarifa horária de um designer freelancer júnior no México em plataformas como Workana ou Freelancer.com varia entre MXN 200,00 e MXN 500,00 por hora (USD 11,43 a USD 28,57). Na plataforma Upwork, perfis mexicanos de design UI/UX de nível intermediário cobram entre USD 15,00 e USD 25,00 por hora. Dois a três horas mensais de suporte representam USD 30,00 a USD 75,00.

&emsp; Em **abril, maio, junho e julho de 2026**, a equipe da UAQ ainda está ativa e cobre todas as necessidades de design. O valor permanece em **USD 0,00**.

&emsp; A partir de **agosto de 2026 (Fase 4)**, com o MVP já em produção e o ciclo semestral da UAQ possivelmente encerrado, pequenos ajustes de interface, correções de UX identificadas pelos usuários reais do BioMuseo e a produção de materiais para apresentação a financiadores passam a demandar suporte externo mínimo. O custo projetado é de **USD 30,00 mensais** (aproximadamente duas horas de freelancer), mantido em agosto, setembro, outubro e novembro.

&emsp; Em **dezembro de 2026 (Fase 8)**, a necessidade de um relatório de impacto anual visualmente bem elaborado, destinado a financiadores e parceiros estratégicos para 2027, eleva o custo para **USD 50,00**, compatível com três a quatro horas de trabalho de design focado em apresentação institucional.

| Mês | Fase | Valor (USD) | Valor (MXN) | Justificativa |
|---|---|---|---|---|
| Out-25 a Mar-26 | — | 0,00 | 0,00 | Valor real/parceiro |
| Abr-26 | Fase 1 | 0,00 | 0,00 | In-kind: UAQ cobre integralmente |
| Mai-26 | Fase 1 | 0,00 | 0,00 | In-kind: UAQ cobre integralmente |
| Jun-26 | Fase 2 | 0,00 | 0,00 | In-kind: UAQ cobre setup e lançamento |
| Jul-26 | Fase 3 | 0,00 | 0,00 | In-kind: UAQ cobre materiais do piloto |
| Ago-26 | Fase 4 | 30,00 | 525,00 | Freelancer 2h: ajustes UI pós-piloto + docs para financiadores (Workana.com) |
| Set-26 | Fase 5 | 30,00 | 525,00 | Freelancer 2h: suporte contínuo pós-UAQ |
| Out-26 | Fase 6 | 30,00 | 525,00 | Freelancer 2h: materiais impacto para captação institucional |
| Nov-26 | Fase 7 | 30,00 | 525,00 | Freelancer 2h: manutenção comunicação |
| Dez-26 | Fase 8 | 50,00 | 875,00 | Freelancer 3-4h: relatório anual impacto + materiais 2027 (Upwork) |
| **Total 15M** | | **170,00** | **2.975,00** | |

---

##### 1.4.6.2.1.8 Auditoria e Security Review (uma vez)

&emsp; A linha de Auditoria e Security Review, descrita pelo parceiro como "opcional, recomendada em 2026", é projetada como um custo único e pontual concentrado em junho de 2026, imediatamente antes do deploy dos contratos em ambiente de produção. A realização de uma auditoria de segurança em smart contracts antes do go-live em mainnet ou L2 de produção é uma prática padrão da indústria blockchain, especialmente para contratos que armazenam dados científicos com pretensão de serem utilizados como evidência verificável para captação de financiamento.

&emsp; O mercado de auditoria de smart contracts em 2025-2026 apresenta uma ampla faixa de preços. Auditores de topo como Trail of Bits, OpenZeppelin Security e Consensys Diligence cobram entre USD 25.000,00 e USD 150.000,00 por auditoria completa, valores adequados a protocolos DeFi com bilhões de dólares em valor bloqueado. Para projetos de menor porte, existem alternativas viáveis. A plataforma Code4rena (code4rena.com) realiza auditorias competitivas (múltiplos auditores independentes revisam o código simultaneamente) com prêmios a partir de USD 500,00 a USD 2.000,00 para contratos de até 800 linhas. A empresa Hacken (hacken.io) oferece revisões de nível iniciante para contratos menores a partir de USD 2.000,00. Firmas menores e auditores independentes no mercado mexicano e latino-americano cobram entre USD 500,00 e USD 1.500,00 por um conjunto de três contratos com lógica de complexidade moderada.

&emsp; Considerando que o AxoloDAO é um projeto MVP, com três contratos de complexidade moderada (total estimado de 600 a 800 linhas de Solidity), a projeção adota o tier de Code4rena ou auditor independente especializado, com custo de USD 800,00. Este valor é suficiente para cobrir: uma revisão manual focada em vulnerabilidades clássicas de Solidity (reentrância, integer overflow, controle de acesso inadequado, oracle issues), execução de ferramentas automatizadas de análise estática como Slither e MythX, e produção de um relatório com achados e recomendações. O fato de o contrato AxoloAccess herdar de OpenZeppelin AccessControl, que é uma biblioteca amplamente auditada, reduz o escopo de risco e torna a revisão mais eficiente.

&emsp; A auditoria é pontual e concentrada em **junho de 2026 (Fase 2)**, antes da migração para produção. Todos os demais meses registram **USD 0,00**.

| Mês | Fase | Valor (USD) | Valor (MXN) | Justificativa |
|---|---|---|---|---|
| Out-25 a Mai-26 | — | 0,00 | 0,00 | Não aplicável (pré-produção) |
| Jun-26 | Fase 2 | 800,00 | 14.000,00 | Code4rena competitive audit / auditor independente (code4rena.com, hacken.io) |
| Jul-26 a Dez-26 | — | 0,00 | 0,00 | Custo único já realizado |
| **Total 15M** | | **800,00** | **14.000,00** | |

&emsp; Embora USD 800,00 represente o maior desembolso único em caixa de toda a seção de Custos em Dinheiro, trata-se de um investimento de alto retorno esperado: um relatório de auditoria positivo aumenta a credibilidade do projeto junto a financiadores institucionais, facilita a aprovação por parte de parceiros como a SEMARNAT e reduz o risco de incidentes de segurança que poderiam comprometer a integridade dos dados de conservação armazenados onchain. Para um projeto cujo valor central é a rastreabilidade verificável de dados científicos, a confiabilidade dos contratos que sustentam essa rastreabilidade é um ativo estratégico.

---

##### 1.4.6.2.1.9 Consolidado Total dos Custos em Dinheiro

&emsp; A tabela a seguir apresenta o consolidado completo das oito linhas de Custos em Dinheiro para os quinze meses de análise (outubro de 2025 a dezembro de 2026), distinguindo dados reais, projeções do parceiro e projeções da equipe discente. A Contingência é recalculada para cada mês com base na nova composição de linhas.

| Mês | Orig. | Hospedagem | Domínios | Viagem | Legal | Design | Audit | Onchain | Conting. | **Total** |
|---|---|---|---|---|---|---|---|---|---|---|
| Out-25 | Real | 50,00 | 10,00 | 50,00 | 0 | 0 | 0 | 25,00 | 11,00 | **146,00** |
| Nov-25 | Real | 50,00 | 10,00 | 50,00 | 0 | 0 | 0 | 25,00 | 11,00 | **146,00** |
| Dez-25 | Real | 50,00 | 10,00 | 50,00 | 0 | 0 | 0 | 25,00 | 11,00 | **146,00** |
| Jan-26 | Real | 50,00 | 10,00 | 50,00 | 0 | 0 | 0 | 25,00 | 11,00 | **146,00** |
| Fev-26 | Parceiro | 50,00 | 10,00 | 50,00 | 0 | 0 | 0 | 25,00 | 11,00 | **146,00** |
| Mar-26 | Parceiro | 50,00 | 10,00 | 50,00 | 0 | 0 | 0 | 25,00 | 11,00 | **146,00** |
| Abr-26 | Proj. | 50,00 | 10,00 | 52,00 | 0 | 0 | 0 | 22,00 | 11,20 | **145,20** |
| Mai-26 | Proj. | 50,00 | 10,00 | 54,00 | 0 | 0 | 0 | 23,00 | 11,40 | **148,40** |
| Jun-26 | Proj. | 65,00 | 10,00 | 60,00 | 150,00 | 0 | 800,00 | 28,00 | 28,50 | **1.141,50** |
| Jul-26 | Proj. | 72,00 | 10,00 | 68,00 | 0 | 0 | 0 | 40,00 | 15,00 | **205,00** |
| Ago-26 | Proj. | 68,00 | 10,00 | 60,00 | 0 | 30,00 | 0 | 35,00 | 16,80 | **219,80** |
| Set-26 | Proj. | 70,00 | 10,00 | 62,00 | 75,00 | 30,00 | 0 | 35,00 | 24,70 | **306,70** |
| Out-26 | Proj. | 72,00 | 10,00 | 58,00 | 0 | 30,00 | 0 | 38,00 | 17,00 | **225,00** |
| Nov-26 | Proj. | 72,00 | 10,00 | 58,00 | 0 | 30,00 | 0 | 38,00 | 17,00 | **225,00** |
| Dez-26 | Proj. | 72,00 | 12,00 | 65,00 | 75,00 | 50,00 | 0 | 45,00 | 27,40 | **346,40** |
| **Total 15M** | | **891,00** | **152,00** | **837,00** | **300,00** | **170,00** | **800,00** | **454,00** | **235,00** | **3.839,00** |

&emsp; O total dos Custos em Dinheiro para os quinze meses analisados é de **USD 3.839,00**, com custo médio mensal de **USD 252,80**. Excluindo o mês de junho de 2026 — que concentra o custo único da auditoria de segurança de USD 800,00 — a média mensal dos demais quatorze meses cai para **USD 217,07**, um número que revela com clareza a estrutura enxuta do projeto.

&emsp; Para comparação direta: os doze meses originalmente projetados pelo parceiro, todos a USD 146,00, totalizam USD 1.752,00. A projeção da equipe para o mesmo período de doze meses (outubro 2025 a setembro 2026) resulta em USD 2.746,60, uma diferença de USD 994,60 — dos quais USD 800,00 são atribuíveis exclusivamente à auditoria de segurança que o parceiro classificou como opcional mas a equipe considerou necessária antes do deploy em produção. Sem a auditoria, a diferença seria de apenas USD 194,60 (11%) sobre os doze meses, confirmando a consistência das projeções da equipe com a estimativa conservadora do parceiro.

---

### Conclusão da subseção de Custos em Dinheiro

&emsp; A análise das oito linhas de Custos em Dinheiro diretos do AxoloDAO MVP para o período de abril a dezembro de 2026, construída sobre benchmarks reais e articulada com as fases operacionais do projeto, confirma e enriquece a conclusão central da análise financeira do parceiro: o AxoloDAO opera com uma estrutura de custos em caixa extraordinariamente eficiente para o nível de valor que entrega ao ecossistema de conservação.

&emsp; A principal contribuição desta projeção em relação ao modelo do parceiro está em três dimensões. Primeiro, a captura da dinâmica de custos ao longo do ciclo de vida do projeto, em vez de valores planos. O perfil resultante revela um mês de junho 2026 significativamente mais caro (USD 1.141,50) por conta do deploy dos contratos, dos custos jurídicos de formalização e da auditoria de segurança — um gasto concentrado e não recorrente que o modelo plano do parceiro não capturava. Segundo, a ativação das três linhas que o parceiro mantinha em zero com justificativas válidas: a auditoria representa um investimento estratégico na credibilidade do projeto; o suporte jurídico é condição mínima para a formalização institucional; e o suporte de design é uma necessidade real após o encerramento do ciclo in-kind da UAQ. Terceiro, o alinhamento explícito entre os valores projetados e benchmarks de mercado verificáveis, tornando o modelo auditável por terceiros — financiadores, avaliadores acadêmicos ou parceiros estratégicos.

O total de USD 3.839,00 para quinze meses, em um projeto que gerencia dados científicos verificáveis de espécies criticamente ameaçadas de extinção utilizando infraestrutura blockchain, representa uma eficiência operacional que poucos projetos de tecnologia aplicada à conservação ambiental conseguem alcançar. Essa eficiência é possível, em grande medida, graças à estrutura de aportes in-kind da UAQ e do BioMuseo Xolotcalli, que absorvem a maior parte dos custos reais de desenvolvimento humano, operação física e gestão científica do projeto.

---

### 1.4.6.3 Análise de Aportes In-Kind e Resultados - AxoloDAO MVP

### 1.4.6.3.1 Aportes In-Kind - AxoloDAO MVP: Projeção de Abril a Dezembro de 2026

### Introdução

&emsp; Esta seção apresenta a análise detalhada dos Aportes In-Kind do projeto AxoloDAO MVP para os quinze meses compreendidos entre outubro de 2025 e dezembro de 2026, com foco interpretativo nas fases projetadas de abril a dezembro de 2021.4. Os aportes in-kind são recursos reais contribuídos ao projeto sem contrapartida financeira direta: horas de trabalho de alunos e mentores da Universidade Autônoma de Querétaro (UAQ), valorizadas a preço de mercado, e a parcela das despesas operacionais e de capital do BioMuseo Xolotcalli formalmente alocada ao ecossistema do AxoloDAO.

&emsp; Longe de serem uma abstração contábil, esses aportes representam 84,1% do investimento total de quinze meses, e são o que torna viável a operação de um sistema blockchain de monitoramento de biodiversidade com desembolso de caixa médio inferior a USD 260 mensais na maior parte do período. A análise dos aportes in-kind é, portanto, inseparável da compreensão do modelo de sustentabilidade financeira do projeto: o AxoloDAO não existe apesar de seus recursos limitados em caixa, mas em razão das parcerias institucionais sólidas que convertem capital humano e infraestrutura física em valor econômico mensurável.

&emsp; A taxa de câmbio adotada é de **MXN 17,50 por USD**, conforme média do quarto trimestre de 2025 publicada pelo Banco de México (Banxico, 2025). Os dados de outubro de 2025 a janeiro de 2026 são valores reais reportados pelo parceiro. Os meses de fevereiro e março de 2026 correspondem à projeção do parceiro Zenbit, mantida como referência. Para abril a dezembro de 2026, os aportes in-kind seguem o padrão estabelecido pelo parceiro — valores constantes que refletem compromissos institucionais fixos — pois sua natureza contratual ou semi-contratual não admite os mesmos tipos de variação por fase que os custos operacionais de mercado.

---

### Estrutura de Fases Operacionais do Projeto

&emsp; As mesmas oito fases que estruturam a análise de Receita e de Custos em Dinheiro se aplicam aqui como contexto interpretativo. A **Fase 1** (abril e maio de 2026) é o período de Avaliação do MVP, com equipe UAQ em plena atividade semestral. A **Fase 2** (junho de 2026) é o Setup de Implementação, mês de maior intensidade técnica e, portanto, de maior valor gerado pela contribuição in-kind. A **Fase 3** (julho de 2026) marca a Implementação Piloto, que coincide com a transição entre semestres na UAQ. As **Fases 4 a 8** (agosto a dezembro de 2026) cobrem o ciclo pós-implementação, da estabilização ao fechamento anual, com retorno à atividade plena da UAQ no segundo semestre.

---

### 1.4.6.3.1.1 UAQ - Alunos (Horas Valorizadas)

&emsp; A linha de UAQ Alunos representa a valorização a preço de mercado das horas dedicadas pelos alunos da Universidade Autônoma de Querétaro ao projeto AxoloDAO. O modelo estabelecido pelo parceiro Zenbit adota três alunos dedicando quatro horas semanais cada, valorizadas a USD 10,00 por hora durante trinta semanas ativas no ano, resultando em USD 3.600,00 anuais, ou **USD 300,00 mensais**, que é o valor constante adotado para todo o período de quinze meses.

&emsp; Para embasar essa valorização: segundo o Glassdoor México (glassdoor.com.mx, 2025), o salário-hora de um desenvolvedor júnior em tecnologia no México varia entre MXN 100,00 e MXN 200,00 (USD 5,71 a USD 11,43 ao câmbio de referência). Para estudantes de nível superior em projetos de tecnologia com supervisão acadêmica, o valor de USD 10,00 por hora é coerente com o mercado mexicano de 2021.4. A equipe discente mantém o valor constante em USD 300,00 para todo o período de abril a dezembro de 2026, pois o compromisso acadêmico semestral da UAQ com o projeto é de natureza institucional e não sofre variações por fase operacional do produto.

| Mês | Fase | Valor (USD) | Valor (MXN) | Base de cálculo |
|---|---|---|---|---|
| Out-25 (real) | — | 300,00 | 5.250,00 | Zenbit |
| Nov-25 (real) | — | 300,00 | 5.250,00 | Zenbit |
| Dez-25 (real) | — | 300,00 | 5.250,00 | Zenbit |
| Jan-26 (real) | — | 300,00 | 5.250,00 | Zenbit |
| Fev-26 (parceiro) | — | 300,00 | 5.250,00 | Zenbit |
| Mar-26 (parceiro) | — | 300,00 | 5.250,00 | Zenbit |
| Abr-26 | Fase 1 | 300,00 | 5.250,00 | 3 alunos × 4h/sem × 30 sem × USD 10/h (Glassdoor MX) |
| Mai-26 | Fase 1 | 300,00 | 5.250,00 | 3 alunos × 4h/sem × 30 sem × USD 10/h |
| Jun-26 | Fase 2 | 300,00 | 5.250,00 | 3 alunos × 4h/sem × 30 sem × USD 10/h |
| Jul-26 | Fase 3 | 300,00 | 5.250,00 | 3 alunos × 4h/sem × 30 sem × USD 10/h |
| Ago-26 | Fase 4 | 300,00 | 5.250,00 | 3 alunos × 4h/sem × 30 sem × USD 10/h |
| Set-26 | Fase 5 | 300,00 | 5.250,00 | 3 alunos × 4h/sem × 30 sem × USD 10/h |
| Out-26 | Fase 6 | 300,00 | 5.250,00 | 3 alunos × 4h/sem × 30 sem × USD 10/h |
| Nov-26 | Fase 7 | 300,00 | 5.250,00 | 3 alunos × 4h/sem × 30 sem × USD 10/h |
| Dez-26 | Fase 8 | 300,00 | 5.250,00 | 3 alunos × 4h/sem × 30 sem × USD 10/h |
| **Total 15M** | | **4.500,00** | **78.750,00** | |

&emsp; A valorização de USD 10,00 por hora é conservadora em relação ao mercado: representa o piso inferior da faixa de remuneração de desenvolvedores juniores no México, desconsiderando qualquer prêmio pela especialização em blockchain e Solidity, que elevaria esse valor para USD 15,00 a USD 25,00 por hora segundo o Glassdoor México para o perfil de Smart Contract Developer. A adoção do valor conservador pelo parceiro é metodologicamente adequada para um contexto de contribuição acadêmica voluntária, e a equipe discente a mantém sem ajustes.

---

### 1.4.6.3.1.2 UAQ - Mentores (Horas Valorizadas)

&emsp; A linha de UAQ Mentores valoriza as horas dedicadas por dois mentores sêniores da UAQ à supervisão técnica e científica do projeto. O modelo do parceiro adota dois mentores dedicando duas horas semanais cada, valorizadas a USD 15,00 por hora durante trinta semanas ativas, resultando em USD 1.800,00 anuais, ou **USD 150,00 mensais**.

&emsp; A valorização de USD 15,00 hora para mentores com perfil de professor ou pesquisador sênior é marcadamente conservadora. Segundo o Glassdoor México, profissionais com esse perfil em universidades públicas mexicanas com dedicação exclusiva recebem entre MXN 25.000,00 e MXN 45.000,00 mensais (USD 22,86 a USD 41,14 ao câmbio de referência), equivalendo a taxas horárias entre USD 16,07 e USD 28,90 para uma jornada de 35 horas semanais. O valor de USD 15,00 hora adotado representa um desconto de 7% a 48% sobre o preço de mercado pleno, reflexo da natureza de contribuição voluntária em contexto universitário e do caráter de serviço público que orienta a participação de pesquisadores em projetos de conservação ambiental. O valor é mantido constante em **USD 150,00 mensais** para todo o período de quinze meses.

| Mês | Fase | Valor (USD) | Valor (MXN) | Base de cálculo |
|---|---|---|---|---|
| Out-25 (real) | — | 150,00 | 2.625,00 | Zenbit |
| Nov-25 (real) | — | 150,00 | 2.625,00 | Zenbit |
| Dez-25 (real) | — | 150,00 | 2.625,00 | Zenbit |
| Jan-26 (real) | — | 150,00 | 2.625,00 | Zenbit |
| Fev-26 (parceiro) | — | 150,00 | 2.625,00 | Zenbit |
| Mar-26 (parceiro) | — | 150,00 | 2.625,00 | Zenbit |
| Abr-26 | Fase 1 | 150,00 | 2.625,00 | 2 mentores × 2h/sem × 30 sem × USD 15/h (Glassdoor MX) |
| Mai-26 | Fase 1 | 150,00 | 2.625,00 | 2 mentores × 2h/sem × 30 sem × USD 15/h |
| Jun-26 | Fase 2 | 150,00 | 2.625,00 | 2 mentores × 2h/sem × 30 sem × USD 15/h |
| Jul-26 | Fase 3 | 150,00 | 2.625,00 | 2 mentores × 2h/sem × 30 sem × USD 15/h |
| Ago-26 | Fase 4 | 150,00 | 2.625,00 | 2 mentores × 2h/sem × 30 sem × USD 15/h |
| Set-26 | Fase 5 | 150,00 | 2.625,00 | 2 mentores × 2h/sem × 30 sem × USD 15/h |
| Out-26 | Fase 6 | 150,00 | 2.625,00 | 2 mentores × 2h/sem × 30 sem × USD 15/h |
| Nov-26 | Fase 7 | 150,00 | 2.625,00 | 2 mentores × 2h/sem × 30 sem × USD 15/h |
| Dez-26 | Fase 8 | 150,00 | 2.625,00 | 2 mentores × 2h/sem × 30 sem × USD 15/h |
| **Total 15M** | | **2.250,00** | **39.375,00** | |

&emsp; O diferencial de valorização entre alunos (USD 10/h) e mentores (USD 15/h) reflete adequadamente a hierarquia de expertise: mentores com doutorado e histórico de pesquisa em biodiversidade trazem ao projeto um capital intelectual que vai além da execução técnica. Na prática, esse diferencial é ainda mais pronunciado do que o refletido nos valores adotados.

---

### 1.4.6.3.1.3 BioMuseo - Despesas Operacionais Alocadas (90%)

&emsp; Esta linha representa 90% das despesas operacionais totais do BioMuseo Xolotcalli alocadas ao projeto AxoloDAO, conforme premissa estabelecida pelo parceiro Zenbit. A alocação de 90% é justificada pelo fato de que o BioMuseo foi concebido e estruturado como infraestrutura operacional direta do ecossistema de conservação que o AxoloDAO digitaliza, que são folha de pagamento, serviços de água, eletricidade e aluguel, e gastos variáveis de operação existem em função dos axolotes que o sistema monitora.

&emsp; As despesas operacionais do BioMuseo compreendem a folha de pagamento (Fernanda USD 90,00/mês e Guadalupe USD 552,00/mês), serviços fixos (água USD 25,00, eletricidade USD 106,00, aluguel USD 69,00) e gastos variáveis médios de USD 48,43/mês, somando USD 890,43/mês a partir de fevereiro de 2021.4. Os meses reais de outubro de 2025 a janeiro de 2026 apresentam variações decorrentes de oscilações nos gastos variáveis registrados, valores que o parceiro estabilizou na média histórica para as projeções subsequentes.

&emsp; De abril a dezembro de 2026, as despesas operacionais do BioMuseo permanecem em USD 890,43 mensais, estrutura de custo fixo que não sofre variação por fase operacional do produto digital. A alocação de 90% resulta em **USD 801,39 mensais** para todo o período de abril a dezembro de 2021.4.

| Mês | Fase | Custo Op. Total BioMuseo (USD) | Alocação 90% (USD) | Alocação 90% (MXN) |
|---|---|---|---|---|
| Out-25 (real) | — | 867,23 | 780,51 | 13.658,93 |
| Nov-25 (real) | — | 892,01 | 802,81 | 14.049,18 |
| Dez-25 (real) | — | 888,86 | 799,97 | 13.999,53 |
| Jan-26 (real) | — | 854,65 | 769,19 | 13.460,83 |
| Fev-26 (parceiro) | — | 890,43 | 801,39 | 14.024,33 |
| Mar-26 (parceiro) | — | 890,43 | 801,39 | 14.024,33 |
| Abr-26 | Fase 1 | 890,43 | 801,39 | 14.024,33 |
| Mai-26 | Fase 1 | 890,43 | 801,39 | 14.024,33 |
| Jun-26 | Fase 2 | 890,43 | 801,39 | 14.024,33 |
| Jul-26 | Fase 3 | 890,43 | 801,39 | 14.024,33 |
| Ago-26 | Fase 4 | 890,43 | 801,39 | 14.024,33 |
| Set-26 | Fase 5 | 890,43 | 801,39 | 14.024,33 |
| Out-26 | Fase 6 | 890,43 | 801,39 | 14.024,33 |
| Nov-26 | Fase 7 | 890,43 | 801,39 | 14.024,33 |
| Dez-26 | Fase 8 | 890,43 | 801,39 | 14.024,33 |
| **Total 15M** | | **13.316,43** | **11.967,77** | **209.436,00** |

&emsp; Esta é a maior linha individual de aporte in-kind, superando a soma de todas as contribuições da UAQ (USD 1.4.750,00). Ela confirma o papel estrutural do BioMuseo como âncora física e operacional insubstituível do projeto: sem a infraestrutura de tanques, cuidadores e instalações do museu, não há dados de conservação a registrar onchain.

---

### 1.4.6.3.1.4 BioMuseo - CAPEX e Ativos Alocados (90%)

&emsp; Esta linha representa 90% do investimento em capital fixo e ativos do BioMuseo Xolotcalli alocado ao projeto, seguindo a mesma premissa de 90%. O CAPEX inclui ativos fixos como estruturas de aquários e tanques, equipamentos biológicos de monitoramento e ativos menores recorrentes.

&emsp; A distribuição temporal do CAPEX é profundamente assimétrica: em outubro de 2025 foi realizado um investimento concentrado de MXN 31.4.841,00 (aproximadamente USD 2.105,20) em ativos fixos e biológicos, provavelmente a aquisição da estrutura inicial de tanques e espécimes para o projeto,  que eleva o total alocado naquele mês para USD 2.138,19 (90%). Nos meses seguintes, o CAPEX cai abruptamente para a aquisição de ativos menores recorrentes, estabilizando-se em MXN 1.137,00 mensais (USD 64,97) a partir de fevereiro de 2026, com 90% de alocação resultando em **USD 58,47 mensais** para todo o período de abril a dezembro de 2021.4.

| Mês | Fase | CAPEX Total BioMuseo (USD) | Alocação 90% (USD) | Alocação 90% (MXN) |
|---|---|---|---|---|
| Out-25 (real) | — | 2.375,77 | 2.138,19 | 37.418,33 |
| Nov-25 (real) | — | 119,20 | 107,28 | 1.877,40 |
| Dez-25 (real) | — | 10,74 | 9,67 | 169,18 |
| Jan-26 (real) | — | 64,97 | 58,47 | 1.023,23 |
| Fev-26 (parceiro) | — | 64,97 | 58,47 | 1.023,23 |
| Mar-26 (parceiro) | — | 64,97 | 58,47 | 1.023,23 |
| Abr-26 | Fase 1 | 64,97 | 58,47 | 1.023,23 |
| Mai-26 | Fase 1 | 64,97 | 58,47 | 1.023,23 |
| Jun-26 | Fase 2 | 64,97 | 58,47 | 1.023,23 |
| Jul-26 | Fase 3 | 64,97 | 58,47 | 1.023,23 |
| Ago-26 | Fase 4 | 64,97 | 58,47 | 1.023,23 |
| Set-26 | Fase 5 | 64,97 | 58,47 | 1.023,23 |
| Out-26 | Fase 6 | 64,97 | 58,47 | 1.023,23 |
| Nov-26 | Fase 7 | 64,97 | 58,47 | 1.023,23 |
| Dez-26 | Fase 8 | 64,97 | 58,47 | 1.023,23 |
| **Total 15M** | | **3.285,40** | **2.956,82** | **51.744,33** |

&emsp; O forte declínio do CAPEX após outubro de 2025 é positivo para a análise de sustentabilidade: indica que o investimento estrutural em ativos permanentes foi realizado no período de arranque e que os meses seguintes operam sobre uma base de ativos já constituída, sem necessidade de novos aportes expressivos em imobilizado. A estabilidade em USD 58,47 mensais de abril a dezembro de 2026 representa um custo de manutenção e renovação de ativos menor bastante administrável.

---

### 1.4.6.3.1.5 Total dos Aportes In-Kind - Consolidado

&emsp; A tabela a seguir apresenta o consolidado das quatro linhas de aportes in-kind para os quinze meses de análise.

| Mês | Orig. | UAQ Alunos | UAQ Mentores | Bio Op (90%) | Bio CAPEX (90%) | **Total In-Kind** |
|---|---|---|---|---|---|---|
| Out-25 | Real | 300,00 | 150,00 | 780,51 | 2.138,19 | **3.368,70** |
| Nov-25 | Real | 300,00 | 150,00 | 802,81 | 107,28 | **1.360,09** |
| Dez-25 | Real | 300,00 | 150,00 | 799,97 | 9,67 | **1.259,64** |
| Jan-26 | Real | 300,00 | 150,00 | 769,19 | 58,47 | **1.277,66** |
| Fev-26 | Parceiro | 300,00 | 150,00 | 801,39 | 58,47 | **1.309,86** |
| Mar-26 | Parceiro | 300,00 | 150,00 | 801,39 | 58,47 | **1.309,86** |
| Abr-26 | Proj. | 300,00 | 150,00 | 801,39 | 58,47 | **1.309,86** |
| Mai-26 | Proj. | 300,00 | 150,00 | 801,39 | 58,47 | **1.309,86** |
| Jun-26 | Proj. | 300,00 | 150,00 | 801,39 | 58,47 | **1.309,86** |
| Jul-26 | Proj. | 300,00 | 150,00 | 801,39 | 58,47 | **1.309,86** |
| Ago-26 | Proj. | 300,00 | 150,00 | 801,39 | 58,47 | **1.309,86** |
| Set-26 | Proj. | 300,00 | 150,00 | 801,39 | 58,47 | **1.309,86** |
| Out-26 | Proj. | 300,00 | 150,00 | 801,39 | 58,47 | **1.309,86** |
| Nov-26 | Proj. | 300,00 | 150,00 | 801,39 | 58,47 | **1.309,86** |
| Dez-26 | Proj. | 300,00 | 150,00 | 801,39 | 58,47 | **1.309,86** |
| **Total 15M** | | **4.500,00** | **2.250,00** | **11.967,77** | **2.956,82** | **21.674,59** |

&emsp; O total acumulado de aportes in-kind em quinze meses é de **USD 21.674,59**. O único mês com comportamento atípico é outubro de 2025 (USD 3.368,70), distorcido pelo CAPEX expressivo de arranque do BioMuseo. A partir de novembro de 2025, o fluxo in-kind estabiliza-se em USD 1.309,86 mensais, valor previsível e bem dimensionado para o perfil do projeto que se mantém constante durante todo o período de abril a dezembro de 2021.4.

---

### Conclusão da Seção de Aportes In-Kind

&emsp; Os aportes in-kind do AxoloDAO MVP representam muito mais do que uma linha contábil auxiliar: são a espinha dorsal do modelo de sustentabilidade financeira do projeto. Com USD 21.674,59 em recursos não monetários ao longo de quinze meses — 84,1% do investimento total — o projeto consegue operar com desembolso em caixa de apenas USD 252,80 mensais em média, um valor extraordinariamente baixo para um sistema de rastreabilidade blockchain em operação real com dados científicos verificáveis.

&emsp; A composição dos aportes revela dois tipos de contribuição complementares. A UAQ contribui com capital humano especializado — desenvolvedores e pesquisadores que, sem o projeto, precisariam ser contratados a preço de mercado por um valor três a cinco vezes superior ao conservadoramente adotado no modelo. O BioMuseo contribui com infraestrutura física e operacional sem a qual os dados monitorados pelo sistema simplesmente não existiriam. Nenhum dos dois é substituível por desembolso em caixa dentro do horizonte de 2026, o que transforma essas parcerias institucionais em ativos estratégicos do projeto tão importantes quanto o código dos contratos ou a arquitetura técnica do sistema.

---

### 1.4.6.4 Resultados AxoloDAO MVP

### Introdução 

&emsp; A seção de Resultados integra todas as linhas anteriores, que são receita direta do AxoloDAO, custos em dinheiro e aportes in-kind, nas quatro métricas de resultado que compõem a visão consolidada do desempenho financeiro do projeto: a Receita do Ecossistema, o Resultado Líquido em Caixa, o Resultado Líquido incluindo In-Kind e o Investimento Total. Essas métricas são os insumos diretos para o cálculo do ROI do projeto, apresentado ao final desta seção.

&emsp; A lógica de cada métrica é a seguinte. A Receita do Ecossistema combina 90% da receita total do BioMuseo Xolotcalli com a receita direta do AxoloDAO, refletindo o valor econômico total gerado pelo ecossistema do projeto pelo conjunto formado pelo museu e pelo sistema de conservação que ele digitaliza. O Resultado Líquido em Caixa é a diferença entre a receita direta do AxoloDAO e seus custos diretos em dinheiro, revelando a posição de caixa pura da operação mês a mês. O Resultado Líquido incluindo In-Kind subtrai adicionalmente os aportes in-kind, evidenciando o quanto a receita direta cobre do custo total real do projeto. O Investimento Total soma custos em caixa e aportes in-kind, representando o custo real completo de manter o projeto em operação.

---

### 1.4.6.4.1 Receita do Ecossistema (BioMuseo 90% + AxoloDAO)

&emsp; A Receita do Ecossistema é a métrica mais abrangente do modelo. Ela soma 90% da receita total gerada pelo BioMuseo Xolotcalli, subsídio AxoloDAO, receitas por visitas e vendas de produtos, com a receita direta do AxoloDAO proveniente de bolsas, doações, patrocínios corporativos e licenciamento. Representa o valor econômico total que o ecossistema de conservação produz em razão da existência e do funcionamento do projeto.

&emsp; Os meses de dados reais (outubro de 2025 a janeiro de 2026) apresentam variações significativas decorrentes das flutuações sazonais na receita por visitas do BioMuseo, com pico em janeiro de 2026 (USD 3.104,13) e vale em outubro de 2025 (USD 1.706,11). A partir de março de 2026, quando os valores do BioMuseo convergem para a média histórica projetada, a receita do ecossistema estabiliza-se em um patamar crescente entre USD 2.417,63 (abril) e USD 2.669,49 (dezembro), alimentado pelo crescimento gradual da receita direta do AxoloDAO ao longo das fases de implementação.

&emsp; A receita do ecossistema cresce de forma consistente de abril a dezembro de 2026 (+10,4% acumulado), impulsionada exclusivamente pelo aumento da receita direta AxoloDAO, já que a parcela do BioMuseo permanece estável nesse período. Esse crescimento reflete o amadurecimento das linhas de receita conforme o sistema entra em operação real a partir de julho e produz evidências verificáveis que fortalecem a captação de bolsas, doações e patrocínios.

| Mês | Orig. | Rec. BioMuseo Total (USD) | 90% BioMuseo (USD) | AxoloDAO Direto (USD) | **Receita Ecossistema (USD)** |
|---|---|---|---|---|---|
| Out-25 | Real | 1.534,57 | 1.381,11 | 325,00 | **1.706,11** |
| Nov-25 | Real | 2.600,66 | 2.340,59 | 325,00 | **2.665,59** |
| Dez-25 | Real | 2.020,17 | 1.818,15 | 325,00 | **2.143,15** |
| Jan-26 | Real | 3.087,93 | 2.779,13 | 325,00 | **3.104,13** |
| Fev-26 | Parceiro | 2.306,51 | 2.075,86 | 625,00 | **2.700,86** |
| Mar-26 | Parceiro | 2.075,94 | 1.868,35 | 625,00 | **2.493,35** |
| Abr-26 | Proj. | 2.047,37 | 1.842,63 | 575,00 | **2.417,63** |
| Mai-26 | Proj. | 2.061,66 | 1.855,49 | 585,00 | **2.440,49** |
| Jun-26 | Proj. | 2.054,51 | 1.849,06 | 618,50 | **2.467,56** |
| Jul-26 | Proj. | 2.058,09 | 1.852,28 | 650,22 | **2.502,50** |
| Ago-26 | Proj. | 2.056,30 | 1.850,67 | 673,80 | **2.524,47** |
| Set-26 | Proj. | 2.075,94 | 1.868,35 | 690,75 | **2.559,10** |
| Out-26 | Proj. | 2.063,44 | 1.857,10 | 729,67 | **2.586,77** |
| Nov-26 | Proj. | 2.063,44 | 1.857,10 | 755,48 | **2.612,58** |
| Dez-26 | Proj. | 2.063,44 | 1.857,05 | 812,39 | **2.669,49** |
| **Total 15M** | | | | **8.640,81** | **37.593,80** |

&emsp; O total de Receita do Ecossistema de **USD 37.593,80** em quinze meses é a base do cálculo do ROI do projeto. Dezembro de 2026 apresenta o maior valor projetado (USD 2.669,49), combinando o pico sazonal de doações — que segundo a CAF e o Network for Good concentra entre 25% e 40% das doações anuais de ONGs ambientais — com a maturidade crescente de todas as demais linhas de receita.

---

### 1.4.6.4.2 Resultado Líquido em Caixa

&emsp; O Resultado Líquido em Caixa mede exclusivamente a diferença entre a receita direta do AxoloDAO e seus custos diretos em dinheiro. É a métrica mais restrita do modelo e revela a capacidade da operação digital pura de cobrir seus próprios desembolsos, independentemente dos aportes in-kind.

&emsp; De outubro de 2025 a março de 2026, com custos fixos em USD 146,00 e receita variando entre USD 325,00 e USD 625,00, o resultado em caixa foi consistentemente positivo, entre USD 179,00 e USD 479,00. A partir de abril de 2026, com os custos projetados por fases, o resultado segue positivo na maioria dos meses com a única exceção de junho de 2021.4.

&emsp;  **junho de 2026 (Fase 2)**, o resultado em caixa é de **USD -508,00**, o único mês negativo de todo o período. Este resultado reflete a concentração naquele mês dos custos estruturais de implantação em produção: a auditoria de segurança (USD 800,00), o upgrade de infraestrutura para ambiente de produção, as despesas jurídicas de formalização e as primeiras transações de deploy onchain. Trata-se de um investimento único e não recorrente: nos doze meses restantes o resultado em caixa é sistematicamente positivo. Nos demais meses projetados, o resultado oscila entre USD 394,55 (setembro, mês com maior custo de compliance) e USD 533,48 (novembro, mês de maior receita acumulada sem custos extraordinários).

| Mês | Orig. | Receita AxoloDAO (USD) | Custos Cash (USD) | **Resultado Líq. Cash (USD)** |
|---|---|---|---|---|
| Out-25 | Real | 325,00 | 146,00 | **179,00** |
| Nov-25 | Real | 325,00 | 146,00 | **179,00** |
| Dez-25 | Real | 325,00 | 146,00 | **179,00** |
| Jan-26 | Real | 325,00 | 146,00 | **179,00** |
| Fev-26 | Parceiro | 625,00 | 146,00 | **479,00** |
| Mar-26 | Parceiro | 625,00 | 146,00 | **479,00** |
| Abr-26 | Proj. | 575,00 | 145,20 | **429,80** |
| Mai-26 | Proj. | 585,00 | 148,40 | **436,60** |
| Jun-26 | Proj. | 618,50 | 1.141,50 | **-508,00** |
| Jul-26 | Proj. | 650,22 | 205,00 | **445,22** |
| Ago-26 | Proj. | 673,80 | 219,80 | **457,00** |
| Set-26 | Proj. | 690,75 | 306,70 | **394,55** |
| Out-26 | Proj. | 729,67 | 225,00 | **507,67** |
| Nov-26 | Proj. | 755,48 | 225,00 | **533,48** |
| Dez-26 | Proj. | 812,39 | 346,40 | **478,49** |
| **Total 15M** | | **8.640,81** | **3.839,00** | **4.848,81** |

&emsp; O total acumulado de Resultado Líquido em Caixa de **USD 4.848,81** ao longo de quinze meses confirma que o AxoloDAO, mesmo com as oito linhas de custo incorporadas, gera receita direta suficiente para cobrir todos os desembolsos diretos e ainda produzir um excedente. A negatividade pontual de junho não representa fragilidade estrutural, é a marca contábil de um mês de investimento concentrado que habilita a operação de todos os meses seguintes.

---

### 1.4.6.4.3 Resultado Líquido Incluindo In-Kind

&emsp; O Resultado Líquido incluindo In-Kind apresenta a posição financeira completa do projeto: receita direta do AxoloDAO menos custos em caixa menos aportes in-kind. Esta métrica é sistematicamente negativa ao longo de todos os quinze meses, o que é esperado e metodologicamente correto para um projeto desta natureza.

&emsp; A negatividade estrutural desta linha não representa insolvência nem ineficiência. Ela reflete o fato de que o AxoloDAO é um projeto de conservação de biodiversidade, cujo valor para a sociedade, registros onchain verificáveis de espécies criticamente ameaçadas, dados científicos abertos e auditáveis, infraestrutura replicável para outras espécies, não se converte integralmente em receita monetária direta. Os aportes in-kind são a expressão financeira do compromisso institucional da UAQ e do BioMuseo com esse valor não monetizável.

&emsp; O valor mais negativo é outubro de 2025 (USD -3.189,70), distorcido pelo CAPEX expressivo de arranque do BioMuseo. A partir de novembro de 2025, o resultado estabiliza-se em uma faixa mais estreita. A trajetória de melhora gradual ao longo de 2026, de USD -880,06 em abril para USD -831,37 em dezembro, com variações intermediárias, reflete o crescimento constante da receita direta reduzindo progressivamente o gap entre receita e custo total real. Junho de 2026 registra o valor mais negativo do ano (USD -1.817,86) por conta da auditoria, enquanto julho apresenta o menos negativo do período projetado (USD -864,64).

| Mês | Orig. | Receita AxoloDAO (USD) | Cash (USD) | In-Kind (USD) | **Resultado Líq. Incl. In-Kind (USD)** |
|---|---|---|---|---|---|
| Out-25 | Real | 325,00 | 146,00 | 3.368,70 | **-3.189,70** |
| Nov-25 | Real | 325,00 | 146,00 | 1.360,09 | **-1.181,09** |
| Dez-25 | Real | 325,00 | 146,00 | 1.259,64 | **-1.080,64** |
| Jan-26 | Real | 325,00 | 146,00 | 1.277,66 | **-1.098,66** |
| Fev-26 | Parceiro | 625,00 | 146,00 | 1.309,86 | **-830,86** |
| Mar-26 | Parceiro | 625,00 | 146,00 | 1.309,86 | **-830,86** |
| Abr-26 | Proj. | 575,00 | 145,20 | 1.309,86 | **-880,06** |
| Mai-26 | Proj. | 585,00 | 148,40 | 1.309,86 | **-873,26** |
| Jun-26 | Proj. | 618,50 | 1.141,50 | 1.309,86 | **-1.817,86** |
| Jul-26 | Proj. | 650,22 | 205,00 | 1.309,86 | **-864,64** |
| Ago-26 | Proj. | 673,80 | 219,80 | 1.309,86 | **-852,86** |
| Set-26 | Proj. | 690,75 | 306,70 | 1.309,86 | **-915,31** |
| Out-26 | Proj. | 729,67 | 225,00 | 1.309,86 | **-802,19** |
| Nov-26 | Proj. | 755,48 | 225,00 | 1.309,86 | **-776,38** |
| Dez-26 | Proj. | 812,39 | 346,40 | 1.309,86 | **-831,37** |
| **Total 15M** | | **8.640,81** | **3.839,00** | **21.674,59** | **-11.4.825,80** |

&emsp; A interpretação correta desta métrica é que o AxoloDAO requer USD 11.4.825,80 em aportes totais acima de sua receita direta para operar durante quinze meses, uma média de USD 1.121,72 mensais. Esse é o custo real de manter um sistema de rastreabilidade onchain de biodiversidade em operação, um valor notavelmente baixo para a infraestrutura técnica e científica que o projeto disponibiliza.

---

### 1.4.6.4.4 Investimento Total e ROI

&emsp; O Investimento Total é a soma dos custos diretos em caixa com os aportes in-kind mensais. Ele é o denominador dos dois cálculos de ROI do projeto e representa o custo real completo de manter o AxoloDAO em operação, incluindo tudo o que foi efetivamente consumido, pago ou contribuído para que o sistema funcionasse.

| Mês | Orig. | Custos Cash (USD) | Aportes In-Kind (USD) | **Investimento Total (USD)** |
|---|---|---|---|---|
| Out-25 | Real | 146,00 | 3.368,70 | **3.514,70** |
| Nov-25 | Real | 146,00 | 1.360,09 | **1.506,09** |
| Dez-25 | Real | 146,00 | 1.259,64 | **1.405,64** |
| Jan-26 | Real | 146,00 | 1.277,66 | **1.423,66** |
| Fev-26 | Parceiro | 146,00 | 1.309,86 | **1.455,86** |
| Mar-26 | Parceiro | 146,00 | 1.309,86 | **1.455,86** |
| Abr-26 | Proj. | 145,20 | 1.309,86 | **1.455,06** |
| Mai-26 | Proj. | 148,40 | 1.309,86 | **1.458,26** |
| Jun-26 | Proj. | 1.141,50 | 1.309,86 | **2.436,36** |
| Jul-26 | Proj. | 205,00 | 1.309,86 | **1.514,86** |
| Ago-26 | Proj. | 219,80 | 1.309,86 | **1.526,66** |
| Set-26 | Proj. | 306,70 | 1.309,86 | **1.606,06** |
| Out-26 | Proj. | 225,00 | 1.309,86 | **1.531,86** |
| Nov-26 | Proj. | 225,00 | 1.309,86 | **1.531,86** |
| Dez-26 | Proj. | 346,40 | 1.309,86 | **1.643,76** |
| **Total 15M** | | **3.839,00** | **21.674,59** | **25.466,61** |

&emsp; O investimento total de quinze meses é de **USD 25.466,61**, dos quais apenas **USD 3.839,00 (15,1%)** correspondem a desembolso efetivo em caixa. Os restantes **USD 21.674,59 (84,9%)** são aportes in-kind, confirmando a estrutura altamente alavancada do modelo financeiro do AxoloDAO. Junho de 2026 é o único mês em que os custos de caixa superam os aportes in-kind (USD 1.141,50 vs. USD 1.309,86), reflexo do pico de investimento estrutural concentrado naquele mês.

&emsp; Com base nesses totais, as duas métricas de retorno sobre o investimento do projeto para o período de quinze meses são as seguintes:

**ROI do Ecossistema** = (Receita do Ecossistema − Investimento Total) / Investimento Total
= (USD 37.593,80 − USD 25.466,61) / USD 25.466,61 = **47,6%**

&emsp; Isso significa que para cada dólar investido no projeto — em caixa ou in-kind — o ecossistema gera USD 1,476 em receita, ou USD 0,476 de retorno líquido. Este ROI é robusto para um projeto MVP de conservação ambiental sem fins lucrativos no estágio de quinze meses.

**ROI sobre Caixa** = (Receita do Ecossistema − Custos Cash) / Custos Cash
= (USD 37.593,80 − USD 3.839,00) / USD 3.839,00 = **891,4%**

&emsp; O ROI sobre caixa de 891,4% é a métrica que melhor ilustra a alavancagem estrutural do modelo: cada dólar efetivamente desembolsado em caixa pelo AxoloDAO sustenta quase dez dólares de receita para o ecossistema, graças à amplificação proporcionada pelos aportes in-kind institucionais. Essa razão de alavancagem é característica de projetos de impacto socioambiental que operam com parcerias universitárias e de infraestrutura sólidas, e é o principal argumento financeiro a ser apresentado a potenciais financiadores que avaliem o custo-efetividade do investimento no projeto.

---

### Conclusão

&emsp; A análise integrada dos Aportes In-Kind e dos Resultados do AxoloDAO MVP para outubro de 2025 a dezembro de 2026 revela um modelo financeiro construído sobre três pilares que se reforçam mutuamente.

&emsp; O primeiro é a sustentação in-kind como vantagem competitiva. Com 84,9% do investimento total coberto por aportes não monetários, o AxoloDAO consegue operar com custo de caixa médio de USD 252,80 mensais, um patamar que nenhum projeto equivalente conseguiria atingir sem as parcerias institucionais com a UAQ e o BioMuseo. Essas parcerias não são apenas financeiramente convenientes: são estruturalmente necessárias, pois fornecem os dois elementos que o caixa jamais poderia comprar no curto prazo, a expertise técnica-científica dos pesquisadores de biodiversidade e a infraestrutura física dos tanques e espécimes.

&emsp; O segundo pilar é a autossustentabilidade em caixa. A receita direta do AxoloDAO cobre todos os seus custos diretos ao longo de catorze dos quinze meses analisados, gerando um excedente acumulado de USD 4.848,81. O único mês de resultado negativo em caixa - junho de 2026 - é explicado inteiramente pela concentração do investimento estrutural de implantação, e não representa fragilidade recorrente.

&emsp; O terceiro pilar é a trajetória de crescimento consistente. A receita do ecossistema cresce de USD 1.706,11 em outubro de 2025 para USD 2.669,49 em dezembro de 2026, um aumento de 56,4% ao longo do período. Esse crescimento é alimentado pelo amadurecimento progressivo das linhas de receita direta, bolsas, doações, patrocínios e licenciamento, que respondem com defasagens distintas à implementação real do sistema. O verdadeiro potencial de escalonamento desta trajetória estará disponível a partir de 2027, quando o primeiro ano completo de dados onchain verificáveis tornar o projeto competitivo em editais de maior porte e o pipeline de contratos de licenciamento iniciado em 2026 começar a se materializar em receita formal.

---

## 1.4.7 Investimento

&emsp; O investimento total do projeto AxoloDAO para o período de 15 meses (outubro de 2025 a dezembro de 2026) é a soma de todos os recursos efetivamente consumidos para mantê-lo em operação - independentemente de terem sido pagos em dinheiro ou contribuídos como aporte em espécie (in-kind). Compreender a composição desse investimento é fundamental para interpretar corretamente as métricas de retorno apresentadas na seção seguinte.

### Composição do investimento

&emsp; O investimento total apurado pela equipe é de **USD 25.466,61**, distribuído entre desembolso direto em caixa e aportes in-kind:

| Categoria | Valor (USD) | % do Total |
|---|---|---|
| Desembolso em Caixa (Cash) | 3.839,00 | 15,1% |
| Aportes In-Kind | 21.674,59 | 84,9% |
| **Investimento Total** | **25.466,61** | **100%** |

&emsp; A planilha do parceiro Zenbit, utilizada como base de cálculo complementar, apresenta valores ligeiramente distintos (investimento total em caixa: USD 4.257,49; in-kind: USD 20.822,97; total: USD 25.080,46), diferença explicada por variações de arredondamento e pelo escopo das linhas ativadas na projeção da equipe. Ambas as apurações convergem para a mesma conclusão estrutural: mais de 83% do investimento total é coberto por recursos não monetários.

### Detalhamento - Custos diretos em caixa (Cash)

&emsp; Os custos diretos em dinheiro do AxoloDAO cobrem oito linhas operacionais ao longo dos 15 meses:

| Linha de Custo | Total 15M (USD) |
|---|---|
| Hospedagem e Nuvem | 891,00 |
| Domínios e E-mail | 152,00 |
| Despesas de Operação e Viagem | 837,00 |
| Legal e Compliance | 300,00 |
| Design e Conteúdo | 170,00 |
| Auditoria / Security Review (custo único) | 800,00 |
| Gastos Onchain | 454,00 |
| Contingência (10%) | 235,00 |
| **Total Cash AxoloDAO** | **3.839,00** |

&emsp; O custo médio mensal em caixa é de USD 252,80. Excluindo o mês de junho de 2026 - que concentra USD 800,00 da auditoria de segurança, evento único e não recorrente que habilita a operação de todos os meses seguintes -, a média mensal dos demais 14 meses cai para USD 217,07, evidenciando a estrutura extraordinariamente enxuta do projeto.

### Detalhamento - Aportes In-Kind

&emsp; Os aportes in-kind são recursos reais consumidos pelo projeto sem contrapartida financeira direta. Compreendem o capital humano da UAQ e a infraestrutura operacional e de capital do BioMuseo:

| Linha de Aporte In-Kind | Total 15M (USD) |
|---|---|
| UAQ — Alunos (horas valorizadas) | 4.500,00 |
| UAQ — Mentores (horas valorizadas) | 2.250,00 |
| BioMuseo — Despesas Operacionais (90%) | 11.967,77 |
| BioMuseo — CAPEX e Ativos (90%) | 2.956,82 |
| **Total In-Kind** | **21.674,59** |

&emsp; A linha de maior peso individual é o BioMuseo — Despesas Operacionais (90%), com USD 11.967,77 — confirmando o papel da infraestrutura física do museu como âncora operacional insubstituível do projeto. A UAQ contribui com USD 1.4.750,00 em capital humano especializado ao longo dos 15 meses. Nenhum dos dois aportes é substituível por desembolso em caixa dentro do horizonte de 2021.4.

### Detalhamento completo - Cash vs. In-Kind (conforme planilha do parceiro)

| Conceito | Valor (USD) | Tipo | Comentário |
|---|---|---|---|
| **BIOMUSEO — ATIVOS** | | | |
| Ativos fixos — equipamentos | 1.390,91 | In-kind | Equipamentos de museu designados como suporte |
| Recursos biológicos (axolotes) | 714,29 | In-kind | Valor estimado das amostras biológicas |
| Novos materiais (out/25 a jan/26) | 465,49 | Cash | Compras registradas no período real |
| **BIOMUSEO — CUSTOS OPERACIONAIS (90% alocados, 15M)** | | | |
| Folha de pagamento atribuída (15M) | 8.667,00 | In-kind | 90% da folha de pagamento mensal x 15 |
| Serviços atribuídos (15M) | 2.700,00 | In-kind | 90% de água + eletricidade + aluguel x 15 |
| Despesas variáveis alocadas (15M) | 600,77 | In-kind | 90% das despesas operacionais variáveis x 15 |
| **AxoloDAO MVP — CUSTOS DIRETOS** | | | |
| OPEX cash AxoloDAO (15M) | 3.792,00 | Cash | Hospedagem, domínios, operações, contingência |
| **UAQ — APORTES IN-KIND** | | | |
| Estudantes — horas avaliadas (anual) | 4.500,00 | In-kind | 3 alunos x 4h/sem x USD 10/h x 30 semanas |
| Mentores — horas valorizadas (anual) | 2.250,00 | In-kind | 2 mentores x 2h/sem x USD 15/h x 30 semanas |
| **TOTAIS** | | | |
| Investimento total em CASH | 4.257,49 | Cash | Materiais + OPEX AxoloDAO |
| Investimento total IN-KIND | 20.822,97 | In-kind | Ativos + OPEX BioMuseo + UAQ |
| **INVESTIMENTO TOTAL (Cash + In-Kind)** | **25.080,46** | **Total** | **Base alternativa para calculo de ROI** |

### Perfil temporal do investimento

&emsp; O investimento total mensal variou ao longo do período entre um piso de USD 1.405,64 (dezembro de 2025) e um pico de USD 3.514,70 em outubro de 2025 - distorcido pelo CAPEX de arranque do BioMuseo - e USD 2.436,36 em junho de 2026, reflexo da concentração dos custos de implantação. A partir de novembro de 2025, o investimento mensal estabiliza-se em uma faixa previsível de USD 1.455,06 a USD 1.643,76, bem dimensionada para o perfil do projeto.

&emsp; Essa estabilidade é consequência direta da natureza contratual ou semi-contratual dos aportes in-kind: os compromissos da UAQ e do BioMuseo não sofrem variação por fase operacional do produto digital, funcionando como uma base fixa de investimento sobre a qual os custos variáveis em caixa oscilam conforme as demandas de cada fase.

---

## 1.4.8 ROI e métricas

### Metodologia de cálculo

&emsp; O Retorno sobre o Investimento (ROI) é calculado pela fórmula padrão aplicada a projetos:

> **ROI = (Receita − Investimento) / Investimento x 100%**
>
> *Referência metodológica: Artia — Cálculo de ROI em projetos (artia.com/blog/calculo-roi-em-projetos/)*

&emsp; O projeto AxoloDAO apresenta dois cálculos de ROI complementares, que respondem a perguntas diferentes e devem ser lidos em conjunto para uma interpretação correta da viabilidade do projeto.

### Receita base para os cálculos

&emsp; A **Receita do Ecossistema** - numerador de ambos os ROIs - é a soma de 90% da receita total do BioMuseo Xolotcalli com a receita direta da plataforma AxoloDAO, ao longo dos 15 meses:

| Componente | Total 15M (USD) |
|---|---|
| 90% Receita Total BioMuseo (subsídio AxoloDAO + visitas + vendas líquidas) | 28.952,99 |
| Receita Direta AxoloDAO (bolsas + doações + patrocínios corporativos + licenciamento) | 8.640,81 |
| **Receita Total do Ecossistema** | **37.593,80** |

### ROI do Ecossistema (47,6%)

&emsp; O ROI do Ecossistema mede o retorno gerado pelo projeto considerando todo o investimento realizado, tanto os desembolsos em caixa quanto os aportes in-kind (UAQ + BioMuseo).

**ROI do Ecossistema = (Receita do Ecossistema - Investimento Total) / Investimento Total**

= (USD 37.593,80 - USD 25.466,61) / USD 25.466,61 = **47,6%**

&emsp; **Interpretação:** Para cada dólar investido no projeto — seja em forma de pagamento em dinheiro ou de contribuição institucional em espécie —, o ecossistema AxoloDAO gera USD 1,476 em receita. Isso representa um retorno líquido de **USD 0,476 por dólar aplicado**. Um ROI de 47,6% é robusto para um projeto MVP de conservação ambiental sem fins lucrativos em seu primeiro período de 15 meses de operação, em um contexto onde a maioria de projetos equivalentes opera com resultado líquido negativo durante toda a fase de validação.

### ROI sobre Caixa AxoloDAO (891,4%)

&emsp; O ROI sobre Caixa mede o retorno gerado considerando apenas os desembolsos efetivos em dinheiro como denominador, revelando a alavancagem real do modelo financeiro.

**ROI sobre Caixa = (Receita do Ecossistema - Custos Cash) / Custos Cash**

= (USD 37.593,80 - USD 3.839,00) / USD 3.839,00 = **891,4%**

&emsp; **Interpretação:** Para cada dólar efetivamente desembolsado em caixa pelo AxoloDAO ao longo dos 15 meses, o ecossistema gera quase dez dólares em receita total. Essa razão de alavancagem de 891,4% é a expressão quantitativa do principal diferencial financeiro do projeto: a capacidade de converter parcerias institucionais não monetárias - com a UAQ e o BioMuseo - em amplificadores de retorno sobre o capital caixa diretamente investido. Trata-se também do principal argumento financeiro a ser apresentado a potenciais financiadores que avaliem o custo-efetividade de um aporte ao projeto: o investimento direto requerido é pequeno, e o impacto econômico total alavancado é grande.

### Painel de métricas financeiras consolidadas - 15 meses

| Metrica | Valor (USD) | Observacao |
|---|---|---|
| Receita do BioMuseo (15M) | 32.169,99 | Visitas + vendas liquidas + subsidio AxoloDAO |
| Receitas diretas da AxoloDAO (15M) | 8.640,81 | Bolsas, doacoes, patrocinios, licenciamento |
| **Receita total do ecossistema (15M)** | **37.593,80** | 90% BioMuseo + 100% AxoloDAO direto |
| Custos cash AxoloDAO (15M) | 3.839,00 | 8 linhas de OPEX direto |
| Custos operativos BioMuseo (15M) | 13.297,53 | Folha + servicos + gastos variaveis |
| Aportes in-kind (15M) | 21.674,59 | UAQ + BioMuseo (OPEX + CAPEX a 90%) |
| **Investimento total (cash + in-kind)** | **25.466,61** | Base para calculo do ROI |
| Resultado liquido em caixa (15M) | +4.848,81 | Receita AxoloDAO menos Custos Cash |
| Lucro operacional BioMuseo (15M) | 18.872,46 | Receita menos Custos, antes do CAPEX |
| % In-Kind sobre Investimento Total | 84,9% | Estrutura altamente alavancada |
| Razao receita / capital investido | 1,48x | Para cada $1 investido, gera $1,48 |
| **ROI do ecossistema** | **47,6%** | Retorno sobre investimento total |
| **ROI sobre caixa AxoloDAO** | **891,4%** | Retorno sobre desembolso direto em caixa |
| Custo medio mensal em caixa | 255,93 | USD 217,07 excluindo jun-26 (auditoria) |
| Taxa de cambio adotada | MXN 17,50/USD | Banxico, media Q4-2025 |

### Analise de ROI e principais metricas (conforme planilha)

| Metrica | Valor | Interpretacao |
|---|---|---|
| Receita do ecossistema (15M) | USD 37.593,80 | BioMuseo (90%) + AxoloDAO direto |
| Investimento total (cash + in-kind) | USD 25.466,61 | Tudo investido no projeto |
| Custos totais de caixa (15M) | USD 3.792,00 | AxoloDAO realiza apenas o desembolso em dinheiro |
| **ROI do ecossistema AxoloDAO** | **47,6%** | Positivo: o ecossistema gera mais valor do que consome. Para cada US$1 investido, o retorno liquido e de US$0,48 |
| **ROI em dinheiro AxoloDAO** | **891,40%** | Altamente alavancado: investimento minimo em dinheiro, garantido por ativos em especie |
| Razao receita do ecossistema / capital investido | 1,48x | Cada dolar americano em dinheiro gera aproximadamente 1,48 dolares em receita para o ecossistema |
| Lucro operacional do BioMuseo (15M) | USD 18.872,46 | Lucro operacional em USD (receita menos custos, antes do CAPEX) |

### Notas metodologicas da planilha

- Taxa de cambio: MXN 17,5 por USD (editavel na aba Suposicoes)
- Dados reais: out. 2025 a jan. 2026 do balanco operacional
- Projecao fev.–set. 2026: media de nov. 2025 a jan. 2026 (meses mais representativos de operacao estabilizada)
- Alocacao BioMuseo para AxoloDAO: 90% (o museu e fundamentalmente um museu de axolotes)
- Custos fixos (folha de pagamento, servicos): mantem-se constantes; custos variaveis: media historica
- AxoloDAO MVP esta em fase piloto: o ROI em 15 meses e positivo e escalavel
- Projecao fev.–dez. 2026: feita pelos alunos do grupo

### Contexto para interpretacao do ROI

&emsp; O AxoloDAO e um projeto MVP/piloto. O ROI de 15 meses reflete um investimento em:

1. **Validacao cientifica:** Sistema com mais de 218 indicadores de monitoramento da biodiversidade, com rigor de publicacao academica e operando com dados reais de especimes vivos do *Ambystoma mexicanum*.
2. **Inovacao tecnologica:** Primeiro sistema blockchain (Ethereum) aplicado a conservacao de especies ameacadas de extincao no Mexico, com rastreabilidade e transparencia de dados verificaveis por qualquer parte interessada.
3. **Infraestrutura replicavel:** Modelo escalavel para outras especies e instituicoes, gerando potencial de licenciamento futuro que ainda nao esta capturado nas projecoes conservadoras de 2021.4.
4. **Impacto social:** Educacao ambiental (museu), pesquisa cientifica e colaboracao internacional entre Zenbit, UAQ, BioMuseo e NDALI.
5. **Retorno projetado:** Uma vez validado o MVP, espera-se a monetizacao por meio de subsidios, licenciamento de dados, consultoria especializada e programas de patrocinio digital.

---

## 1.4.9 Conclusao geral

&emsp; A analise financeira do projeto AxoloDAO, abrangendo os 15 meses de outubro de 2025 a dezembro de 2026, revela um modelo economico construido sobre tres pilares que se reforcam mutuamente e que, em conjunto, produzem um resultado positivo e sustentavel mesmo no estagio inicial de MVP.

&emsp; **Primeiro pilar: eficiencia estrutural do custo em caixa.** Com desembolso medio de USD 252,80 mensais, e de apenas USD 217,07 excluindo o mes de junho de 2026, que concentra o custo unico e nao recorrente da auditoria de seguranca de USD 800,00, o AxoloDAO opera com uma estrutura de custo direto baixa para um sistema de rastreabilidade blockchain em operacao real com dados cientificos verificaveis. Esse resultado e possivel porque o projeto foi concebido desde o inicio para se apoiar em parcerias institucionais que convertem infraestrutura fisica e capital humano em valor economico sem demandar caixa. A escolha arquitetural de delegar o processamento de dados massivos para camadas off-chain e reservar a blockchain apenas para eventos criticos e atestacoes de impacto - em vez de registrar cada interacao onchain - e a tradução tecnica dessa eficiencia financeira.

&emsp; **Segundo pilar: a sustentacao in-kind como vantagem competitiva estrutural.** Os aportes in-kind da UAQ e do BioMuseo Xolotcalli representam 84,9% do investimento total de 15 meses (USD 21.674,59 de um total de USD 25.466,61). Essa proporção é o alicerce que torna o projeto viavel e diferenciado. A UAQ contribui com capital humano especializado em blockchain e pesquisa de biodiversidade que, a preco de mercado pleno, custaria de tres a cinco vezes mais do que os valores conservadores adotados no modelo. O BioMuseo contribui com a infraestrutura fisica de tanques, especimes e cuidadores sem a qual nao existem dados biologicos a serem registrados onchain, ou seja, sem o BioMuseo, nao existe o AxoloDAO. Essas parcerias sao, portanto, ativos estrategicos do projeto tão essenciais quanto o código dos contratos inteligentes ou a arquitetura técnica do sistema.

&emsp; **Terceiro pilar: autossustentabilidade em caixa e trajetoria de crescimento consistente.** A receita direta do AxoloDAO cobre integralmente seus custos diretos em caixa ao longo de 14 dos 15 meses analisados, gerando um excedente acumulado de USD 4.848,81. O único mês de resultado negativo - junho de 2026 - representa o investimento de implantação do sistema em produção. Paralelamente, a receita do ecossistema cresce de forma consistente: de USD 1.706,11 em outubro de 2025 para USD 2.669,49 em dezembro de 2026, uma expansão de 56,4% ao longo do periodo, impulsionada exclusivamente pelo amadurecimento das linhas de receita direta do AxoloDAO, já que a parcela do BioMuseo permanece estavel.

&emsp; **Sobre os resultados do BioMuseo:** O museu encerra o periodo de analise com resultado operacional positivo de USD 1.173,01 mensais no Q4 de 2026, com margem operacional de aproximadamente 56,8%. A estabilidade dos custos fixos (folha de pagamento e servicos), combinada com o subsidio AxoloDAO como ancora de receita recorrente, produz um ponto de equilibrio operacional muito forte e um perfil de baixo risco operacional, que são caracteristicas altamente valorizadas por financiadores institucionais e fundos filantropicos que avaliam projetos pelo criterio de sustentabilidade de longo prazo.

&emsp; **Sobre o ROI:** O ROI do ecossistema de 47,6% posiciona o AxoloDAO como um projeto financeiramente positivo ja nos primeiros 15 meses, que é um resultado incomum para MVPs de conservação ambiental. O ROI sobre caixa de 891,4% e a métrica que mais fortemente diferencia este projeto de alternativas convencionais de conservação: ela demonstra que cada dolar investido diretamente pelo parceiro tecnológico mobiliza aproximadamente dez dolares de valor economico total, gracas ao efeito multiplicador das parcerias institucionais. Em termos praticos, esse nímero e o argumento central para potenciais financiadores que avaliem o custo-efetividade de um aporte ao projeto: o investimento direto e pequeno, o impacto alavancado é grande.

&emsp; **Perspectiva para 2027 e alem:** Os números de 2026 representam o piso, nao o teto, do potencial do projeto. O verdadeiro escalonamento estara disponivel a partir de 2027, quando: (1) o primeiro ano completo de dados onchain verificáveis tornará o projeto competitivo em editais institucionais de maior porte (CONAHCyT, GEF, GBIF, FMCN); (2) o pipeline de licenciamento iniciado em 2026 começará a se converter em contratos formais com outras instituições de conservação; (3) a reputação acumulada de um sistema com mais de 218 indicadores de monitoramento científico atrairá patrocinios corporativos de maior valor; e (4) a rastreabilidade onchain dos axolotes, uma vez estabelecida como referencia metodologica, podera ser replicada para outras especies ameaçadas, assim, ampliando o mercado endereçavel do modelo de licenciamento.

---

*Taxa de câmbio: MXN 17,50 por USD (Banxico, média Q4-2025)*
*Período de análise: Outubro de 2025 a Dezembro de 2026 (15 meses)*
*Dados reais: Outubro de 2025 a Janeiro de 2026*
*Referência Zenbit: Fevereiro e Março de 2026*
*Projeção por fases estratégicas (equipe): Abril a Dezembro de 2026*

---


## 2. Experiência do Usuário

### 2.1 Personas  

&emsp;As personas a seguir representam os principais perfis envolvidos no ecossistema de conservação, pesquisa e engajamento comunitário do axolote com envolvimento direto ou indireto no AxoloDAO na implementação de tecnologia blockchain e sistemas descentralizados para rastreabilidade de dados científicos e participação cidadã.

&emsp;Elas foram desenvolvidas para traduzir, de forma prática, as necessidades e responsabilidades de três níveis distintos do ecossistema de conservação: operação e manejo direto dos exemplares, pesquisa científica e validação acadêmica, e contribuição cidadã para ciência participativa.

&emsp;ompreender seus contextos permite alinhar o design e as funcionalidades da solução às demandas reais de qualidade de dados, rigor científico, transparência operacional e democratização do acesso à informação sobre espécies ameaçadas.

<div align="center">

Figura 6: Persona Ricardo

![Persona 1](../assets/persona/persona-ricardo.png)

<sub>Fonte: Material produzido pelos autores (2026).</sub>

Figura 7: Jornada Ricardo

![Persona 2](../assets/persona/jornada-ricardo.png)

<sub>Fonte: Material produzido pelos autores (2026).</sub>

Figura 8: Persona Ana Clara

![Persona 3](../assets/persona/persona-ana-clara.png)

<sub>Fonte: Material produzido pelos autores (2026).</sub>

Figura 9: Jornada Ana Clara

![Persona 4](../assets/persona/jornada-ana-clara.png)

<sub>Fonte: Material produzido pelos autores (2026).</sub>

Figura 10: Persona Sofía

![Persona 5](../assets/persona/persona-sofia.png)

<sub>Fonte: Material produzido pelos autores (2026).</sub>

Figura 11: Jornada Sofía

![Persona 6](../assets/persona/jornada-sofia.png)

<sub>Fonte: Material produzido pelos autores (2026).</sub>

</div>

&emsp;As personas Ana (Cuidadora de Axolotes), Ricardo (Pesquisador e Auditor) e Sofía (Visitante e Contribuidora Cidadã) refletem diferentes perspectivas de uso da solução blockchain de rastreabilidade: do registro operacional diário à validação científica e ao engajamento público.

&emsp;Juntas, elas sustentam o desenho de uma estrutura integrada que conecta captura de dados estruturados, atestações onchain verificáveis e participação cidadã, garantindo qualidade científica, transparência operacional e engajamento social em todo o ecossistema de conservação do axolote mexicano.

&emsp;É importante ressaltar que a persona Sofía (Visitante e Contribuidora Cidadã) contempla funcionalidades que, embora estrategicamente relevantes para o ecossistema completo de conservação do axolote, vão além do escopo da POC atual do projeto. As features de submissão de observações por visitantes, validação de contribuições cidadãs e compartilhamento social de registros onchain representam uma camada de expansão futura da plataforma. No presente momento, o desenvolvimento está concentrado nas personas Ana e Ricardo, priorizando o registro operacional de dados, a rastreabilidade verificável via blockchain e a validação científica por especialistas — funcionalidades essenciais para estabelecer a infraestrutura base do sistema antes de sua abertura para participação pública ampliada.

&emsp;Dito isso, a interação entre essas personas demonstra o funcionamento completo do ecossistema proposto. Ana, em campo, depende de um sistema ágil e intuitivo para registrar dados ambientais e fisiológicos sem sobrecarregar sua rotina ou estressar os animais. Ricardo, como pesquisador, necessita de dados confiáveis e rastreáveis para validar hipóteses científicas e atestar informações que alimentarão publicações e decisões de conservação. Sofía, como cidadã engajada, busca uma forma significativa de contribuir para a conservação, recebendo retorno tangível sobre o impacto de sua participação.

&emsp;A solução precisa equilibrar essas diferentes demandas, criando uma rede descentralizada que favoreça tanto a operação cotidiana quanto a validação científica e o engajamento público.


### 2.2 User Stories

&emsp;As user stories, ou melhor, as histórias de usuário são estruturas muito comumente utilizadas dentro do universo da metodologia ágil. Seu objetivo é colocar o usuário no centro na solução, criando assim histórias curtas que costumam obter a seguinte aparencia: "Como [Persona/Usuário escolhido], eu quero [Ação], para que [Benefício].". Essas histórias ajudam o processo de estruturação e desenvolvimento de uma solução, guiando o desenvolvedor ao melhor caminho possível da implementação.

&emsp; Outro framework bastante utilizado dentro deste universo é a implementação dos critérios INVEST  definidos como: Independent (Independente), Negotiable (Negociável), Valuable (Valioso), Estimable (Estimável), Small (Pequena/Mensurável), Testable (Testável). O objetivo é fazer com que as histórias criadas sejam curtas e metrificáveis, podendo ajudar a solução a ser implementadas em um curto período de tempo.

&emsp; A seguir você encontra detalhes sobre as User Stories criadas pensando no projeto AmbyData que foram criadas após o mapeamento de diferentes personas como mostrado na seção anterior. É importante ressaltar que a terceira persona apresentada, a visitante, não foi incluída no desenvolvimento das user stories por estar fora do escopo do projeto. 

##### User Stories da Persona 1: Ana Clara, a cuidadora

&emsp;Como mencionado na seção 2.1, Ana é a cuidadora dos tanques de axolotes, que diariamente realiza observações sobre parâmetros físicos, emocionais e de comportamento dos axolotes, além de realizar apontamentos sobre o tanque que cada espécie de axolote presente.

<div align = "center"> <p> Quadro 3 - User Story 001 - Ana Clara </p> </div>

| Número                    | USA 001                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Título                    | Registro de manejo manual sobre os axolotes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Persona                    | Ana Clara (Cuidadora)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| História                  | Como cuidadora, eu quero registrar na plataforma as novas observações sobre os axolotes de cada tanque para que haja um histórico de cada axolote.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| Critérios de aceitação  | CR-01: O sistema deve permitir que o cuidador registre as observações levantadas sobre o axolote selecionado.<br />CR-02: O sistema deve vincular metadados de data e hora automaticamente.<br />CR-03: O sistema deve gerar atestação Onchain da resquisição de registro.                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| Teste de aceitação CR-01 | I. O sistema permite o preenchimento de seções como alimentação, comportamento e temperatura.<br />a. Passou = Correto.<br />b. Não passou = Incorreto.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| Teste de aceitação CR-01 | I. O sistema permite o preenchimento de seções como alimentação, comportamento e temperatura.<br />a. Passou = Correto.<br /> b. Não passou = Incorreto.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| Critérios INVEST          | I (Independent) - A user story criada é independente das outras.<br />N (Negotiable) - A user storie criada está aberta a modificações indicadas pelo parceiro.<br />V (Valuable) - A user story criada beneficia o usuário cuidador, pois se trata de como ele utilizará a plataforma para registrar as observações sobre cada axolote.<br />E (Estimable) - A descrição da user story criada apresenta informações necessária para guiar o time de desenvolvedores na implementação da funcionalidade de registro.<br />S (Small) - A user story é de tamanho pequeno o suficiente para ser implementado em uma sprint.<br />T (Testable) -  A user story criada apresenta os critérios de aceitação devidamente explicados. |

<div align = "center"> Fonte: Material produzido pelos autores (2026). </div>

<div align = "center"> <p> Quadro 4 - User Story 002 - Ana Clara </p> </div>

| Número                                                                                             | USA 002                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Título                                                                                             | Registro de novo axolote                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| Persona                                                                                             | Ana Clara (Cuidadora)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| História                                                                                           | Como cuidadora, eu quero registrar um novo axolote na plataforma para faciltar o moitoramento dele.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Critérios de aceitação                                                                           | CR-01: O sistema deve permitir que o cuidador registre um novo axololote em um tanque.      <br /> CR-02: O sistema deve vincular metadados de data e hora automaticamente sobre o registro realizado.  <br /> CR-03: O sistema deve gerar atestação Onchain da requisição de registro. <br /> CR-04: O cuidador deve ser capaz de visualizar o novo axolote adicionado à carteira.                                                                          
| Teste de aceitação CR-01                                                                          | I. O sistema deve exibir a opção de adicionar o registro de um novo axolote.                                                 a. Passou = Correto.                                                                                                                         b. Não passou = Errado.                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Teste de aceitação CR-02                                                                          | I. O sistema deve vincular os metadados de data e hora automaticamente quando a requisição do registro de um novo axolote for criada.                                                                                                                                                                   a. Passou = Correto.                                                                                                                                                              b. Não passou = Errado.                                        
| Teste de aceitação CR-03                                                                          | I. O sistema deve gerar uma atestação Onchain quando o usuário selecionar em confirmar o envio dos dados adicionados.                                                                                                                                            <br />                               a. Passou = Correto.                                                                                                                                                                  <br />        b. Não passou = Errado.                                                 
| Teste de aceitação CR-04                                                                          | I. O sistema deve exibir a opção de adicionar o registro de um novo axolote.                       <br />                          a. Passou = Correto.    <br />                                                                                                                     b. Não passou = Errado.           
| Critérios INVEST                                                                                   | I (Independent) - A user story criada é independente das outras.<br />N (Negotiable) - A user storie criada está aberta a modificações indicadas pelo parceiro.<br />V (Valuable) - A user story criada beneficia o usuário cuidador, pois se trata de como ele utilizará a plataforma para registrar as observações sobre cada axolote.<br />E (Estimable) - A descrição da user story criada apresenta informações necessária para guiar o time de desenvolvedores na implementação da funcionalidade de registro.<br />S (Small) - A user story é de tamanho pequeno o suficiente para ser implementado em uma sprint.<br />T (Testable) -  A user story criada apresenta os critérios de aceitação devidamente explicados. |

<div align = "center"> Fonte: Material produzido pelos autores (2026). </div>

<div align = "center"> <p> Quadro 5 - User Story 003 - Ana Clara </p> </div>

| Número                                                                                             | USA 003                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Título                                                                                             | Seleção e visualização de tanques de axolotes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| Persona                                                                                             | Ana Clara (Cuidadora)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| História                                                                                           | Como cuidadora, eu quero poder visualizar e selecionar no ambiente virtual os tanques que abrigam cada espécie de axolote para que eu possa registrar observações sobre as medições manuais do ambiente.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| Critérios de aceitação                                                                           | CR-01: O sistema deve permitir que o usuário acesse difentes tanques de axolotes por meio da plataforma.                     <br />                                             CR-02: O usuário deve ser capaz de visualizar diferentes tanques registrados.                                                                          
| Teste de aceitação CR-01                                                                          | I. O sistema deve exibir diferentes opções de tanques de axolotes para o usuário.    <br />                                                                                                                      a. Passou = Correto.    <br />                                                                                                                     b. Não passou = Errado.                                                                                                        
| Teste de aceitação CR-02                                                                          | I. O usuário consegue selecionar um tanque da cada vez.    <br />            a. Passou = Correto.          <br />   b. Não passou = Errado.  
| Critérios INVEST                                                                                   | I (Independent) - A user story criada é independente das outras.<br />N (Negotiable) - A user storie criada está aberta a modificações indicadas pelo parceiro.<br />V (Valuable) - A user story criada beneficia o usuário cuidador, pois se trata de como ele utilizará a plataforma para registrar as observações sobre cada axolote.<br />E (Estimable) - A descrição da user story criada apresenta informações necessária para guiar o time de desenvolvedores na implementação da funcionalidade de registro.<br />S (Small) - A user story é de tamanho pequeno o suficiente para ser implementado em uma sprint.<br />T (Testable) -  A user story criada apresenta os critérios de aceitação devidamente explicados. |

<div align = "center"> Fonte: Material produzido pelos autores (2026). </div>

<div align = "center"> <p> Quadro 6 - User Story 004 - Ana Clara </p> </div>

| Número                                                                                             | USA 004                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Título                                                                                             | Receber alertas referentes aos dados registrados                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| Persona                                                                                             | Ana Clara (Cuidadora)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| História                                                                                           | Como cuidadora, eu quero receber um alerta quando eu registrar uma observação que indique quando o ambiente ou o axolote selecionado não está saudável, para que eu possa intervir antecipadamente na melhora da saúde deles.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| Critérios de aceitação                                                                           | CR-01: O sistema identifica quando um dado registrado excede o saudável para um axolote.                                                                                                                                    
| Teste de aceitação CR-01                                                                          | I. O sistema deve ser capaz de identificar quando um dado registrado excede o limite do considerado saudável para o axolote. <br />                                                                                                  a. Passou = Correto. <br />                                                                                                                         b. Falhou = Errado.                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Critérios INVEST                                                                                   | I (Independent) - A user story criada é independente das outras.<br />N (Negotiable) - A user storie criada está aberta a modificações indicadas pelo parceiro.<br />V (Valuable) - A user story criada beneficia o usuário cuidador, pois se trata de como ele utilizará a plataforma para registrar as observações sobre cada axolote.<br />E (Estimable) - A descrição da user story criada apresenta informações necessária para guiar o time de desenvolvedores na implementação da funcionalidade de registro.<br />S (Small) - A user story é de tamanho pequeno o suficiente para ser implementado em uma sprint.<br />T (Testable) -  A user story criada apresenta os critérios de aceitação devidamente explicados. |

<div align = "center"> Fonte: Material produzido pelos autores (2026). </div>

&emsp; Por meio das histórias de usuário da persona Ana Clara podemos mapear alguns pontos importantes para a construção da solução, fazendo-nos pensar na visão dos cuidadores e como a solução os ajudará. 

##### User Stories da Persona 2: Ricardo, o pesquisador

&emsp; As user stories criadas para a persona do Ricardo falam sobre a forma como terá interações com a plataforma e nos colocam sobre a visão dele da solução. Para fins de melhor compreensão: a abreviação utilizada USR se refere a User Story do Ricardo. 

<div align = "center"> <p> Quadro 7 - User Story 001 - Ricardo </p> </div>

| Número                                                                                             | USR 001                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Título                                                                                             | Analisar gráficos de evolução dos axolotes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| Persona                                                                                             | Ricardo (Pesquisador)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| História                                                                                           | Como pesquisador, eu quero poder acessar os gráficos de evolução ambiental dos axolotes para embasar a pesquisa que estou desenvolvendo.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| Critérios de aceitação                                                                           | CR-01: O sistema permite que o usuário acesse a parte de gráficos de evolução dos axolotes.                                                                                                                                                                                               
| Teste de aceitação CR-01                                                                          | I. Os gráficos devem estar visíveis para o usuário.          <br />         a. Passou = Correto.    <br />  b. Não passou = Incorreto.                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| Critérios INVEST                                                                                   | I (Independent) - A user story criada é independente das outras.<br />N (Negotiable) - A user storie criada está aberta a modificações indicadas pelo parceiro.<br />V (Valuable) - A user story criada beneficia o usuário cuidador, pois se trata de como ele utilizará a plataforma para registrar as observações sobre cada axolote.<br />E (Estimable) - A descrição da user story criada apresenta informações necessária para guiar o time de desenvolvedores na implementação da funcionalidade de registro.<br />S (Small) - A user story é de tamanho pequeno o suficiente para ser implementado em uma sprint.<br />T (Testable) -  A user story criada apresenta os critérios de aceitação devidamente explicados. |

<div align = "center"> Fonte: Material produzido pelos autores (2026). </div>

<div align = "center"> <p> Quadro 8 - User Story 002 - Ricardo </p> </div>

| Número                                                                                             | USR 002                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Título                                                                                             | Exportação dos dados presentes nos diagramas                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| Persona                                                                                             | Ricardo (Pesquisador)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| História                                                                                           | Como pesquisador, eu quero poder exportar os dados presentes nos gráficos de evolução dos axolotes para analisá-los profundamente e utilizá-los em minha pesquisa.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| Critérios de aceitação                                                                           | CR-01: O sistema permite que o usuário baixe os dados dos gráficos.                                                                                                                                                                                                                                                          
| Teste de aceitação CR-01                                                                          | I. O usuário conseguiu exportar em arquivo PDF os dados do gráfico visualizado.   <br />                    a. Passou = Correto.        <br />                                                         b. Não passou = Incorreto.                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| Critérios INVEST                                                                                   | I (Independent) - A user story criada é independente das outras.<br />N (Negotiable) - A user storie criada está aberta a modificações indicadas pelo parceiro.<br />V (Valuable) - A user story criada beneficia o usuário cuidador, pois se trata de como ele utilizará a plataforma para registrar as observações sobre cada axolote.<br />E (Estimable) - A descrição da user story criada apresenta informações necessária para guiar o time de desenvolvedores na implementação da funcionalidade de registro.<br />S (Small) - A user story é de tamanho pequeno o suficiente para ser implementado em uma sprint.<br />T (Testable) -  A user story criada apresenta os critérios de aceitação devidamente explicados. |

<div align = "center"> Fonte: Material produzido pelos autores (2026). </div>


<div align = "center"> <p> Quadro 9 - User Story 003 - Ricardo </p> </div>

| Número                                                                                             | USR 003                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Título                                                                                             | Atestar validade de registro                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Persona                                                                                             | Ricardo (Pesquisador)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| História                                                                                           | Como pesquisador e auditor, eu quero poder validar os dados que são inseridos pelos cuidadores antes de registrá-los oficialmente na blockchain para evitar a entrada de dados equivocados.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| Critérios de aceitação                                                                           | CR-01: O usuário deve ser capaz de visualizar as requisições pendentes de revisão mostradas no sistema.                                                                                                                                                                                                                                                          
| Teste de aceitação CR-01                                                                          | I. O sistema deve exibir as requisições pendentes de revisão.                                          <br />  a. Passou = Correto.                                                                          <br />                                     b. Não passou = Errado.                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Critérios INVEST                                                                                   | I (Independent) - A user story criada é independente das outras.<br />N (Negotiable) - A user storie criada está aberta a modificações indicadas pelo parceiro.<br />V (Valuable) - A user story criada beneficia o usuário cuidador, pois se trata de como ele utilizará a plataforma para registrar as observações sobre cada axolote.<br />E (Estimable) - A descrição da user story criada apresenta informações necessária para guiar o time de desenvolvedores na implementação da funcionalidade de registro.<br />S (Small) - A user story é de tamanho pequeno o suficiente para ser implementado em uma sprint.<br />T (Testable) -  A user story criada apresenta os critérios de aceitação devidamente explicados. |

<div align = "center"> Fonte: Material produzido pelos autores (2026). </div>

&emsp; Desta forma, podemos observar a solução pelos olhos da persona Ricardo, Engergando assim, suas ações dentro da plataforma e a forma como isso se dará. 

## 3. Tecnologia Blockchain

### 3.1 Arquitetura dos Smart Contracts

#### 3.1.1. Requisitos de Negócios

&emsp; Esta seção apresenta os Requisitos de Negócio do Sistema AxoloDAO, definidos a partir das regras que orientam a governança, a integridade dos dados e a rastreabilidade onchain da plataforma. Os requisitos estabelecem como o sistema deve estruturar o controle de acesso, a validação das informações e a certificação dos registros ambientais e biológicos. Ao formalizar essas diretrizes, busca-se garantir qualidade científica, segregação de responsabilidades entre atores e consistência entre as camadas offchain e onchain, fortalecendo a transparência e a confiabilidade do sistema.

**Requisito 1 - Controle Formal de Registro Operacional**

Associado à RN01

&emsp;No contexto do BioMuseo e das atividades de monitoramento ambiental, os registros de medições e eventos de saúde representam a base científica do sistema. Caso qualquer usuário pudesse inserir dados, perder-se a confiabilidade operacional e a rastreabilidade de responsabilidade. Diante disso, estabelece-se que o sistema deve garantir que apenas usuários autenticados via carteira Web3 e formalmente designados com o papel CARETAKER possam registrar medições ambientais e eventos de saúde. A aplicação prática desse requisito, assegura que todo dado ambiental tenha autoria verificável e vínculo institucional claro e se dará por meio de:

- autenticação obrigatória via MetaMask ou carteira compatível;
- validação do papel do usuário no backend antes da persistência do registro;
- associação permanente da carteira responsável ao dado inserido.

**Requisito 2 - Autoridade Científica para Validação e Certificação**  

Associado à RN02

&emsp;O processo de validação e atestação transforma um dado operacional em evidência verificável. Permitir que qualquer ator realize essa etapa comprometeria a legitimidade científica do sistema. Assim, o sistema deve garantir que somente usuários com papel AUDITOR (Researcher) possam validar registros e emitir atestações onchain por meio do EAS. Com isso, a separação formaliza a autoridade científica dentro do fluxo de dados. Para atender a esse requisito:

- a funcionalidade de validação será restrita ao papel AUDITOR (Researcher);
- a emissão de atestação exigirá assinatura criptográfica da carteira do pesquisador;
- a integração com o EAS será bloqueada para quaisquer outros papéis.

**Requisito 3 - Participação Pública com Controle de Qualidade**  

Associado à RN03

&emsp;O projeto prevê envolvimento de visitantes e ciência cidadã. No entanto, na implementação atual do protocolo, apenas usuários com papel CARETAKER podem inserir dados no contrato inteligente. A participação pública é tratada como um processo offchain de triagem, no qual o cuidador atua como responsável final pela validação e inserção das informações no sistema onchain. Dessa forma, a integridade científica é preservada, garantindo que apenas dados revisados sejam formalmente registrados.

**Requisito 4 - Segregação Estrutural de Funções**  

Associado à RN04

&emsp;Para garantir mínima independência no processo de verificação, o sistema deve impedir que o autor de um registro realize sua própria validação. A separação entre registro e validação reduz conflitos de interesse no fluxo interno. Esse requisito será aplicado mediante:

- comparação entre identificador do autor do registro e identificador do usuário que tenta validar;
- bloqueio automático da ação caso coincidam;
- verificação obrigatória realizada no contrato inteligente e reforçada no backend.

**Requisito 5 - Integridade Estrutural Mínima dos Registros**  

Associado à RN05

&emsp;Dados ambientais sem estrutura mínima perdem valor científico e tornam-se inviáveis para auditoria. Desse modo, registros incompletos devem ser rejeitados automaticamente. A geração do timestamp será realizada pelo próprio sistema, evitando manipulação manual. O sistema deve assegurar que todo registro ambiental contenha, obrigatoriamente:

- identificador do exemplar ou tanque;
- timestamp gerado automaticamente;
- parâmetros ambientais medidos;
- unidade correspondente;
- identificação do responsável.

**Requisito 6 - Controle de Qualidade por Validação Técnica** 

Associado à RN06

&emsp;Parâmetros ambientais fora de intervalos de referência podem indicar risco biológico. Na implementação atual, os registros são inicialmente armazenados no estado “Pending”. O controle de qualidade é exercido pelo papel AUDITOR (Researcher), que possui autoridade técnica para validar ou contestar registros com base em análise científica. A integridade do dado é assegurada pela validação formal antes da confirmação final, não havendo bloqueio automático por limiar diretamente no contrato inteligente.

**Requisito 7 - Identidade Imutável de Exemplares** 

Associado à RN07

&emsp;A rastreabilidade longitudinal exige que cada exemplar mantenha identidade estável ao longo do tempo. Na implementação atual, a identidade imutável é garantida pela geração de um identificador único e sequencial (`nextAxolotlId`) no contrato de registro. O sistema impede exclusão física de registros, permitindo apenas alteração de status para “Inativo”, preservando o histórico completo e evitando apagamento retroativo de informações.

**Requisito 8 - Integridade da Atestação Onchain**  

Associado à RN08

&emsp;A camada onchain deve refletir fielmente os registros oficiais do sistema. Atestações desconectadas da base interna fragilizariam a arquitetura híbrida proposta. Antes da emissão, o sistema deve verificar a existência e o estado do registro. Atestações sem correspondência válida não poderão ser emitidas. O sistema deve garantir que toda atestação EAS:

- utilize o schema correto;
- esteja assinada por carteira autorizada;
- referencie identificador ou hash do registro offchain correspondente.

**Requisito 9 - Distinção entre Dado Operacional e Evidência Pública**  

Associado à RN09

&emsp;Nem todo dado inserido no sistema deve ser automaticamente considerado evidência verificável. O sistema deve definir estados formais para cada registro:

- Pending
- Validated
- Contested

&emsp;Todo registro é criado no estado `Pending`. Apenas registros no estado `Validated` poderão ser utilizados como base para emissão de atestação externa via EAS. Registros nos estados `Pending` ou `Contested` não são elegíveis para certificação.

&emsp;Nesta sprint, o estado “Atestado” não é representado onchain como status interno do contrato. A certificação pública ocorre externamente por meio da integração com o Ethereum Attestation Service (EAS), após a validação do registro.

&emsp;A interface pública poderá exibir exclusivamente registros que possuam atestação válida, enquanto a interface interna poderá visualizar todos os estados registrados no contrato. Essa distinção preserva clareza entre dado operacional e dado certificado.


**3.1.1.2. Critérios de Aceitação dos Requisitos de Negócios**

&emsp; Os critérios de aceitação definem as condições objetivas que devem ser verificadas para que cada requisito seja considerado implementado. Eles funcionam como parâmetros de teste e validação técnica.

**R1**
1. O endpoint de registro deve aceitar requisições apenas de usuários autenticados via carteira Web3.
2. O backend deve verificar o papel CARETAKER antes de persistir o registro.
3. Tentativas de registro por papéis diferentes devem retornar erro 403.
4. O registro deve armazenar o identificador da carteira do autor.

**R2**
1. Apenas usuários com papel AUDITOR (Researcher) devem acessar a funcionalidade de validação.
2. A emissão de atestação deve exigir assinatura criptográfica válida.
3. A API deve rejeitar tentativas de atestação por papéis não autorizados.
4. O sistema deve registrar o identificador da carteira do pesquisador que validou.

**R3**
1. Apenas usuários com CARETAKER_ROLE podem registrar dados no contrato.
2. Não deve existir função pública de inserção de dados acessível a usuários sem papel definido..

**R4**
1. O sistema deve comparar `creator_address` e `validator_address` antes da validação.
2. Caso sejam iguais, a validação deve ser bloqueada.
3. A API deve retornar erro 403 em tentativa externa de auto validação.
4. O histórico deve exibir claramente quem registrou e quem validou.

**R5**
1. O sistema deve bloquear registros com qualquer campo obrigatório ausente.
2. O timestamp deve ser gerado automaticamente pelo servidor.
3. O banco de dados não deve aceitar valores nulos nos campos estruturais.
4. O schema do registro deve ser validado antes da persistência.

**R6**
1. Todo registro deve iniciar no estado `Pending`.
2. Apenas usuários com AUDITOR_ROLE podem alterar o estado para `Validated` ou `Contested`.
3. Registros não validados não podem ser utilizados para certificação.

**R7**
1. Cada exemplar deve possuir identificador único não editável.
2. A funcionalidade de exclusão física não deve existir.
3. Apenas alteração de status para INATIVO deve ser permitida.
4. O identificador do exemplar deve ser gerado automaticamente e de forma sequencial.

**R8**
1. A atestação deve incluir o schema previamente definido.
2. A carteira emissora deve corresponder a um AUDITOR (Researcher) autorizado.
3. O hash ou ID do registro offchain deve estar presente na transação.
4. O sistema deverá impedir, na camada de aplicação, a emissão de atestação caso o registro não exista ou não esteja validado.

**R9**

1. Cada registro deve possuir um campo de status implementado por meio do enum `MeasurementStatus`.
2. Todo registro deve ser criado obrigatoriamente no estado `Pending`.
3. Apenas registros com status `Validated` poderão ser utilizados como base para emissão de atestação externa via EAS.
4. Registros nos estados `Pending` ou `Contested` não devem ser elegíveis para certificação.
5. O contrato inteligente não implementa, nesta sprint, o estado "Atestado" onchain; a certificação ocorre externamente por meio do EAS após validação.

**3.1.1.3. Matriz de Controle de Acesso**

&emsp; A matriz de controle de acesso apresenta a distribuição de permissões entre os papéis institucionais do sistema. A tabela abaixo consolida os direitos operacionais derivados dos Requisitos de Negócio definidos anteriormente, assegurando coerência entre governança e implementação técnica.

| Funcionalidade                         | Caretaker | Auditor | Registrar | Super Admin |
|----------------------------------------|------------|----------|------------|--------------|
| Registrar Medição                     | Sim        | Não      | Não        | Não          |
| Validar / Contestar Registro           | Não        | Sim      | Não        | Não          |
| Emitir Atestação (via EAS)             | Não        | Sim      | Não        | Não          |
| Cadastrar Exemplar / Tanque            | Não        | Não      | Sim        | Não          |
| Inativar Exemplar / Tanque             | Não        | Não      | Sim        | Não          |
| Conceder / Revogar Papéis              | Não        | Não      | Não        | Sim          |

**3.1.1.4. Requisitos Não-Funcionais**

&emsp; Os requisitos não-funcionais definem propriedades de qualidade, segurança e confiabilidade que o sistema deve atender, especialmente considerando sua integração com blockchain.

- **Integridade Onchain**: O hash do registro offchain utilizado na atestação deve ser gerado com algoritmo SHA-251.4.
- **Finalidade (Finality)**: Uma atestação deve ser considerada confirmada na interface apenas após no mínimo 2 confirmações de bloco na rede utilizada.
- **Privacidade (LGPD/GDPR)**: Dados pessoais sensíveis não devem ser incluídos no payload da atestação onchain, apenas identificadores públicos (wallets).
- **Auditabilidade**: Todos os eventos críticos devem gerar logs imutáveis.

&emsp; Os Requisitos de Negócio estabelecem a base estrutural do Sistema AxoloDAO, definindo diretrizes claras de governança, controle de acesso, validação técnica e rastreabilidade dos dados. Ao formalizar papéis, responsabilidades e critérios objetivos de aceitação, o sistema assegura integridade científica, segregação de funções e consistência entre as camadas offchain e onchain.  

&emsp; A distinção entre dado operacional e evidência certificada, aliada à utilização de atestações verificáveis, fortalece a transparência, a auditabilidade e a confiabilidade institucional. Dessa forma, os requisitos não apenas orientam a implementação técnica, mas consolidam os princípios de responsabilidade, rigor científico e confiança que sustentam o modelo proposto pelo AxoloDAO.

#### 3.1.2. Arquitetura da Solução

&emsp;Para compreender a interatividade e a composição de um sistema de maneira intuitiva, utiliza-se frequentemente o diagrama de blocos. Essa metodologia auxilia na visualização de processos densos, sendo amplamente aplicada na engenharia de software para definir requisitos e refinar operações de maneira antecipada (BERTOLINE ET AL., 2010; DENNIS ET AL., 2015). Além disso, sua aplicação facilita a documentação e o entendimento do funcionamento do sistema ao longo do seu ciclo de vida, tornando-se essencial para projetos que envolvem múltiplos componentes tecnológicos interligados (PRESSMAN & MAXIM, 2019).

<figure align="center">
  <p align="center"><b>Figura 12: Arquitetura de Blocos do Sistema AmbyData</b></p>
  <img src="../assets/diagrama-axolodao.png" alt="Diagrama de blocos do sistema Axolodao">
  <figcaption align="center">
    <i>Legenda: Representação dos fluxos de dados e interações entre módulos.</i>
    <br>
    <a href="https://lucid.app/lucidchart/739e3b4d-e76a-4960-9883-8a6447d4bc41/edit?viewport_loc=-1444%2C509%2C2910%2C1335%2C0_0&invitationId=inv_0eff7086-1c39-4a4d-9b59-35779ab9355c" target="_blank">
      Clique aqui para visualizar a versão no Lucidchart
    </a>
  </figcaption>
</figure>

#### 3.1.2.1 Visão Geral e Camadas

&emsp;O sistema AmbyData é dividido em quatro camadas distintas que trabalham de forma complementar.

- **Dispositivos**: é a camada de acesso, onde se encontram os equipamentos físicos dos perfis de usuário. Não processa nem armazena dados, apenas serve como ponto de entrada para o sistema.

- **Web2 (Offchain)**: é a camada de performance e interface do sistema. É composta pelo Frontend, pelo Backend e pela API. O **Frontend** é a interface que o usuário vê e opera. Ele recebe as ações de cada perfil, converte os dados para o formato aceito pelos contratos e coordena a comunicação com os demais componentes. Internamente, o Frontend utiliza uma biblioteca de integração Web3 que viabiliza a comunicação com a camada Web3, ela detecta a carteira conectada no browser, solicita a assinatura de transações e envia as operações ao RPC Node. O **Backend** é composto pelo Banco de Dados e pelo Indexador. O Banco de Dados armazena os dados já processados dos eventos da blockchain, organizados para consulta rápida. O Indexador é o componente responsável por manter o Banco de Dados sincronizado, ele escuta continuamente os eventos emitidos pelos contratos via RPC Node e grava cada alteração no banco. A **API** expõe esses dados ao Frontend, respondendo consultas sem precisar acessar a blockchain a cada requisição.

- **Web3**: é a camada de comunicação e autorização entre o sistema offchain e a blockchain. É composta por dois componentes. A **Wallet** é o mecanismo de identidade e autorização. No lugar de um login tradicional com usuário e senha, cada ator se identifica pela sua carteira, que assina criptograficamente cada operação antes de enviá-la à blockchain. O **RPC Node** é a ponte entre o sistema offchain e a blockchain. O Frontend e o Backend não falam diretamente com a rede Ethereum, eles entregam e recebem informações através do RPC Node, que mantém conexão permanente com a rede. O Backend, por meio do Indexador, também se conecta ao RPC Node via WebSocket para escutar eventos emitidos pelos contratos em tempo real.

- **Rede Blockchain (Onchain)**: é a camada de verdade. Aqui ficam os três Smart Contracts e a Sepolia Testnet com a Ethereum Virtual Machine. Nada pode ser alterado retroativamente. Tudo que é executado aqui gera um registro permanente.

&emsp;O Banco de Dados offchain serve os dados rapidamente para o Frontend, mas se alguém questionar a autenticidade de qualquer informação, os eventos gravados na blockchain provam o que realmente aconteceu.

#### 3.1.2.2 Mapeamento de Atores e Permissões

&emsp;Todos os perfis acessam o mesmo Frontend. O sistema detecta automaticamente o role associado à carteira conectada e adapta a interface de acordo. Isso simplifica a manutenção do código e elimina a necessidade de múltiplos sistemas de autenticação. 

- **Administrador**: conecta a Wallet e acessa o painel de concessão e revogação de permissões. Essa responsabilidade está isolada no contrato `AxoloAccess`, onde apenas o `DEFAULT_ADMIN_ROLE` pode chamar `grantRole` e `revokeRole`. A motivação para centralizar o controle de acesso em um contrato separado é a modularidade, se no futuro a lógica de permissões precisar mudar, apenas o `AxoloAccess` é substituído, sem necessidade de alterar os outros contratos. Qualquer tentativa de outro perfil executar essas funções é rejeitada pelo próprio contrato, sem depender de validação no Frontend.

- **Cuidador**: conecta a Wallet e acessa o painel de registro de medições ambientais. No `AxoloMonitoring`, apenas carteiras com `CARETAKER_ROLE` podem chamar `recordMeasurement`. Antes de executar qualquer lógica, o contrato consulta o `AxoloAccess` para verificar a permissão. Essa separação entre quem verifica a permissão e quem executa a ação permite que cada contrato tenha uma responsabilidade única e que o mesmo mecanismo de controle de acesso seja reutilizado por todos os contratos do sistema.

- **Auditor**: conecta a Wallet e acessa o painel de validação e contestação. No `AxoloMonitoring`, apenas carteiras com `AUDITOR_ROLE` podem chamar `validateMeasurement` e `contestMeasurement`. Existe uma restrição adicional que vai além do controle de roles, o Auditor não pode ser a mesma carteira que registrou a medição, e o contrato rejeita a operação se `recorder == msg.sender`. Essa regra implementa o princípio de separação de papéis: impede que alguém registre dados incorretos e os valide em seguida, garantindo que sempre haja dois atores distintos envolvidos no ciclo de vida de cada medição.

#### 3.1.2.3 Fluxo de Dados e Sincronização

&emsp;O ciclo de vida completo de uma medição ambiental percorre todas as camadas do sistema.

- **Entrada de dados (dispositivo do cuidador)**: O Cuidador preenche os parâmetros solicitados no Frontend. O Frontend converte os valores para o formato aceito pelo contrato e aciona a biblioteca de integração Web3 para montar a transação.

- **Wallet**: A biblioteca detecta a carteira conectada e solicita a assinatura da transação. O Cuidador confirma no MetaMask. A transação agora carrega a prova criptográfica de que aquela carteira autorizou aquela operação.

- **RPC Node**: A transação assinada é enviada ao RPC Node, que tem dois papéis distintos nesse fluxo. Primeiro encaminha a transação para a rede Sepolia. Depois, via consulta periódica aos logs de novos bloco, serve como canal pelo qual o Indexador escuta os eventos emitidos pelos contratos em tempo real. O RPC Node devolve a confirmação da operação para a Wallet após a transação ser incluída em um bloco.

- **Smart Contracts e EVM**: O `AxoloMonitoring` recebe a transação, consulta o `AxoloAccess` para verificar se a carteira tem `CARETAKER_ROLE`, consulta o `AxoloRegistry` para verificar se o tanque existe e está ativo, cria a medição com status `Pending` e emite o evento `MeasurementRecorded` com todos os parâmetros. A EVM executa essa lógica e grava o estado atualizado em um novo bloco na Sepolia Testnet.

- **Indexador e Banco de Dados**: O Indexador, conectado ao RPC Node via WebSocket, detecta o evento `MeasurementRecorded` assim que ele é emitido. Processa o evento, organiza os dados e os grava diretamente no Banco de Dados. Simultaneamente invalida o cache correspondente para que a próxima consulta do Frontend receba os dados atualizados.

- **Frontend via API**: O Frontend consulta a API, que verifica o Cache. Se o dado estiver disponível devolve imediatamente. Se não, consulta o Banco de Dados, armazena no Cache e devolve ao Frontend. O Visitante percorre exatamente esse mesmo caminho para visualizar os dados já validados, sem passar pela Wallet ou pelo RPC Node.

#### 3.1.3. Diagrama de sequência UML

&emsp; Diagramas de sequência são um tipo de diagrama que mostra como um conjunto de objetos interage em um sistema ao longo do tempo. Nas subseções a seguir, você encontrará os detalhes de como o projeto Ambydata foi planejado para interagir com o ecossitema Web2 e Web3.

#### 3.1.3.1 Diagrama de Sequência – Modelagem Inicial 

&emsp; O diagrama de sequência apresentado a seguir foi elaborado durante a Sprint 2, com o objetivo de representar a proposta inicial de interação entre os componentes do sistema Ambydata e os ecossistemas Web2 e Web3. Vale ressaltar que alguns elementos apresentados nesse diagrama não fora de fato implementados na solução final.

<div align = "center">

<div align = "center"> <p> Figura 13 - Diagrama de sequência - Administrador Adiciona Usuários </p> </div>

![DS - ADM ADICIONA USERS](<../assets/DS - ADM Adiciona usuarios.jpeg>)

<div align = "center"> Fonte: Material produzido pelos autores (2026). </div>

</div>

&emsp; Neste diagrama podemos pontuar que em sua primeira versão, o nosso sistema terá um usuário administrador que adicionará usuários cuidadores, auditores e até mesmo outros usuários administradores. Logo abaixo você confere de forma detalhada o fluxo de atividade descrito no diagrama: 

- Fluxo Web2: O administrador preenche os dados do novo usuário (nome, cargo, carteira, etc.) no Frontend. Ao final do processo, esses dados são enviados via POST para o Backend para persistência local.

- Fluxo Web3: O Frontend solicita que o Administrador assine uma transação via Metamask. Essa transação chama o Smart Contract para registrar o endereço (wallet) do novo usuário on-chain.

- Interação Chave: O registro no Banco de Dados só é confirmado após o RPC Node retornar o TxHash, garantindo que o usuário só existe no sistema se existir na blockchain.


<div align = "center">

<div align = "center"> <p> Figura 14 - Diagrama de sequência - Administrador Cadastra Axolotes/Tanques </p> </div>

![DS - AXOLOTES/TANQUES](<../assets/DS - ADM Adiciona axolotes+tanques.jpeg>)

<div align = "center"> Fonte: Material produzido pelos autores (2026). </div>

</div>

- Fluxo Web2: O Administrador insere as especificações técnicas (informações do tanque ou informações sobre a espécie do axolote) no formulário.

- Fluxo Web3: A Biblioteca Web3 prepara a transação de registro. O Administrador aprova o custo de Gas, e o Smart Contract mina o novo registro na blockchain.

- Interação Chave: O sistema salva o link entre o objeto físico (descrito no banco de dados) e o registro digital (TxHash na Blockchain) para futuras auditorias.

<div align = "center">

<div align = "center"> <p> Figura 15 - Diagrama de sequência - Administrador Verifica as Permissões dos Usuários Cadastrados </p> </div>

![DS - Permissões](<../assets/DS - ADM verifica permissoes.jpeg>)

<div align = "center"> Fonte: Material produzido pelos autores (2026). </div>

</div>

- Fluxo Web2 (Interface): O Administrador acessa o painel de busca de usuários no Frontend. O sistema exibe os dados básicos (como nome ou carteira) e prepara a interface para mostrar o status de acesso.

- Fluxo Web3 (Consulta): O Frontend utiliza a Biblioteca Web3 para fazer uma chamada de "leitura" ao RPC Node. O pedido consulta a função hasRole diretamente no Smart Contract para verificar o cargo vinculado à conta informada.

- Interação Chave: Ao contrário dos outros fluxos, não há interação com o Banco de Dados (Backend) para validar a permissão. O sistema confia nas orientação descritas dentro do Smart Contract, garantindo que se uma permissão foi revogada na blockchain, ela será refletida instantaneamente na interface, sem risco de dados desatualizados no banco local.

<div align = "center">

<div align = "center"> <p> Figura 16 - Diagrama de sequência - Cuidador </p> </div>

![DS - CUIDADOR](<../assets/DS - CUIDADOR.jpeg>)

<div align = "center"> Fonte: Material produzido pelos autores (2026). </div>

</div>

- Fluxo Web2: O Cuidador envia os dados biológicos do axolote escolhido de forma imediata para o Backend. O sistema cria um pré-registro com status "Pendente" para evitar perda de dados se a conexão cair.

- Fluxo Web3: Após o pré-registro, o Cuidador assina a transação. O Smart Contract executa a função de registro e emite um evento de confirmação on-chain.

- Interação Chave: O Frontend recebe a confirmação do bloco pelo RPC e faz um segundo envio ao Backend para atualizar o status do dado de "Pendente" para "Registrado".

<div align = "center">

<div align = "center"> <p> Figura 17 - Diagrama de sequência - Auditor </p> </div>

![DS - CUIDADOR](<../assets/DS - CUIDADOR.jpeg>)

<div align = "center"> Fonte: Material produzido pelos autores (2026). </div>

</div>

- Fluxo Web2: O Auditor solicita a lista de registros pendentes. O Backend consulta o banco de dados e retorna os itens que aguardam revisão.

- Fluxo Web3: Ao clicar em "Aprovar", o Auditor executa uma função de atestação no Smart Contract. Sua assinatura digital fica gravada na blockchain como prova de que ele revisou aquele dado.

- Interação Chave: Assim que a rede confirma a aprovação (via RPC), o Backend atualiza o status do registro para "Auditado" (via PATCH), vinculando a prova da blockchain ao dado original.

<div align = "center">

<div align = "center"> <p> Figura 18 - Diagrama de sequência - Auditor </p> </div>

![DS - Auditor rejeita registro de dado](<../assets/DS - Auditor rejeta Registro.png>)

<div align = "center"> Fonte: Material produzido pelos autores (2026). </div>

</div>

- Fluxo Web2: O Auditor analisa os dados no Frontend e clica em "Rejeitar". O sistema solicita a adição de um motivo para efetuar a rejeição. Esses dados são enviados ao Backend via PATCH(). O status do registro no Banco de Dados muda de "Pendente" para "Rejeitado".

- Fluxo Web3: Não há interação com a blockchain neste momento. O Smart Contract permanece inalterado, pois nenhuma função de aprovação foi chamada.

- Interação Chave: O Frontend do Cuidador consulta o Backend e identifica que há uma tarefa pendente de correção. O Cuidador só poderá tentar uma nova submissão à Web3 após corrigir os dados no Backend.

#### 3.1.3.2 Diagrama de Sequência – Versão Atualizada

&emsp; A versão atualizada do diagrama incorpora refinamentos realizados durante a Sprint 3, incluindo novos fluxos de validação, integrações adicionais e ajustes decorrentes da implementação parcial do sistema.

&emsp; Essa atualização reflete uma visão mais consolidada da arquitetura e das interações entre os componentes Web2 e Web3 diagramados na Sprint 2.

&emsp; O fluxo de autenticação estabelece a sessão do usuário de forma estritamente client-side, conectando a carteira e determinando permissões por meio de consultas on-chain diretas.

<div align="center">
  <p><b>Figura 19 - Diagrama de sequência do fluxo de autenticação</b></p>
  <img src="../assets/sprint3/fluxo_login_uml_sprint3.png" alt="Diagrama de sequência do fluxo de autenticação">
  <p><i>Fonte: Material produzido pelos autores (2026).</i></p>
</div>

- Fluxo Web2: O usuário clica em "Conectar Carteira". A aplicação solicita a conexão diretamente à extensão ou aplicativo de carteira via Web3 Library.

- Fluxo Web3: A carteira retorna o endereço público. O Frontend solicita uma assinatura de mensagem simples. Após o retorno da assinatura, o Frontend faz uma chamada direta via RPC Node para o ENS Resolver, buscando resolver o nome vinculado àquele endereço.

- Interação Chave: O cálculo de permissões (roles) ocorre no Frontend a partir do subdomínio ENS retornado (ex: *.auditor.museu.eth). A interface é carregada conforme o estado mantido localmente na sessão do navegador.

&emsp; O fluxo de registro de um novo axolote submete os dados diretamente do cliente para o Smart Contract de registros.

<div align="center">
  <p><b>Figura 20 - Diagrama de sequência do fluxo de registro</b></p>
  <img src="../assets/sprint3/fluxo_registro_uml_sprint3.png" alt="Diagrama de sequência do fluxo de autenticação">
  <p><i>Fonte: Material produzido pelos autores (2026).</i></p>
</div>

- Fluxo Web2: O Cuidador submete os dados do espécime na interface. O Frontend verifica a permissão localmente e constrói a chamada da função registerAxolotl(). A transação é preparada usando a biblioteca Web3 (ethers.js).

- Fluxo Web3: O payload da transação é enviado diretamente ao RPC Node. O Smart Contract AxoloRegistry executa a função, persiste os dados no seu estado interno e emite o evento AxolotlRegistered. O RPC Node retorna o TxHash para a biblioteca Web3.

- Interação Chave: O Cuidador deve arcar diretamente com os custos de gas da transação, pois não há um Safe (Relayer) integrado para patrocinar as taxas. A confirmação de sucesso na interface depende exclusivamente do tempo de mineração do bloco na rede. As outras funções de registro tem fluxo análogo ao apresentado.

&emsp; O fluxo de auditoria valida os dados utilizando um Smart Contract customizado da própria aplicação, sem a adoção de protocolos universais de atestação nesta fase.

<div align="center">
  <p><b>Figura 21 - Diagrama de sequência do fluxo de auditoria</b></p>
  <img src="../assets/sprint3/fluxo_auditoria_uml_sprint3.png" alt="Diagrama de sequência do fluxo de autenticação">
  <p><i>Fonte: Material produzido pelos autores (2026).</i></p>
</div>

- Fluxo Web2 (Frontend): O Cuidador submete os dados do espécime na interface. O Frontend verifica a permissão localmente e constrói a chamada da função registerAxolotl(). A transação é preparada usando a biblioteca Web3 (ethers.js).

- Fluxo Web3: O payload da transação é enviado diretamente ao RPC Node. O Smart Contract AxoloRegistry executa a função, persiste os dados no seu estado interno e emite o evento AxolotlRegistered. O RPC Node retorna o TxHash para a biblioteca Web3.

- Interação Chave: O Cuidador deve arcar diretamente com os custos de gas da transação, pois não há um Safe (Relayer) integrado para patrocinar as taxas. A confirmação de sucesso na interface depende exclusivamente do tempo de mineração do bloco na rede.

#### 3.1.3.3 Diagrama de Sequência – Versão Final

&emsp;A versão apresentada abaixo do diagrama incorpora o planjemento da entrega final visando a Sprint 5, incluindo os fluxos de validação, integrações adicionais e ajustes planejados para a última versão do projeto.

&emsp;O fluxo de autenticação é o ponto de entrada de todos os usuários do sistema. Nele, o usuário prova que controla uma carteira Ethereum sem precisar de senha, e o sistema determina automaticamente qual painel exibir com base no subdomínio ENS vinculado ao endereço conectado. Essa abordagem elimina a necessidade de armazenar senhas no banco de dados e transfere a responsabilidade de identidade para a própria infraestrutura descentralizada da blockchain.

<div align="center">
  <p><b>Figura 22 - Diagrama de sequência do fluxo de autenticação</b></p>
  <img src="../assets/fluxo_login_uml.png" alt="Diagrama de sequência do fluxo de autenticação">
  <p><i>Fonte: Material produzido pelos autores (2026).</i></p>
</div>

- Fluxo Web2: O usuário clica em "Conectar Carteira" no Frontend. O Backend gera um nonce único, um número aleatório de uso único, e monta uma mensagem estruturada no padrão **SIWE (Sign-In with Ethereum)**, definido pela EIP-4361. Essa mensagem contém o domínio da aplicação, o endereço da carteira, o nonce gerado e um timestamp, e é retornada ao Frontend para ser apresentada ao usuário antes da assinatura.

- Fluxo Web3: O Frontend solicita que o usuário assine a mensagem via MetaMask. A carteira utiliza a chave privada do usuário para gerar uma assinatura **ECDSA**, um mecanismo criptográfico que permite provar a posse da chave sem revelá-la. Essa assinatura é enviada ao Backend, que aplica a função **ecrecover** para recuperar o endereço Ethereum que gerou aquela assinatura e confirmar que coincide com o endereço declarado. Em seguida, o Backend consulta o **ENS Resolver**, o contrato responsável por traduzir endereços Ethereum em nomes legíveis, para identificar o subdomínio associado ao endereço autenticado e determinar o role correspondente no sistema.

- Interação Chave: O sistema nunca armazena senha. A identidade do usuário é provada pela assinatura criptográfica via **SIWE**, e o seu papel no sistema é determinado pelo subdomínio **ENS** on-chain. O nonce gerado pelo Backend é invalidado após o primeiro uso, prevenindo ataques de repetição, onde um agente mal-intencionado poderia reutilizar uma assinatura interceptada. Se um role for revogado na blockchain, o próximo login já refletirá a mudança sem necessidade de atualização manual, pois a fonte de verdade é sempre o contrato.

&emsp;O fluxo de registro permite que um cuidador autenticado submeta os dados de um novo espécime ao sistema. Para mitigar riscos de instabilidade de rede, a arquitetura garante que, caso a conexão caia logo após a confirmação da transação, o Indexador sincronize as informações automaticamente, preservando a integridade dos dados.

<div align="center">
  <p><b>Figura 23 - Diagrama de sequência do fluxo de registro</b></p>
  <img src="../assets/fluxo_registro_uml.png" alt="Diagrama de sequência do fluxo de registro">
  <p><i>Fonte: Material produzido pelos autores (2026).</i></p>
</div>

- Fluxo Web2: O Cuidador submete os dados do novo espécime, disparando uma requisição `POST` /registro ao Backend contendo o JWT. O servidor valida o token e a permissão de cuidador para criar um pré-registro no banco de dados. Este rascunho assegura que as informações não sejam perdidas em caso de instabilidade de rede ou falha na etapa seguinte.

- Fluxo Web3: O Backend constrói a chamada registerSpecimen e prepara a transação via biblioteca Web3. O payload é enviado ao RPC Node e encaminhado como transação patrocinada ao Safe Relayer. O Smart Contract executa a função, persiste os dados no estado e emite o evento `NovoRegistroCientifico` on-chain.

- Interação Chave: O RPC Node retorna o TxHash ao Backend, que repassa a confirmação de sucesso ao Frontend. O status do registro é atualizado apenas após o recebimento deste identificador único. As outras funções de registro tem fluxo análogo ao apresentado.


&emsp;O fluxo de auditoria permite que um Auditor valide um registro científico pendente e produza uma prova pública e verificável dessa validação. A aprovação gera uma atestação permanente no **Ethereum Attestation Service (EAS)**, associando a autoridade institucional do Auditor ao dado validado. Essa decisão arquitetural garante que qualquer pessoa, mesmo sem acesso ao sistema, possa verificar independentemente quem validou um registro, quando e com qual identidade institucional.

<div align="center">
  <p><b>Figura 24 - Diagrama de sequência do fluxo de auditoria</b></p>
  <img src="../assets/fluxo_auditoria_uml.png" alt="Diagrama de sequência do fluxo de auditoria">
  <p><i>Fonte: Material produzido pelos autores (2026).</i></p>
</div>

- Fluxo Web2: O Auditor acessa o painel de registros pendentes. O Backend consulta o Banco de Dados e retorna os itens que aguardam revisão, dados esses que foram previamente indexados a partir de eventos on-chain pelo Indexador de Eventos. O Auditor seleciona um registro e submete o parecer via Frontend, que envia um POST ao Backend com o ID do registro, o parecer e o JWT. O Backend valida o JWT e extrai o endereço do Auditor para a etapa de verificação de identidade.

- Fluxo Web3: O **Backend** autentica a identidade institucional do **Auditor** via **ENS Resolver**, validando se o endereço possui um subdomínio oficial em `*.auditor.museu.eth` para garantir o vínculo on-chain. Confirmada a identidade, o sistema estrutura uma atestação digital no protocolo **EAS (Ethereum Attestation Service)** seguindo um *schema* pré-definido. A transação é enviada ao **Safe Relayer** para execução patrocinada (**gasless**), resultando no registro permanente da declaração no contrato do EAS e na geração de um identificador único (**UID**) via evento **AttestationCreated**.

- Interação Chave: Após a confirmação da transação pela rede, o **Backend** atualiza o status do registro original para **Auditado**, vinculando o **TxHash** e o **UID** da atestação ao banco de dados relacional. O **UID** funciona como um selo de autenticidade que viabiliza a verificação pública e independente da interface do AxoloDAO, assegurando que a validade das informações seja comprovada por meio de auditoria realizada diretamente na blockchain.

&emsp;O fluxo de indexação sincroniza continuamente o Banco de Dados relacional com o estado da blockchain em segundo plano. Ele permite que a API forneça dados de baixa latência ao Frontend, eliminando a necessidade de consultas diretas à rede a cada requisição. 

<div align="center">
  <p><b>Figura 25 - Diagrama de Sequência - Indexação de Eventos</b></p>
  <img src="../assets/fluxo_indexacao_uml.png" alt="Diagrama de sequência do fluxo de indexação">
  <p><i>Fonte: Material produzido pelos autores (2026).</i></p>
</div>

- Fluxo Web2: O Indexador utiliza uma conexão WebSocket com o RPC Node para capturar eventos em tempo real. Ao receber um evento, o sistema utiliza a ABI do contrato para decodificar os dados hexadecimais em valores legíveis (números, endereços e strings). A persistência no banco de dados segue a estratégia de upsert (`INSERT` ou `UPDATE`), o que impede a duplicidade de registros em caso de reprocessamento. Após cada operação, o ponteiro do último bloco é atualizado, garantindo que a sincronização seja retomada do ponto exato em caso de reinicialização, evitando lacunas ou redundâncias

- Fluxo Web3: Os Smart Contracts e o Protocolo EAS emitem eventos como `MeasurementRecorded` e `AttestationCreated` para cada operação confirmada. O **Indexador** captura esses registros em tempo real via **WebSocket** e utiliza a **ABI** do contrato para decodificar os dados hexadecimais em informações legíveis. Esses eventos constituem a âncora de confiança e imutabilidade do sistema, e o Indexador atua como o tradutor que converte o estado da blockchain para o formato relacional da API.


&emsp;O fluxo de consulta ocorre inteiramente na camada Web2, utilizando o banco de dados pré-indexado para fornecer informações com baixa latência aos usuários autenticados. 

<div align="center">
  <p><b>Figura 26 - Diagrama de Sequência - Consulta de Dados</b></p>
  <img src="../assets/fluxo_consulta_uml.png" alt="Diagrama de sequência do fluxo de consulta">
  <p><i>Fonte: Material produzido pelos autores (2026).</i></p>
</div>

- Fluxo Web2: O usuário acessa o painel, disparando uma requisição `GET` à API com o **JWT** nos cabeçalhos de autorização. O **Backend** valida o token, verifica as permissões de acesso e executa um `SELECT` no Banco de Dados aplicando os filtros solicitados. O resultado é retornado em **JSON** para renderização de tabelas e gráficos no Frontend.



#### 3.1.3.4 Dicionário e Conclusão

&emsp; Para melhor entendimento dos diagramas, você pode consultar o seguinte dicionário com os termos abordados nesta sub-seção:

- Backend: O servidor e a lógica de negócios "nos bastidores". No seu projeto, ele gerencia o banco de dados, autenticação e recebe os comprovantes da blockchain.

- Frontend: A interface visual onde o Administrador, Cuidador e Auditor interagem. Ele orquestra as chamadas tanto para o Backend quanto para a Blockchain.

- Banco de Dados: Onde as informações detalhadas e metadados (como fotos, descrições e status de auditoria) são armazenados de forma privada e centralizada.

- PATCH() / POST(): Métodos de comunicação (HTTP). O POST cria um novo registro (ex: cadastrar axolote) e o PATCH atualiza um registro existente (ex: mudar status para "Auditado").

- Smart Contract: O "contrato inteligente" que roda na blockchain. Ele contém as regras imutáveis de quem pode o que (permissões) e registra a existência dos ativos.

- RPC Node (Infura/Alchemy): O nó que serve como portal de entrada para a rede. Ele permite que seu Frontend ou Indexador "leia" ou "escreva" na blockchain.

- Wallet / Provider (MetaMask): A carteira digital do usuário. Ela armazena as chaves privadas e é usada para assinar e autorizar o pagamento de transações.

- Gas: A taxa paga em criptomoeda para processar uma transação na rede. Operações de escrita (registro/aprovação) custam gas. Já as operações de leitura, geralmente não.

- TxHash (Transaction Hash): O "recibo" único de uma transação. É o link de confiança que une o dado no seu banco de dados à prova real na blockchain.

- HasRole: Uma função presente no contrato referente ao administrador que verifica se um determinado usuário  possui permissão para realizar uma ação (ex: Auditor).

- Biblioteca Web3 (Ethers.js/Web3.js): O pacote de código usado no Frontend para traduzir comandos de programação em mensagens que a blockchain entende.

&emsp; Desta forma, a partir da observação dos diagramas podemos retirar insights como de que forma desejamos que o sistema desenvolvido opere e identificar possíveis melhorias antes da sua implementação. 

#### 3.1.4 Diagrama de Implantação UML
<div align = "center"> <p> Figura 27 - Diagrama de Implantação UML </p> </div>

<img src="../assets/diagrama_implantacao.drawio.png" alt="Diagrama de Implantação UML">

<div align = "center"> Fonte: material produzido pelos próprios alunos (2026). </div>

### Descrição Textual da Arquitetura

&emsp;O ecossistema do projeto foi desenhado em uma arquitetura híbrida (Web2 e Web3), separando claramente as responsabilidades de interface, processamento lógico, persistência de estado e comunicação com a blockchain. A arquitetura é composta pelos seguintes nós de implantação:

- **Dispositivo do Usuário:** Contém o **Frontend (Angular)**, que renderiza a interface interativa do usuário, e a **MetaMask Wallet**, que atua como o provedor Web3 responsável pelo gerenciamento de chaves e assinaturas criptográficas. O Frontend se comunica com o Backend via HTTPS (REST) e envia requisições e assinaturas (*Signatures*) sem contato direto com a blockchain.

- **Camada Web2:** Hospeda a **API Backend (TypeScript - Vercel)**. Atua como o maestro do sistema, recebendo requisições do Frontend e orquestrando chamadas tanto para o banco de dados quanto para a infraestrutura Web3. A API não guarda estado da blockchain nativamente, servindo como uma ponte segura.

- **Infraestrutura Web3:** Composta pelo **RPC Node** e pelo **Safe Relayer**. Todo o tráfego que sai do Backend em direção à blockchain passa obrigatoriamente por essa camada. O RPC Node gerencia consultas (*Call/Write*), resoluções de nomes (ENS) e atestações (EAS) via protocolo JSON-RPC. O Safe Relayer intercepta as assinaturas do usuário e encaminha transações patrocinadas (*Gasless*) para a rede.

- **Blockchain Ethereum:** O ambiente de execução descentralizado (EVM). É onde residem os **Smart Contracts** de registro do sistema, o **Protocolo EAS** (Ethereum Attestation Service) e o **ENS Resolver**. Este nó processa a lógica de negócio imutável e consolida as transações encaminhadas pelo RPC Node.

- **Worker / Indexador:** Um serviço autônomo rodando em segundo plano. Ele utiliza conexões em tempo real via *WebSocket* com o RPC Node para ouvir e varrer eventos emitidos pela EVM. Seu papel exclusivo é transformar logs descentralizados em dados estruturados.

- **Supabase (Cloud BaaS):** Banco de Dados PostgreSQL responsável pela leitura rápida dos dados. Ele é alimentado ativamente pelo Indexador via requisições HTTPS (PostgREST), garantindo que a aplicação tenha acesso a dados *on-chain* sem a latência característica das consultas diretas à blockchain.

#### 3.1.5. Implementação dos Requisitos de Negócio nos Smarts Contrats

A implementação foi dividida em três contratos (`AxoloAccess`, `AxoloRegistry` e `AxoloMonitoring`) para separar responsabilidades distintas dentro do sistema.

- `AxoloAccess` é responsável exclusivamente pelo controle de permissões. Ele define quais endereços possuem os papéis necessários para registrar medições, validar dados ou administrar o sistema. Ao centralizar essa lógica, evita-se repetir verificações de acesso em múltiplos contratos e mantém-se a governança concentrada em um único ponto.
- `AxoloRegistry` é responsável exclusivamente pela identidade dos exemplares. Ele registra o identificador único de cada exemplar e controla seu status (ativo ou inativo). Não lida com medições nem validações. Isso garante que a identidade seja permanente e independente da lógica operacional.
- `AxoloMonitoring` é responsável exclusivamente pelo ciclo de vida das medições. Ele registra dados ambientais, armazena os campos obrigatórios, controla a validação e define o estado do registro (bruto ou validado). Não gerencia papéis nem cria exemplares.

A divisão em três contratos foi adotada para:

- Não misturar controle de acesso com dados operacionais.
- Não misturar identidade estrutural com eventos temporais.
- Facilitar auditoria e manutenção do código.
- Reduzir risco de erro ao modificar uma parte específica do sistema.

**3.1.5.1. Controle de Acesso e Governança (`AxoloAccess.sol`)**

A segurança do sistema começa pelo controle de quem pode fazer o quê. O contrato `AxoloAccess` implementa o modelo RBAC (Role-Based Access Control), utilizando a biblioteca `AccessControl` da OpenZeppelin. A escolha por RBAC permite separar claramente responsabilidades e impedir que qualquer endereço execute funções críticas sem autorização explícita.

Papéis definidos:
- `CARETAKER_ROLE`: utilizado por cuidadores responsáveis por registrar medições ambientais.
- `AUDITOR_ROLE`: utilizado por pesquisadores responsáveis por validar registros.
- `REGISTRAR_ROLE`: utilizado por administradores responsáveis pelo cadastro de exemplares e tanques.
- `DEFAULT_ADMIN_ROLE`: controla a concessão e revogação dos demais papéis.

Os demais contratos (`AxoloRegistry` e `AxoloMonitoring`) não implementam lógica própria de permissão. Eles consultam o `AxoloAccess` antes de executar ações sensíveis. Isso centraliza a governança em um único ponto e evita duplicação de regras de autorização.

Essa estrutura atende diretamente:

- RN01 / Requisito 1: somente cuidadores podem registrar medições.
- RN02 / Requisito 2: somente pesquisadores podem validar registros.
- RN04: separação de funções garantida por papéis distintos.

**3.1.5.2. Registro de Ativos Biológicos (`AxoloRegistry.sol`)**

O contrato `AxoloRegistry` gerencia a identidade estrutural dos axolotes e tanques. Ele é responsável por manter o vínculo permanente entre o identificador do exemplar e seus dados essenciais.

##### Integridade dos dados

- **Identificador único**: Cada exemplar recebe um ID incremental gerado automaticamente (`nextAxolotlId`). Isso garante que não existam duplicações e permite rastreabilidade longitudinal ao longo do tempo.
- **Imutabilidade**: Dados fundamentais, como espécie e data de nascimento, são definidos no momento do cadastro e não podem ser alterados posteriormente. Essa decisão evita reescrita histórica e preserva consistência científica.
- **Exclusão lógica**: O contrato não possui função de exclusão física. Em vez disso, utiliza um campo booleano (`active`) para indicar se o exemplar está ativo ou inativo. Isso preserva o histórico completo, atendendo ao princípio de imutabilidade exigido pela RN07.
- **Gestão de tanques**: O sistema mantém controle de quais axolotes estão associados a quais tanques. Um tanque não pode ser desativado enquanto houver exemplares ativos vinculados a ele. Essa verificação impede inconsistências estruturais na modelagem dos dados.

Essa arquitetura atende ao:

- RN07 / Requisito 7: identidade única e permanente, sem exclusão física.

**3.1.5.3. Monitoramento e Validação Científica (`AxoloMonitoring.sol`)**

O contrato `AxoloMonitoring` concentra a lógica de coleta, validação e evolução dos registros ambientais.

Fluxo de Registro (RN01, RN05)

Para registrar uma medição, o endereço que executa a transação deve possuir `CARETAKER_ROLE`. O contrato captura automaticamente `block.timestamp`, impedindo inserção manual de datas retroativas.

Cada medição armazena:

- Identificador do exemplar
- Parâmetros ambientais
- Unidade
- Endereço do responsável
- Timestamp automático
- Estado do registro

Como esses campos fazem parte da estrutura da função, não é possível criar um registro incompleto. Isso implementa:

- RN01 / Requisito 1: registro restrito a cuidadores.
- RN05 / Requisito 5: integridade estrutural mínima.

##### Validação e Auditoria (RN02, RN04, RN09)

Os registros passam por estados formais definidos em um `enum`:

- `Pending`: estado inicial de todo registro recém-criado.
- `Validated`: aprovado por um auditor.
- `Contested`: rejeitado, exigindo justificativa.

A validação exige `AUDITOR_ROLE`. Antes de validar, o contrato verifica se o autor da medição é diferente do validador (`recorder != msg.sender`). Caso contrário, a transação é revertida. Esse mecanismo garante:

- RN02: validação restrita a pesquisadores.
- RN04: proibição de auto-validação.
- RN09: distinção clara entre dado bruto e dado validado.

Apenas registros no estado `Validated` podem seguir para certificação externa.

**3.1.5.4. Otimização Técnica e Eficiência**

O contrato `AxoloMonitoring` também foi estruturado considerando eficiência de gás.

- Empacotamento de armazenamento

Dez parâmetros ambientais (como pH, temperatura e oxigênio dissolvido) são armazenados como `uint16`. O status do registro é armazenado como `uint8`. A soma total ocupa 21 bytes, permitindo que o Solidity armazene esses dados em um único slot de 32 bytes. Isso reduz significativamente o custo de escrita na blockchain, tornando o sistema mais sustentável economicamente sem comprometer precisão dos dados.

**Matriz de Rastreabilidade**

| Requisito / RN | Implementação no Smart Contract | Referência |
|---------------|----------------------------------|------------|
| R1 / RN01 | Verificação de `CARETAKER_ROLE` no registro | `AxoloMonitoring.sol` |
| R2 / RN02 | Verificação de `AUDITOR_ROLE` na validação | `AxoloMonitoring.sol` |
| R4 / RN04 | Bloqueio de auto-validação (`recorder != msg.sender`) | `AxoloMonitoring.sol` |
| R5 / RN05 | Estrutura `Measurement` com `block.timestamp` automático | `AxoloMonitoring.sol` |
| R7 / RN07 | Ausência de função delete e uso de flag `active` | `AxoloRegistry.sol` |
| R9 / RN09 | Enum `MeasurementStatus` com estados formais | `AxoloMonitoring.sol` |

&emsp; A implementação dos contratos inteligentes demonstra que as regras institucionais do AxoloDAO não foram tratadas apenas como diretrizes conceituais, mas incorporadas diretamente na lógica executável da blockchain. A separação entre controle de acesso, identidade estrutural e monitoramento ambiental garante que cada dimensão do sistema opere com responsabilidades bem definidas.

&emsp; O uso de papéis onchain, estados formais de validação e estruturas de dados imutáveis assegura coerência entre governança e execução técnica. Dessa forma, o sistema mantém rastreabilidade, integridade e controle de responsabilidades, reduzindo ambiguidades operacionais e fortalecendo a confiabilidade do registro científico.

### 3.2 Teste e Validação

#### 3.2.1. Introdução

&emsp;O conjunto de testes do sistema foi projetado para validar a integridade, segurança da informação e pleno funcionamento dos três seguintes contratos inteligentes que regem a lógica fundamental da aplicação:

- AxoloAcess: responsável pelo controle de acesso do sistema;

- AxoloRegistry: responsável pelo gerenciamento das variáveis imutáveis do projeto (ID dos axolotes e tanques);

- AxoloMonitoring: responsável pelo registro, validação e monitoramento das medições ambientais.  

&emsp;Ao utilizar o framework Foundry (forge), a execução dos testes pode ser executada de modo a respeitar a ordem de dependência técnica do sistema, partindo da gestão de permissões e do registro biológico até a validação dos dados de monitoramento ambiental. Para garantir a robustez das operações, a metodologia baseia-se na simulação de atores reais com funções distintas, como `registrador`, `caretaker` e `auditor`, o que permite verificar exaustivamente tanto o fluxo de sucesso das transações quanto a eficácia das restrições de acesso contra usuários não autorizados.

#### 3.2.2. Ferramentas e Metodologia

**Ferramental Técnico**

- **Linguagem e Biblioteca:** Os testes são desenvolvidos na mesma linguagem dos contratos (Solidity v0.8.24), utilizando a biblioteca `forge-std`, de modo a eliminar discrepâncias entre o ambiente de testes e a execução real na rede.

- **Isolamento de Estado:** Através da função `setUp`, o sistema garante que cada caso de teste inicie em um estado limpo e controlado, realizando o deploy do ecossistema e a configuração de permissões do zero para evitar a persistência de efeitos colaterais entre execuções.

- **Manipulação de Máquina Virtual:** São utilizadas funções especiais do Forge para simular o comportamento da blockchain:

    - **prank** e **startPrank**: Alteram o `msg.sender` para validar a segurança das funções restritas por papéis do OpenZeppelin;

    - **expectRevert:** Essencial para a metodologia de "teste negativo", garantindo que o contrato interrompa a execução (reverta) exatamente quando regras de negócio forem violadas.

**Metodologia de Validação**

- **Asserções de Estado e Lógica:** O sucesso das operações não é medido apenas pela ausência de erros, mas pela conferência rigorosa do estado final via `assertEq` (verifica igualdade), `assertTrue` (verifica se determinada condição é verdadeira) e `assertGt` (verificador se determinado valor é maior que outro), validando desde saldos de contadores até a ordem cronológica de registros.

- **Testes de Ciclo de Vida e Integração:** Os testes simulam fluxos complexos, como a transferência de axolotes entre tanques (validando a lógica de _swap-and-pop_ para otimização de memória) e o avanço de ponteiros de monitoramento, garantindo que a comunicação entre os contratos `Registry` e `Monitoring` ocorra sem falhas.

- **Integridade de Dados e Imutabilidade:** Existem testes específicos para assegurar que campos definidos como imutáveis (como espécie e data de nascimento) permaneçam inalterados após funções de atualização.

&emsp;Essa abordagem garante que o sistema seja resiliente, tratando desde a precisão dos dados ambientais até a segurança contra acessos mal-intencionados.

#### 3.2.3. Cenários e Atores

&emsp;Para compreender a aplicação prática dos contratos, detalhamos como o ambiente de teste é modelado para simular o mundo real, definindo as entidades que interagem com os contratos e os cenários de preparação necessários para as validações.

##### Atores e Papéis

&emsp;Para validar o controle de acesso baseado em funções (RBAC), a suíte de testes utiliza cinco endereços distintos, cada um representando um nível de privilégio no ecossistema:

- **Admin** (*DEFAULT_ADMIN_ROLE*): É o implantador (_deployer_) dos contratos. Possui autoridade máxima para conceder e revogar papéis de outros usuários.

- **Registrar** (*REGISTRAR_ROLE*): Responsável pela gestão do "registro civil". É o único ator autorizado a cadastrar tanques, registrar axolotes e realizar transferências entre ambientes.

- **Caretaker** (*CARETAKER_ROLE*): Atua no monitoramento diário. Sua função exclusiva é registrar as medições ambientais dos tanques (pH, temperatura, etc.).

- **Auditor** (*AUDITOR_ROLE*): Garante a qualidade dos dados. É responsável por validar ou contestar medições pendentes, mas é proibido de validar os próprios registros caso também possua o papel de cuidador.

- **Stranger** (*Sem Papel*): Representa um usuário comum ou um possível atacante. É utilizado para garantir que funções sensíveis revertam transações não autorizadas.

##### Cenários de Preparação

&emsp;Para evitar a repetição de código e garantir consistência, os testes utilizam cenários pré-configurados:

- **O Cenário setUp**: Antes de cada teste individual, o sistema executa a implantação completa dos três contratos na ordem de dependência e realiza a **atribuição inicial de papéis** para todos os atores.

- **O Cenário de Registro** (*_setupTankAndAxolotl*): Este _helper_ simula uma infraestrutura operacional mínima, registrando o "Tanque Principal" e um axolote ("Xolotl"). Isso permite que os testes de monitoramento foquem diretamente na lógica de medição sem precisar repetir o processo de cadastro básico.

- **Simulação de Dados Ambientais** (*_params*): Cria um conjunto de parâmetros realistas para testes. Como a blockchain não suporta números decimais, este cenário simula a escala de inteiros (ex: pH 7.23 é representado como 723 e temperatura 18.50°C como 1850).

#### 3.2.4. Testes

&emsp;As tabelas a seguir apresentam uma síntese do conjunto de testes, organizada por domínios de responsabilidade e contratos, com foco no impacto funcional e nas garantias de segurança oferecidas pelo sistema. Esta visualização tem como objetivo permitir uma leitura rápida e auditável da cobertura de testes, facilitando a verificação de quais regras de negócio e controles de acesso são explicitamente validados.

---

<div align = "center"> <p> Quadro 10 - Acesso e Permissões </p> </div>

| Nome do Teste             | Objetivo (O que valida)                                                                 |
| :------------------------ | :-------------------------------------------------------------------------------------- |
| `rolesGrantedCorrectly`   | Verifica se os papéis iniciais foram atribuídos corretamente às personas do sistema.    |
| `adminCanRevokeRole`      | Garante que o administrador pode revogar permissões (ex.: desligamento de um cuidador). |

<div align = "center"> Fonte: material produzido pelos próprios alunos (2026). </div>

---

<div align = "center"> <p> Quadro 11 - Registro de Tanques </p> </div>

| Nome do Teste | Objetivo (O que valida) |
| :--- | :--- |
| `registerTank` / `updateTank` | Criação e edição de tanques por um registrador autorizado. |
| `strangerCannotRegisterTank` | Bloqueia usuários sem permissão de registrar tanques. |
| `caretakerCannotRegisterTank` | Impede que cuidadores alterem a infraestrutura física. |
| `emptyNameReverts` | Exige que todo tanque possua um nome válido. |
| `updateNonExistentTankReverts` | Evita modificações em tanques inexistentes. |
| `tankCount` | Garante a integridade do contador global de tanques registrados. |

<div align = "center"> Fonte: material produzido pelos próprios alunos (2026). </div>

---

<div align = "center"> <p> Quadro 12 - Registro de Axolotes </p> </div>

| Nome do Teste | Objetivo (O que valida) |
| :--- | :--- |
| `registerAxolotl` / `updateAxolotl` | Cadastro e atualização de dados mutáveis dos animais. |
| `axolotlAppearsInTankList` | Confirma o vínculo correto entre axolotl e tanque. |
| `registerAxolotlInNonExistentTankReverts` | Bloqueia cadastro em tanques inexistentes. |
| `registerAxolotlWithZeroBirthDateReverts` | Impede registros com data de nascimento inválida. |
| `transferAxolotl` | Movimentação de um axolotl entre tanques, atualizando ambas as listas. |
| `transferToSameTankReverts` | Bloqueia transferências redundantes para o mesmo tanque. |
| `deactivateAxolotl` | Permite desativar o registro de um animal (ex.: óbito ou soltura). |
| `cannotDeactivateTankWithAxolotl` | **Regra crítica:** impede a desativação de tanques com axolotls ativos. |
| `deactivateTankAfterAxolotlDeactivated` | Permite desativar o tanque após todos os animais estarem inativos. |

<div align = "center"> Fonte: material produzido pelos próprios alunos (2026). </div>

---

<div align = "center"> <p> Quadro 13 - Registro de Dados </p> </div>

| Nome do Teste | Objetivo (O que valida) |
| :--- | :--- |
| `recordMeasurement` | Registro bem-sucedido de medições ambientais por um cuidador autorizado. |
| `strangerCannotRecord` | Bloqueia usuários não autorizados de registrar medições. |
| `auditorCannotRecord` | Impede que auditores atuem como coletores de dados. |
| `cannotRecordForInactiveTank` | Impede medições em tanques desativados. |
| `tankStatusUpdatedAfterRecord` | Atualiza o status do tanque com a nova medição pendente. |

<div align = "center"> Fonte: material produzido pelos próprios alunos (2026). </div>

---  

<div align = "center"> <p> Quadro 14 - Validação e Contestação </p> </div>

| Nome do Teste | Objetivo (O que valida) |
| :--- | :--- |
| `validateMeasurement` | Auditor valida uma medição pendente com sucesso. |
| `strangerCannotValidate` | Usuários comuns não podem validar medições. |
| `caretakerCannotValidate` | Cuidadores não podem validar dados. |
| `auditorCannotValidateOwnRecord` | **Segurança:** impede validação de medições próprias. |
| `cannotValidateNonExistentMeasurement` | Bloqueia validação de medições inexistentes. |
| `cannotValidateAlreadyValidated` | Impede reprocessamento de medições já finalizadas. |
| `lastValidatedIdAdvancesMonotonically` | Garante que o ponteiro de validação nunca retrocede. |
| `contestMeasurement` | Permite contestação científica com justificativa obrigatória. |
| `contestWithEmptyReasonReverts` | Exige motivo válido para contestação. |
| `contestDoesNotUpdateLastValidatedId` | Garante que medições contestadas não sejam referência oficial. |

<div align = "center"> Fonte: material produzido pelos próprios alunos (2026). </div>

---

<div align = "center"> <p> Quadro 15 - Consulta e Relatórios </p> </div>

| Nome do Teste | Objetivo (O que valida) |
| :--- | :--- |
| `getLastValidatedMeasurement` | Recupera a última medição validada de um tanque. |
| `getLastValidatedRevertsIfNone` | Tratamento de erro quando não há medições validadas. |
| `measurementCount` | Confirma a volumetria total de medições registradas no sistema. |

<div align = "center"> Fonte: material produzido pelos próprios alunos (2026). </div>

---

#### 3.2.5 Como Executar os Testes com Foundry

##### 1. Abrir o terminal correto

Use **Git Bash** no Windows.  
(Não use PowerShell para esses comandos.)


##### 2. Instalar o Foundry

No Git Bash, execute:

```
curl -L https://foundry.paradigm.xyz | bash
```

Depois:
- Feche o Git Bash
- Abra o Git Bash novamente

Instale os binários do Foundry:

```
foundryup
```

Verifique se funcionou:

```
forge --version
```

---

##### 3. Entrar na pasta do projeto

```
cd ~/g02/smart-contract
```

A pasta deve conter `foundry.toml`, `src/` e `test/`.

---

##### 4. Instalar dependências (se necessário)

```
forge install
```

---

##### 5. Rodar os testes

Executar todos os testes:

```
forge test
```

#### 3.2.6 Conclusão

&emsp; O conjunto de testes apresentada demonstra que o sistema foi validado de forma abrangente e sistemática, cobrindo desde o controle de acesso e a integridade do registro biológico até os fluxos críticos de monitoramento, validação e contestação de dados ambientais. Ao simular atores com papéis bem definidos e explorar tanto cenários de sucesso quanto de falha, os testes garantem que as regras de negócio são estritamente aplicadas e que comportamentos não autorizados são corretamente bloqueados.

---

### 3.3 ENS Instituições, EAS e Indexador de Dados

&emsp; Nesta seção estão presentes as infomrações sobre as atualizações do contrato ENS para suportar as ações que permeam as instituições, a implementação do EAS para validação de registros e a implementação de indexador de dados. 

#### 3.3.1 ENS Instituições

&emsp;Durante a sprint 4 o contrato AxoloAccess.sol passou por alterações importantes. A versão 2 traz a substituição de valores hardcoded por um armazenamento dinâmico e a implementação do padrão ERC-2771 para suportar transações sem gas via relayer.

&emsp;No primeiro contrato as instituições parceiras e as roles eram engessadas no código durante o deploy. Para resolver isso foi criada a struct Instituicao que agora guarda a role, o label, o status e a carteira do gerente. Com as novas funções adicionarInstituicao e removerInstituicao o admin da DAO consegue gerenciar os parceiros em tempo real sem precisar fazer o deploy de um contrato novo. Também foi feita a substituição de msg.sender por _msgSender() para garantir que o contrato identifique o usuário final corretamente mesmo quando a transação é enviada e paga pelo relayer.

&emsp;A integração com o ENS também mudou de forma significativa. Antes era necessário criar o subdomínio da instituição manualmente por fora. Agora ao executar adicionarInstituicao o próprio contrato aciona o ENS Registry cria o subdomínio e transfere a ownership direto para o gestor indicado. O contrato passou a administrar o ENS de forma autônoma e isso permitiu a remoção das condicionais fixas que definiam os nomes.

&emsp;Por fim a função registrarAcesso recebeu uma otimização de gas. Antes de fazer qualquer chamada externa pesada o contrato checa o estado local e se a instituição não existir ou estiver inativa a transação reverte imediatamente. A role atribuída ao usuário deixou de depender de vários blocos if/else e passou a ser puxada direto da struct da instituição. Para fechar e facilitar a indexação de dados pelo frontend e backend foram adicionados os eventos InstituicaoAdicionada e InstituicaoRemovida.

#### 3.3.2 EAS 

&ensp; O **EAS** (Ethereum Attestation Service) é um protocolo descentralizado que permite a criação, gestão e verificação de atestações onchain. Uma atestação é um registro criptográfico que comprova a ocorrência de um evento ou a conformidade de dados com critérios estabelecidos, sem depender de uma autoridade centralizada. No contexto do AmbyData, o EAS cobre todas as operações críticas do sistema: cadastro de tanques e axolotes, transferências, desativações e validações de medições ambientais.

&ensp; O fluxo de monitoramento do AmbyData depende de dois atores com responsabilidades distintas: o cuidador, que coleta, registra parâmetros ambientais e realiza os cadastros do sistema, e o auditor, que valida ou contesta esses registros. O problema central é garantir que essa cadeia de responsabilidade seja rastreável e não possa ser alterada retroativamente. Sem o EAS, a validação existiria apenas como um campo de status no contrato, sem prova pública de quem executou cada operação, quando e com qual identidade institucional. Com o EAS, cada ação crítica gera um UID único que pode ser consultado diretamente na blockchain por qualquer terceiro, independentemente da interface do AmbyData. Com o fluxo implementado é possível:

- **Criar atestações imutáveis**: cada operação crítica gera um UID único e permanente
- **Vincular à blockchain**: as atestações são registradas no contrato inteligente EAS
- **Permitir revogação documentada**: se um auditor comete erro, pode revogar e criar nova atestação
- **Proporcionar auditoria completa**: terceiros podem verificar toda a cadeia de operações

**Schemas Registrados**

&ensp; O AmbyData utiliza cinco schemas registrados no EAS Registry, cada um cobrindo um tipo de operação distinto no ciclo de vida dos registros. Os IDs abaixo são específicos da rede Sepolia testnet e podem variar em outras redes — os UIDs são configurados como parâmetros do construtor de cada contrato, não estão hardcoded:

<div align = "center"> <p> Quadro 16 - Schemas do EAS </p> </div>

| Schema ID (Sepolia) | Operação | Campos codificados |
|---|---|---|
| 4099 | Monitoramento | `id, tankId, temperature, ph, dissolvedOxygen, isValid, validator` |
| 4109 | Cadastro de Tanque | `id, name, location, registeredBy` |
| 4110 | Cadastro de Axolote | `id, tankId, name, species, birthDate, registeredBy` |
| 4111 | Transferência de Axolote | `axolotlId, fromTankId, toTankId, movedBy` |
| 4112 | Desativação | `axolotlId, tankId, deactivatedBy` |

<div align = "center"> Fonte: material produzido pelos próprios alunos (2026). </div>

&ensp; Cada schema é registrado uma única vez no EAS Registry. O UID correspondente é armazenado no contrato e referenciado em todas as atestações daquele tipo, o que garante que qualquer ferramenta externa consiga decodificar os dados sem conhecimento prévio da estrutura interna do AmbyData.

**Arquitetura Técnica**

&ensp; A implementação no AmbyData envolve dois componentes principais:

- **AxoloEAS.sol**

&ensp; Define apenas a interface mínima necessária para que os contratos do AmbyData consigam chamar o contrato EAS sem importar a biblioteca completa. Contém os structs de requisição e a assinatura da função `attest`:

```solidity
struct AttestationRequestData {
    address recipient;       // endereço que originou a operação
    uint64  expirationTime;  // 0 = sem expiração
    bool    revocable;       // true = permite revogação em caso de erro
    bytes32 refUID;          // referência a outra atestação (0x0 = nenhuma)
    bytes   data;            // abi.encode dos campos do schema
    uint256 value;           // ETH junto (0 no nosso caso)
}

struct AttestationRequest {
    bytes32                schema;  // UID do schema registrado
    AttestationRequestData data;
}

interface IEAS {
    function attest(AttestationRequest calldata request)
        external payable returns (bytes32 uid);
}
```

- **AxoloMonitoring.sol**

&ensp; Ao validar uma medição, o contrato monta a requisição usando o schema 4099 e chama o EAS com todos os sete campos do registro. O UID retornado é armazenado diretamente na struct da medição:

```solidity
bytes32 public measurementSchemaUID;  // schema 4099 na Sepolia
IEAS    public immutable eas;

function validateMeasurement(uint256 measurementId) external onlyAuditor {
    // ... lógica de validação

    bytes32 attestationUID = eas.attest(
        AttestationRequest({
            schema: measurementSchemaUID,
            data: AttestationRequestData({
                recipient: measurement.recorder,
                expirationTime: 0,
                revocable: true,
                refUID: bytes32(0),
                data: abi.encode(
                    m.id,
                    m.tankId,
                    m.temperature,
                    m.ph,
                    m.dissolvedOxygen,
                    true,          // isValid
                    m.validator    // endereço do auditor
                ),
                value: 0
            })
        })
    );

    measurement.attestationUID = attestationUID;
}
```

&ensp; O mesmo padrão se aplica às operações do `AxoloRegistry`, todas executadas por cuidadores autorizados: cadastro de tanque (schema 4109), cadastro de axolote (schema 4110), transferência (schema 4111) e desativação (schema 4112) emitem atestações no momento em que a transação é confirmada, deixando rastro público de quem executou cada operação e quando.

**Fluxo de Funcionamento**

&ensp; O processo ocorre em etapas:

1. **Registro da Medição**: Cuidador chama `recordMeasurement()` com dados ambientais
   - Status da medição: `Pending`
   - Aguarda validação
2. **Validated** ou **Contested**: Auditor chama `validateMeasurement()` ou `contestMeasurement()`
   - Se validado: atestação EAS é emitida via schema 4099 com os sete campos do registro e o UID fica armazenado na medição
   - Se contestado: motivo é registrado, nenhuma atestação é emitida
3. **Consulta externa**: Qualquer pessoa pode verificar a atestação pelo UID diretamente no contrato EAS, sem passar pela interface do AmbyData
   - Consultam o contrato EAS na blockchain
   - Verificam assinatura digital do auditor
   - Rastreiam toda a cadeia de validações

&ensp; As operações de cadastro, transferência e desativação seguem o mesmo princípio: a atestação é emitida no momento da transação e o UID fica disponível para consulta pública imediata.

&ensp; A integração com o EAS transforma cada operação crítica do sistema em uma prova pública e verificável. O cuidador que cadastra um axolote, o auditor que valida uma medição e o operador que transfere um espécime deixam rastros onchain rastreáveis por qualquer terceiro. Isso é o que permite que financiadores, reguladores ou pesquisadores externos auditem o histórico completo do sistema sem depender da palavra da equipe do projeto.

-------

#### 3.3.3 Indexador de Dados

&ensp; O Indexador é um serviço autônomo (Worker) executado em segundo plano, responsável por atuar como a ponte definitiva entre a rede Ethereum e o banco de dados relacional do projeto (Supabase). No ecossistema de aplicações Web3, consultar diretamente a blockchain para reconstruir históricos de dados, como listar todos os axolotes de um tanque ou o histórico de medições, é uma operação extremamente lenta e custosa devido à latência da rede e às limitações de paginação dos nós.

&ensp; O contexto do AmbyData exige respostas em tempo real na interface do usuário (Frontend). Para resolver esse gargalo, o Indexador varre a blockchain continuamente em busca de eventos emitidos pelos contratos inteligentes e espelha esses dados no PostgreSQL. Com esse fluxo implementado é possível:

- Eliminar a latência de leitura: O frontend consulta o banco de dados via API REST tradicional, obtendo respostas em milissegundos em vez de segundos.

- Contornar limites de RPC: O sistema centraliza as requisições à blockchain em um único serviço de backend, evitando que milhares de usuários esgotem a cota do provedor (Alchemy/Infura) simultaneamente.

- Estruturar dados complexos: Eventos isolados na rede são transformados em tabelas relacionais com chaves estrangeiras (ex: vinculando uma medição a um tanque e a uma atestação EAS).

**Estratégia de Sincronização Adaptativa**

&ensp; Devido às restrições do plano gratuito do provedor RPC, que limita as chamadas de extração de logs (eth_getLogs) a pequenos lotes, o motor do indexador foi projetado com um sistema de polling adaptativo. Ele intercala duas velocidades de execução: uma velocidade rápida (FAST_SYNC_DELAY) para ler blocos atrasados do passado com um ritmo mais veloz, e uma velocidade lenta (REALTIME_DELAY) para vigiar blocos recém-minerados, poupando a infraestrutura.

**Arquitetura Técnica**

&ensp; A implementação do motor de sincronização é dividida em dois arquivos principais de arquitetura modular:

**worker.ts (Orquestrador de Tempo)**

&ensp; É o processo principal que mantém o indexador vivo. Ele envolve a função de sincronização em um loop infinito (while (true)) e avalia a resposta para ajustar o tempo de descanso do script:

```TypeScript
const FAST_SYNC_DELAY = 3000;  // 3s: Acelera para ler o histórico pendente
const REALTIME_DELAY = 15000;  // 15s: Desacelera ao encostar no tempo real da rede

async function startWorker() {
  while (true) {
    let currentDelay = REALTIME_DELAY;
    try {
      // runIndexer retorna 'true' se alcançou o bloco mais recente
      const isCaughtUp = await runIndexer();
      currentDelay = isCaughtUp ? REALTIME_DELAY : FAST_SYNC_DELAY;
    } catch (error) {
      currentDelay = REALTIME_DELAY; // Proteção contra bloqueio por spam (Rate Limit)
    }
    await new Promise(resolve => setTimeout(resolve, currentDelay));
  }
}
```

**sync.ts (Extrator de Dados)**

&ensp; O núcleo lógico da varredura. Ele consulta o ponteiro do último bloco lido no Supabase, solicita os novos logs à EVM e processa os eventos em lote. Para maximizar a performance de I/O, as buscas pelos eventos dos três contratos (AxoloAccess, AxoloRegistry e AxoloMonitoring) ocorrem em paralelo.

```TypeScript
// Define o lote máximo baseado nas restrições comerciais do RPC
const MAX_BLOCK_RANGE = 9;
if (toBlock - fromBlock > MAX_BLOCK_RANGE) {
  toBlock = fromBlock + MAX_BLOCK_RANGE;
}

// Busca paralela de todos os eventos do ecossistema
const [accessEvents, tankEvents, axolotlEvents, measurementRecordedEvents, measurementValidatedEvents, measurementContestedEvents] = await Promise.all([
  accessContract.queryFilter("AcessoRegistrado", fromBlock, toBlock),
  registryContract.queryFilter("TankRegistered", fromBlock, toBlock),
  registryContract.queryFilter("AxolotlRegistered", fromBlock, toBlock),
  monitoringContract.queryFilter("MeasurementRecorded", fromBlock, toBlock),
  monitoringContract.queryFilter("MeasurementValidated", fromBlock, toBlock),
  monitoringContract.queryFilter("MeasurementContested", fromBlock, toBlock),
]);
```

&ensp; Após a extração, o script decodifica os argumentos do evento (args) e realiza as operações de banco de dados (insert ou update). O fluxo garante que informações complementares que não trafegam nos logs por questões de custo de Gas (como dados densos das medições ambientais) sejam resgatadas pontualmente no contrato antes da gravação no Supabase:

```TypeScript
for (const event of measurementRecordedEvents) {
  if ("args" in event) {
    const [measurementId, tankId, recorder, timestamp] = event.args;
    // Resgata a struct completa do contrato para obter os parâmetros ambientais
    const fullData = await monitoringContract.getMeasurement(measurementId);

    await supabase.from("measurements").insert({
      onchain_id: Number(measurementId),
      tank_id: Number(tankId),
      recorder,
      status: "pending",
      temperature: Number(fullData.temperature),
      // ... mapeamento dos demais parâmetros
      tx_hash: event.transactionHash,
    });
  }
}
```

**Fluxo de Funcionamento**

&ensp; O ciclo de vida de uma operação de indexação segue etapas estritas para garantir consistência e evitar duplicação de dados:

1. Recuperação de Estado: Consulta a tabela indexer_state e identifica o bloco onde a última varredura parou.

2. Definição de Fronteira: Calcula o intervalo seguro de blocos (ex: limitando a saltos de 9 em 9). Se não houver blocos novos, a operação é abortada prematuramente para poupar recursos.

3. Extração Descentralizada: Os eventos filtrados são descarregados do provedor RPC.

4. Transformação e Carga (ETL): * Registros novos (tanques, axolotes, acesso e medições) sofrem insert.

5. Atualizações de estado (como um auditor validando ou contestando uma medição) sofrem update, alterando a coluna de status e vinculando a attestation_uid do EAS.

6. Avanço de Ponteiro: O último bloco da varredura bem-sucedida é salvo no indexer_state.

7. Controle de Aceleração: O script retorna o diagnóstico da rede e aguarda o intervalo de tempo calculado antes de iniciar um novo ciclo.

&ensp; Em suma, o Indexador atua como a engrenagem vital que viabiliza a escalabilidade do AmbyData. Ao sincronizar e consolidar o histórico imutável da blockchain (incluindo as atestações de auditoria do EAS) em um banco de dados de alta performance, ele garante que o Frontend entregue uma experiência de usuário (UX) fluida e instantânea. Essa arquitetura híbrida permite que a aplicação usufrua da velocidade da Web2 sem abrir mão da segurança, transparência e descentralização exigidas por um sistema de monitoramento ambiental Web3.

-------


### 3.4 Testes Foundry e Frontend

&emsp; Nesta seção está presente a documentação dos testes pertinentes aos Smart Contracts implementados e ao Frontend.

#### 3.4.1 Testes Froundry

#### 3.4.1.1 Introdução

&emsp;Esta subseção consolida a evolução da estratégia de testes automatizados em Foundry para os smart contracts do AmbyData, cobrindo testes unitários, testes de integração, validação de fluxos de atestação via EAS e cenários de segurança com foco em riscos reais de operação. A proposta desta etapa foi transformar a suite de testes em uma camada auditável de garantia de qualidade, conectando regras de negócio, controle de acesso, rastreabilidade de eventos e resiliência contra comportamentos maliciosos.

&emsp;O objetivo técnico desta frente foi assegurar que os contratos operem de forma consistente em cenários normais e adversos, com validação explícita de permissões, transições de estado e invariantes críticos de segurança. Como resultado, a base de testes passou a cobrir de forma estruturada tanto o fluxo funcional principal quanto os pontos de fragilidade identificados na análise de vulnerabilidades.

#### 3.4.1.2 Escopo, versão e contexto técnico

&emsp;Os testes documentados nesta subseção foram executados sobre a versão dos smart contracts da sprint 4, com os contratos AxoloAccess.sol, AxoloRegistry.sol, AxoloMonitoring.sol e AxoloEAS.sol, utilizando Solidity 0.8.25 e framework Foundry (forge).

&emsp;O escopo inclui cinco suites principais de teste:

- AxoloDAO.t.sol (suite principal com 40 testes).
- AxoloInstitutions.t.sol (unitários de instituições e acesso ENS).
- AxoloIntegration.t.sol (integração entre instituiçõess, acesso e registro).
- AxoloEASFlowIntegration.t.sol (fluxos de atestação, contestação e revogação EAS).
- AxoloSecurityEdgeCases.t.sol (edge cases e segurança).

#### 3.4.1.3 Atualização da suite após remoção do REGISTRAR_ROLE

&emsp;Uma parte central da manutenção de testes nesta sprint foi refletir a remoção do REGISTRAR_ROLE e migrar a lógica de autorização para CARETAKER_ROLE onde aplicável. Essa alteração reduziu inconsistências entre modelo de papéis e comportamento real do sistema, além de eliminar cenários de falso positivo em testes que dependiam de um papel já descontinuado.

&emsp;A revisão da suite legada garantiu regressão controlada: os testes foram adaptados sem alteração indevida de escopo funcional, preservando a semântica dos cenários originais e reforçando o princípio de menor privilégio.

---

<div align = "center"> <p> Quadro 16 - Migração de Autorização (REGISTRAR_ROLE -> CARETAKER_ROLE) </p> </div>

| Nome do Teste | Objetivo (O que valida) |
| :--- | :--- |
| Atualização de testes de registro de tanque/axolote | Garante que operações antes vinculadas ao REGISTRAR_ROLE passam a exigir CARETAKER_ROLE. |
| Atualização de testes negativos de autorização | Confirma que atores sem CARETAKER_ROLE são corretamente bloqueados após a migração. |
| Reexecução da suite principal pós-migração | Assegura ausência de regresses e estabilidade da regra de acesso atualizada. |

<div align = "center"> Fonte: material produzido pelos proprios alunos (2026). </div>

---

#### 3.4.1.4 Suite principal AxoloDAO (40 testes)

&emsp;A suite AxoloDAO.t.sol atua como backbone de validação funcional do sistema, cobrindo controle de acesso, ciclo de vida de tanques e axolotes, registro de medições ambientais e fluxos de validação/contestação. Sua importância está em garantir robustez transversal entre os contratos principais.

<div align = "center"> <p> Quadro 17 - Suite AxoloDAO.t.sol (40 testes) </p> </div>

| Nome do Teste | Objetivo (O que valida) |
| :--- | :--- |
| test_access_rolesGrantedCorrectly | Verifica atribuição inicial correta de roles. |
| test_access_adminCanRevokeRole | Garante revogação de role pelo administrador. |
| test_registry_registerTank | Valida cadastro de tanque por ator autorizado. |
| test_registry_strangerCannotRegisterTank | Bloqueia cadastro de tanque sem role. |
| test_registry_auditorCannotRegisterTank | Bloqueia auditor em fluxo exclusivo de caretaker. |
| test_registry_emptyNameReverts | Exige nome não vazio no cadastro de tanque. |
| test_registry_updateTank | Valida atualização de tanque ativo. |
| test_registry_updateNonExistentTankReverts | Impede atualização de tanque inexistente. |
| test_registry_tankCount | Confere consistência do contador de tanques. |
| test_registry_registerAxolotl | Valida cadastro de axolote em tanque válido. |
| test_registry_axolotlAppearsInTankList | Garante vínculo do axolote na lista do tanque. |
| test_registry_registerAxolotlInNonExistentTankReverts | Bloqueia cadastro em tanque inexistente. |
| test_registry_registerAxolotlWithZeroBirthDateReverts | Impede data de nascimento inválida. |
| test_registry_updateAxolotl | Valida atualização de campos mutáveis do axolote. |
| test_registry_transferAxolotl | Garante transferência correta entre tanques. |
| test_registry_transferToSameTankReverts | Impede transferência redundante para o mesmo tanque. |
| test_registry_deactivateAxolotl | Valida desativação de axolote. |
| test_registry_deactivateAxolotlTwiceReverts | Evita dupla desativação inconsistente. |
| test_registry_cannotDeactivateTankWithActiveAxolotl | Impede desativação de tanque com axolote ativo. |
| test_registry_deactivateTankAfterAxolotlDeactivated | Permite desativar tanque após desativação dos animais. |
| test_monitoring_recordMeasurement | Valida registro de medição por caretaker. |
| test_monitoring_strangerCannotRecord | Bloqueia registro de medição sem role. |
| test_monitoring_auditorCannotRecord | Garante separação de papéis no monitoramento. |
| test_monitoring_cannotRecordForInactiveTank | Impede medição em tanque inativo. |
| test_monitoring_tankStatusUpdatedAfterRecord | Confirma atualização de estado do tanque após medição. |
| test_monitoring_validateMeasurement | Valida transição Pending -> Validated. |
| test_monitoring_strangerCannotValidate | Bloqueia validação por ator sem role de auditor. |
| test_monitoring_caretakerCannotValidate | Impede caretaker de validar medição. |
| test_monitoring_auditorCannotValidateOwnRecord | Evita auto-validação (conflito de interesse). |
| test_monitoring_cannotValidateNonExistentMeasurement | Bloqueia validação de medição inexistente. |
| test_monitoring_cannotValidateAlreadyValidated | Impede revalidação de medição finalizada. |
| test_monitoring_lastValidatedIdAdvancesMonotonically | Garante monotonicidade de ponteiro de validação. |
| test_monitoring_contestMeasurement | Valida contestação de medição pendente. |
| test_monitoring_contestWithEmptyReasonReverts | Exige justificativa obrigatória na contestação. |
| test_monitoring_cannotContestAlreadyContested | Impede dupla contestação da mesma medição. |
| test_monitoring_cannotContestValidated | Impede contestar medição já validada. |
| test_monitoring_contestDoesNotUpdateLastValidatedId | Garante separação entre estado contestado e referência validada. |
| test_monitoring_getLastValidatedMeasurement | Recupera última medição validada. |
| test_monitoring_getLastValidatedRevertsIfNone | Trata ausência de medição validada. |
| test_monitoring_measurementCount | Verifica consistência da volumetria de medições. |

<div align = "center"> Fonte: material produzido pelos proprios alunos (2026). </div>

---

#### 3.4.1.5 Suite AxoloInstitutions (unitários)

&emsp;A suite AxoloInstitutions.t.sol foi criada para isolar e validar a governança institucional e o fluxo ENS de concessao de acesso, reduzindo risco de permissões inconsistentes em onboarding de novos participantes.

<div align = "center"> <p> Quadro 18 - Suite AxoloInstitutions.t.sol </p> </div>

| Nome do Teste | Objetivo (O que valida) |
| :--- | :--- |
| test_institutions_adminCanCreateInstitution | Criação de instituição por admin. |
| test_institutions_nonAdminCannotCreateInstitution | Bloqueio de criação por não-admin. |
| test_institutions_listByGetterAfterCreatingMultiple | Consistência de leitura/listagem de instituições criadas. |
| test_institutions_requestAccessFlowAfterAdminApproval | Fluxo positivo de registro de acesso via ENS após aprovação. |
| test_institutions_requestAccessRevertsBeforeAdminApproval | Bloqueio de acesso antes de instituição ativa. |
| test_institutions_adminCanRevokeInstitution | Revogação institucional por admin. |
| test_institutions_nonAdminCannotRevokeInstitution | Bloqueio de revogação por não-admin. |
| test_institutions_revokedInstitutionBlocksRequestAccess | Instituição revogada não aceita novo acesso. |
| test_institutions_cannotCreateDuplicateActiveInstitution | Impede duplicidade de instituição ativa. |

<div align = "center"> Fonte: material produzido pelos proprios alunos (2026). </div>

---

#### 3.4.1.6 Suite AxoloIntegration (Instituições + Access + Registry)

&emsp;A suite AxoloIntegration.t.sol cobre comportamento end-to-end entre módulos, validando integridade do fluxo real de negócio (instituição -> role -> registro de ativos biológicos) e reforçando consistência entre fronteiras contratuais.

<div align = "center"> <p> Quadro 19 - Suite AxoloIntegration.t.sol </p> </div>

| Nome do Teste | Objetivo (O que valida) |
| :--- | :--- |
| test_integration_endToEndCaretakerInstitutionCanRegisterTankAndAxolotl | Fluxo completo com instituição caretaker operando Registry. |
| test_integration_auditorInstitutionGetsRoleButCannotRegisterTank | Auditor recebe role, mas não executa operação de caretaker. |
| test_integration_userWithoutEnsAccessCannotOperateButCanAfterRegistrarAcesso | Operação bloqueada sem ENS, liberada após registro de acesso. |
| test_integration_nonAdminCannotCreateInstitutionAndFlowDoesNotStart | Fluxo não inicia sem privilégio administrativo. |
| test_integration_revokedInstitutionBlocksNewAccessButKeepsGrantedRole | Revogação bloqueia novos acessos e evidencia permanência de role já concedida. |

<div align = "center"> Fonte: material produzido pelos proprios alunos (2026). </div>

---

#### 3.4.1.7 Suite AxoloEASFlowIntegration (atestar, contestar, revogar)

&emsp;A suite AxoloEASFlowIntegration.t.sol foi criada para validar a cadeia de confiança de evidências, cobrindo os fluxos críticos de atestação e governança de dados técnicos (validação, contestação e revogação).
<div align = "center"> <p> Quadro 20 - Suite AxoloEASFlowIntegration.t.sol </p> </div>

| Nome do Teste | Objetivo (O que valida) |
| :--- | :--- |
| test_eas_pendingToValidated_emitsAttestation | Pending -> Validated com emissão de atestação. |
| test_eas_pendingToContested_withReason | Pending -> Contested com justificativa obrigatória. |
| test_eas_validatedAttestation_canBeRevokedLater | Revogação posterior de atestação previamente emitida. |

<div align = "center"> Fonte: material produzido pelos proprios alunos (2026). </div>

---

#### 3.4.1.8 Suite AxoloSecurityEdgeCases (edge cases e seguranca)

&emsp;A suite AxoloSecurityEdgeCases.t.sol foi desenvolvida para reproduzir vulnerabilidades identificadas, com foco em segurança de autorização e riscos operacionais por estruturas de dados não limitadas.

<div align = "center"> <p> Quadro 21 - Suite AxoloSecurityEdgeCases.t.sol </p> </div>

| Nome do Teste | Objetivo (O que valida) |
| :--- | :--- |
| test_security_rolePermanence_afterEnsOwnershipTransfer | Reproduz permanência de role após transferência de subdomain ENS. |
| test_security_accessDenied_withoutAdequateRole | Confirma bloqueio de operações sem role adequada. |
| test_security_unboundedLoopRisk_deactivateTankGasGrowsWithArraySize | Evidencia crescimento de custo de gas com arrays maiores (risco de DoS). |
| test_security_unboundedLoopRisk_activeItemBlocksDeactivation | Reproduz bloqueio de desativação com item ativo ao final do loop. |

<div align = "center"> Fonte: material produzido pelos proprios alunos (2026). </div>

---

#### 3.4.1.9 Como executar os testes com Foundry

##### 1. Acessar a pasta do smart contract

```bash
cd C:/Users/seu_usuario/Desktop/pasta_do_projeto/smart_contract
```

##### 2. Executar suite completa

```bash
forge test --summary -vv
```

##### 3. Executar por suite

```bash
forge test --match-path test/AxoloDAO.t.sol -vv
forge test --match-path test/AxoloInstitutions.t.sol -vv
forge test --match-path test/AxoloIntegration.t.sol -vv
forge test --match-path test/AxoloEASFlowIntegration.t.sol -vv
forge test --match-path test/AxoloSecurityEdgeCases.t.sol -vv
```

##### 4. Executar cobertura

```bash
forge coverage --report summary
forge coverage --report lcov
```

&emsp;Este procedimento permite validação incremental por suite e auditoria global da estabilidade do ecossistema contratual.

#### 3.4.1.10 Casos de teste detalhados (pré-condição, procedimento, resultado esperado e pós-condição)

##### Caso 1 - Suite principal AxoloDAO.t.sol
Teste: test_monitoring_validateMeasurement

1. Pré-condição: contrato de monitoramento implantado; tanque ativo com medição pendente; auditor com role válido.
2. Procedimento de teste: registrar medição como caretaker e chamar validateMeasurement como auditor.
3. Resultado esperado: medição muda de Pending para Validated, com validator e validatedAt preenchidos.
4. Pós-condição: estado da medição permanece validado e rastreável para consultas subsequentes.

##### Caso 2 - Migracao REGISTRAR_ROLE -> CARETAKER_ROLE
Teste: atualização de cenário de registro de tanque

1. Pré-condição: REGISTRAR_ROLE removido do modelo da sprint 4; ator com CARETAKER_ROLE ativo.
2. Procedimento de teste: executar fluxo de registerTank e registerAxolotl com papéis atualizados.
3. Resultado esperado: operações autorizadas apenas para CARETAKER_ROLE e bloqueadas para papéis indevidos.
4. Pós-condição: suite legada permanece estável sem regressão funcional pós-migração.

##### Caso 3 - Suite AxoloInstitutions.t.sol
Teste: test_institutions_requestAccessFlowAfterAdminApproval

1. Pré-condição: instituição criada e ativa por admin; resolução ENS mockada corretamente para o usuário.
2. Procedimento de teste: usuário chama registrarAcesso com parentNode institucional válido.
3. Resultado esperado: role institucional concedido e ensName registrado no contrato de acesso.
4. Pós-condição: usuário passa a operar funções compatíveis com o role recebido.

##### Caso 4 - Suite AxoloIntegration.t.sol
Teste: test_integration_endToEndCaretakerInstitutionCanRegisterTankAndAxolotl

1. Pré-condição: instituição caretaker criada; acesso ENS do membro efetivado.
2. Procedimento de teste: membro registra tanque e axolote no Registry.
3. Resultado esperado: registros criados com vínculo correto de autoria e relacionamento tanque-axolote.
4. Pós-condição: dados persistidos e consultáveis, com política de permissão preservada.

##### Caso 5 - Suite AxoloEASFlowIntegration.t.sol
Teste: test_eas_validatedAttestation_canBeRevokedLater

1. Pré-condição: medição previamente validada e com UID de atestação emitido.
2. Procedimento de teste: executar fluxo de revogação da atestação no mock EAS.
3. Resultado esperado: marcação de revogação confirmada para o UID correspondente.
4. Pós-condição: trilha de governança de evidência mantém histórico de validação e revogação.

##### Caso 6 - Suite AxoloSecurityEdgeCases.t.sol
Teste: test_security_unboundedLoopRisk_deactivateTankGasGrowsWithArraySize

1. Pré-condição: dois tanques com quantidades diferentes de axolotes no array interno.
2. Procedimento de teste: desativar tanque pequeno e tanque grande, medindo consumo de gas de cada operação.
3. Resultado esperado: custo de gas maior no tanque com array mais extenso, evidenciando risco de escalabilidade/DoS.
4. Pós-condição: risco operacional documentado com evidência reproduzível e auditável.

#### 3.4.1.11 Evidências visuais dos testes Foundry

<div align = "center"> <p> Figura 27 - Compilação da suite Foundry </p> </div>

![Figura 27 - Compilacao da suite Foundry](../assets/compilando_testes_foundry.png)

<div align = "center"> Fonte: material produzido pelos proprios alunos (2026). </div>

<div align = "center"> <p> Figura 28 - Execução da suite principal AxoloDAO (evidencia 1) </p> </div>

![Figura 30 - AxoloDAO suite (1)](../assets/test_axolodao_test.png)

<div align = "center"> Fonte: material produzido pelos proprios alunos (2026). </div>

<div align = "center"> <p> Figura 29 - Execução da suite principal AxoloDAO (evidencia 2) </p> </div>

![Figura 31 - AxoloDAO suite (2)](../assets/test_axolo_dao_test_2.png)

<div align = "center"> Fonte: material produzido pelos proprios alunos (2026). </div>

<div align = "center"> <p> Figura 30 - Execução da suite de integração institucional </p> </div>

![Figura 32 - Suite AxoloIntegration](../assets/testes_axolointegration.png)

<div align = "center"> Fonte: material produzido pelos proprios alunos (2026). </div>

<div align = "center"> <p> Figura 31 - Execução da suite de integração EAS </p> </div>

![Figura 33 - Suite AxoloEASFlowIntegration](../assets/testes_axoloeasflowintegration.png)

<div align = "center"> Fonte: material produzido pelos proprios alunos (2026). </div>

<div align = "center"> <p> Figura 32 - Execução da suite de edge cases e segurança </p> </div>

![Figura 34 - Suite AxoloSecurityEdgeCases](../assets/test_axolo_security_edge_cases_test.png)

<div align = "center"> Fonte: material produzido pelos proprios alunos (2026). </div>

<div align = "center"> <p> Figura 33 - Consolidação dos resultados de testes Foundry </p> </div>

![Figura 35 - Consolidacao de resultados Foundry](../assets/test_foundry_tabela_completa.png)

<div align = "center"> Fonte: material produzido pelos proprios alunos (2026). </div>

#### 3.4.1.12 Conclusão

&emsp;A consolidação das suites Foundry da sprint 4 demonstra avanço de maturidade técnica no AmbyData, com cobertura de fluxos essenciais de negócio, validação de permissões, integração entre contratos e reprodução controlada de vulnerabilidades relevantes. A migração de papéis para CARETAKER_ROLE fortaleceu a coerência do modelo de autorização, enquanto as suites complementares (instituições, integração, EAS e segurança) ampliaram a confiabilidade do sistema sob ótica funcional e adversarial.

&emsp;Com a documentação de comandos, evidências visuais e casos detalhados com pré-condição, procedimento, resultado esperado e pós-condição, a subseção atende aos critérios de Testes Automatizados exigidos para a sprint, oferecendo rastreabilidade acadêmica e auditabilidade técnica compatíveis com um projeto blockchain orientado à segurança e integridade de dados.

#### 3.4.2 Testes Frontend

&ensp; Os testes end-to-end do AmbyData cobrem os três fluxos críticos do frontend, validando a integração entre interface, wallet e smart contracts. A particularidade central é que o frontend não usa autenticação convencional: todas as operações passam por MetaMask e transações na blockchain Sepolia.

&ensp; A MetaMask roda como extensão do browser e exibe popups nativos que ferramentas de automação não conseguem controlar. A solução implementada injeta um provider EIP-1193 sintético no contexto do browser antes do Angular inicializar, usando `page.addInitScript()` do Playwright. Este método executa código de inicialização antes de qualquer script da página carregar, substituindo `window.ethereum` por um mock que implementa a interface completa da MetaMask.

**Arquitetura dos Testes**
```
frontend/teste_e2e/
├── fixtures/
│   ├── mock-ethereum.ts        # Mock do provider EIP-1193
│   ├── test-data.ts            # Dados de teste (endereços, roles, tanques, medições)
│   └── helpers.ts              # Utilitários (loginAs, mockRelayer, etc)
├── pages/                      # Page Object Model
│   ├── login.page.ts
│   ├── tela-inicial.page.ts
│   ├── cadastro.page.ts
│   ├── monitoramento.page.ts
│   ├── admin.page.ts
│   └── gerente.page.ts
├── tests/
│   ├── login.spec.ts           (7 testes)
│   ├── cadastro.spec.ts        (6 testes)
│   ├── medicao.spec.ts         (8 testes)
│   ├── admin.spec.ts           (4 testes)
│   ├── gerente.spec.ts         (3 testes)
│   └── guard.spec.ts           (3 testes)
├── plano-testes-e2e.md
├── teste_frontend.md
└── backlog.md
```

**O Mock: mock-ethereum.ts**

&ensp; O arquivo divide-se em dois contextos. O `buildInitConfig()` executa em Node.js com acesso ao `ethers.js`, pré-computa seletores ABI e codifica respostas em hex, serializando tudo como JSON. O `ethereumInitScript()` executa no browser sem imports, recebe esse JSON e cria `window.ethereum` com suporte a:

- `eth_requestAccounts` / `eth_accounts` → retorna endereço mockado
- `eth_chainId` → retorna `0xaa36a7` (Sepolia)
- `eth_call` → intercepta leituras aos contratos (`hasRole`, `getAxolotl`, etc.)
- `eth_sendTransaction` → gera tx hash fake e registra no histórico
- `eth_getTransactionByHash` / `eth_getTransactionReceipt` → retorna objeto mock para hashes já enviados
- `eth_subscribe` (newHeads) → retorna ID de conexão

&ensp; Uso nos testes:
```typescript
const cfg = buildInitConfig({ 
  role: 'caretaker',
  address: ADDRESSES.operator,
  tanks: [
    { id: 1, name: 'Tanque Berçário',  location: 'Laboratório Norte' },
    { id: 2, name: 'Tanque Principal', location: 'Laboratório Sul'   }
  ]
});
await page.addInitScript(ethereumInitScript, cfg);
await page.goto('/login');
```

**Caminhos Críticos e Funcionalidades Testadas**

| Caminho | Arquivo | Testes | Responsabilidade |
|---|---|---|---|
| Seleção de perfil | login.spec.ts | 4 | Autenticação e detecção de role (admin, gerente, operador, auditor) |
| Registro ENS | login.spec.ts | 3 | Novo usuário + validação de formulário |
| Resiliência sem MetaMask | login.spec.ts | 1 | App não crasha, botão permanece visível |
| Cadastro de Tanque | cadastro.spec.ts | 3 | Registro de infraestrutura com localização |
| Cadastro de Axolote | cadastro.spec.ts | 3 | Registro de espécimes |
| Registro de Medição | medicao.spec.ts | 8 | Coleta de 11 parâmetros ambientais + alertas biológicos (temperatura, pH, amônia) |
| Visibilidade Auditor | medicao.spec.ts | 1 | Auditor vê "Fila de Validação" na sidebar |
| Funcionalidades Admin | admin.spec.ts | 4 | Sidebar, diagnóstico, wallet badge, logout |
| Registro de Membro | gerente.spec.ts | 3 | Gerente registra novo membro com preview ENS |
| Proteção de Rotas | guard.spec.ts | 3 | Redirecionamento sem wallet, bloqueio de acesso |
| **Total** | **6 arquivos** | **33 testes** | **Cobertura completa do MVP** |

**Login com MetaMask e Registro — login.spec.ts**

| Teste | Validação |
|---|---|
| Admin connect | Conecta, vê card "Administrador" e redireciona |
| Gerente connect | Detecta role async, card "Gerente Institucional" aparece |
| Operador/Cuidador connect | Conecta normalmente, vê card "Cuidador" |
| Auditor connect | Conecta normalmente, vê card "Auditor" |
| Registro sem role — formulário | Usuário novo vê campos de texto para label e instituição |
| Registro ENS completo | Preenche label + inst → preview atualiza → submete → redireciona |
| Formulário incompleto | Campo vazio → mensagem de erro bloqueia envio |
| Sem MetaMask | Clica conectar sem extensão → app não crasha, botão permanece |

&ensp; O contrato `AxoloAccess` retorna o role associado ao endereço conectado. O frontend renderiza a interface conforme o role: cuidadores veem formulários de medição, auditores veem painel de validação. Quando `window.ethereum` é `undefined`, o formulário ENS não aparece após clicar no botão de conexão.

**Cadastro de Tanque e Axolote — cadastro.spec.ts**

| Teste | Validação |
|---|---|
| Fluxo feliz — tanque | Preencher nome e localização → SweetAlert de sucesso |
| Campos vazios — tanque | Submeter sem dados → alerta de atenção → transação não enviada |
| Só nome preenchido | Localização obrigatória → alerta |
| Links de menu — tanque | Cuidador vê "Cadastro Tanque" na sidebar |
| Fluxo feliz — axolote | Preencher todos os campos → sucesso |
| Campos vazios — axolote | Validação obrigatória funciona |

&ensp; Ao submeter o formulário de tanque, o contrato `AxoloRegistry.registerTank()` é chamado. O mock resolve a transação e retorna um UID de atestação EAS (schema 4109). O cadastro de axolote segue o mesmo fluxo, com campos adicionais de espécie, data de nascimento e morfologia, chamando `AxoloRegistry.registerAxolotl()` e emitindo atestação via schema 4110.

**Registro de Medição — medicao.spec.ts**

| Teste | Validação |
|---|---|
| Interface do operador | Select de tanques mockados aparece |
| Botão desabilitado | Formulário vazio → botão desabilitado via Reactive Forms |
| Preencher campos | Helper popula os 11 campos do formulário com valores de teste |
| Parâmetros normais | Sem alerta biológico → transação enviada diretamente |
| Temperatura crítica | Temperatura > 20°C → alerta de parâmetro crítico → confirmar → transação |
| Cancelar alerta crítico | Dados persistem no formulário se usuário recusa o envio |
| pH crítico | Valor de pH < 6.5 → alerta biológico exibido |
| Amônia acima de zero | Valor de NH₃ > 0 → alerta biológico exibido |
| Auditor — Fila de Validação | Auditor vê "Fila de Validação" na sidebar |

&ensp; O formulário cobre 11 parâmetros ambientais: `tankId`, temperatura, pH, oxigênio dissolvido, condutividade, turbidez, fosfatos, NO₂, NO₃, amônia e dureza. Se algum valor cair fora dos limites ideais, o frontend exibe um alerta biológico antes de enviar a transação. O usuário pode confirmar ou cancelar. O contrato `AxoloMonitoring.recordMeasurement()` registra a medição com status `Pending`. A atestação EAS via schema 4099 é emitida somente após validação pelo auditor.

**Admin — admin.spec.ts**

| Teste | Validação |
|---|---|
| Sidebar exibe menus | Admin vê "Painel Administrativo", menus de Home, Tanques, Axolotes, Diagnóstico |
| Diagnóstico carrega | Cards de constantes, contratos e EAS visíveis |
| Wallet badge | Endereço abreviado (ex: "0x90F7...") exibido no footer |
| Botão de logout | Presente na sidebar, permite desconexão |

&ensp; O admin tem acesso exclusivo ao diagnóstico do sistema, que exibe informações de contatos inteligentes desplegados, configurações globais e status do EAS. Todos os testes injetam `adminConfig`, que confere rol admin ao provider mock.

**Gerente Institucional — gerente.spec.ts**

| Teste | Validação |
|---|---|
| Sidebar exibe menu | Gerente vê "Registrar Membros", também acessa Tanques e Axolotes (readonly) |
| Formulário de registro | Campos para label da instituição, label do membro e endereço da carteira |
| Preview ENS dinâmico | Digitar `novomembro.biomuseu` → preview `novomembro.biomuseu.axolodao2.eth` |

&ensp; Gerente institucional pode registrar novos membros na sua instituição sem precisar de contato com administrador central. O preview ENS atualiza em tempo real conforme o formulário é preenchido.

**Proteção de Rotas — guard.spec.ts**

| Teste | Validação |
|---|---|
| Sem wallet — /tela-inicial | Redireciona para /login |
| Sem wallet — /monitoramento | Redireciona para /login |
| Com wallet conectada | Acesso normal a /tela-inicial, sidebar visível |

&ensp; O auth guard bloqueia rotas protegidas quando `window.ethereum` é undefined ou nenhuma carteira foi conectada. Com wallet ativa (mock ou real), navegação procede normalmente.

**Fixtures de Teste — test-data.ts**
```typescript
export const ADDRESSES = {
  operator: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
  admin:    '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
};

export const DEFAULT_TANKS = [
  { id: 1, name: 'Tanque Berçário',  location: 'Laboratório Norte' },
  { id: 2, name: 'Tanque Principal', location: 'Laboratório Sul'   }
];

export const MEDICAO_FORM = {
  normal: {
    tankId: '1',  temp: '17.0', ph: '7.2',  o2: '7.1',
    cond: '300',  turb: '1.0',  phos: '0.5',
    no2: '0.03',  no3: '10.0', nh3: '0.0',  gh: '8.0'
  },
  tempCritica: {
    tankId: '1',  temp: '22.0', ph: '7.2',  o2: '7.1',
    cond: '300',  turb: '1.0',  phos: '0.5',
    no2: '0.03',  no3: '10.0', nh3: '0.0',  gh: '8.0'
  }
};
```

**Page Object Model**

&ensp; Cada página encapsula seletores e ações em uma classe dedicada. Mudanças no HTML afetam apenas a classe correspondente, sem impacto nas especificações de teste:
```typescript
export class LoginPage {
  readonly btnConectarCarteira: Locator;
  readonly selectInstituicao:   Locator;

  async conectarCarteira()               { ... }
  async preencherEnsLabel(label: string) { ... }
}
```

**Como Executar**
```bash
# Instalar Playwright (primeira vez)
npm install -D @playwright/test

# Todos os testes
npx playwright test

# Apenas login
npx playwright test login.spec.ts

# Modo debug
npx playwright test --debug

# Gerar HTML report
npx playwright test --reporter=html
```

**Limitações Atuais**

&ensp; Dois fluxos aguardam implementação no backlog. O primeiro é a auditoria com EAS, que cobre validação e contestação de medições pendentes, estimado em cinco testes adicionais. O segundo é o cadastro de instituições, que trata do registro hierárquico de subdomínios ENS, estimado em seis testes adicionais. Quando desbloqueados, os testes migram de `backlog.md` para `plano-testes-e2e.md` e novos arquivos `.spec.ts` são criados.

&ensp; O mock resolve transações em aproximadamente 50ms, contra os 15 segundos de uma MetaMask real. Para validação final em ambiente de staging, testes com MetaMask real devem ser executados antes do deploy.

&ensp; A suíte de 33 testes end-to-end valida os seis fluxos críticos do AmbyData: seleção de perfil e autenticação por role (8 testes, incluindo resiliência sem MetaMask), cadastro de infraestrutura e espécimes (6 testes), captura de parâmetros ambientais com alertas biológicos e visibilidade de auditor (9 testes), funcionalidades de administrador (4 testes), registro de membro por gerente institucional (3 testes) e proteção de rotas por guard (3 testes). O mock provider EIP-1193 injetado via `page.addInitScript()` resolve o desafio Web3, eliminando dependência da extensão MetaMask e reduzindo o tempo por transação para aproximadamente 50ms. O Page Object Model, fixtures compartilhadas por role e helpers de login estabelecem uma base manutenível, reutilizável e determinística.

-------


## 4. Segurança da Informação  

&emsp;A conservação de anfíbios no México, com foco especial nos axolotes, enfrenta desafios críticos relacionados à desorganização e à vulnerabilidade no compartilhamento de dados científicos. Com 11 espécies em risco de extinção, o projeto foi estruturado para proteger essas informações por meio da aplicação da tríade CIA (Confidencialidade, Integridade e Disponibilidade). Esses três componentes formam a base do desenvolvimento de qualquer sistema seguro e são essenciais para identificar vulnerabilidades e criar soluções eficazes.  

&emsp;A escolha por tecnologias descentralizadas visa mitigar falhas de rastreamento comuns em arquiteturas tradicionais. Ao substituir servidores centrais por um registro digital distribuído, o projeto reduz a possibilidade de falsificação de dados. Cada colaborador utiliza uma identidade digital única para assinar suas contribuições, conferindo um selo de autenticidade permanente às informações coletadas. Essa estrutura promove transparência no monitoramento da saúde e da genética dos animais, estabelecendo uma base de confiança que protege o trabalho científico contra fraudes e perdas de dados.  

&emsp;O objetivo desta análise é identificar e avaliar os principais riscos de segurança, considerando os princípios fundamentais da segurança da informação. Além disso, são discutidas vulnerabilidades, potenciais atacantes e ataques possíveis, acompanhados de uma priorização baseada em probabilidade e impacto, bem como a justificativa dessas avaliações.  

### 4.1 Requisitos de Segurança da Informação  

**Autenticidade**  

&emsp;A autenticidade no ecossistema garante que apenas agentes autorizados, como pesquisadores e biólogos, possam registrar os dados, mitigando riscos de manipulação. Essa segurança é operacionalizada pela integração do ENS (Ethereum Name Service), que estabelece identidades digitais únicas e legíveis, transformando endereços anônimos em credenciais profissionais rastreáveis; e o EAS (Ethereum Attestation Service), que funciona como um protocolo de selos digitais. Através do EAS, cada entrada de dado é acompanhada por uma atestação assinada que comprova a legitimidade da origem. Juntos, esses componentes asseguram que toda ação no sistema seja vinculada a uma identidade verificada, tornando o banco de dados auditável e transparente para qualquer interessado (BUGHUNT, 2023). 

**Integridade**  

&emsp;No contexto do projeto de monitoramento descentralizado do gênero *Ambystoma*, a integridade é o pilar que assegura que os dados coletados nos cativeiros permaneçam fidedignos e inalterados desde o registro inicial até o acesso pelos stakeholders, como pesquisadores e financiadores. Para garantir que as informações não sofram modificações acidentais ou maliciosas durante o tráfego e o armazenamento, a solução utiliza funções de hash criptográfico e a estrutura de registro imutável da blockchain, tornando qualquer tentativa de violação detectável e auditável pela rede.  

&emsp;Dessa forma, o projeto assegura que as pesquisas científicas e os investimentos na conservação da espécie sejam baseados em evidências reais e verificáveis, permitindo que qualquer interessado confira o histórico completo de cada animal de forma independente, reduzindo significativamente o risco de corrupção de dados no ecossistema descentralizado. 

**Disponibilidade**  

&emsp;A disponibilidade no ecossistema AmbyData assegura que os dados científicos e as operações críticas de monitoramento permaneçam acessíveis de forma contínua, mesmo em cenários de falhas de infraestrutura ou ataques direcionados. Essa garantia é operacionalizada pela arquitetura distribuída da blockchain, que mantém cópias íntegras dos registros em múltiplos nós da rede Ethereum, eliminando pontos únicos de falha na camada de persistência. Complementarmente, o Indexador implementado sincroniza automaticamente os dados da blockchain com o banco de dados PostgreSQL (Supabase), proporcionando uma camada intermediária de alta performance que reduz a latência de consulta e assegura que pesquisadores e financiadores acessem os relatórios e históricos de monitoramento em tempo real, sem depender exclusivamente das limitações de velocidade dos nós RPC.

&emsp;Essa estratégia híbrida garante que, mesmo em cenários de indisponibilidade da camada centralizada (API Gateway ou servidor web), os dados científicos permaneçam resgatáveis diretamente da blockchain. Adicionalmente, mecanismos de redundância de dados e planos de recuperação de desastres asseguram um RTO (Recovery Time Objective) baixo e um RPO (Recovery Point Objective) próximo a zero, viabilizando a operação contínua do programa de conservação dos axolotes sem interrupções que possam comprometer a saúde dos espécimes ou o atraso nas tomadas de decisão críticas pelo corpo científico.

### 4.2 Vulnerabilidades Existentes  

**1. Inserção manual de dados não verificados (Garbage In, Garbage Out)**  

&emsp;O projeto apresenta uma vulnerabilidade de processo relacionada à dependência da inserção manual de parâmetros biológicos e ambientais pelos operadores dos cativeiros. O sistema funciona como um reflexo da realidade informada: qualquer dado incorreto, seja por erro humano ou ação maliciosa, é transformado em atestações (EAS) e registrado de forma imutável na blockchain.  

&emsp;Embora a tecnologia garanta que os registros não possam ser alterados após a gravação, ela não valida se a informação inserida corresponde às condições reais do tanque no momento do registro. Isso gera o risco do fenômeno conhecido como *Garbage In, Garbage Out*, no qual a integridade científica do projeto é comprometida. Como consequência, podem ser emitidas certificações válidas para condições inexistentes, afetando a confiança de pesquisadores, parceiros e financiadores no ecossistema da AxoloDAO.  

**2. Ponto único de falha na camada de visualização dos dados**  

&emsp;Apesar de a persistência dos dados ocorrer de forma descentralizada e segura na blockchain, o acesso dos usuários às informações depende de uma camada de visualização centralizada, como um site, aplicativo ou API Gateway. Essa arquitetura cria um ponto único de falha na interface entre o usuário e os registros imutáveis.  

&emsp;Caso um invasor comprometa o servidor web ou o portal de acesso, ele poderá manipular o que é exibido aos stakeholders, alterando relatórios, gráficos e evidências apresentadas, mesmo que os dados originais na blockchain permaneçam íntegros. Assim, a autenticidade da informação consumida é violada, pois o usuário passa a confiar em uma representação adulterada. Isso enfraquece a proposta de auditoria verificável do projeto, já que a integridade técnica da blockchain não garante, por si só, a veracidade da informação exibida na interface.  

**3. Uso de sessões compartilhadas e quebra da cadeia de responsabilidade**  

&emsp;O projeto também apresenta uma vulnerabilidade operacional associada ao uso de dispositivos compartilhados em ambientes de pesquisa e conservação. Como múltiplos cuidadores e biólogos utilizam os mesmos equipamentos, existe o risco de falhas no encerramento adequado de sessões.  

&emsp;Se um usuário não realizar o logoff ao finalizar seu turno, o próximo colaborador poderá registrar dados ambientais ou emitir atestações utilizando a identidade digital (ENS) do usuário anterior. No contexto da AxoloDAO, onde cada ação é vinculada a uma autoria individual via EAS, essa prática rompe a cadeia de responsabilidade. Caso ocorram erros ou fraudes, torna-se difícil identificar o verdadeiro autor da ação, pois a blockchain registrará apenas o dono da conta aberta, e não o operador real.  

&emsp;Essa fragilidade compromete a confiabilidade das auditorias científicas e institucionais, pois um auditor externo não terá garantias de que o especialista certificado realmente validou aquela informação no momento do registro. Assim, a segurança do ecossistema deixa de ser apenas tecnológica e passa a depender diretamente da conduta operacional da equipe.  

**4. Brechas em Smart Contracts e falhas de implementação on-chain**  

&emsp;O projeto também está exposto a vulnerabilidades técnicas relacionadas à implementação dos smart contracts responsáveis pela emissão de atestações (EAS), controle de identidades e interação com a blockchain. Como esses contratos são imutáveis após o *deploy*, qualquer erro lógico, falha de validação ou brecha de segurança incorporada no código pode ser explorada de forma permanente por agentes mal-intencionados.  

&emsp;Entre os riscos possíveis estão falhas de controle de acesso, validações incompletas de permissões, erros de lógica nos fluxos de emissão de registros, dependência insegura de dados externos (*oracle issues*) e vulnerabilidades conhecidas do ecossistema Ethereum, como reentrância, *integer overflow/underflow*, manipulação de estado ou uso incorreto de bibliotecas. Caso um invasor explore essas brechas, ele poderá emitir atestações indevidas, corromper a lógica de certificação biológica, burlar mecanismos de autoria ou causar indisponibilidade do serviço on-chain.  

### 4.3 Modelagem de Atacantes e Ataques Possíveis 

#### **Cenário de ataque 1: Inserção de dados falsos por agente interno**

- **Atacante (Perfil)**: Um "insider" malicioso ou negligente, especificamente um cuidador ou operador do cativeiro que possui credenciais legítimas para inserir dados no sistema.
- **Motivação**: Fraudar indicadores de saúde dos axolotes ou parâmetros ambientais para ocultar negligência no manejo, garantindo assim a continuidade do recebimento de recursos de financiadores ou evitando penalidades.
- **Vulnerabilidade Específica**: Dependência de inserção manual de parâmetros biológicos e ambientais. O sistema atua como um "espelho" da realidade informada e não possui mecanismos para validar se o fato físico original corresponde ao registro digital.
- **Estimativa de Impacto**: Alto. A integridade científica e a confiança dos stakeholders são severamente prejudicadas, pois a blockchain imortaliza informações falsas, gerando certificações válidas para condições inexistentes (problema de "Garbage In, Garbage Out").
- **Estimativa de Probabilidade**: Baixa. Processos que dependem exclusivamente do fator humano para a entrada de dados são inerentemente vulneráveis a erros e manipulações intencionais.

A violação de integridade neste cenário manifesta-se em múltiplas camadas:

- **Desconexão entre dados offchain e realidade física:** Os dados no Supabase não correspondem aos fatores reais do cativeiro.
- **EAS emite atestações válidas para condições falsas:** O Ethereum Attestation Service sela criptograficamente dados que nunca existiram fisicamente.
- **Pesquisadores confiam falsamente em registros onchain:** Um investigador verá assinaturas criptograficamente válidas, mas consumirá informação fabricada.

O sistema assume que os operadores inserem dados verdadeiros. Não é possível garantir que a origem do dado (mundo físico) corresponde ao registro digital, apenas que o registro, uma vez inserido, será imutável.

#### **Cenário de ataque 2: Manipulação da percepção via camada de intermediação**

- **Atacante (Perfil)**: Atacante externo com competência técnica em ataques de rede e sistemas web (Cyber criminoso).
- **Motivação**: Dano reputacional ao projeto ou sabotagem da produção científica, visando beneficiar competidores ou manipular a percepção de investidores sobre a eficácia do programa de conservação.
- **Vulnerabilidade Específica**: Ponto único de falha na camada de visualização. O acesso aos dados pelos stakeholders é intermediado por um servidor web ou API Gateway centralizado, vulnerável a ataques de Man-in-the-Middle ou manipulação do DOM no frontend.
- **Estimativa de Impacto**: Médio/Alto. Embora o registro na blockchain permaneça íntegro e imutável, a informação que chega ao usuário final é alterada. Isso invalida a proposta de auditoria verificável, pois os stakeholders passam a consumir evidências manipuladas. Caso as adulterações não sejam percebidas, o impacto pode escalar consideravelmente.
- **Estimativa de Probabilidade**: Baixa. A arquitetura centralizada na camada de visualização é um alvo comum, contudo, a exploração de vulnerabilidades em APIs e servidores web pode ser evitada com controles de segurança robustos.

Este cenário quebra **simultaneamente** dois requisitos críticos:

- **(a) Integridade Violada:** Embora o registro blockchain permaneça intacto, a visualização apresentada ao stakeholder é modificada. O pesquisador vê dados alterados na tela, não os dados auditáveis onchain.
- **(b) Autenticidade Violada:** A cadeia de custódia é quebrada. Um stakeholder não consegue verificar a origem genuína porque não vê a assinatura criptográfica original e não consegue rastrear a autoria.

A solução prometia "transparência que protege o trabalho científico contra fraudes". Se a camada de visualização está comprometida, essa promessa desaparece. O stakeholder consome "evidências manipuladas", anulando o modelo de validação descentralizada.


#### **Cenário de ataque 3: Interrupção de disponibilidade via DDoS**

- **Atacante (Perfil)**: Atacante externo motivado por ativismo ou sabotagem tecnológica (Hacker de Negação de Serviço).
- **Motivação**: Impedir o monitoramento em tempo real dos axolotes, causando pânico entre os cuidadores ou ocultando falhas críticas de hardware no cativeiro durante o período de inatividade do sistema.
- **Vulnerabilidade Específica**: Ponto único de falha na camada de visualização e API. Como o acesso aos relatórios depende de um servidor centralizado, um ataque de negação de serviço distribuído (DDoS) pode tornar os dados inacessíveis para pesquisadores e financiadores.
- **Estimativa de Impacto**: Alto. A falta de disponibilidade impede a tomada de decisões rápidas em caso de emergências biológicas, invalidando o propósito de "monitoramento contínuo".
- **Estimativa de Probabilidade**: Média. Servidores web e APIs centralizadas são alvos frequentes desse tipo de ataque devido à sua exposição pública.

Este cenário ilustra um paradoxo arquitectural:

- **(a) Sem AxoloDAO:** Um DDoS afeta exclusivamente a camada de intermediação.
- **(b) Com AxoloDAO:** O DDoS afeta o acesso aos dados salvos na blockchain (imutáveis, descentralizados), mas completamente inacessíveis ao usuário final. A promessa de 4.1 - que "dados permaneçam acessíveis de forma contínua" - é violada.

O Indexador deveria atuar como "camada intermediária de alta performance". Um DDoS na API impede exatamente esse acesso. A camada que deveria providenciar recuperação torna-se um ponto único de falha.

#### **Cenário de ataque 4: Uso indevido de sessões em equipamentos compartilhados**

- **Atacante (Perfil)**: Um colaborador legítimo (biólogo ou cuidador) que, por pressa, utiliza o acesso já aberto de um colega.
- **Motivação**: O funcionário quer evitar o processo de fazer logoff e login novamente, optando por inserir os dados na conta que já está ativa no aparelho. Não há intenção de causar dano, apenas de "terminar a tarefa mais rápido".
- **Vulnerabilidade Específica**: Negligência na gestão de sessões e ausência de bloqueio automático por inatividade.
- **Estimativa de Impacto**: Médio. A autenticidade dos dados é perdida. Se houver um erro no registro, o sistema culpará a pessoa errada, invalidando a confiança científica da auditoria.
- **Estimativa de Probabilidade**: Alta. A priorização da agilidade nas tarefas em detrimento dos protocolos de segurança representa a falha humana mais recorrente nas organizações.

Este cenário viola a forma mais profunda da autenticidade:

- **(a) Promessa de Identidade Única (4.1):** Cada colaborador "utiliza uma identidade digital única para assinar suas contribuições, conferindo um selo de autenticidade permanente".
- **(b) Quebra Neste Cenário:** A identidade assinante (Pessoa A) é diferente de quem capturou o dado (Pessoa B). O "selo de autenticidade permanente" é atribuído à pessoa errada.
- **(c) Violação do Não-Repúdio:** A pessoa A pode negar: "Aquele dado foi inserido por B, não por mim", invalidando completamente o mecanismo de não-repúdio que 4.1 prometia.

#### Tabela Ataques vs Requisitos vs Impacto vs Violação de 4.1

| Cenário | Requisito Afetado | Violação de 4.1 | Impacto | Probabilidade |
|---|---|---|---|---|
| **1. Inserção de dados falsos** | Integridade | "Dados fidedignos desde o registro inicial" | Alto | Baixa |
| **2. Manipulação via camada de intermediação** | Integridade + Autenticidade | "Toda ação vinculada a identidade verificada" + "Integridade durante tráfego e armazenamento" | Médio/Alto | Baixa |
| **3. Interrupção via DDoS** | Disponibilidade | "Dados permaneçam acessíveis de forma contínua" + Falha do Indexador como camada de mitigação | Alto | Média |
| **4. Sessões compartilhadas** | Autenticidade | "Identidade única assinante" + "Responsabilidade atribuível a cada ator" (não-repúdio) | Médio | Alta |

### 4.4 Priorização de Ataques (Probabilidade e Impacto)  

#### Metodologia de Priorização

&emsp;A priorização dos ataques segue a matriz de risco amplamente utilizada em análise de segurança da informação, que combina **Probabilidade** (chance de ocorrência) e **Impacto** (severidade das consequências) para determinar o nível final de **Risco**. Essa abordagem garante que os recursos de mitigação sejam alocados primeiro aos cenários de maior risco, independentemente de sua probabilidade isolada.

&emsp;A fórmula de cálculo é: **Risco = Probabilidade × Impacto**, mapeado conforme a matriz abaixo:

| Probabilidade | Impacto Baixo | Impacto Médio | Impacto Alto |
|---|---|---|---|
| **Probabilidade Baixa** | Baixo Risco | Médio Risco | **Alto Risco** |
| **Probabilidade Média** | Médio Risco | Médio Risco | **Alto Risco** |
| **Probabilidade Alta** | Médio Risco | **Alto Risco** | **Alto Risco** |

&emsp;Aplicando esta matriz aos quatro cenários mapeados em 4.3:

- **Cenário 1 (Inserção de dados falsos):** Probabilidade = Baixa, Impacto = Alto → **Alto Risco** (Baixa probabilidade, mas impacto catastrófico para integridade científica)
- **Cenário 2 (Manipulação via intermediação):** Probabilidade = Baixa, Impacto = Médio-Alto → **Médio Risco** (Alvo comum, mas exploração evitável; impacto percebido é alto)
- **Cenário 3 (DDoS):** Probabilidade = Média, Impacto = Alto → **Alto Risco** (Servidores centralizados são alvos frequentes; interrompe operações críticas)
- **Cenário 4 (Sessões compartilhadas):** Probabilidade = Alta, Impacto = Médio → **Alto Risco** (Falha humana recorrente; viola não-repúdio mesmo com impacto moderado)

&emsp;Isso resulta em uma ordem de priorização onde três dos quatro cenários requerem mitigação imediata (Alto Risco), sendo o Cenário 2 o único com risco moderado, porém ainda significativo.

<div align="center">

#### Quadro 16 — Mapeamento de Ataques e Riscos

| Ataque                                                     | Risco      | Impacto    | Requisito Afetado              | Vulnerabilidade Explorada                                                                 | Motivação do Atacante                                                                                 |
|------------------------------------------------------------|-----------|------------|-------------------------------|--------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------|
| Inserção de dados falsos por agente interno (insider)       | Baixo     | Alto       | Integridade                   | Dependência de inserção manual sem validação física (“Garbage In, Garbage Out”)             | Ocultar negligência no manejo e manter financiamentos ou evitar penalidades.                            |
| Manipulação da percepção via camada de intermediação        | Baixo     | Médio-Alto | Integridade / Confiabilidade  | Ponto único de falha na visualização (API Gateway, frontend, possibilidade de MITM/DOM)     | Sabotar reputação do projeto ou manipular a percepção de investidores e stakeholders.                  |
| Interrupção de disponibilidade via DDoS                     | Médio     | Alto       | Disponibilidade               | Infraestrutura centralizada exposta a sobrecarga externa (servidor web / API)               | Impedir o monitoramento em tempo real e ocultar falhas críticas durante a indisponibilidade.          |
| Uso indevido de sessão em equipamentos compartilhados        | Alto| Médio      | Autenticidade / Não-repúdio   | Ausência de bloqueio automático de sessão e falha na governança de acesso em campo          | Agilizar tarefas evitando login/logout, sem intenção maliciosa, mas comprometendo a autoria dos dados. |

Fonte: Material produzido pelos autores (2026).

</div>

### 4.5 Medidas de Mitigação

&emsp;Para garantir a resiliência do ecossistema de monitoramento do gênero *Ambystoma*, as seguintes estratégias devem ser adotadas:

#### 4.5.1 Contra a inserção de dados falsos (Insider)

&emsp;Deve-se implementar protocolos de validação cruzada, nos quais registros críticos exijam a assinatura de um pesquisador ou biólogo e passem por uma verificação automatizada por software, capaz de analisar se os parâmetros informados estão dentro dos padrões biológicos e ambientais esperados antes de serem imortalizados via EAS.

&emsp;Além disso, é essencial realizar treinamentos de conscientização focados na importância da integridade científica e nas consequências do fenômeno *"Garbage In, Garbage Out"* para a conservação da espécie.

#### 4.5.2 Contra a manipulação da camada de intermediação

&emsp;É necessário reforçar a segurança do servidor web e do API Gateway com controles de acesso rigorosos, firewalls e o uso de criptografia para dados em movimento (SSL/TLS), a fim de impedir ataques de *Man-in-the-Middle*.  

#### 4.5.3 Contra a interrupção de disponibilidade (DDoS)

&emsp;A principal defesa reside na arquitetura distribuída da solução, garantindo que cópias integrais dos dados residam em múltiplos nós da rede.  

&emsp;Complementarmente, devem ser estabelecidos planos de recuperação de desastres e mecanismos de redundância para a camada de visualização, assegurando que o acesso aos relatórios seja restaurado rapidamente em caso de indisponibilidade do servidor central.

#### 4.5.4 Contra o uso indevido de sessões

&emsp; Deve-se configurar o bloqueio automático por inatividade em todos os dispositivos compartilhados nos cativeiros.  

&emsp; A implementação de autenticação multifator (MFA) para cada ação de registro ou emissão de atestação é fundamental para garantir o não-repúdio e confirmar que o operador real corresponde à identidade digital (ENS) utilizada.

#### 4.5.5 Segurança de Smart Contracts

&emsp; Antes do deploy final, os contratos inteligentes devem passar por auditorias de código rigorosas para identificar e corrigir falhas lógicas ou vulnerabilidades conhecidas, como reentrância e erros de permissão, que poderiam comprometer a lógica de certificação biológica do sistema.

### 4.6 Conclusão

&emsp; A avaliação de segurança da informação evidenciou vulnerabilidades relevantes que podem afetar a integridade, a autenticidade e a disponibilidade do sistema de monitoramento do gênero Ambystoma, sobretudo no contexto da descentralização dos registros científicos e da emissão de atestações em blockchain. Entre os principais vetores de risco mapeados estão o problema de "Garbage In, Garbage Out" na coleta manual de dados, a adulteração da informação na camada de intermediação e ataques de negação de serviço explorando o ponto único de falha da API. Caso não sejam tratados, esses riscos podem comprometer a confiabilidade científica e causar impactos negativos à reputação do ecossistema AxoloDAO.

&emsp; Diante desse panorama, foram propostas estratégias de mitigação, como auditorias criteriosas nos Smart Contracts, a adoção de autenticação multifator (MFA) e a implementação de mecanismos de validação cruzada para parâmetros biológicos e ambientais. Essas iniciativas preservam a qualidade da produção científica e a segurança genética dos animais, como também reforçam a credibilidade do projeto junto a pesquisadores, parceiros institucionais e financiadores.

&emsp; Dessa forma, ao posicionar a segurança da informação como um elemento estratégico, o projeto não se limita à proteção contra acessos indevidos ou à conformidade normativa, mas também viabiliza a sustentabilidade e a confiança necessárias para a consolidação da iniciativa de conservação dos axolotes no cenário científico e social.

## 5. Interface do Usuário

### 5.1 Wireframes de Baixa Fidelidade

&ensp; Os **wireframes de baixa fidelidade** representam a estrutura inicial das principais telas do sistema desenvolvido para o projeto **Zenbit em parceria com o AxoloDAO**. Seu objetivo é organizar visualmente os elementos da interface e os fluxos de navegação antes da etapa de design visual e implementação. Nessa fase, o foco está na **disposição dos componentes, áreas de interação e fluxo das funcionalidades**, sem considerar aspectos gráficos como cores ou tipografia. Isso permite avaliar a clareza das interações e a lógica de uso da plataforma.

&ensp; Os wireframes foram construídos a partir das **jornadas das personas do sistema**: cuidador, pesquisador/auditor e visitante. Assim, garantindo que cada interface suporte adequadamente as tarefas de registro, validação e consulta de dados. Dessa forma, os wireframes servem como **base estrutural para o desenvolvimento da interface**, permitindo validar a organização das telas e alinhar o funcionamento do sistema antes da prototipação de alta fidelidade.

#### 5.1.1 Wireframe - Operador(Cuidador)

&ensp; Os wireframes relacionados ao **perfil de operador** representam as telas utilizadas pelos cuidadores responsáveis pelo monitoramento dos tanques e pelo registro dos parâmetros ambientais dos axolotes. Esse conjunto de interfaces foi projetado para permitir **registro rápido de medições, visualização do estado dos tanques e acompanhamento de alertas operacionais**.

&ensp; As telas foram estruturadas para priorizar **simplicidade de uso e clareza das informações**, considerando que o operador realiza atividades recorrentes de coleta de dados e precisa registrar medições de forma ágil durante a rotina de monitoramento.

<div align="center">

  <p>Figura 12 - Wireframe - Operador </p>
  <img src="../assets/sprint3/wireframe-operador1.jpg" alt="Wireframe - Operador">
  <p>Fonte: Material produzido pelos autores (2026).</p>

</div>

<div align="center">

  <p>Figura 13 - Wireframe - Operador </p>
  <img src="../assets/sprint3/wireframe-operador2.jpg" alt="Wireframe - Operador">
  <p>Fonte: Material produzido pelos autores (2026).</p>

</div>


**Página de Login**

&ensp; A página de login permite que o usuário selecione o **perfil de acesso ao sistema**, diferenciando operadores e auditores. Essa distinção garante que cada usuário visualize apenas as funcionalidades relacionadas ao seu papel dentro da plataforma.

Principais elementos da interface:

- Campo de autenticação do usuário.  
- Seleção de perfil (**Operador** ou **Auditor**).  
- Área institucional ou informativa do sistema.  

**Dashboard do Operador**

&ensp; O **dashboard do operador** apresenta uma visão geral do estado dos tanques e das atividades recentes do sistema. Essa tela funciona como ponto central de navegação e monitoramento diário. Principais componentes da tela:

- **Menu lateral de navegação**
  - Acesso ao dashboard  
  - Acesso à página de tanques  
  - Acesso às páginas de axolotes  

- **Visão dos tanques**
  - Cards ou painéis representando cada tanque monitorado.  
  - Permite acesso rápido aos detalhes de cada ambiente.

- **Histórico de mudanças**: Exibição de eventos recentes registrados no sistema.
- **Alertas operacionais**: Lista de notificações relacionadas a parâmetros fora do intervalo ideal.
- **Ação de registro**: Botão de ação rápida para **criar um novo registro de medição**.
- **Notificações e configurações**: Ícones no topo da interface para acessar alertas e preferências do sistema.

**Tela do Tanque**

&ensp; A tela de tanque apresenta informações detalhadas sobre o ambiente onde os axolotes estão sendo mantidos, permitindo acompanhar o **estado geral do tanque e a evolução dos parâmetros ambientais**. Principais elementos da tela:

- **Identificação do tanque**: Nome ou código do tanque.
- **Status do tanque**: Indicadores visuais do estado geral do ambiente.
- **Gráfico de monitoramento**: Visualização temporal de parâmetros como temperatura ou pH.
- **Lista dos axolotes no tanque**: Mostra todos os axolotes que estão disponíveis.
- **Ferramenta de busca**: Permite localizar axolotes específicos dentro do sistema.

**Tela do Axolote**

&ensp; A tela do axolote concentra as informações relacionadas a um **espécime específico**, permitindo acompanhar seu histórico e registros associados. Principais componentes da interface:

- **Imagem ou identificação visual do animal**
- **Informações gerais do espécime**:Dados biológicos ou de identificação.
- **Histórico de registros**: Linha temporal com medições e eventos associados ao animal.
- **Visualização gráfica**: Gráficos que demonstram a evolução de parâmetros relevantes.
- **Área de comentários**: Espaço para observações registradas pelos visitantes.
- **Exportação de dados**: Opção para exportar registros para análise externa.
- **Adicionar novo registro**: Acesso direto à tela de registro de medições.

**Tela de Registro**

&ensp; A tela de registro permite ao operador inserir **novas medições ambientais ou observações operacionais**, que posteriormente poderão ser validadas pelo pesquisador responsável. Principais elementos da interface:

- **Formulário de dados**: Campos estruturados para inserção dos parâmetros monitorados.
- **Área informativa**: Seção que apresenta informações relevantes sobre o tanque ou espécime.
- **Confirmação do registro**: Botão para finalizar o envio da medição.
- **Confirmação blockchain**: Após o envio, o sistema registra a medição de forma verificável, garantindo a integridade e rastreabilidade do dado.

&ensp; Esse conjunto de telas estabelece o fluxo operacional básico do cuidador dentro da plataforma, permitindo que os dados ambientais sejam **registrados de forma estruturada, monitorados em tempo real e posteriormente validados dentro da infraestrutura do sistema**.

#### 5.1.2 Wireframe - Auditor

&ensp; Os wireframes relacionados ao **perfil de auditor** representam as telas utilizadas pelos pesquisadores responsáveis pela **validação científica dos dados registrados no sistema**. Esse conjunto de interfaces foi projetado para permitir a análise das medições realizadas pelos operadores, revisão de contribuições e aprovação ou rejeição de registros antes de sua consolidação como dados científicos confiáveis.

&ensp; As telas foram estruturadas para priorizar **visualização analítica, rastreabilidade das informações e facilidade no processo de revisão**, garantindo que o auditor possa identificar inconsistências, acompanhar históricos de medições e validar registros com rigor científico.

<div align="center">

  <p>Figura 14 - Wireframe - Auditor </p>
  <img src="../assets/sprint3/wireframe-auditor1.jpg" alt="Wireframe - Auditor">
  <p>Fonte: Material produzido pelos autores (2026).</p>

</div>

<div align="center">

  <p>Figura 15 - Wireframe - Auditor </p>
  <img src="../assets/sprint3/wireframe-auditor2.jpg" alt="Wireframe - Auditor">
  <p>Fonte: Material produzido pelos autores (2026).</p>

</div>


**Página de Login**

&ensp; A página de login permite que o usuário selecione o **perfil de acesso ao sistema**, diferenciando operadores e auditores científicos. Essa separação garante que cada usuário visualize apenas as funcionalidades relacionadas ao seu papel dentro da plataforma.Principais elementos da interface:

- Campo de autenticação do usuário.  
- Seleção de perfil (**Operador** ou **Auditor**).  
- Área institucional ou informativa do sistema.  

**Dashboard do Auditor**

&ensp; O **dashboard do auditor** apresenta uma visão consolidada dos tanques monitorados e das atividades que requerem validação científica. Essa tela funciona como ponto central para acompanhar medições recentes e identificar registros pendentes de revisão. Principais componentes da tela:

- **Menu lateral de navegação**
  - Acesso ao dashboard  
  - Acesso às páginas de tanques  
  - Acesso às páginas de axolotes  

- **Visão dos tanques**
  - Cards representando os tanques monitorados.  
  - Permite acesso rápido às informações detalhadas de cada ambiente.

- **Histórico de modificações**: Registro das alterações e eventos recentes no sistema.
- **Registros pendentes**: Lista de medições ou contribuições aguardando validação científica.
- **Notificações e configurações**: Ícones no topo da interface para acesso a alertas e configurações da plataforma.

**Tela do Tanque**

&ensp; A tela de tanque permite ao auditor analisar o **estado atual do ambiente e o histórico de medições registradas**, facilitando a identificação de tendências ou possíveis inconsistências nos dados coletados. Principais elementos da interface:

- **Identificação do tanque**: Nome ou código do tanque monitorado.
- **Status do tanque**: Indicadores visuais das condições ambientais.
- **Gráfico de monitoramento**: Visualização temporal de parâmetros ambientais registrados.
- **Lista de registros**: Exibição das medições associadas ao tanque.
- **Ferramenta de busca**: Permite localizar registros específicos dentro do histórico.

**Tela do Axolote**

&ensp; A tela do axolote apresenta informações detalhadas sobre um **espécime específico**, permitindo ao auditor analisar o histórico de registros, acompanhar indicadores biológicos e revisar comentários associados. Principais componentes da interface:

- **Imagem ou identificação visual do animal**
- **Informações gerais do espécime**: Dados de identificação e informações relevantes.
- **Histórico de registros**: Linha temporal com medições e eventos associados ao axolote.
- **Visualização gráfica**: Gráficos que demonstram a evolução dos parâmetros monitorados.
- **Área de comentários**: Espaço para observações associadas ao espécime.
- **Exportação de dados**: Opção para exportar registros para análise externa ou elaboração de relatórios.

**Tela de Revisão de Registro**

&ensp; A tela de revisão permite ao auditor **analisar registros submetidos pelos operadores**, verificando a consistência dos dados antes de sua validação definitiva no sistema.

Principais elementos da interface:

- **Visualização completa do registro**: Apresenta todos os dados submetidos pelo operador.
- **Informações contextuais**: Dados complementares sobre o tanque ou o axolote associado.
- **Ações de validação**: Botões para **aprovar ou revisar** o registro analisado.
- **Registro verificável**: Após a validação, o sistema mantém o histórico auditável associado ao registro.

&ensp; Esse conjunto de telas estabelece o fluxo de revisão científica dentro da plataforma, permitindo que os dados registrados pelos operadores sejam **avaliados, validados e consolidados com transparência e rastreabilidade dentro da infraestrutura do sistema**.

#### 5.1.3 Wireframe - Landing Page

&ensp; Os wireframes da **Landing Page** representam as telas públicas da plataforma, destinadas à apresentação do projeto e à visualização das informações dos axolotes para visitantes. Essa interface foi projetada para permitir **exploração dos espécimes monitorados, visualização de registros verificados e participação pública por meio de observações e comentários**.

&ensp; As telas foram estruturadas para priorizar **clareza das informações, transparência dos dados e incentivo à participação do público**, permitindo que qualquer visitante compreenda o estado dos axolotes e acompanhe registros verificados associados ao sistema.

<div align="center">

  <p>Figura 16 - Wireframe - Landing Page </p>
  <img src="../assets/sprint3/wireframe-landing1.jpg" alt="Wireframe - Landing Page">
  <p>Fonte: Material produzido pelos autores (2026).</p>

</div>

<div align="center">

  <p>Figura 17 - Wireframe - Landing Page </p>
  <img src="../assets/sprint3/wireframe-landing2.jpg" alt="Wireframe - Landing Page">
  <p>Fonte: Material produzido pelos autores (2026).</p>

</div>


**Página Inicial**

&ensp; A página inicial apresenta uma visão geral do projeto e dos axolotes monitorados, permitindo que visitantes explorem os diferentes tanques e acompanhem registros públicos associados a cada animal. Principais elementos da interface:

- **Área de destaque**
  - Imagem ou banner principal do projeto.
  - Breve descrição informativa sobre o sistema e os axolotes.

- **Seção de axolotes**
  - Exibição visual dos espécimes monitorados.
  - Organização por tanques.

- **Cards de axolotes**
  - Cada card apresenta uma imagem do axolote.
  - Informações resumidas sobre o espécime.
  - Indicador de **verificação on-chain**, demonstrando que os dados possuem registro verificável.

- **Agrupamento por tanques**: Separação dos axolotes de acordo com o tanque em que estão localizados.

**Página do Axolote**

&ensp; A página do axolote apresenta informações detalhadas sobre um espécime específico, permitindo que o visitante visualize dados relevantes e acompanhe registros associados ao animal. Principais componentes da interface:

- **Imagem principal do axolote**
- **Informações do espécime**: Dados descritivos e informações relevantes sobre o animal.
- **Histórico resumido**: Exibição de registros ou eventos importantes associados ao axolote.
- **Comentários da comunidade**: Espaço onde visitantes podem visualizar observações realizadas por outros usuários.
- **Contribuição pública**: Botão para adicionar uma nova observação.

**Tela de Contribuição**

&ensp; A tela de contribuição permite que visitantes enviem **observações públicas sobre os axolotes**, contribuindo com registros adicionais que poderão ser analisados posteriormente pela equipe científica. Principais elementos da interface:

- **Imagem ou referência do axolote**: Identificação visual do animal observado.
- **Campo de observação**: Espaço para descrever a observação realizada.
- **Campo de comentário**: Área para informações adicionais ou contexto.
- **Upload de imagem**: Permite anexar uma fotografia do axolote observado.
- **Envio da contribuição**: Botão responsável por registrar a observação no sistema.

&ensp; Esse conjunto de telas estabelece o fluxo público da plataforma, permitindo que visitantes **explorem informações sobre os axolotes, acompanhem registros verificáveis e contribuam com observações que enriquecem a base de dados do sistema**.

&ensp; Os wireframes de baixa fidelidade apresentados permitiram estruturar visualmente as principais interfaces do sistema proposto para o projeto **Zenbit em parceria com o AxoloDAO**, traduzindo as jornadas das personas em telas e fluxos de interação. Essa etapa foi fundamental para organizar a arquitetura das interfaces e garantir que cada funcionalidade estivesse alinhada às necessidades dos diferentes perfis de usuários. A partir dessa modelagem inicial, foi possível definir de forma clara os caminhos de navegação e a distribuição das informações nas telas destinadas aos **operadores (cuidadores), auditores científicos e visitantes da plataforma**, contemplando tanto os processos de registro e validação de dados quanto a visualização pública das informações dos axolotes.

&ensp; Além disso, os wireframes permitiram validar a estrutura das interfaces que suportam o registro e a consulta de dados verificáveis, contribuindo para garantir que os processos associados à rastreabilidade e integridade das informações sejam compreensíveis para os usuários do sistema. Dessa forma, os wireframes de baixa fidelidade estabelecem uma **base estrutural sólida para o desenvolvimento das próximas etapas do projeto**, servindo como referência para a prototipação de alta fidelidade, definição do design visual da aplicação e implementação técnica da plataforma.


### 5.2 Protótipo de Alta Fidelidade

&ensp; O protótipo de alta fidelidade representa a versão visual consolidada do AmbyData, incorporando identidade gráfica, paleta de cores, tipografia e componentes interativos. As telas foram construídas a partir da estrutura definida nos wireframes de baixa fidelidade, traduzindo os fluxos mapeados nas jornadas das personas em interfaces funcionais e navegáveis.

&ensp; A seguir, as telas são apresentadas conforme o fluxo de uso do sistema, organizadas por perfil de acesso: operador (cuidadora), auditor (pesquisador) e visitante. 

#### 5.2.1 Style Guide

&ensp; O style guide reúne as definições visuais utilizadas na construção do protótipo de alta fidelidade do AmbyData. Ele estabelece os padrões de cores, tipografia e iconografia que garantem consistência visual entre todas as telas da plataforma.

**Cores**

&ensp; A paleta é organizada em quatro grupos. As cores principais são o Primary (#009C9C), verde-azulado utilizado em botões, tags, ícones e elementos de destaque, e o Secondary (#0A3B49), azul escuro presente no fundo da sidebar e em elementos estruturais da interface. Na categoria de cores escuras, o Muted Foreground (#75787B) é aplicado em textos secundários e informações de menor hierarquia. As cores cinza compreendem o Background (#FFFFFF), usado como fundo geral das telas, e o Muted Background (#F8F8FA), aplicado em campos de formulário e áreas de conteúdo agrupado. As cores extra são reservadas para comunicação de estado: Validation (#22AD5C) indica registros aceitos ou parâmetros dentro do intervalo saudável, Error (#F23030) sinaliza registros recusados ou parâmetros críticos, e Warning (#FBBF24) representa situações de atenção ou parâmetros no limite do intervalo esperado.

<div align="center">

  <p>Figura 18 - Paleta de Cores</p>
  <img src="../assets/sprint3/prototipo/colors.png" alt="Paleta de Cores">
  <p>Fonte: Material produzido pelos autores (2026).</p>

</div>

**Tipografia**

&ensp; A fonte utilizada em toda a plataforma é a Inter, fonte gratuita do Google Fonts. Ela é aplicada em todos os níveis de hierarquia textual, desde títulos até textos de apoio. Os títulos seguem a escala de Heading H1 a Heading H6, todos em peso Bold ou SemiBold, com tamanhos que variam de 60px (H1) a 24px (H6 mobile). Os textos de corpo são divididos em quatro categorias: Body Large (18px), Body Medium (16px), Body Small (14px) e Body Extra Small (12px), cada uma disponível nos pesos Regular, Medium, SemiBold e Bold. Essa escala garante legibilidade em diferentes contextos de uso, do dashboard ao formulário de registro.

<div align="center">

  <p>Figura 19 - Tipografia</p>
  <img src="../assets/sprint3/prototipo/typography.png" alt="Tipografia">
  <p>Fonte: Material produzido pelos autores (2026).</p>

</div>

**Ícones**

&ensp; Os ícones utilizados na plataforma seguem estilo de linha (outline). O conjunto cobre as principais ações e categorias do sistema. A consistência de estilo entre os ícones reforça a identidade visual da plataforma e facilita o reconhecimento das ações disponíveis em cada tela.

<div align="center">

  <p>Figura 20 - Ícones</p>
  <img src="../assets/sprint3/prototipo/icons.png" alt="Ícones">
  <p>Fonte: Material produzido pelos autores (2026).</p>

</div>

#### 5.2.2 Protótipo - Operador (Cuidadora)

&ensp; As telas do perfil de operador cobrem o fluxo completo de uso da cuidadora dentro da plataforma, desde o acesso inicial até o registro de novos exemplares. A navegação é estruturada por uma sidebar fixa com acesso a Home, Tanques, Axolotes, Cadastro de axolote e Monitoramento.

**Tela de Login**

&ensp; A tela de login é o ponto de entrada da plataforma. O layout é dividido em dois blocos: à esquerda, um card com o logotipo do AmbyData, uma instrução de acesso e o botão "Conectar Carteira"; à direita, uma imagem de axolotes em ambiente aquático. A autenticação ocorre via MetaMask, eliminando a necessidade de cadastro por e-mail ou senha. O texto instrucional "Conecte sua Wallet MetaMask para seguir com o login" orienta usuários sem experiência prévia com carteiras digitais.

<div align="center">

  <p>Figura 21 - Tela de Login</p>
  <img src="../assets/sprint3/prototipo/login.png" alt="Tela de Login">
  <p>Fonte: Material produzido pelos autores (2026).</p>

</div>

**Home do Operador**

&ensp; A página home centraliza as informações de monitoramento em uma única tela. Na parte superior, três abas permitem alternar entre as visões de Último acesso, Axolote e Tanques. A área principal exibe os tanques cadastrados em formato de carrossel horizontal, com cards individuais para cada axolote contendo foto, nome, espécie e status ambientais do tanque. Abaixo dos tanques, dois painéis apresentam o Histórico de Monitoramento, com os registros mais recentes e seus respectivos status dentro da blockchain (Aceito, Recusado ou Pendente), e o Histórico de Alertas, que classifica as notificações em três categorias por cor: vermelho para erros críticos, verde para operações concluídas e amarelo para situações que requerem atenção.

<div align="center">

  <p>Figura 22 - Dashboard do Operador</p>
  <img src="../assets/sprint3//prototipo/home-operador.png" alt="Dashboard do Operador">
  <p>Fonte: Material produzido pelos autores (2026).</p>

</div>

**Tela do Tanque**

&ensp; A tela do tanque apresenta o estado detalhado de um ambiente específico. O bloco superior exibe a foto do tanque, a data e hora da última medição, o nome do responsável e a logo do YouTube que direciona para o link da live do tanque. Abaixo, quatro cards de métricas mostram os valores atuais de Temperatura, pH, Amônia e Nitritos, cada um acompanhado de um indicador de status e do intervalo de referência considerado saudável. Os estados possíveis são Estável (verde), Ideal (verde escuro), Atenção (amarelo) e Crítico (vermelho). Um gráfico de linhas exibe a evolução temporal dos parâmetros monitorados, com dois seletores: um para escolher quais parâmetros visualizar e outro para definir o período de análise (diário, semanal ou mensal). À direita, um painel lateral lista os axolotes alocados no tanque com foto e nome, além de um campo de busca para localização rápida.

<div align="center">

  <p>Figura 23 - Tela do Tanque</p>
  <img src="../assets/sprint3/prototipo/tanque-operador.png" alt="Tela do Tanque">
  <p>Fonte: Material produzido pelos autores (2026).</p>

</div>


**Tela do Axolote**

&ensp; A tela do axolote reúne as informações de um exemplar específico. O card superior apresenta a foto do animal, nome, espécie, data de nascimento, ID do exemplar, comprimento, peso estimado e tanque de alocação. À direita, o painel de Histórico de Monitoramento lista os eventos registrados para aquele exemplar, classificados por tipo (Medição de Água, Inspeção de Saúde ou Alimentação) e por status. Abaixo do card principal, uma seção de comentários exibe observações textuais registradas pelos cuidadores sobre o comportamento do animal. O gráfico presente nessa tela segue a mesma lógica da tela do tanque, permitindo selecionar quais parâmetros exibir e o período de análise desejado. Um botão de exportação no canto superior direito permite baixar o histórico do exemplar em CSV. Um botão flutuante no canto inferior direito dá acesso direto ao formulário de novo registro de monitoramento, disponível apenas para o cuidador.


<div align="center">

  <p>Figura 24 - Tela do Axolote</p>
  <img src="../assets/sprint3/prototipo/axolote-operador.png" alt="Tela do Axolote">
  <p>Fonte: Material produzido pelos autores (2026).</p>

</div>

**Tela de Cadastro de Axolote**

&ensp; A tela de cadastro permite registrar um novo exemplar na plataforma. O formulário contém os campos ID do exemplar, Nome, Espécie, Data de nascimento, Tanque, Morfologia e Responsável. À direita do formulário, uma área de upload permite anexar a foto do animal. O botão "Adicionar" ao final do formulário submete os dados, gerando uma atestação onchain vinculada ao registro. O botão "Novo Axolote" no topo da tela também dá acesso direto a esse formulário a partir de outras seções da plataforma.

<div align="center">

  <p>Figura 25 - Tela de Cadastro de Axolote</p>
  <img src="../assets/sprint3/prototipo/criar-axolote.png" alt="Tela de Cadastro de Axolote">
  <p>Fonte: Material produzido pelos autores (2026).</p>

</div>

**Tela de Registro**

&ensp; A tela de registro é acessada a partir do botão flutuante presente na tela do axolote. O layout é dividido em dois blocos: à esquerda, o card do exemplar selecionado, exibindo foto, ID, nome, espécie, data de nascimento, comprimento, peso estimado e tanque de alocação; à direita, o formulário de inserção de dados com os campos Temperatura da água, pH, Oxigênio dissolvido, Condutividade, Nitrato e Dióxido de nitrogênio. O botão "Confirmar" ao final do formulário submete os dados para validação, gerando uma atestação onchain vinculada ao registro e ao exemplar correspondente.

<div align="center">

  <p>Figura 26 - Tela de Registro (Operador)</p>
  <img src="../assets/sprint3/prototipo/Registro-operador.png" alt="Tela de Registro Operador">
  <p>Fonte: Material produzido pelos autores (2026).</p>

</div>

&ensp; As telas do perfil de operador atendem às necessidades mapeadas na jornada da Ana Clara(cuidadora), priorizando registro rápido e feedback visual imediato dos parâmetros. O fluxo de acesso, monitoramento e registro de dados, permitem que a cuidadora execute suas atividades diárias de forma estruturada, com validação automática dos parâmetros inseridos e rastreabilidade garantida pela infraestrutura blockchain do sistema.

#### 5.2.3 Protótipo - Auditor (Pesquisador)

&ensp; As telas do perfil de auditor cobrem o fluxo de revisão e validação científica dos dados registrados pelos operadores. A navegação utiliza a mesma estrutura de sidebar do perfil de operador, com acesso a Home, Tanques, Axolotes, Cadastro de axolote e Monitoramento.

**Tela de Login**

&ensp; A tela de login do auditor é compartilhada com o perfil de operador, conforme descrito na seção 2.4.1. A diferenciação de perfil ocorre após a autenticação via MetaMask, quando o sistema identifica as permissões associadas à carteira conectada e direciona o usuário para o dashboard correspondente.

**Home do Auditor**

&ensp; A home do auditor compartilha a estrutura de carrossel de tanques e cards de axolotes com o perfil de operador. A diferença está no painel inferior direito: no lugar do Histórico de Alertas, o auditor visualiza um painel de Pendentes, que lista os registros submetidos pelos operadores que ainda aguardam validação científica. Cada item exibe o tipo de registro, o tanque e axolote associados, os valores medidos e o responsável pelo envio, permitindo que o auditor identifique rapidamente o que requer sua atenção.

<div align="center">

  <p>Figura 27 - Home do Auditor</p>
  <img src="../assets/sprint3/prototipo/home-auditor.png" alt="Home do Auditor">
  <p>Fonte: Material produzido pelos autores (2026).</p>

</div>

**Tela do Tanque**

&ensp; A tela do tanque no perfil de auditor é visualmente idêntica à do operador, exibindo os mesmos cards de métricas, indicadores de status e gráfico de evolução temporal com seletores de parâmetro e período. A diferença está na ausência do botão de novo registro, uma vez que o auditor não realiza inserções de dados, apenas analisa e valida o que foi registrado pelos cuidadores.

<div align="center">

  <p>Figura 28 - Tela do Tanque (Auditor)</p>
  <img src="../assets/sprint3/prototipo/tanque-auditor.png" alt="Tela do Tanque Auditor">
  <p>Fonte: Material produzido pelos autores (2026).</p>

</div>

**Tela do Axolote**

&ensp; A tela do axolote no perfil de auditor apresenta as mesmas informações do exemplar disponíveis para o operador: foto, identificação, métricas físicas, histórico de monitoramento, comentários e gráfico de evolução com seletores de parâmetro e período. Assim como no perfil de operador, um botão de exportação no canto superior direito permite baixar o histórico do exemplar em CSV para análise externa ou elaboração de relatórios científicos. O botão flutuante de novo registro não está presente nesse perfil.


<div align="center">

  <p>Figura 29 - Tela do Axolote (Auditor)</p>
  <img src="../assets/sprint3/prototipo/axolote-auditor.png" alt="Tela do Axolote Auditor">
  <p>Fonte: Material produzido pelos autores (2026).</p>

</div>

**Tela de Revisão de Registro**

&ensp; A tela de revisão é exclusiva do perfil de auditor e representa o ponto central do fluxo de validação científica. O layout é dividido em dois blocos: à esquerda, o card do exemplar associado ao registro, exibindo foto, ID, nome, espécie, data de nascimento, comprimento, peso estimado e tanque de alocação; à direita, o formulário com os valores registrados pelo operador, contendo os campos Temperatura da água, pH, Oxigênio dissolvido, Condutividade, Nitrato e Dióxido de nitrogênio. Ao final do formulário, dois botões permitem ao auditor concluir a análise: "Aceitar", que atesta o registro como válido e o consolida na blockchain, e "Recusar", que rejeita o dado e o retorna com indicação de inconsistência.

<div align="center">

  <p>Figura 30 - Tela de Revisão de Registro</p>
  <img src="../assets/sprint3/prototipo/registro-auditor.png" alt="Tela de Revisão de Registro">
  <p>Fonte: Material produzido pelos autores (2026).</p>

</div>

&ensp; As telas do perfil de auditor completam o ciclo de rastreabilidade do sistema, garantindo que os dados registrados pelos operadores passem por validação científica antes de serem consolidados como registros verificáveis na infraestrutura blockchain da plataforma.

#### 5.2.4 Protótipo - Visitante (Público Externo)

&ensp; As telas do perfil de visitante cobrem o fluxo de consulta pública de informações sobre os axolotes monitorados. O protótipo apresentado nesta seção foi gerado com auxílio de inteligência artificial, permitindo ao grupo concentrar esforços na validação dos fluxos de operador e auditor durante a atual sprint. A interface do visitante será detalhada e refinada na próxima sprint do projeto.

**Landing Page**

&ensp; A landing page é o ponto de entrada público da plataforma. O layout é dividido em três blocos principais: o cabeçalho contém o logotipo AmbyData, links de navegação (Axolotes, Como funciona, Sobre) e o botão "Acessar plataforma" que direciona para o login via MetaMask. A seção hero apresenta uma imagem de axolote em ambiente aquático, o título "Rastreabilidade real para a conservação do axolote" e uma descrição que contextualiza o sistema de registro e validação de dados com blockchain. Dois botões permitem acesso rápido: "Ver axolotes" para consulta direta dos exemplares e "Como funciona" para detalhamento técnico da plataforma. Abaixo, um carrossel horizontal exibe cards circulares com foto e nome dos axolotes cadastrados, todos marcados com selo de "Verificado on-chain". A seção seguinte apresenta a lista de exemplares organizados por tanque, com abas de navegação (Todos, Tanque 1, Tanque 2, Tanque 3). Cada card exibe foto do axolote, nome, espécie científica e badges indicando o tipo de registro disponível (Registro pelo cuidador, Validação científica, Verificado útil, Registro on-chain). A área inferior consolida métricas gerais da plataforma: total de axolotes monitorados, tanques ativos, medições registradas e percentual de dados verificáveis. Um painel de ícones categoriza os tipos de atestação disponíveis no sistema.

<div align="center">

  <p>Figura 31 - Landing Page</p>
  <img src="../assets/sprint3/prototipo/landing-page.png" alt="Landing Page">
  <p>Fonte: Material produzido pelos autores (2026).</p>

</div>

**Tela do Axolote (Visitante)**

&ensp; A tela do axolote para visitantes apresenta informações consolidadas do exemplar. O card superior exibe foto, nome científico, tanque de alocação e selo de "Verificado on-chain". Quatro cards de métricas mostram comprimento, peso estimado, temperatura e pH do ambiente, cada um acompanhado de indicador de status (Estável). O painel de Histórico de Monitoramento lista os eventos registrados com tipo (Medição da Água, Inspeção de Saúde, Alimentação) e status de validação (Aceito, Pendente). Um banner informativo na parte inferior exibe o hash da última atestação registrada via EAS (Ethereum Attestation Service) e o nome do auditor responsável pela validação. O botão "Contribuir com uma observação" permite que visitantes registrem comentários sobre o comportamento do animal.

<div align="center">

  <p>Figura 32 - Tela do Axolote (Visitante)</p>
  <img src="../assets/sprint3/prototipo/axolote-visitante-completo.png" alt="Tela do Axolote Visitante">
  <p>Fonte: Material produzido pelos autores (2026).</p>

</div>

**Seção de Observações dos Visitantes**

&ensp; A seção de observações exibe comentários públicos sobre o exemplar. Cada entrada contém inicial do nome do visitante, identificação como "visitante", texto da observação e timestamp de publicação. Um botão de expansão permite visualizar respostas ou interações. O formulário de contribuição na parte inferior contém dois campos de texto: "Observação" para descrição do comportamento observado e "Comentário" para informações adicionais. Um botão de upload permite anexar fotos. O botão "Enviar observação" conclui o registro.

<div align="center">

  <p>Figura 33 - Observações dos Visitantes</p>
  <img src="../assets/sprint3/prototipo/axolote-visitante.png" alt="Observações dos Visitantes">
  <p>Fonte: Material produzido pelos autores (2026).</p>

</div>

&ensp; O perfil de visitante completa o modelo de transparência do AmbyData, permitindo que o público externo acompanhe o estado dos exemplares monitorados, consulte atestações onchain e contribua com observações validadas pela comunidade. A interface será detalhada na próxima sprint, com refinamento de componentes, fluxos de navegação e integração completa com a infraestrutura blockchain do sistema.


### 5.3 Demonstração da Solução

_Vídeo demonstração sprint 3: https://youtu.be/yIzTGBArwjA_

&emsp; Para o desenvolvimento frontend da solução, foi utilizado o framework Angular. Mais detalhes sobre a estrutura de pastas atual está disponível no arquivo README.MD do projeto Ambydata. Sendo assim, durante a sprint 3 desenvolvemos um frontend que conta com as seguintes funcionalidades: 

- Realizar login com metamask: 

<div align="center">

  <p>Figura 27 - Tela de login AmbyData </p>

  ![alt text](../assets/Login-amby.png)
  
  <p>Fonte: Material produzido pelos autores (2026).</p>

</div>

<div align="center">

  <p>Figura 28 - Tela de login AmbyData com carteira metamask </p>

  ![alt text](../assets/login-carteira.png)
  
  <p>Fonte: Material produzido pelos autores (2026).</p>

</div>



&emsp; Com a integração do ENS, tudo que o usuário precisa fazer é conectar a sua carteira, informar seu nome de registro e a qual organização pertence. 

- Visualização da tela inicial com histórico de registros validados e demonstração de registros pendentes:

<div align="center">

  <p>Figura 29 - Tela inicial AmbyData </p>

  ![alt text](../assets/tela-inicial-amby.png)
  
  <p>Fonte: Material produzido pelos autores (2026).</p>

</div>

&emsp; Na visão do usuário operador é possível apenas visualizar o histórico de registros validados e registros pendentes, porém para o usuário auditor é possível clicar no registro que está pendente e realizar a atestação do mesmo. 

-  Seção de visualização de axolotes e tanques cadastrados:

<div align="center">

  <p>Figura 30 - Tela de tanques AmbyData</p>

  ![alt text](../assets/tela-tanques-amby.png)
  
  <p>Fonte: Material produzido pelos autores (2026).</p>

</div>

<div align="center">

  <p>Figura 31 - Tela de login AmbyData </p>

  ![alt text](../assets/tela-axolotes-amby.png)
  
  <p>Fonte: Material produzido pelos autores (2026).</p>

</div>

&emsp; Estas seções estarão futuramente abertas para visualizações de outros usuários além do operador e do auditor. Elas servem para consultar as informações de cadastro de cada axolote ou tanque presentes no sistema. 

- Seção de monitoramento:

<div align="center">

  <p>Figura 32 - Tela de cadastro de axolotes AmbyData </p>

  ![alt text](../assets/tela-monitoramento-amby.png)
  
  <p>Fonte: Material produzido pelos autores (2026).</p>

</div>

&emsp; A funcionalidade de monitoramento está disponível únicamente para os usuários operadores, visto que precisam registrar os dados obtidos durante o momento de monitoramento de axolotes ou tanques. O monitoramento se trata do momento dentre um período onde o operador precisa averiguar a situação do axolote ou tanque para que assim garanta a saúde dos bichinhos.  

- Seção de cadastro de axolotes e seção de cadastro de tanques:

<div align="center">

  <p>Figura 33 - Tela de cadastro de axolotes AmbyData </p>

  ![alt text](../assets/cadastro-axolote-amby.png)
  
  
  <p>Fonte: Material produzido pelos autores (2026).</p>

</div>

<div align="center">

  <p>Figura 34 - Tela de cadastro de axolotes AmbyData </p>

  ![alt text](../assets/cadastro-tanque-amby.png)
  
  <p>Fonte: Material produzido pelos autores (2026).</p>

</div>

&emsp; Estas seções estão disponíveis apenas para o usuário operador também, visto que apenas ele pode adicionar o registro de um axolote ou tanque. 

#### Integração com o Smart Contract

&emsp; A arquitetura e funcionamento do AmbyData foi desenhada com o objetivo de ser uma Aplicação Descentralizada (dApp), onde a interface de usuário (Frontend) que no momento ainda não se comunica com um banco de dados centralizado tradicional, mas sim diretamente com um Smart Contract implantado na rede blockchain (Sepolia Testnet).

&emsp; Essa integração é o pilar que garante a transparência, imutabilidade e rastreabilidade dos dados de monitoramento ambiental dos tanques e das informações vitais dos axolotes. O ecossistema funciona através de três camadas principais:

1. A Camada de Apresentação (Frontend em Angular):

&emsp; Desenvolvido em Angular utilizando a arquitetura de Standalone Components, o frontend é responsável por toda a interação com o usuário. Ele renderiza interfaces dinâmicas que se adaptam automaticamente ao cargo da carteira conectada (Operador, Auditor ou Admin). As telas de captura de dados (como Cadastro de Tanques, Cadastro de Axolotes e Inserção de Medições) possuem validações rigorosas para garantir que as informações estejam no formato correto antes de serem enviadas para a rede.

2. A Ponte de Comunicação (Web3 Service e Ethers.js)

&emsp; A integração direta entre o Angular e o Smart Contract é gerenciada por um serviço central (Web3Service). Este serviço utiliza a biblioteca ethers.js (ou equivalente) para atuar como o "tradutor" entre a interface web e a blockchain. Suas principais responsabilidades incluem:

- Conexão de Carteira: Solicitar permissão ao provedor Web3 do navegador (como a MetaMask) para ler o endereço público do usuário.

- Leitura de Dados (Call): Buscar o histórico de medições, dados dos tanques e status de auditorias na blockchain sem custo de taxas (gas), atualizando os painéis e carrosséis em tempo real.

- Escrita de Dados (Transações): Empacotar os dados preenchidos nos formulários e enviá-los para a blockchain, aguardando a assinatura digital do usuário via MetaMask.

3. A Camada de Lógica e Armazenamento (Smart Contract)

&emsp; O Smart Contract, escrito em Solidity, atua como o motor de regras de negócio e o banco de dados imutável do sistema. Ele possui funções específicas para registrar novos ambientes, submeter parâmetros de qualidade da água (como Temperatura e pH) e gerenciar o fluxo de auditoria. Quando uma medição é registrada por um Operador, o contrato a marca como "Pendente". Apenas usuários com a permissão de Auditor podem alterar o estado desse registro no contrato para "Validado" ou "Contestado".

#### Fluxo Prático de Integração

&emsp; Para ilustrar a sincronia entre essas camadas, podemos observar o fluxo de um Registro de Novo Tanque:

1. Ação: O operador preenche os dados do tanque no formulário do Angular e clica em "Adicionar Tanque".

2. Processamento: O componente aciona o Web3Service, que formata os dados e chama a função de registro (ex: registerTank) mapeada no Smart Contract.

3. Assinatura: A MetaMask é aberta automaticamente, exigindo que o operador assine criptograficamente a transação e pague a taxa de rede (gas).

4. Confirmação: O serviço aguarda a validação dos blocos na rede Sepolia (tx.wait()).

5. Atualização: Assim que a rede confirma a transação, o Angular recebe o retorno de sucesso, limpa o formulário, emite um alerta positivo na tela e atualiza a lista global de tanques puxando os dados atualizados do contrato.

### Atualização dos Contratos: Integração com ENS

A principal evolução entre as versões dos contratos diz respeito à camada de identidade institucional, introduzida por meio da integração com o Ethereum Name Service (ENS) no contrato `AxoloAccess`. Na versão anterior, a atribuição de papéis dependia inteiramente de ação manual do administrador: apenas o detentor do `DEFAULT_ADMIN_ROLE` podia conceder `CARETAKER_ROLE`, `AUDITOR_ROLE` ou `REGISTRAR_ROLE` a endereços específicos via `grantRole`. Na versão atualizada, esse fluxo é substituído por um mecanismo de auto-registro: qualquer endereço que possua um subdomínio ENS vinculado a uma instituição reconhecida — como `ana.biomuseu.axolodao2.eth` para o BioMuseu ou `ricardo.unam.axolodao2.eth` para a UNAM — pode chamar a função `registrarAcesso` e receber automaticamente o papel correspondente, sem intervenção do administrador. O contrato reconstrói o `namehash` do nome ENS a partir do `label` e do `parentNode` fornecidos, consulta o ENS Registry e o Resolver on-chain, verifica que o endereço resolvido corresponde ao `msg.sender`, e só então concede o papel e registra o nome ENS completo no mapeamento `ensName`. Esse desenho âncora a identidade dos usuários à hierarquia institucional de domínios ENS, em vez de uma lista de endereços mantida manualmente.

Como consequência direta dessa mudança, o papel `REGISTRAR_ROLE` foi removido da arquitetura. Na versão anterior, esse papel era a permissão exigida tanto no `AxoloAccess` quanto no `AxoloRegistry` para todas as operações de escrita — registro, atualização, transferência e desativação de tanques e axolotls. Na versão atual, todas essas operações passam a exigir `CARETAKER_ROLE`, consolidando o perfil da Persona Ana como a única responsável pelo registro operacional. O modificador `onlyRegistrar` foi substituído por `onlyCaretaker` em todas as funções de escrita do `AxoloRegistry`, e o papel `REGISTRAR_ROLE` deixou de ser definido tanto no `AxoloAccess` quanto no `AxoloRegistry`. Essa simplificação reduz a superfície de configuração de papéis e torna o modelo de permissões mais direto: cuidadores institucionais registram e monitoram; auditores validam.

Os contratos `AxoloMonitoring` e `AxoloRegistry` em si não sofreram alterações na lógica de negócio — as estruturas de dados, os eventos, o mecanismo de ponteiro monotônico para validações e as regras de imutabilidade de campos biológicos permanecem idênticos entre as duas versões. A mudança é inteiramente absorvida pela camada de controle de acesso: `AxoloAccess` passou a ser o ponto de entrada para incorporação de novos usuários ao sistema, com a identidade ENS funcionando como credencial institucional verificável on-chain.

---

## 6. Backend da Aplicação

(INTRODUÇÃO)

---

### 6.1 Arquitetura do Backend

(ADICIONAR TEXTO)

---

### 6.2 Modelagem do Banco de dados

&ensp; Nesta sub-seção, apresenta-se a modelagem do banco de dados relacional da aplicação AmbyData, estruturada em PostgreSQL e alinhada ao estado atual de implementação do backend. Diferentemente de uma modelagem centrada em uma tabela genérica de usuários, o modelo do projeto adota identidade baseada em carteira (wallet), ENS e papéis on-chain, com espelhamento off-chain na tabela de cuidadores.

&ensp;O banco off-chain funciona como camada de consulta, indexação e auditoria operacional dos eventos registrados na blockchain. A rastreabilidade entre as camadas é preservada por identificadores onchain_id e hashes de transação tx_hash, permitindo verificar a origem on-chain dos registros sincronizados no backend.

&ensp;As entidades documentadas no modelo atual são:
- caretakers: espelho off-chain de cuidadores autorizados, com wallet_address, dados ENS e hashes das transações administrativas de autorização.
- tanks: cadastro dos aquários (tanques) monitorados no sistema.
- axolotls: cadastro dos espécimes vinculados a tanques.
- measurements: medições ambientais por tanque, incluindo status de validação científica (pending, validated, contested).
- attestations: atestações EAS emitidas após validação de medições.
- comments: comentários vinculados a axolote e/ou tanque, sem user_id obrigatório no modelo atual. 

&ensp;Confira com mais detalhes a seguir: 

<div align="center"> Figura 35 - Modelagem do Banco de Dados </div>

![Modelagem-BD](<../assets/Modelagem BD - Modelagem BD.png>)

<div align = "center"> Fonte: material produzido pelos próprios alunos (2026). </div>


<br>


O diagrama abaixo representa a estrutura atual do banco de dados do sistema, incluindo as entidades principais e seus relacionamentos.

```mermaid
erDiagram
CARETAKERS {
  uuid id PK
  text wallet_address UK
  text ens_label
  text ens_subdomain
  text ens_tx_hash
  text role_tx_hash
  boolean active
  timestamptz created_at
}

TANKS {
  uuid id PK
  int onchain_id UK
  text name
  text location
  text registered_by
  timestamptz registered_at
  text tx_hash
  boolean active
  timestamptz created_at
}

AXOLOTLS {
  uuid id PK
  int onchain_id UK
  text name
  text species
  timestamptz birth_date
  int tank_id
  text morph_data
  text photo_hash
  text registered_by
  timestamptz registered_at
  text tx_hash
  boolean active
  timestamptz created_at
}

MEASUREMENTS {
  uuid id PK
  int onchain_id UK
  int tank_id
  text recorder
  timestamptz timestamp
  int temperature
  int ph
  int dissolved_oxygen
  int conductivity
  int turbidity
  int phosphates
  int no2
  int no3
  int ammonia
  int hardness
  text status
  text validator
  timestamptz validated_at
  text contest_reason
  text tx_hash
  text validate_tx_hash
  timestamptz created_at
}

ATTESTATIONS {
  uuid id PK
  text eas_uid UK
  int registro_id
  text validado_por
  text instituicao
  text recipient
  text tx_hash
  timestamptz created_at
}

COMMENTS {
  uuid id PK
  text comment
  text photo_url
  int axolotl_id
  int tank_id
  timestamptz created_at
}

TANKS ||--o{ AXOLOTLS : possui
TANKS ||--o{ MEASUREMENTS : registra
MEASUREMENTS ||--o| ATTESTATIONS : validacao
AXOLOTLS ||--o{ COMMENTS : comentarios
TANKS ||--o{ COMMENTS : comentarios
```

&ensp;Os relacionamentos de cardinalidade atual entre as tabelas são:

- Tank -> Axolotl (1:N): um tanque pode conter vários axolotes; cada axolote pertence a um único tanque no registro atual.
- Tank -> Measurement (1:N): um tanque pode possuir zero, uma ou várias medições ao longo do tempo (0..N).
- Measurement -> Attestation (1:0..1): uma medição pode não ter atestação ou ter uma única atestação após validação.
- Axolotl -> Comment (1:0..N): um axolote pode receber vários comentários.
- Tank -> Comment (1:0..N): um tanque pode receber vários comentários.
- Caretaker -> Tank e Caretaker -> Axolotl (vínculo lógico por wallet): a autoria de criação é registrada por endereço de carteira nos campos registered_by.

&ensp;Importante: a medição ambiental é associada ao tanque (tank_id), e não diretamente ao axolote. A consulta por axolote recupera medições do tanque ao qual o espécime está vinculado.

&ensp;Também é importante destacar que, no modelo vigente, a entidade comments não possui chave estrangeira para usuário (user_id). O vínculo do comentário ocorre com axolotl_id e/ou tank_id, conforme regra de consistência definida no banco.

---

## 7. Referências


<a name="ref1">[1]:</a> AKERLOF, George A. The market for “lemons”: quality uncertainty and the market mechanism. The Quarterly Journal of Economics, v. 84, n. 3, p. 488–500, 1970.

<a name="ref2">[2]:</a> BUGHUNT. Princípios da segurança da informação. Blog BugHunt, 2023. Disponível em: https://blog.bughunt.com.br/principios-da-seguranca-da-informacao/. Acesso em: 14 fev. 2025.

<a name="ref3">[3]:</a> BUTERIN, Vitalik. A next-generation smart contract and decentralized application platform. Ethereum White Paper, 2014.

<a name="ref4">[4]:</a> FERRAMENTAS DA QUALIDADE. Matriz de riscos: matriz de probabilidade e impacto. Disponível em: https://ferramentasdaqualidade.org/matriz-de-riscos-matriz-de-probabilidade-e-impacto/. Acesso em: 12 fev. 2021.4.

<a name="ref5">[5]:</a> KIM, W. Chan; MAUBORGNE, Renée. Blue Ocean Strategy: How to Create Uncontested Market Space and Make the Competition Irrelevant. Boston: Harvard Business School Press, 2005. Edição revisada: 2015.

<a name="ref6">[6]:</a> OSTERWALDER, Alexander; PIGNEUR, Yves; BERNARDA, Greg; SMITH, Alan. Value proposition design: How to create products and services customers want. Hoboken: John Wiley & Sons, 2014.

<a name="ref7">[7]:</a> PROVENANCE. Provenance – Transparency supply chain. Disponível em: https://www.provenance.org/. Acesso em: 08 fev. 2021.4.

<a name="ref8">[8]:</a> SCOPI. Curva de valor: o que é e como aplicar a estratégia do Oceano Azul. Disponível em: https://scopi.com.br/blog/curva-de-valor/. Acesso em: 08 fev. 2021.4.

<a name="ref9">[9]:</a> SZABO, Nick. Trusted third parties are security holes. 2001. Disponível em: https://nakamotoinstitute.org/library/trusted-third-parties/. Acesso em: 09 fev. 2021.4.

<a name="ref10">[10]:</a> VERRA. Verra – Standards for climate action. Disponível em: https://verra.org/. Acesso em: 08 fev. 2021.4.
