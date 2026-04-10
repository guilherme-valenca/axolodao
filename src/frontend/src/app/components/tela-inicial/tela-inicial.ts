import { Component, OnInit, ChangeDetectorRef, DestroyRef, inject, HostListener } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ethers } from 'ethers';
import { Tanques } from '../tanques/tanques';
import { Axolotes } from '../axolotes/axolotes';
import { Web3Service } from '../../services/web3';
import { AuthService } from '../../services/auth.service';
import { RelayerService } from '../../services/relayer.service';
import { ApiService } from '../../services/api.service';
import { Monitoramento } from '../monitoramento/monitoramento';
import { CadastroAxolote } from '../cadastro-axolote/cadastro-axolote';
import { CadastroTanque } from '../cadastro-tanque/cadastro-tanque';
import { AdminDiagnostico } from '../admin-diagnostico/admin-diagnostico';
import { RegistroMembro } from '../registro-membro/registro-membro';
import { LucideAngularModule, Search, Bell, Settings, Clock, Waves, Microscope, X, Check, AlertTriangle } from 'lucide-angular';

export interface Tank {
  id: number;
  name: string;
  location: string;
}

export interface HomeAxolote {
  id: number;
  nome: string;
  especie: string;
  tanque: number;
  imagem: string;
}

export interface RecentMeasurement {
  id: number;
  tankId: number;
  nomeTanque: string;
  temperatura: string;
  ph: string;
  oxigenioDissolvido: string;
  amonia: string;
  nitritos: string;
  dataFormatada: string;
  responsavel: string;
  status: number;
  statusTexto: string;
  statusClasse: string;
}

export interface PendingMeasurement {
  id: number;
  tankId: number;
  nomeTanque: string;
  recorder: unknown;
  temperatura: string;
  ph: string;
  oxigenioDissolvido: string;
  condutividade: string;
  turbidez: string;
  fosfatos: string;
  no3: string;
  no2: string;
  amonia: string;
  dureza: string;
  dataFormatada: string;
  status: number;
}

type InstituicaoAdmin = {
  label: string;
  role: string;
  node: string;
  ativa: boolean;
  gerente: string;
};

type HomeFiltro = 'ultimo-acesso' | 'axolotes' | 'tanques';

type HomeAlerta = {
  nivel: 'red' | 'yellow' | 'green';
  titulo: string;
  texto: string;
  tanque: string;
};

type NivelParametroHome = 'ok' | 'warn' | 'critical';
type FaixaParametroHome = { min: number; max: number; alvo: number };

const CATALOGO_PARAMETROS_HOME: Record<string, { temperatura: FaixaParametroHome; ph: FaixaParametroHome; amonia: FaixaParametroHome; nitritos: FaixaParametroHome }> = {
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
  selector: 'app-tela-inicial',
  standalone: true,
  imports: [CommonModule, FormsModule, Tanques, Axolotes, Monitoramento, CadastroAxolote, CadastroTanque, AdminDiagnostico, RegistroMembro, LucideAngularModule],
  templateUrl: './tela-inicial.html',
  styleUrls: ['./tela-inicial.css'],
})
export class TelaInicial implements OnInit {
  readonly SearchIcon = Search;
  readonly BellIcon = Bell;
  readonly SettingsIcon = Settings;
  readonly ClockIcon = Clock;
  readonly WavesIcon = Waves;
  readonly MicroscopeIcon = Microscope;
  readonly XIcon = X;
  readonly CheckIcon = Check;
  readonly AlertTriangleIcon = AlertTriangle;

  private readonly transparentFallback =
    'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

  cargoUsuario: 'operador' | 'auditor' | 'admin' | 'gerente' | 'nenhum' = 'nenhum';

  menuAtivoLateral = 'home';
  tituloPagina = 'Home';
  subtituloPagina = 'Bem-vindo ao painel de gestao';

  tanquesRegistrados: Tank[] = [];
  axolotesExibicao: HomeAxolote[] = [];
  carregandoTanques = true;
  carregandoMedicoes = true;
  filtroHome: HomeFiltro = 'ultimo-acesso';

  medicoesRecentes: RecentMeasurement[] = [];
  historicoMonitoramento: RecentMeasurement[] = [];
  historicoAlertas: HomeAlerta[] = [];
  ultimaMedicaoPorTanque = new Map<number, RecentMeasurement>();

  medicoesPendentes: PendingMeasurement[] = [];
  medicoesProcessadas: PendingMeasurement[] = [];
  medicaoSelecionada: PendingMeasurement | null = null;
  axolotePreferidoId: number | null = null;
  axolotePreferidoNome: string | null = null;
  notificacoesAbertas = false;

  // ── Admin: Adicionar Instituição ──
  novaInstLabel = '';
  novaInstRole = 'caretaker';
  novaInstGerente = '';
  novaInstNodePreview = '';
  adminInstLog = '';
  adminInstCarregando = false;

  // ── Admin: Desativar Instituição ──
  desativarInstLabel = '';
  desativarInstNodePreview = '';
  adminDesativarLog = '';
  adminDesativarCarregando = false;

  // ── Admin: Consultar Instituição ──
  consultarInstLabel = '';
  consultarResultado: { role: string; label: string; ativa: boolean; gerente: string; parentNode: string } | null = null;

  // ── Admin: Verificar Roles ──
  verificarRolesEndereco = '';
  verificarRolesResultado: { isAdmin: boolean; isCaretaker: boolean; isAuditor: boolean; ensName: string } | null = null;

  // ── Admin: Lista de instituições ──
  instituicoesLista: InstituicaoAdmin[] = [];

  private web3Service = inject(Web3Service);
  public authService = inject(AuthService);
  private relayerService = inject(RelayerService);
  private apiService = inject(ApiService);
  fonteDosDados: 'indexador' | 'blockchain' | '' = '';
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  private carrosselArrasteAtivo = false;
  private carrosselArrasteX = 0;
  private carrosselScrollInicial = 0;
  private carrosselElemento: HTMLElement | null = null;

  async ngOnInit(): Promise<void> {
    if (!this.web3Service.address) {
      await this.web3Service.checkConnection();
    }

    // Se roles ainda não detectadas (acesso direto via URL), detecta agora
    if (this.authService.role === 'none') {
      await this.authService.detectRoles();
    }
    this.carregarPermissoes();

    // Ler query param ?menu= para navegação via sidebar
    this.route.queryParams.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((params) => {
      if (params['menu'] && params['menu'] !== this.menuAtivoLateral) {
        this.menuAtivoLateral = params['menu'];
        this.cdr.detectChanges();
      }
    });

    if (this.cargoUsuario === 'admin') {
      await this.carregarInstituicoes();
    }

    await this.carregarDadosHome();
    await this.carregarMedicoesPendentes();
  }


  @HostListener('document:click')
  onDocumentoClick(): void {
    if (!this.notificacoesAbertas) return;
    this.notificacoesAbertas = false;
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.notificacoesAbertas = false;
  }

  toggleNotificacoes(event: Event): void {
    event.stopPropagation();
    this.notificacoesAbertas = !this.notificacoesAbertas;
  }

  onClickPainelNotificacoes(event: Event): void {
    event.stopPropagation();
  }

  get notificacoesResumo(): HomeAlerta[] {
    return this.historicoAlertas.slice(0, 8);
  }

  get notificacoesNaoLidas(): number {
    return this.historicoAlertas.filter((item) => item.nivel !== 'green').length;
  }

  get instituicoesAtivas(): InstituicaoAdmin[] {
    return this.instituicoesLista.filter((inst) => inst.ativa);
  }

  get instituicoesHistorico(): InstituicaoAdmin[] {
    return this.instituicoesLista.filter((inst) => !inst.ativa);
  }

  get tanquesExibicao(): number[] {
    return this.tanquesRegistrados.map((tanque) => tanque.id);
  }

  setFiltroHome(filtro: HomeFiltro): void {
    this.filtroHome = filtro;
  }

  getAxolotesPorTanque(tanqueId: number): HomeAxolote[] {
    return this.axolotesExibicao.filter((axolote) => axolote.tanque === tanqueId);
  }

  getContagemAxolotesPorTanque(tanqueId: number): number {
    return this.getAxolotesPorTanque(tanqueId).length;
  }

  getImagemAxolote(nomeArquivo: string): string {
    return `/assets/${nomeArquivo}`;
  }

  getResumoTanque(tanqueId: number): string {
    const medicao = this.ultimaMedicaoPorTanque.get(tanqueId);
    if (!medicao) return '--.-°C  pH --.-';
    return `${medicao.temperatura}°C  pH ${medicao.ph}`;
  }

  getResumoDetalhadoTanque(tanqueId: number): string {
    const medicao = this.ultimaMedicaoPorTanque.get(tanqueId);
    if (!medicao) {
      return 'Sem medicao registrada para este tanque';
    }

    return `Temperatura ${medicao.temperatura}°C • pH ${medicao.ph} • Oxigenio ${medicao.oxigenioDissolvido} mg/L`;
  }

  getNivelAlertaTanque(tanqueId: number): string {
    const medicao = this.ultimaMedicaoPorTanque.get(tanqueId);
    if (!medicao) return 'Sem dados';

    const alerta = this.classificarAlertaMedicao(medicao);
    if (alerta.nivel === 'red') return 'Critico';
    if (alerta.nivel === 'yellow') return 'Moderado';
    return 'Estavel';
  }

  getAlertasForaDoPadrao(tanqueId: number): number {
    const medicao = this.ultimaMedicaoPorTanque.get(tanqueId);
    if (!medicao) return 0;

    const niveis = this.getNiveisMedicaoTanque(tanqueId, medicao);
    return niveis.filter((nivel) => nivel !== 'ok').length;
  }

  abrirPaginaAxolotes(nomeAxolote: string): void {
    const nome = nomeAxolote?.trim();
    if (!nome) return;
    this.axolotePreferidoId = null;
    this.axolotePreferidoNome = nome;
    this.router.navigate(['/axolotes'], { queryParams: { nome } });
  }

  abrirAxolotePeloTanque(evento: { id: number; nome: string }): void {
    this.axolotePreferidoId = evento.id;
    this.axolotePreferidoNome = evento.nome;
    this.router.navigate(['/axolotes'], { queryParams: { id: evento.id } });
  }

  onAxoloteImgError(event: Event): void {
    const target = event.target as HTMLImageElement | null;
    if (!target || target.dataset['fallbackApplied'] === '1') return;

    target.dataset['fallbackApplied'] = '1';
    target.onerror = null;
    target.src = this.transparentFallback;
  }

  rolarTanques(container: HTMLElement, direcao: 'left' | 'right'): void {
    if (!container) return;
    const deslocamento = Math.max(container.clientWidth * 0.92, 280);
    const left = direcao === 'right' ? deslocamento : -deslocamento;
    container.scrollBy({ left, behavior: 'smooth' });
  }

  iniciarArrasteCarrossel(event: MouseEvent): void {
    if (event.button !== 0) return;

    const container = event.currentTarget as HTMLElement | null;
    if (!container) return;

    this.carrosselArrasteAtivo = true;
    this.carrosselElemento = container;
    this.carrosselArrasteX = event.clientX;
    this.carrosselScrollInicial = container.scrollLeft;
    container.classList.add('dragging');
    event.preventDefault();
  }

  moverArrasteCarrossel(event: MouseEvent): void {
    if (!this.carrosselArrasteAtivo || !this.carrosselElemento) return;

    const delta = event.clientX - this.carrosselArrasteX;
    this.carrosselElemento.scrollLeft = this.carrosselScrollInicial - delta;
  }

  finalizarArrasteCarrossel(): void {
    if (!this.carrosselElemento) return;

    this.carrosselElemento.classList.remove('dragging');
    this.carrosselArrasteAtivo = false;
    this.carrosselElemento = null;
  }

  carregarPermissoes(): void {
    // Usa roles já detectadas pelo app.ts (evita RPC duplicada)
    const role = this.authService.role;
    if (role === 'admin') this.cargoUsuario = 'admin';
    else if (role === 'gerente') this.cargoUsuario = 'gerente';
    else if (role === 'caretaker') this.cargoUsuario = 'operador';
    else if (role === 'auditor') this.cargoUsuario = 'auditor';
    else this.cargoUsuario = 'nenhum';
    this.cdr.detectChanges();
  }

  navegarMenuLateral(menu: string, event?: Event | string): void {
    if (event && typeof event !== 'string' && (event as Event).preventDefault) {
      (event as Event).preventDefault();
    }

    const rotasInternas = ['home', 'tanques', 'axolotes', 'monitoramento', 'cadastro-axolote', 'cadastro-tanque', 'validacao', 'diagnostico', 'verificar-roles', 'instituicoes', 'registro-membro'];

    if (rotasInternas.includes(menu)) {
      this.menuAtivoLateral = menu;
      return;
    }

    const rotas: Record<string, string> = {
      home: '/tela-inicial',
    };

    const destino = rotas[menu];
    if (destino && this.router.url !== destino) {
      this.router.navigate([destino]);
      return;
    }

    this.menuAtivoLateral = menu;
  }

  async carregarDadosHome(): Promise<void> {
    await this.carregarTanques();
    await Promise.all([this.carregarAxolotes(), this.carregarUltimasMedicoes()]);
  }

  async carregarTanques(): Promise<void> {
    this.carregandoTanques = true;
    try {
      // Tentar indexador primeiro
      if (this.apiService.available) {
        try {
          const apiTanks = await this.apiService.getTanks({ active: true });
          this.tanquesRegistrados = apiTanks.map((t: any) => ({
            id: t.id,
            name: t.name,
            location: t.location,
          }));
          this.fonteDosDados = 'indexador';
          this.cdr.detectChanges();
          return;
        } catch {
          console.warn('Indexador indisponível para tanques Home, usando blockchain');
        }
      }

      // Fallback: blockchain
      this.fonteDosDados = 'blockchain';
      this.tanquesRegistrados = await this.web3Service.buscarTanquesAtivos();
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Erro ao carregar tanques na Home:', error);
    } finally {
      this.carregandoTanques = false;
    }
  }

  async carregarAxolotes(): Promise<void> {
    try {
      // Tentar indexador primeiro
      if (this.apiService.available) {
        try {
          const apiAxolotls = await this.apiService.getAxolotls({ active: true });
          this.axolotesExibicao = apiAxolotls.map((ax: any) => ({
            id: ax.id,
            nome: ax.name,
            especie: ax.species || '',
            tanque: ax.tankId,
            imagem: this.getImagemPadraoAxolote(ax.id),
          }));
          this.cdr.detectChanges();
          return;
        } catch {
          console.warn('Indexador indisponível para axolotes Home, usando blockchain');
        }
      }

      // Fallback: blockchain
      const contract = this.web3Service.contracts.registry;
      if (!contract) return;

      const nextId = Number(await contract['nextAxolotlId']());
      const resultados: HomeAxolote[] = [];

      for (let i = 1; i < nextId; i++) {
        const ax = await contract['getAxolotl'](i);
        if (!ax?.active) continue;

        resultados.push({
          id: Number(ax.id),
          nome: String(ax.name),
          especie: String(ax.species),
          tanque: Number(ax.tankId),
          imagem: this.getImagemPadraoAxolote(Number(ax.id)),
        });
      }

      this.axolotesExibicao = resultados;
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Erro ao carregar axolotes na Home:', error);
    }
  }

  async carregarUltimasMedicoes(): Promise<void> {
    this.carregandoMedicoes = true;

    try {
      // Tentar indexador primeiro
      if (this.apiService.available) {
        try {
          const apiMeds = await this.apiService.getMeasurements();
          const itens: RecentMeasurement[] = apiMeds.slice(0, 30).map((m: any) => {
            const medicao: RecentMeasurement = {
              id: m.id,
              tankId: m.tankId,
              nomeTanque: this.getNomeTanque(m.tankId),
              temperatura: (Number(m.temperature) / 100).toFixed(1),
              ph: (Number(m.ph) / 100).toFixed(1),
              oxigenioDissolvido: (Number(m.dissolvedOxygen) / 100).toFixed(1),
              amonia: (Number(m.ammonia) / 100).toFixed(2),
              nitritos: (Number(m.no2) / 100).toFixed(2),
              dataFormatada: new Date(Number(m.timestamp) * 1000).toLocaleString('pt-BR', {
                day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit',
              }),
              responsavel: this.encurtarEndereco(String(m.recorder)),
              status: Number(m.status),
              statusTexto: this.getStatusTexto(Number(m.status)),
              statusClasse: this.getStatusClasse(Number(m.status)),
            };
            return medicao;
          });

          this.medicoesRecentes = itens;
          this.historicoMonitoramento = itens;
          this.historicoAlertas = this.gerarAlertas(itens);

          this.ultimaMedicaoPorTanque.clear();
          for (const medicao of itens) {
            if (!this.ultimaMedicaoPorTanque.has(medicao.tankId)) {
              this.ultimaMedicaoPorTanque.set(medicao.tankId, medicao);
            }
          }
          return;
        } catch {
          console.warn('Indexador indisponível para medições Home, usando blockchain');
        }
      }

      // Fallback: blockchain
      const contract = this.web3Service.contracts.monitoring;
      if (!contract) return;

      const nextId = Number(await contract['nextMeasurementId']());
      const itens: RecentMeasurement[] = [];
      this.ultimaMedicaoPorTanque.clear();

      for (let i = nextId - 1; i >= 1; i--) {
        const m = await contract['getMeasurement'](i);

        const medicao: RecentMeasurement = {
          id: Number(m['id']),
          tankId: Number(m['tankId']),
          nomeTanque: this.getNomeTanque(Number(m['tankId'])),
          temperatura: (Number(m['temperature']) / 100).toFixed(1),
          ph: (Number(m['ph']) / 100).toFixed(1),
          oxigenioDissolvido: (Number(m['dissolvedOxygen']) / 100).toFixed(1),
          amonia: (Number(m['ammonia']) / 100).toFixed(2),
          nitritos: (Number(m['no2']) / 100).toFixed(2),
          dataFormatada: new Date(Number(m['timestamp']) * 1000).toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          }),
          responsavel: this.encurtarEndereco(String(m['recorder'])),
          status: Number(m['status']),
          statusTexto: this.getStatusTexto(Number(m['status'])),
          statusClasse: this.getStatusClasse(Number(m['status'])),
        };

        itens.push(medicao);

        if (!this.ultimaMedicaoPorTanque.has(medicao.tankId)) {
          this.ultimaMedicaoPorTanque.set(medicao.tankId, medicao);
        }

        if (itens.length >= 30) break;
      }

      this.medicoesRecentes = itens;
      this.historicoMonitoramento = itens;
      this.historicoAlertas = this.gerarAlertas(itens);
    } catch (error) {
      console.error('Erro ao carregar historico:', error);
    } finally {
      this.carregandoMedicoes = false;
      this.cdr.detectChanges();
    }
  }

  async carregarMedicoesPendentes(): Promise<void> {
    try {
      // Tentar indexador primeiro
      if (this.apiService.available) {
        try {
          const [apiPending, apiProcessed] = await Promise.all([
            this.apiService.getPendingMeasurements(),
            this.apiService.getMeasurements({ status: 'validated' }),
          ]);

          const mapMed = (m: any): PendingMeasurement => ({
            id: m.id,
            tankId: m.tankId,
            nomeTanque: this.getNomeTanque(m.tankId),
            recorder: m.recorder,
            temperatura: (Number(m.temperature) / 100).toFixed(1),
            ph: (Number(m.ph) / 100).toFixed(1),
            oxigenioDissolvido: (Number(m.dissolvedOxygen) / 100).toFixed(1),
            condutividade: (Number(m.conductivity) / 100).toFixed(0),
            turbidez: (Number(m.turbidity) / 100).toFixed(1),
            fosfatos: (Number(m.phosphates) / 100).toFixed(2),
            no3: (Number(m.no3) / 100).toFixed(1),
            no2: (Number(m.no2) / 100).toFixed(2),
            amonia: (Number(m.ammonia) / 100).toFixed(2),
            dureza: (Number(m.hardness) / 100).toFixed(0),
            dataFormatada: new Date(Number(m.timestamp) * 1000).toLocaleString('pt-BR', {
              day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit',
            }),
            status: Number(m.status),
          });

          this.medicoesPendentes = apiPending.map(mapMed);
          this.medicoesProcessadas = apiProcessed.map(mapMed);
          this.cdr.detectChanges();
          return;
        } catch {
          console.warn('Indexador indisponível para pendentes, usando blockchain');
        }
      }

      // Fallback: blockchain
      const monContract = this.web3Service.contracts.monitoring;
      const regContract = this.web3Service.contracts.registry;
      if (!monContract || !regContract) return;

      const totalMedicoes = Number(await monContract['nextMeasurementId']());
      const pendentesTemp: PendingMeasurement[] = [];
      const processadasTemp: PendingMeasurement[] = [];

      for (let i = totalMedicoes - 1; i >= 1; i--) {
        const m = await monContract['getMeasurement'](i);
        const tId = Number(m['tankId']);

        let nomeTanque = `Tanque #${tId}`;
        try {
          const t = await regContract['getTank'](tId);
          nomeTanque = t['name'];
        } catch {
          // ignore
        }

        const medFormatada: PendingMeasurement = {
          id: Number(m['id']),
          tankId: tId,
          nomeTanque,
          recorder: m['recorder'],
          temperatura: (Number(m['temperature']) / 100).toFixed(1),
          ph: (Number(m['ph']) / 100).toFixed(1),
          oxigenioDissolvido: (Number(m['dissolvedOxygen']) / 100).toFixed(1),
          condutividade: (Number(m['conductivity']) / 100).toFixed(0),
          turbidez: (Number(m['turbidity']) / 100).toFixed(1),
          fosfatos: (Number(m['phosphates']) / 100).toFixed(2),
          no3: (Number(m['no3']) / 100).toFixed(1),
          no2: (Number(m['no2']) / 100).toFixed(2),
          amonia: (Number(m['ammonia']) / 100).toFixed(2),
          dureza: (Number(m['hardness']) / 100).toFixed(0),
          dataFormatada: new Date(Number(m['timestamp']) * 1000).toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          }),
          status: Number(m['status']),
        };

        if (medFormatada.status === 0) {
          pendentesTemp.push(medFormatada);
        } else {
          processadasTemp.push(medFormatada);
        }
      }

      this.medicoesPendentes = pendentesTemp;
      this.medicoesProcessadas = processadasTemp;
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Erro ao carregar auditoria:', error);
    }
  }

  abrirAuditoria(med: PendingMeasurement): void {
    this.medicaoSelecionada = med;
    this.menuAtivoLateral = 'monitoramento';
  }

  voltarDaAuditoria(): void {
    this.medicaoSelecionada = null;
    this.menuAtivoLateral = 'home';
    void this.carregarMedicoesPendentes();
  }

  getBadgeClasse(status: number): 'badge-rejected' | 'badge-accepted' | 'badge-pending' {
    if (status === 1) return 'badge-accepted';
    if (status === 2) return 'badge-rejected';
    return 'badge-pending';
  }

  private gerarAlertas(medicoes: RecentMeasurement[]): HomeAlerta[] {
    return medicoes.map((medicao) => {
      const alerta = this.classificarAlertaMedicao(medicao);
      return {
        nivel: alerta.nivel,
        titulo: alerta.titulo,
        texto: alerta.texto,
        tanque: medicao.nomeTanque,
      };
    });
  }

  private classificarAlertaMedicao(medicao: RecentMeasurement): { nivel: 'red' | 'yellow' | 'green'; titulo: string; texto: string } {
    const niveis = this.getNiveisMedicaoTanque(medicao.tankId, medicao);
    if (niveis.includes('critical')) {
      return {
        nivel: 'red',
        titulo: 'Atenção, valores críticos',
        texto: `Temperatura ${medicao.temperatura}°C | pH ${medicao.ph} | O2 ${medicao.oxigenioDissolvido} mg/L`,
      };
    }

    if (niveis.includes('warn')) {
      return {
        nivel: 'yellow',
        titulo: 'Atenção, oscilação',
        texto: `Temperatura ${medicao.temperatura}°C | pH ${medicao.ph} | O2 ${medicao.oxigenioDissolvido} mg/L`,
      };
    }

    return {
      nivel: 'green',
      titulo: 'Registrado com sucesso',
      texto: `Parâmetros estáveis. Temperatura ${medicao.temperatura}°C e pH ${medicao.ph}.`,
    };
  }

  private getNiveisMedicaoTanque(tanqueId: number, medicao: RecentMeasurement): NivelParametroHome[] {
    const faixas = this.getFaixasPorTanque(tanqueId);
    return [
      this.classificarValorHome(Number(medicao.temperatura), faixas.temperatura),
      this.classificarValorHome(Number(medicao.ph), faixas.ph),
      this.classificarValorHome(Number(medicao.amonia), faixas.amonia),
      this.classificarValorHome(Number(medicao.nitritos), faixas.nitritos),
    ];
  }

  private getFaixasPorTanque(tanqueId: number): { temperatura: FaixaParametroHome; ph: FaixaParametroHome; amonia: FaixaParametroHome; nitritos: FaixaParametroHome } {
    const especie = this.getEspecieReferenciaTanque(tanqueId);
    return CATALOGO_PARAMETROS_HOME[especie] ?? CATALOGO_PARAMETROS_HOME['A. mexicanum'];
  }

  private getEspecieReferenciaTanque(tanqueId: number): string {
    const axolotes = this.getAxolotesPorTanque(tanqueId);
    if (axolotes.length === 0) return 'A. mexicanum';

    const contagem = new Map<string, number>();
    for (const axolote of axolotes) {
      const especie = axolote.especie || 'A. mexicanum';
      contagem.set(especie, (contagem.get(especie) ?? 0) + 1);
    }

    let especieMaisComum = 'A. mexicanum';
    let maior = 0;
    for (const [especie, qtd] of contagem.entries()) {
      if (qtd > maior) {
        maior = qtd;
        especieMaisComum = especie;
      }
    }
    return especieMaisComum;
  }

  private classificarValorHome(valor: number, faixa: FaixaParametroHome): NivelParametroHome {
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

  private getNomeTanque(tankId: number): string {
    const tanque = this.tanquesRegistrados.find((item) => item.id === tankId);
    return tanque ? tanque.name : `Tanque ${tankId}`;
  }

  private getStatusTexto(status: number): string {
    if (status === 1) return 'Aceito';
    if (status === 2) return 'Recusado';
    return 'Pendente';
  }

  private getStatusClasse(status: number): string {
    if (status === 1) return 'status-accepted';
    if (status === 2) return 'status-contested';
    return 'status-pending';
  }

  private encurtarEndereco(endereco: string): string {
    if (!endereco || endereco.length < 10) return endereco;
    return `${endereco.slice(0, 6)}...${endereco.slice(-4)}`;
  }

  private getImagemPadraoAxolote(id: number): string {
    const imagens = ['axolote-negro.png', 'axolote-dourado.png', 'axolote-branco.png', 'axolote-rosa.png'];
    return imagens[id % imagens.length];
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // Admin: Instituições
  // ═══════════════════════════════════════════════════════════════════════════

  atualizarNodePreview(tipo: 'adicionar' | 'desativar'): void {
    const label = tipo === 'adicionar' ? this.novaInstLabel : this.desativarInstLabel;
    if (!label.trim()) {
      if (tipo === 'adicionar') this.novaInstNodePreview = '';
      else this.desativarInstNodePreview = '';
      return;
    }
    const node = ethers.namehash(label.toLowerCase() + '.axolodao2.eth');
    if (tipo === 'adicionar') this.novaInstNodePreview = node;
    else this.desativarInstNodePreview = node;
  }

  async carregarInstituicoes(): Promise<void> {
    try {
      const contract = this.web3Service.contracts.access;
      if (!contract) return;

      const events = await contract.queryFilter(contract.filters['InstituicaoAdicionada']());
      const mapa = new Map<string, InstituicaoAdmin>();

      for (const event of events) {
        const node = (event as any).args['node'];
        try {
          const [role, label, ativa, gerente] = await contract['instituicoes'](node);
          const roleName = await this.resolverNomeRole(role);
          mapa.set(node, { label, role: roleName, node, ativa, gerente });
        } catch {
          // skip
        }
      }

      this.instituicoesLista = Array.from(mapa.values()).sort((a, b) => {
        if (a.ativa !== b.ativa) return a.ativa ? -1 : 1;
        return a.label.localeCompare(b.label, 'pt-BR');
      });
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Erro ao carregar instituições:', error);
    }
  }

  async adicionarNovaInstituicao(): Promise<void> {
    const label = this.novaInstLabel.trim().toLowerCase();
    const gerente = this.novaInstGerente.trim();

    if (!label) { this.adminInstLog = 'Preencha a label.'; return; }
    if (!gerente || !gerente.startsWith('0x')) { this.adminInstLog = 'Endereço do gerente inválido.'; return; }

    this.adminInstCarregando = true;
    this.adminInstLog = 'Obtendo role hash...';
    this.cdr.detectChanges();

    try {
      const contract = this.web3Service.contracts.access;
      const roleHash = this.novaInstRole === 'caretaker'
        ? await contract['CARETAKER_ROLE']()
        : await contract['AUDITOR_ROLE']();

      this.adminInstLog = `Enviando adicionarInstituicao("${label}", ${this.novaInstRole}, ${gerente.slice(0, 6)}...)`;
      this.cdr.detectChanges();

      const txHash = await this.relayerService.relayWrite(
        contract, 'adicionarInstituicao',
        [label, roleHash, gerente]
      );

      this.adminInstLog = `Tx confirmada: ${txHash}. Instituição "${label}" adicionada com sucesso.`;
      this.novaInstLabel = '';
      this.novaInstGerente = '';
      this.novaInstNodePreview = '';
      await this.carregarInstituicoes();
    } catch (error: any) {
      this.adminInstLog = `Erro: ${error.message || error}`;
    } finally {
      this.adminInstCarregando = false;
      this.cdr.detectChanges();
    }
  }

  async desativarInstituicao(): Promise<void> {
    const label = this.desativarInstLabel.trim().toLowerCase();
    if (!label) { this.adminDesativarLog = 'Preencha a label.'; return; }

    const parentNode = ethers.namehash(label + '.axolodao2.eth');
    this.adminDesativarCarregando = true;
    this.adminDesativarLog = `Desativando "${label}"...`;
    this.cdr.detectChanges();

    try {
      const contract = this.web3Service.contracts.access;
      const txHash = await this.relayerService.relayWrite(
        contract, 'removerInstituicao', [parentNode]
      );

      this.adminDesativarLog = `Tx confirmada: ${txHash}. Instituição "${label}" desativada.`;
      this.desativarInstLabel = '';
      this.desativarInstNodePreview = '';
      await this.carregarInstituicoes();
    } catch (error: any) {
      this.adminDesativarLog = `Erro: ${error.message || error}`;
    } finally {
      this.adminDesativarCarregando = false;
      this.cdr.detectChanges();
    }
  }

  async consultarInstituicao(): Promise<void> {
    const label = this.consultarInstLabel.trim().toLowerCase();
    if (!label) return;

    try {
      const contract = this.web3Service.contracts.access;
      const parentNode = ethers.namehash(label + '.axolodao2.eth');
      const [role, labelReturned, ativa, gerente] = await contract['instituicoes'](parentNode);
      const roleName = await this.resolverNomeRole(role);

      this.consultarResultado = {
        role: roleName,
        label: labelReturned,
        ativa,
        gerente,
        parentNode,
      };
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Erro ao consultar instituição:', error);
      this.consultarResultado = null;
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // Admin: Verificação de Roles
  // ═══════════════════════════════════════════════════════════════════════════

  usarMeuEndereco(): void {
    this.verificarRolesEndereco = this.web3Service.address;
  }

  async verificarRoles(): Promise<void> {
    const addr = this.verificarRolesEndereco.trim();
    if (!addr || !addr.startsWith('0x')) return;

    try {
      const contract = this.web3Service.contracts.access;
      const [adminRole, caretakerRole, auditorRole] = await Promise.all([
        contract['DEFAULT_ADMIN_ROLE'](),
        contract['CARETAKER_ROLE'](),
        contract['AUDITOR_ROLE'](),
      ]);

      const [isAdmin, isCaretaker, isAuditor, ensName] = await Promise.all([
        contract['hasRole'](adminRole, addr),
        contract['hasRole'](caretakerRole, addr),
        contract['hasRole'](auditorRole, addr),
        contract['ensName'](addr).catch(() => ''),
      ]);

      this.verificarRolesResultado = { isAdmin, isCaretaker, isAuditor, ensName };
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Erro ao verificar roles:', error);
      this.verificarRolesResultado = null;
    }
  }

  private async resolverNomeRole(roleHash: string): Promise<string> {
    try {
      const contract = this.web3Service.contracts.access;
      const [caretakerRole, auditorRole] = await Promise.all([
        contract['CARETAKER_ROLE'](),
        contract['AUDITOR_ROLE'](),
      ]);
      if (roleHash === caretakerRole) return 'CARETAKER';
      if (roleHash === auditorRole) return 'AUDITOR';
      if (roleHash === ethers.ZeroHash) return 'ADMIN';
      return roleHash.slice(0, 10) + '...';
    } catch {
      return roleHash.slice(0, 10) + '...';
    }
  }
}
