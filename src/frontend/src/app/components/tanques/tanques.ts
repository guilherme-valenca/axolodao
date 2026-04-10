import { ChangeDetectorRef, Component, OnInit, signal, inject, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LucideAngularModule, Eye, Pencil, Trash2, Droplets, Thermometer, AlertTriangle, Search, Waves, X, Check } from 'lucide-angular';
import { Web3Service } from '../../services/web3';
import { RelayerService } from '../../services/relayer.service';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import Swal from 'sweetalert2';

interface TankDetail {
  id: number;
  name: string;
  location: string;
  registeredBy: string;
  registeredAt: Date;
  active: boolean;
  axolotlCount: number;
  attestationUID: string;
}

interface AxoloteCard {
  id: number;
  name: string;
  img: string;
  especie: string;
}

interface UltimaMedicaoAgua {
  temperatura: string;
  ph: string;
  oxigenioDissolvido: string;
  amonia: string;
  nitritos: string;
  dataHora: string;
  responsavel: string;
  alertasForaPadrao: number;
}

interface RegistroMonitoramentoAgua extends UltimaMedicaoAgua {
  id: number;
  timestampMs: number;
  dataCompleta: string;
  status: number;
  validator?: string;
  attestationUID?: string;
}
type NivelParametro = 'ok' | 'warn' | 'critical';

type FaixaParametro = {
  min: number;
  max: number;
  alvo: number;
};

const CATALOGO_PARAMETROS: Record<string, { temperatura: FaixaParametro; ph: FaixaParametro; amonia: FaixaParametro; nitritos: FaixaParametro }> = {
  'A. andersoni': {
    temperatura: { min: 15, max: 20, alvo: 17.5 },
    ph: { min: 7.0, max: 7.5, alvo: 7.2 },
    amonia: { min: 0, max: 0, alvo: 0 },
    nitritos: { min: 0, max: 0.1, alvo: 0 },
  },
  'A. mexicanum': {
    temperatura: { min: 16, max: 18, alvo: 17 },
    ph: { min: 7.0, max: 7.5, alvo: 7.2 },
    amonia: { min: 0, max: 0, alvo: 0 },
    nitritos: { min: 0, max: 0.1, alvo: 0 },
  },
  'A. dumerilii': {
    temperatura: { min: 15, max: 18, alvo: 16.5 },
    ph: { min: 8.0, max: 8.5, alvo: 8.2 },
    amonia: { min: 0, max: 0, alvo: 0 },
    nitritos: { min: 0, max: 0.1, alvo: 0 },
  },
};

@Component({
  selector: 'app-tanques',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './tanques.html',
  styleUrls: ['./tanques.css'],
})
export class Tanques implements OnInit {
  @Output() axoloteSelecionado = new EventEmitter<{ id: number; nome: string }>();

  tanques: TankDetail[] = [];
  axolotesDoTanque: AxoloteCard[] = [];
  tanqueSelecionadoId = 0;
  termoBuscaAxolote = '';
  readonly carregandoTanques = signal(false);
  readonly carregandoDetalhes = signal(false);
  protected readonly EyeIcon = Eye;
  protected readonly PencilIcon = Pencil;
  protected readonly Trash2Icon = Trash2;
  protected readonly DropletsIcon = Droplets;
  protected readonly ThermometerIcon = Thermometer;
  protected readonly AlertTriangleIcon = AlertTriangle;
  protected readonly SearchIcon = Search;
  protected readonly WavesIcon = Waves;
  protected readonly XIcon = X;
  protected readonly CheckIcon = Check;

  enviandoTx = false;

  ultimaMedicao: UltimaMedicaoAgua | null = null;
  registrosMonitoramento: RegistroMonitoramentoAgua[] = [];
  filtroPeriodo: '24h' | '7d' | '30d' | 'all' = '7d';
  carregandoMedicao = false;
  exportandoCsv = false;

  // Edição inline
  editandoTanqueId: number | null = null;
  editNome = '';
  editLocalizacao = '';

  private web3Service = inject(Web3Service);
  private cdr = inject(ChangeDetectorRef);
  private relayerService = inject(RelayerService);
  public authService = inject(AuthService);
  private apiService = inject(ApiService);
  private route = inject(ActivatedRoute);
  
  fonteDosDados: 'indexador' | 'blockchain' | '' = '';
  private tanqueSolicitadoId: number | null = null;

  async ngOnInit(): Promise<void> {
    this.route.queryParamMap.subscribe((params) => {
      const tankId = Number(params.get('tankId'));
      this.tanqueSolicitadoId = Number.isFinite(tankId) && tankId > 0 ? tankId : null;

      if (
        this.tanqueSolicitadoId &&
        this.tanques.some((tanque) => tanque.id === this.tanqueSolicitadoId) &&
        this.tanqueSelecionadoId !== this.tanqueSolicitadoId
      ) {
        void this.selecionarTanque(this.tanqueSolicitadoId);
      }
    });

    await this.web3Service.checkConnection();

    if (!this.web3Service.contracts?.registry) {
      console.warn('Contrato AxoloRegistry indisponível para consulta de tanques.');
      return;
    }

    await this.carregarTanques();
  }

  async carregarTanques(): Promise<void> {
    this.carregandoTanques.set(true);

    try {
      // Tentar indexador primeiro (rápido)
      if (this.apiService.available) {
        try {
          const apiTanks = await this.apiService.getTanks();
          // apiService já mapeia para camelCase. Precisamos de axolotlCount que o indexador não traz.
          const resultado: TankDetail[] = apiTanks.map((t: any) => ({
            id: t.id,
            name: t.name,
            location: t.location,
            registeredBy: t.registeredBy || '',
            registeredAt: t.registeredAt instanceof Date ? t.registeredAt : new Date(t.registeredAt),
            active: t.active,
            axolotlCount: 0, // será atualizado em background se necessário
            attestationUID: t.attestationUID || '',
          }));
          this.tanques = resultado;
          this.fonteDosDados = 'indexador';

          // Buscar axolotlCount em background via blockchain
          this._enriquecerAxolotlCount(resultado);

          if (this.tanques.length > 0) {
            const tanqueAtualExiste = this.tanques.some((tanque) => tanque.id === this.tanqueSelecionadoId);
            const tanqueInicialId = tanqueAtualExiste
              ? this.tanqueSelecionadoId
              : this.getTanqueInicialId();
              
            await this.selecionarTanque(tanqueInicialId);
          }
          return;
        } catch (apiError) {
          console.warn('Indexador indisponível, usando blockchain:', apiError);
        }
      }

      // Fallback: blockchain (lento mas confiável)
      this.fonteDosDados = 'blockchain';
      const contract = this.web3Service.contracts.registry;
      if (!contract) return;

      const nextId = Number(await contract['nextTankId']());
      const resultado: TankDetail[] = [];

      for (let i = 1; i < nextId; i++) {
        try {
          const t = await contract['getTank'](i);
          const axolotlIds = await contract['getAxolotlsInTank'](i) as bigint[];
          resultado.push({
            id: Number(t.id),
            name: String(t.name),
            location: String(t.location),
            registeredBy: String(t.registeredBy),
            registeredAt: new Date(Number(t.registeredAt) * 1000),
            active: Boolean(t.active),
            axolotlCount: axolotlIds.length,
            attestationUID: String(t.attestationUID),
          });
        } catch {
          // ignora tanques com erro
        }
      }

      this.tanques = resultado;

      if (this.tanques.length === 0) {
        this.tanqueSelecionadoId = 0;
        this.axolotesDoTanque = [];
        this.ultimaMedicao = null;
        this.registrosMonitoramento = [];
        return;
      }

      const tanqueAtualExiste = this.tanques.some((tanque) => tanque.id === this.tanqueSelecionadoId);
      const tanqueInicialId = tanqueAtualExiste
        ? this.tanqueSelecionadoId
        : this.getTanqueInicialId();

      await this.selecionarTanque(tanqueInicialId);
    } catch (error) {
      console.error('Erro ao carregar tanques:', error);
    } finally {
      this.carregandoTanques.set(false);
      this.cdr.detectChanges();
    }
  }

  /** Busca axolotlCount via blockchain em background (não bloqueia UI) */
  private async _enriquecerAxolotlCount(tanques: TankDetail[]): Promise<void> {
    const contract = this.web3Service.contracts.registry;
    if (!contract) return;
    for (const t of tanques) {
      try {
        const ids = await contract['getAxolotlsInTank'](t.id) as bigint[];
        t.axolotlCount = ids.length;
      } catch { /* ignora */ }
    }
    this.cdr.detectChanges();
  }

  async selecionarTanque(id: number): Promise<void> {
    if (!id) {
      return;
    }

    this.tanqueSelecionadoId = id;
    this.carregandoDetalhes.set(true);

    try {
      await Promise.all([
        this.buscarAxolotesDoTanque(id),
        this.buscarMedicoesAgua(id),
      ]);
    } catch (error) {
      console.error('Erro ao selecionar tanque:', error);
    } finally {
      this.carregandoDetalhes.set(false);
      this.cdr.detectChanges();
    }
  }

  async buscarMedicoesAgua(tankId: number): Promise<void> {
    this.carregandoMedicao = true;
    this.ultimaMedicao = null;
    this.registrosMonitoramento = [];

    interface MeasurementContractResponse {
      tankId: bigint;
      temperature: bigint;
      ph: bigint;
      dissolvedOxygen: bigint;
      ammonia: bigint;
      no2: bigint;
      timestamp: bigint;
      recorder: string;
      status?: bigint;
      validator?: string;
      attestationUID?: string;
    }

    try {
      const contract = this.web3Service.contracts.monitoring;
      if (!contract) return;

      const total = Number(await contract['nextMeasurementId']());
      const registros: RegistroMonitoramentoAgua[] = [];

      for (let i = total - 1; i >= 1; i--) {
        const m = (await contract['getMeasurement'](i)) as MeasurementContractResponse;

        if (Number(m.tankId) === tankId) {
          const temperatura = Number(m.temperature) / 100;
          const ph = Number(m.ph) / 100;
          const amonia = Number(m.ammonia) / 100;
          const nitritos = Number(m.no2) / 100;
          const timestampMs = Number(m.timestamp) * 1000;

          registros.push({
            id: i,
            temperatura: temperatura.toFixed(1),
            ph: ph.toFixed(1),
            oxigenioDissolvido: (Number(m.dissolvedOxygen) / 100).toFixed(1),
            amonia: amonia.toFixed(2),
            nitritos: nitritos.toFixed(2),
            dataHora: new Date(timestampMs).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
            dataCompleta: new Date(timestampMs).toLocaleString([], {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            }),
            timestampMs,
            responsavel: this.encurtarEndereco(String(m.recorder)),
            alertasForaPadrao: this.calcularAlertasForaPadrao(temperatura, ph, amonia, nitritos),
            status: Number(m.status ?? 0),
            validator: String(m.validator ?? ''),
            attestationUID: String(m.attestationUID ?? ''),
          });
        }
      }

      this.registrosMonitoramento = registros.sort((a, b) => b.timestampMs - a.timestampMs);

      if (this.registrosMonitoramento.length > 0) {
        const recente = this.registrosMonitoramento[0];
        this.ultimaMedicao = {
          temperatura: recente.temperatura,
          ph: recente.ph,
          oxigenioDissolvido: recente.oxigenioDissolvido,
          amonia: recente.amonia,
          nitritos: recente.nitritos,
          dataHora: recente.dataHora,
          responsavel: recente.responsavel,
          alertasForaPadrao: recente.alertasForaPadrao,
        };
      }
    } catch (error) {
      console.error('Erro ao buscar medição da água:', error);
    } finally {
      this.carregandoMedicao = false;
      this.cdr.detectChanges();
    }
  }

  async buscarAxolotesDoTanque(tankId: number): Promise<void> {
    try {
      const contract = this.web3Service.contracts.registry;
      if (!contract) return;

      const ids = (await contract['getAxolotlsInTank'](tankId)) as bigint[];

      interface AxolotlContractResponse {
        id: bigint;
        name: string;
        active: boolean;
      }

      const promessasAxolotes: Promise<AxolotlContractResponse>[] = [];
      for (const axId of ids) {
        promessasAxolotes.push(contract['getAxolotl'](axId) as Promise<AxolotlContractResponse>);
      }

      const resultadosAxolotes = await Promise.all(promessasAxolotes);

      this.axolotesDoTanque = resultadosAxolotes
        .filter((axolote) => Boolean(axolote.active))
        .map((axolote) => ({
          id: Number(axolote.id),
          name: String(axolote.name),
          img: '/assets/axolotes-loginPage.png',
          especie: String((axolote as { species?: unknown }).species ?? 'A. mexicanum'),
        }));

      this.cdr.detectChanges();
    } catch (error) {
      console.error('Erro ao buscar axolotes da barra lateral:', error);
    }
  }

  get axolotesFiltrados(): AxoloteCard[] {
    return this.axolotesDoTanque.filter((ax) =>
      ax.name.toLowerCase().includes(this.termoBuscaAxolote.toLowerCase()),
    );
  }

  get registrosMonitoramentoFiltrados(): RegistroMonitoramentoAgua[] {
    if (this.filtroPeriodo === 'all') {
      return this.registrosMonitoramento;
    }

    const agora = Date.now();
    const janelaMs =
      this.filtroPeriodo === '24h'
        ? 24 * 60 * 60 * 1000
        : this.filtroPeriodo === '7d'
          ? 7 * 24 * 60 * 60 * 1000
          : 30 * 24 * 60 * 60 * 1000;

    const limite = agora - janelaMs;
    return this.registrosMonitoramento.filter((registro) => registro.timestampMs >= limite);
  }

  private getTanqueInicialId(): number {
    if (this.tanqueSolicitadoId && this.tanques.some((tanque) => tanque.id === this.tanqueSolicitadoId)) {
      return this.tanqueSolicitadoId;
    }

    return this.tanques[0].id;
  }

  async exportarCsvMonitoramentosValidados(): Promise<void> {
    if (!this.tanqueSelecionadoId) return;

    this.exportandoCsv = true;
    try {
      const registros = this.registrosMonitoramentoFiltrados.filter((registro) => registro.status === 1);
      if (registros.length === 0) {
        Swal.fire('Sem dados', 'Não há monitoramentos validados nesse período para o tanque selecionado.', 'info');
        return;
      }

      const tanque = this.tanques.find((item) => item.id === this.tanqueSelecionadoId);
      const nomeTanque = tanque?.name ?? `Tanque-${this.tanqueSelecionadoId}`;
      const periodo = this.getPeriodoLabel(this.filtroPeriodo).toLowerCase().replace(/\s+/g, '-');
      const dataArquivo = new Date().toISOString().slice(0, 10);
      const csv = this.gerarCsvMonitoramentos(registros, nomeTanque);
      this.baixarArquivoCsv(csv, `tanque-${this.tanqueSelecionadoId}-${periodo}-${dataArquivo}.csv`);
      Swal.fire('CSV gerado', `${registros.length} monitoramentos validados exportados.`, 'success');
    } catch (error: any) {
      Swal.fire('Erro', error.message || 'Falha ao exportar CSV.', 'error');
    } finally {
      this.exportandoCsv = false;
    }
  }

  abrirPaginaAxolotes(axolote: AxoloteCard): void {
    this.axoloteSelecionado.emit({ id: axolote.id, nome: axolote.name });
  }

  // ─── Ações de escrita (via relayer) ──────────────────────────────────────

  async atualizarTanque(): Promise<void> {
    if (this.editandoTanqueId === null || !this.editNome || !this.editLocalizacao) return;

    this.enviandoTx = true;
    try {
      const contract = this.web3Service.contracts.registry;
      if (!contract) return;

      Swal.fire({ title: 'Atualizando...', text: 'Assine a mensagem e aguarde.', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

      await this.relayerService.relayWrite(contract, 'updateTank', [
        BigInt(this.editandoTanqueId), this.editNome, this.editLocalizacao,
      ]);

      this.editandoTanqueId = null;
      Swal.fire('Sucesso!', 'Tanque atualizado.', 'success');
      await this.carregarTanques();
    } catch (error: any) {
      Swal.fire('Erro', error.message || 'Falha ao atualizar tanque.', 'error');
    } finally {
      this.enviandoTx = false;
    }
  }

  async desativarTanque(tankId: number): Promise<void> {
    const resultado = await Swal.fire({
      title: 'Desativar tanque?',
      text: 'Esta ação desativa o tanque. Tanques com axolotes ativos não podem ser desativados.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#E74C3C',
      confirmButtonText: 'Desativar',
      cancelButtonText: 'Cancelar',
    });

    if (!resultado.isConfirmed) return;

    this.enviandoTx = true;
    try {
      const contract = this.web3Service.contracts.registry;
      if (!contract) return;

      Swal.fire({ title: 'Desativando...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

      await this.relayerService.relayWrite(contract, 'deactivateTank', [BigInt(tankId)]);

      Swal.fire('Sucesso!', 'Tanque desativado.', 'success');
      await this.carregarTanques();
    } catch (error: any) {
      Swal.fire('Erro', error.message || 'Falha ao desativar tanque.', 'error');
    } finally {
      this.enviandoTx = false;
    }
  }

  iniciarEdicao(tanque: TankDetail): void {
    this.editandoTanqueId = tanque.id;
    this.editNome = tanque.name;
    this.editLocalizacao = tanque.location;
  }

  cancelarEdicao(): void {
    this.editandoTanqueId = null;
  }

  encurtarEndereco(endereco: string): string {
    if (!endereco || endereco.length < 10) return endereco;
    return `${endereco.slice(0, 6)}...${endereco.slice(-4)}`;
  }

  isAttestationValid(uid: string): boolean {
    return !!uid && uid !== '0x0000000000000000000000000000000000000000000000000000000000000000';
  }

  async exportarPDF() {
    Swal.fire('Aviso', 'Exportação PDF será implementada em fase posterior.', 'info');
  }

  get qualidadeAguaLabel(): string {
    if (!this.ultimaMedicao) return 'Sem dados';
    const niveis: NivelParametro[] = [
      this.getNivelParametro('temperatura'),
      this.getNivelParametro('ph'),
      this.getNivelParametro('amonia'),
      this.getNivelParametro('nitritos'),
    ];
    if (niveis.includes('critical')) return 'Crítico';
    if (niveis.includes('warn')) return 'Moderado';
    return 'Estável';
  }

  get temperaturaLabel(): string {
    if (!this.ultimaMedicao) return 'Sem dados';
    return this.getNivelParametro('temperatura') === 'ok' ? 'Estável' : 'Oscilando';
  }

  private calcularAlertasForaPadrao(temp: number, ph: number, amonia: number, nitritos: number): number {
    const limites = this.getLimitesEspecie();
    const niveis = [
      this.classificarValorParametro(temp, limites.temperatura),
      this.classificarValorParametro(ph, limites.ph),
      this.classificarValorParametro(amonia, limites.amonia),
      this.classificarValorParametro(nitritos, limites.nitritos),
    ];
    return niveis.filter((nivel) => nivel !== 'ok').length;
  }

  getBadgeClasseParametro(parametro: 'temperatura' | 'ph' | 'amonia' | 'nitritos'): 'badge-green' | 'badge-yellow' | 'badge-red' {
    const nivel = this.getNivelParametro(parametro);
    if (nivel === 'critical') return 'badge-red';
    if (nivel === 'warn') return 'badge-yellow';
    return 'badge-green';
  }

  getBadgeTextoParametro(parametro: 'temperatura' | 'ph' | 'amonia' | 'nitritos'): string {
    const nivel = this.getNivelParametro(parametro);
    if (nivel === 'critical') return 'Crítico';
    if (nivel === 'warn') return 'Atenção';
    return parametro === 'ph' ? 'Ideal' : 'Estável';
  }

  getBadgeFaixaParametro(parametro: 'temperatura' | 'ph' | 'amonia' | 'nitritos'): string {
    const faixa = this.getLimitesEspecie()[parametro];
    if (parametro === 'temperatura') {
      return `${faixa.min} °C - ${faixa.max} °C`;
    }
    return `${faixa.min} - ${faixa.max}`;
  }

  getFaixaEsperadaTabela(parametro: 'temperatura' | 'ph' | 'amonia' | 'nitritos' | 'oxigenio'): string {
    if (parametro === 'oxigenio') return '>= 6.5 mg/L';
    return this.getBadgeFaixaParametro(parametro);
  }

  private getNivelParametro(parametro: 'temperatura' | 'ph' | 'amonia' | 'nitritos'): NivelParametro {
    if (!this.ultimaMedicao) return 'ok';
    const valor = Number(this.ultimaMedicao[parametro]);
    return this.classificarValorParametro(valor, this.getLimitesEspecie()[parametro]);
  }

  private getLimitesEspecie(): { temperatura: FaixaParametro; ph: FaixaParametro; amonia: FaixaParametro; nitritos: FaixaParametro } {
    const especie = this.getEspecieReferenciaTanque();
    return CATALOGO_PARAMETROS[especie] ?? CATALOGO_PARAMETROS['A. mexicanum'];
  }

  private getEspecieReferenciaTanque(): string {
    if (this.axolotesDoTanque.length === 0) return 'A. mexicanum';

    const contagem = new Map<string, number>();
    for (const axolote of this.axolotesDoTanque) {
      const especie = axolote.especie || 'A. mexicanum';
      contagem.set(especie, (contagem.get(especie) ?? 0) + 1);
    }

    let especieMaisComum = 'A. mexicanum';
    let maiorContagem = 0;
    for (const [especie, qtd] of contagem.entries()) {
      if (qtd > maiorContagem) {
        maiorContagem = qtd;
        especieMaisComum = especie;
      }
    }

    return especieMaisComum;
  }

  private classificarValorParametro(valor: number, faixa: FaixaParametro): NivelParametro {
    if (valor >= faixa.min && valor <= faixa.max) return 'ok';

    const amplitude = faixa.max - faixa.min;
    if (amplitude <= 0) {
      const folga = Math.max(0.05, faixa.max * 0.5);
      const distancia = Math.abs(valor - faixa.max);
      return distancia <= folga ? 'warn' : 'critical';
    }

    const limiteWarnInferior = faixa.min - amplitude * 0.35;
    const limiteWarnSuperior = faixa.max + amplitude * 0.35;
    if (valor >= limiteWarnInferior && valor <= limiteWarnSuperior) return 'warn';

    return 'critical';
  }

  getPeriodoLabel(periodo: '24h' | '7d' | '30d' | 'all'): string {
    const labels = {
      '24h': 'Últimas 24h',
      '7d': 'Últimos 7 dias',
      '30d': 'Últimos 30 dias',
      all: 'Todo período',
    };
    return labels[periodo];
  }

  private gerarCsvMonitoramentos(registros: RegistroMonitoramentoAgua[], nomeTanque: string): string {
    const cabecalho = [
      'Tanque',
      'Medicao ID',
      'Data',
      'Temperatura (C)',
      'pH',
      'O2 Dissolvido (mg/L)',
      'NH3 (mg/L)',
      'NO2 (mg/L)',
      'Alertas',
      'Responsavel',
      'Validador',
      'EAS UID',
    ];

    const linhas = registros.map((registro) => [
      this.escapeCsv(nomeTanque),
      registro.id,
      this.escapeCsv(registro.dataCompleta),
      registro.temperatura,
      registro.ph,
      registro.oxigenioDissolvido,
      registro.amonia,
      registro.nitritos,
      registro.alertasForaPadrao,
      this.escapeCsv(registro.responsavel),
      this.escapeCsv(registro.validator || '—'),
      this.escapeCsv(registro.attestationUID || '—'),
    ].join(','));

    return '\uFEFF' + [cabecalho.join(','), ...linhas].join('\n');
  }

  private escapeCsv(valor: string | number): string {
    return `"${String(valor ?? '').replace(/"/g, '""')}"`;
  }

  private baixarArquivoCsv(conteudo: string, nomeArquivo: string): void {
    const blob = new Blob([conteudo], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = nomeArquivo;
    link.click();
    URL.revokeObjectURL(url);
  }
}