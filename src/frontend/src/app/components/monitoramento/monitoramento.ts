import { Component, OnInit, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ethers } from 'ethers';
import { Web3Service } from '../../services/web3';
import { RelayerService } from '../../services/relayer.service';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import Swal from 'sweetalert2';

interface PendingMeasurement {
  id: number;
  tankId: number;
  nomeTanque: string;
  recorder: unknown;
  temperatura: string;
  ph: string;
  oxigenioDissolvido: string;
  o2?: string;
  condutividade: string;
  turbidez: string;
  fosfatos: string;
  no3: string;
  no2: string;
  amonia: string;
  dureza: string;
  dataFormatada: string;
  dataHora?: string;
  status: number;
}

interface FormattedMeasurement {
  id: number;
  tankId: number;
  nomeTanque: string;
  temperatura: string;
  ph: string;
  o2: string;
  condutividade: string;
  turbidez: string;
  fosfatos: string;
  no2: string;
  no3: string;
  amonia: string;
  dureza: string;
  status: { texto: string; classe: string };
  dataHora: string;
  timestampUnix: number;
  validator: string;
  validatedAtUnix: number;
  dataValidacao: string;
  contestReason: string;
  attestationUID: string;
}

interface TankStatus {
  lastPendingId: number;
  lastValidatedId: number;
  totalMeasurements: number;
}

type ParametroFormulario =
  | 'mTemp'
  | 'mPh'
  | 'mO2'
  | 'mCond'
  | 'mTurb'
  | 'mPhos'
  | 'mNo2'
  | 'mNo3'
  | 'mNh3'
  | 'mGh';

interface ReferenciaParametro {
  label: string;
  faixa: string;
  resumo: string;
}

type FiltroPeriodoCsv = '24h' | '7d' | '30d' | 'all';

@Component({
  selector: 'app-monitoramento',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './monitoramento.html',
  styleUrls: ['./monitoramento.css']
})
export class Monitoramento implements OnInit {

  // Comunicacao com o componente pai (Tela Inicial)
  @Input() cargoUsuario: 'operador' | 'auditor' | 'admin' | 'gerente' | 'nenhum' = 'nenhum';
  @Input() medicoesPendentes: PendingMeasurement[] = [];
  @Input() medicaoParaAvaliar: PendingMeasurement | null = null;
  @Output() selecionarMedicao = new EventEmitter<PendingMeasurement>();
  @Output() fecharAuditoria = new EventEmitter<void>();

  // Formulario de medicao (Operador/Caretaker)
  medicaoForm!: FormGroup;
  tanquesDisponiveis: any[] = [];
  carregandoTanques: boolean = false;
  enviandoTx: boolean = false;

  // Consulta de medicoes
  buscaId: string = '';
  filtroTanqueId: string = '';
  medicaoDetalhe: FormattedMeasurement | null = null;
  medicoesFiltradas: FormattedMeasurement[] = [];
  tankStatus: TankStatus | null = null;
  carregandoFiltro: boolean = false;
  carregandoBusca: boolean = false;

  // Historico geral
  medicoesValidadas: FormattedMeasurement[] = [];
  carregandoHistorico: boolean = false;
  exportandoCsv: boolean = false;
  filtroPeriodoCsv: FiltroPeriodoCsv = '7d';

  fonteDosDados: 'indexador' | 'blockchain' | '' = '';

  readonly referenciasFormulario: Record<ParametroFormulario, ReferenciaParametro> = {
    mTemp: {
      label: 'Temperatura',
      faixa: '16 °C a 18 °C',
      resumo: 'Faixa mais segura para rotina.',
    },
    mPh: {
      label: 'pH',
      faixa: '6.5 a 8.0',
      resumo: 'Evite oscilações bruscas.',
    },
    mO2: {
      label: 'Oxigênio dissolvido',
      faixa: '6.5 mg/L ou mais',
      resumo: 'Quanto mais estável, melhor.',
    },
    mCond: {
      label: 'Condutividade',
      faixa: '200 a 500 µS/cm',
      resumo: 'Mantém a água em faixa consistente.',
    },
    mTurb: {
      label: 'Turbidez',
      faixa: '0 a 5 NTU',
      resumo: 'Água deve permanecer visualmente limpa.',
    },
    mPhos: {
      label: 'Fosfatos',
      faixa: '0 a 0.5 mg/L',
      resumo: 'Acompanhe para evitar desequilíbrio.',
    },
    mNo2: {
      label: 'NO₂',
      faixa: '0 a 0.1 mg/L',
      resumo: 'Nitrito deve ficar próximo de zero.',
    },
    mNo3: {
      label: 'NO₃',
      faixa: '0 a 20 mg/L',
      resumo: 'Valores menores reduzem estresse.',
    },
    mNh3: {
      label: 'NH₃',
      faixa: '0 mg/L',
      resumo: 'Qualquer valor já exige atenção.',
    },
    mGh: {
      label: 'Dureza GH',
      faixa: '7 a 14 dGH',
      resumo: 'Faixa de referência para estabilidade.',
    },
  };

  constructor(
    private web3Service: Web3Service,
    private relayerService: RelayerService,
    public authService: AuthService,
    private apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    this.inicializarFormularios();
    await this.carregarPermissoes();
  }

  inicializarFormularios() {
    this.medicaoForm = new FormGroup({
      mTankId: new FormControl('', Validators.required),
      mTemp: new FormControl('', Validators.required),
      mPh: new FormControl('', Validators.required),
      mO2: new FormControl('', Validators.required),
      mCond: new FormControl('', Validators.required),
      mTurb: new FormControl('', Validators.required),
      mPhos: new FormControl('', Validators.required),
      mNo2: new FormControl('', Validators.required),
      mNo3: new FormControl('', Validators.required),
      mNh3: new FormControl('', Validators.required),
      mGh: new FormControl('', Validators.required)
    });
  }

  async carregarPermissoes() {
    try {
      await this.web3Service.checkConnection();
      const accessContract = this.web3Service.contracts.access;
      if (!accessContract) return;

      // Usar AuthService se ja detectado, senao detectar manualmente
      if (this.authService.role === 'none') {
        await this.authService.detectRoles();
      }

      if (this.authService.isCaretaker) {
        this.cargoUsuario = 'operador';
      } else if (this.authService.isAuditor) {
        this.cargoUsuario = 'auditor';
      } else if (this.authService.isAdmin) {
        this.cargoUsuario = 'admin';
      } else if (this.authService.isGerente) {
        this.cargoUsuario = 'gerente';
      } else {
        this.cargoUsuario = 'nenhum';
      }

      // Carregar tanques para todos os cargos (usado no form e no filtro de consulta)
      if (this.cargoUsuario !== 'nenhum') {
        this.carregarTanques();
      }

      this.cdr.detectChanges();
    } catch (error) {
      // Erro silencioso caso a rede falhe ao buscar permissoes
    }
  }

  // Busca os tanques ativos para o select do formulario
  async carregarTanques() {
    this.carregandoTanques = true;
    try {
      // Tentar indexador primeiro
      if (this.apiService.available) {
        try {
          const apiTanks = await this.apiService.getTanks({ active: true });
          this.tanquesDisponiveis = apiTanks.map((t: any) => ({ id: t.id, nome: t.name }));
          return;
        } catch {
          console.warn('Indexador indisponível para tanques, usando blockchain');
        }
      }

      // Fallback: blockchain
      const contract = this.web3Service.contracts.registry;
      if (!contract) return;

      const nextId = await contract.nextTankId();
      this.tanquesDisponiveis = [];

      for (let i = 1; i < Number(nextId); i++) {
        const t = await contract.getTank(i);
        if (t.active) {
          this.tanquesDisponiveis.push({ id: Number(t.id), nome: t.name });
        }
      }
    } catch (error) {
    } finally {
      this.carregandoTanques = false;
      this.cdr.detectChanges();
    }
  }

  // Retorna o Auditor para a listagem da tela inicial
  voltarParaPendentes() {
    this.fecharAuditoria.emit();
  }

  // Auditoria: Aprova uma medicao pendente via relayer (gasless)
  async aceitarMedicao() {
    const medicao = this.medicaoParaAvaliar;
    if (!medicao) return;

    this.enviandoTx = true;
    try {
      const txHash = await this.relayerService.relayWrite(
        this.web3Service.contracts.monitoring,
        'validateMeasurement',
        [BigInt(medicao.id)]
      );

      Swal.fire('Sucesso!', `Medicao aprovada! TX: ${txHash.slice(0, 10)}...`, 'success');
      this.voltarParaPendentes();
    } catch (error: any) {
      const msgErro = error.reason || error.info?.error?.message || error.message || 'Falha ao aprovar medicao.';
      Swal.fire('Erro na Transacao', msgErro, 'error');
    } finally {
      this.enviandoTx = false;
    }
  }

  // Auditoria: Rejeita uma medicao exigindo justificativa via relayer (gasless)
  async recusarMedicao() {
    const medicao = this.medicaoParaAvaliar;
    if (!medicao) return;

    const { value: motivo } = await Swal.fire({
      title: 'Contestar Medicao',
      input: 'text',
      inputLabel: 'Qual o motivo da recusa?',
      inputPlaceholder: 'Ex: Sensores descalibrados',
      showCancelButton: true,
      confirmButtonColor: '#E74C3C',
      confirmButtonText: 'Recusar Medicao',
      cancelButtonText: 'Cancelar'
    });

    if (motivo) {
      this.enviandoTx = true;
      try {
        const txHash = await this.relayerService.relayWrite(
          this.web3Service.contracts.monitoring,
          'contestMeasurement',
          [BigInt(medicao.id), motivo]
        );

        Swal.fire('Contestada!', `Medicao recusada. TX: ${txHash.slice(0, 10)}...`, 'success');
        this.voltarParaPendentes();
      } catch (error: any) {
        const msgErro = error.reason || error.info?.error?.message || error.message || 'Falha ao recusar medicao.';
        Swal.fire('Erro na Transacao', msgErro, 'error');
      } finally {
        this.enviandoTx = false;
      }
    }
  }

  // Preenche valores simulados para testes rapidos
  preencherTeste() {
    this.medicaoForm.patchValue({
      mTemp: 19.50, mPh: 7.20, mO2: 7.10, mCond: 300,
      mTurb: 1.00, mPhos: 0.50, mNo2: 0.03, mNo3: 10.00,
      mNh3: 0.02, mGh: 8.00
    });
  }

  // Envia os parametros da agua para o contrato via relayer (gasless)
  async registrarMedicao() {
    if (this.medicaoForm.invalid) {
      Swal.fire('Atencao', 'Preencha todos os campos obrigatorios!', 'warning');
      return;
    }

    const form = this.medicaoForm.value;
    const alertasBiologicos: string[] = [];

    // Alertas de seguranca baseados nos limites ideais
    if (form.mTemp > 20 || form.mTemp < 14) {
      alertasBiologicos.push(`Temperatura em <b>${form.mTemp}°C</b> (Ideal: 16°C - 18°C)`);
    }
    if (form.mPh < 6.5 || form.mPh > 8.0) {
      alertasBiologicos.push(`pH em <b>${form.mPh}</b> (Ideal: 6.5 - 8.0)`);
    }
    if (form.mNh3 > 0) {
      alertasBiologicos.push(`Amonia em <b>${form.mNh3} mg/L</b> (Ideal: 0)`);
    }

    if (alertasBiologicos.length > 0) {
      const confirmacao = await Swal.fire({
        title: 'Parametros Criticos!',
        html: `Os valores abaixo sao perigosos para os axolotes:<br><br> ${alertasBiologicos.join('<br>')} <br><br><b>Registrar mesmo assim?</b>`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#E74C3C',
        cancelButtonColor: '#95A5A6',
        confirmButtonText: 'Sim, registrar',
        cancelButtonText: 'Nao, corrigir'
      });
      if (!confirmacao.isConfirmed) return;
    }

    this.enviandoTx = true;
    try {
      const parametros = {
        tankId: BigInt(form.mTankId),
        temperature: Math.round(form.mTemp * 100),
        ph: Math.round(form.mPh * 100),
        dissolvedOxygen: Math.round(form.mO2 * 100),
        conductivity: Math.round(form.mCond * 100),
        turbidity: Math.round(form.mTurb * 100),
        phosphates: Math.round(form.mPhos * 100),
        no2: Math.round(form.mNo2 * 100),
        no3: Math.round(form.mNo3 * 100),
        ammonia: Math.round(form.mNh3 * 100),
        hardness: Math.round(form.mGh * 100)
      };

      const txHash = await this.relayerService.relayWrite(
        this.web3Service.contracts.monitoring,
        'recordMeasurement',
        [parametros]
      );

      Swal.fire('Sucesso!', `Medicao registrada via relayer. TX: ${txHash.slice(0, 10)}...`, 'success');
      this.medicaoForm.reset();

    } catch (error: any) {
      Swal.fire('Erro', error.reason || error.message || 'Falha ao registrar medicao.', 'error');
    } finally {
      this.enviandoTx = false;
    }
  }

  // ── Consulta de Medicoes ──

  async buscarMedicaoPorId() {
    const id = Number(this.buscaId);
    if (!id || id < 1) {
      Swal.fire('Atencao', 'Informe um ID valido.', 'warning');
      return;
    }

    this.carregandoBusca = true;
    this.medicaoDetalhe = null;
    try {
      // Tentar indexador primeiro
      if (this.apiService.available) {
        try {
          const apiMed = await this.apiService.getMeasurementById(id);
          if (apiMed) {
            const tanque = this.tanquesDisponiveis.find((t: any) => t.id === apiMed.tankId);
            const nomeTanque = tanque ? tanque.nome : `Tanque #${apiMed.tankId}`;
            // Converter do formato indexador (valores brutos int) para FormattedMeasurement
            this.medicaoDetalhe = this.formatarMedicaoFromApi(apiMed, nomeTanque);
            this.fonteDosDados = 'indexador';
            return;
          }
        } catch {
          console.warn('Indexador indisponível para busca, usando blockchain');
        }
      }

      // Fallback: blockchain
      this.fonteDosDados = 'blockchain';
      const monContract = this.web3Service.contracts.monitoring;
      const regContract = this.web3Service.contracts.registry;
      if (!monContract || !regContract) return;

      const m = await monContract.getMeasurement(id);
      if (Number(m.id) === 0) {
        Swal.fire('Nao encontrada', `Medicao #${id} nao existe.`, 'info');
        return;
      }

      const tId = Number(m.tankId);
      let nomeTanque = `Tanque #${tId}`;
      try {
        const t = await regContract.getTank(tId);
        nomeTanque = t.name;
      } catch {}

      this.medicaoDetalhe = this.formatarMedicao(m, nomeTanque);
    } catch (error: any) {
      Swal.fire('Erro', error.message || 'Falha ao buscar medicao.', 'error');
    } finally {
      this.carregandoBusca = false;
      this.cdr.detectChanges();
    }
  }

  async filtrarPorTanque() {
    const tankId = Number(this.filtroTanqueId);
    if (!tankId || tankId < 1) {
      this.medicoesFiltradas = [];
      this.tankStatus = null;
      return;
    }

    this.carregandoFiltro = true;
    this.medicoesFiltradas = [];
    this.tankStatus = null;

    try {
      const tanque = this.tanquesDisponiveis.find((t: any) => t.id === tankId);
      const nomeTanque = tanque ? tanque.nome : `Tanque #${tankId}`;

      // Tentar indexador primeiro
      if (this.apiService.available) {
        try {
          const apiMeds = await this.apiService.getMeasurementsByTank(tankId, 20);
          this.medicoesFiltradas = apiMeds.map((m: any) => this.formatarMedicaoFromApi(m, nomeTanque));
          this.fonteDosDados = 'indexador';

          // Status do tanque ainda vem da blockchain (não há endpoint no indexador)
          try {
            const monContract = this.web3Service.contracts.monitoring;
            if (monContract) {
              const status = await monContract.getTankStatus(BigInt(tankId));
              this.tankStatus = {
                lastPendingId: Number(status.lastPendingId),
                lastValidatedId: Number(status.lastValidatedId),
                totalMeasurements: Number(status.totalMeasurements)
              };
            }
          } catch {}

          return;
        } catch {
          console.warn('Indexador indisponível para filtro, usando blockchain');
        }
      }

      // Fallback: blockchain
      this.fonteDosDados = 'blockchain';
      const monContract = this.web3Service.contracts.monitoring;
      const regContract = this.web3Service.contracts.registry;
      if (!monContract || !regContract) return;

      // Carregar status do tanque
      try {
        const status = await monContract.getTankStatus(BigInt(tankId));
        this.tankStatus = {
          lastPendingId: Number(status.lastPendingId),
          lastValidatedId: Number(status.lastValidatedId),
          totalMeasurements: Number(status.totalMeasurements)
        };
      } catch {}

      // Buscar medicoes do tanque (ultimas 20)
      const nextId = Number(await monContract.nextMeasurementId());
      const lista: FormattedMeasurement[] = [];

      for (let i = nextId - 1; i >= 1 && lista.length < 20; i--) {
        const m = await monContract.getMeasurement(i);
        if (Number(m.tankId) === tankId) {
          lista.push(this.formatarMedicao(m, nomeTanque));
        }
      }

      this.medicoesFiltradas = lista;
    } catch (error: any) {
      Swal.fire('Erro', error.message || 'Falha ao filtrar medicoes.', 'error');
    } finally {
      this.carregandoFiltro = false;
      this.cdr.detectChanges();
    }
  }

  // Cruza dados de tanques e axolotes para exibir o historico formatado
  async carregarDadosCruzados() {
    this.carregandoHistorico = true;
    try {
      const regContract = this.web3Service.contracts.registry;
      const monContract = this.web3Service.contracts.monitoring;
      if (!regContract || !monContract) return;

      const totalTanques = Number(await regContract.nextTankId());
      const mapaTanques = new Map<number, string>();
      for (let i = 1; i < totalTanques; i++) {
        const t = await regContract.getTank(i);
        mapaTanques.set(Number(t.id), t.name);
      }

      const totalMedicoes = Number(await monContract.nextMeasurementId());
      const tempLista: FormattedMeasurement[] = [];

      for (let i = totalMedicoes - 1; i >= 1; i--) {
        const m = await monContract.getMeasurement(i);
        const tId = Number(m.tankId);
        const nomeTanque = mapaTanques.get(tId) || `Tanque #${tId}`;
        tempLista.push(this.formatarMedicao(m, nomeTanque));
      }

      this.medicoesValidadas = tempLista;
    } catch (error) {
    } finally {
      this.carregandoHistorico = false;
      this.cdr.detectChanges();
    }
  }

  // ── Helpers ──

  async exportarCsvValidadas() {
    this.exportandoCsv = true;
    try {
      const medicoes = await this.buscarMedicoesValidadas();
      const filtradas = this.filtrarMedicoesPorPeriodo(medicoes, this.filtroPeriodoCsv);

      if (filtradas.length === 0) {
        Swal.fire('Sem dados', 'Nenhuma medição validada encontrada para o período selecionado.', 'info');
        return;
      }

      const csv = this.gerarCsvValidadas(filtradas);
      const periodoLabel = this.getPeriodoCsvLabel(this.filtroPeriodoCsv).toLowerCase().replace(/\s+/g, '-');
      const dataArquivo = new Date().toISOString().slice(0, 10);
      this.baixarArquivoCsv(csv, `monitoramentos-validados-${periodoLabel}-${dataArquivo}.csv`);
      Swal.fire('CSV gerado', `${filtradas.length} medições validadas exportadas.`, 'success');
    } catch (error: any) {
      Swal.fire('Erro', error.message || 'Falha ao exportar CSV.', 'error');
    } finally {
      this.exportandoCsv = false;
      this.cdr.detectChanges();
    }
  }

  exportarCsvFiltradoPorTanque() {
    if (!this.filtroTanqueId) {
      Swal.fire('Atencao', 'Selecione um tanque antes de exportar.', 'warning');
      return;
    }

    if (this.medicoesFiltradas.length === 0) {
      Swal.fire('Sem dados', 'Filtre um tanque com medicoes antes de exportar.', 'info');
      return;
    }

    this.exportandoCsv = true;
    try {
      const csv = this.gerarCsvValidadas(this.medicoesFiltradas);
      const dataArquivo = new Date().toISOString().slice(0, 10);
      this.baixarArquivoCsv(csv, `tanque-${this.filtroTanqueId}-medicoes-${dataArquivo}.csv`);
      Swal.fire('CSV gerado', `${this.medicoesFiltradas.length} medicoes exportadas.`, 'success');
    } catch (error: any) {
      Swal.fire('Erro', error.message || 'Falha ao exportar CSV.', 'error');
    } finally {
      this.exportandoCsv = false;
      this.cdr.detectChanges();
    }
  }

  private async buscarMedicoesValidadas(): Promise<FormattedMeasurement[]> {
    if (this.apiService.available) {
      try {
        const apiMeds = await this.apiService.getMeasurements({ status: 'validated' });
        const mapaTanques = await this.obterMapaTanques();
        this.fonteDosDados = 'indexador';
        return apiMeds.map((m: any) => {
          const nomeTanque = mapaTanques.get(Number(m.tankId)) || `Tanque #${m.tankId}`;
          return this.formatarMedicaoFromApi(m, nomeTanque);
        });
      } catch {
        console.warn('Indexador indisponível para exportação CSV, usando blockchain');
      }
    }

    const monContract = this.web3Service.contracts.monitoring;
    if (!monContract) {
      throw new Error('Contrato de monitoramento indisponível.');
    }

    this.fonteDosDados = 'blockchain';
    const mapaTanques = await this.obterMapaTanques();
    const totalMedicoes = Number(await monContract.nextMeasurementId());
    const lista: FormattedMeasurement[] = [];

    for (let i = totalMedicoes - 1; i >= 1; i--) {
      const m = await monContract.getMeasurement(i);
      if (Number(m.status) !== 1) continue;

      const tId = Number(m.tankId);
      const nomeTanque = mapaTanques.get(tId) || `Tanque #${tId}`;
      lista.push(this.formatarMedicao(m, nomeTanque));
    }

    return lista;
  }

  private async obterMapaTanques(): Promise<Map<number, string>> {
    const mapaTanques = new Map<number, string>();

    for (const tanque of this.tanquesDisponiveis) {
      mapaTanques.set(Number(tanque.id), tanque.nome);
    }

    if (mapaTanques.size > 0) return mapaTanques;

    const regContract = this.web3Service.contracts.registry;
    if (!regContract) return mapaTanques;

    const totalTanques = Number(await regContract.nextTankId());
    for (let i = 1; i < totalTanques; i++) {
      const t = await regContract.getTank(i);
      mapaTanques.set(Number(t.id), t.name);
    }

    return mapaTanques;
  }

  private filtrarMedicoesPorPeriodo(medicoes: FormattedMeasurement[], periodo: FiltroPeriodoCsv): FormattedMeasurement[] {
    if (periodo === 'all') return medicoes;

    const agora = Date.now();
    const janelaMs =
      periodo === '24h'
        ? 24 * 60 * 60 * 1000
        : periodo === '7d'
          ? 7 * 24 * 60 * 60 * 1000
          : 30 * 24 * 60 * 60 * 1000;

    const limite = agora - janelaMs;
    return medicoes.filter((medicao) => {
      const baseUnix = medicao.validatedAtUnix > 0 ? medicao.validatedAtUnix : medicao.timestampUnix;
      return baseUnix * 1000 >= limite;
    });
  }

  private gerarCsvValidadas(medicoes: FormattedMeasurement[]): string {
    const cabecalho = [
      'ID',
      'Tanque ID',
      'Tanque',
      'Status',
      'Temperatura (C)',
      'pH',
      'O2 Dissolvido (mg/L)',
      'Condutividade (uS/cm)',
      'Turbidez (NTU)',
      'Fosfatos (mg/L)',
      'NO2 (mg/L)',
      'NO3 (mg/L)',
      'NH3 (mg/L)',
      'Dureza GH (dGH)',
      'Data da Medicao',
      'Data da Validacao',
      'Validador',
      'EAS UID'
    ];

    const linhas = medicoes.map((medicao) => [
      medicao.id,
      medicao.tankId,
      this.escapeCsv(medicao.nomeTanque),
      this.escapeCsv(medicao.status.texto),
      medicao.temperatura,
      medicao.ph,
      medicao.o2,
      medicao.condutividade,
      medicao.turbidez,
      medicao.fosfatos,
      medicao.no2,
      medicao.no3,
      medicao.amonia,
      medicao.dureza,
      this.escapeCsv(medicao.dataHora),
      this.escapeCsv(medicao.dataValidacao || '—'),
      this.escapeCsv(medicao.validator || '—'),
      this.escapeCsv(this.isAttestationValid(medicao.attestationUID) ? medicao.attestationUID : '—')
    ].join(','));

    return '\uFEFF' + [cabecalho.join(','), ...linhas].join('\n');
  }

  private escapeCsv(valor: string | number): string {
    return `"${String(valor ?? '').replace(/"/g, '""')}"`;
  }

  private baixarArquivoCsv(conteudo: string, nomeArquivo: string) {
    const blob = new Blob([conteudo], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = nomeArquivo;
    link.click();
    URL.revokeObjectURL(url);
  }

  getPeriodoCsvLabel(periodo: FiltroPeriodoCsv): string {
    const map: Record<FiltroPeriodoCsv, string> = {
      '24h': 'Últimas 24h',
      '7d': 'Últimos 7 dias',
      '30d': 'Últimos 30 dias',
      all: 'Todo período'
    };
    return map[periodo];
  }

  formatarMedicao(m: any, nomeTanque: string): FormattedMeasurement {
    const statusMap: Record<number, { texto: string; classe: string }> = {
      0: { texto: 'Pendente', classe: 'status-pending' },
      1: { texto: 'Validada', classe: 'status-valid' },
      2: { texto: 'Contestada', classe: 'status-contested' }
    };

    return {
      id: Number(m.id),
      tankId: Number(m.tankId),
      nomeTanque,
      temperatura: (Number(m.temperature) / 100).toFixed(2),
      ph: (Number(m.ph) / 100).toFixed(2),
      o2: (Number(m.dissolvedOxygen) / 100).toFixed(2),
      condutividade: (Number(m.conductivity) / 100).toFixed(0),
      turbidez: (Number(m.turbidity) / 100).toFixed(2),
      fosfatos: (Number(m.phosphates) / 100).toFixed(2),
      no2: (Number(m.no2) / 100).toFixed(2),
      no3: (Number(m.no3) / 100).toFixed(2),
      amonia: (Number(m.ammonia) / 100).toFixed(2),
      dureza: (Number(m.hardness) / 100).toFixed(0),
      status: statusMap[Number(m.status)] || { texto: '?', classe: '' },
      dataHora: new Date(Number(m.timestamp) * 1000).toLocaleString('pt-BR', {
        day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
      }),
      timestampUnix: Number(m.timestamp),
      validator: m.validator || '',
      validatedAtUnix: Number(m.validatedAt || 0),
      dataValidacao: Number(m.validatedAt || 0) > 0
        ? new Date(Number(m.validatedAt) * 1000).toLocaleString('pt-BR', {
            day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
          })
        : '',
      contestReason: m.contestReason || '',
      attestationUID: m.attestationUID || ethers.ZeroHash
    };
  }

  /**
   * Formata medicao vinda do ApiService (já mapeada para camelCase, valores int brutos).
   * Mesma lógica que formatarMedicao mas com dados do indexador.
   */
  formatarMedicaoFromApi(m: any, nomeTanque: string): FormattedMeasurement {
    const statusMap: Record<number, { texto: string; classe: string }> = {
      0: { texto: 'Pendente', classe: 'status-pending' },
      1: { texto: 'Validada', classe: 'status-valid' },
      2: { texto: 'Contestada', classe: 'status-contested' }
    };

    return {
      id: Number(m.id),
      tankId: Number(m.tankId),
      nomeTanque,
      temperatura: (Number(m.temperature) / 100).toFixed(2),
      ph: (Number(m.ph) / 100).toFixed(2),
      o2: (Number(m.dissolvedOxygen) / 100).toFixed(2),
      condutividade: (Number(m.conductivity) / 100).toFixed(0),
      turbidez: (Number(m.turbidity) / 100).toFixed(2),
      fosfatos: (Number(m.phosphates) / 100).toFixed(2),
      no2: (Number(m.no2) / 100).toFixed(2),
      no3: (Number(m.no3) / 100).toFixed(2),
      amonia: (Number(m.ammonia) / 100).toFixed(2),
      dureza: (Number(m.hardness) / 100).toFixed(0),
      status: statusMap[Number(m.status)] || { texto: '?', classe: '' },
      dataHora: new Date(Number(m.timestamp) * 1000).toLocaleString('pt-BR', {
        day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
      }),
      timestampUnix: Number(m.timestamp),
      validator: m.validator || '',
      validatedAtUnix: m.validatedAt
        ? Math.floor(new Date(m.validatedAt).getTime() / 1000)
        : Number(m.validatedAt ?? 0),
      dataValidacao: m.validatedAt
        ? new Date(m.validatedAt).toLocaleString('pt-BR', {
            day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
          })
        : '',
      contestReason: m.contestReason || '',
      attestationUID: m.attestationUID || ethers.ZeroHash
    };
  }

  encurtarEndereco(addr: string): string {
    if (!addr || addr === ethers.ZeroAddress) return '—';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  }

  isAttestationValid(uid: string): boolean {
    return !!uid && uid !== ethers.ZeroHash;
  }

  getStatusTexto(status: number): string {
    const map: Record<number, string> = { 0: 'Pendente', 1: 'Validada', 2: 'Contestada' };
    return map[status] || '?';
  }

  getStatusClasse(status: number): string {
    const map: Record<number, string> = { 0: 'status-pending', 1: 'status-valid', 2: 'status-contested' };
    return map[status] || '';
  }

  getReferenciaParametro(campo: ParametroFormulario): ReferenciaParametro {
    return this.referenciasFormulario[campo];
  }
}
