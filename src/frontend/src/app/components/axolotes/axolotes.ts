import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ethers } from 'ethers';
import Swal from 'sweetalert2';
import { ActiveTank, Web3Service } from '../../services/web3';
import { RelayerService } from '../../services/relayer.service';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';

interface RegistroMonitoramentoAxolote {
  id: number;
  dataCompleta: string;
  temperatura: string;
  ph: string;
  oxigenioDissolvido: string;
  amonia: string;
  nitritos: string;
  alertasForaPadrao: number;
  responsavel: string;
  timestampMs: number;
}

type FiltroPeriodo = '24h' | '7d' | '30d' | 'all';
type FaixaParametro = { min: number; max: number };

const CATALOGO_PARAMETROS_AXOLOTE: Record<string, { temperatura: FaixaParametro; ph: FaixaParametro; amonia: FaixaParametro; nitritos: FaixaParametro }> = {
  'A. andersoni': {
    temperatura: { min: 15, max: 20 },
    ph: { min: 7.0, max: 7.5 },
    amonia: { min: 0, max: 0 },
    nitritos: { min: 0, max: 0.1 },
  },
  'A. mexicanum': {
    temperatura: { min: 16, max: 18 },
    ph: { min: 7.0, max: 7.5 },
    amonia: { min: 0, max: 0 },
    nitritos: { min: 0, max: 0.1 },
  },
  'A. dumerilii': {
    temperatura: { min: 15, max: 18 },
    ph: { min: 8.0, max: 8.5 },
    amonia: { min: 0, max: 0 },
    nitritos: { min: 0, max: 0.1 },
  },
};

@Component({
  selector: 'app-axolotes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './axolotes.html',
  styleUrls: ['./axolotes.css']
})
export class Axolotes implements OnInit, OnChanges {
  @Input() axolotePreferidoId: number | null = null;
  @Input() axolotePreferidoNome: string | null = null;

  // Estado da interface e dados principais
  axolotesRegistrados: any[] = [];
  axoloteSelecionadoId: number | null = null;
  axoloteAtual: any = null;
  carregando = false;
  detalheAberto = false;

  // Busca e filtros
  buscaId: number | null = null;
  filtroTanqueId: number | null = null;
  tanquesAtivos: ActiveTank[] = [];

  // Edição inline
  editando = false;
  editNome = '';
  editMorfologia = '';
  editPhotoHash = '';

  // Transferência
  transferindo = false;
  transferTanqueId: number | null = null;

  // Estado geral
  enviandoTx = false;

  // Estado do historico
  historicoTanque: any[] = [];
  registrosMonitoramento: RegistroMonitoramentoAxolote[] = [];
  filtroPeriodo: FiltroPeriodo = '30d';
  carregandoHistorico = false;
  erroCarregamento = '';
  preferenciaRotaId: number | null = null;
  preferenciaRotaNome: string | null = null;

  fonteDosDados: 'indexador' | 'blockchain' | '' = '';

  constructor(
    private web3Service: Web3Service,
    private relayerService: RelayerService,
    public authService: AuthService,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    this.carregando = true;
    this.route.queryParamMap.subscribe((params) => {
      const idParam = params.get('id');
      const nomeParam = params.get('nome');
      this.preferenciaRotaId = idParam ? Number(idParam) : null;
      this.preferenciaRotaNome = nomeParam ? nomeParam : null;

      if (this.axolotesRegistrados.length > 0) {
        this.aplicarSelecaoPreferida();
        this.cdr.detectChanges();
      }
    });

    const contratoDisponivel = await this.garantirContratoRegistry();
    if (!contratoDisponivel) {
      this.erroCarregamento = 'Não foi possível conectar ao contrato de Axolotes.';
      this.carregando = false;
      this.cdr.detectChanges();
      return;
    }

    this.tanquesAtivos = await this.web3Service.buscarTanquesAtivos();
    await this.carregarAxolotes();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const mudouPreferencia = changes['axolotePreferidoId'] || changes['axolotePreferidoNome'];
    if (mudouPreferencia && this.axolotesRegistrados.length > 0) {
      this.aplicarSelecaoPreferida();
    }
  }

  async carregarAxolotes() {
    this.carregando = true;
    this.erroCarregamento = '';
    this.cdr.detectChanges();
    try {
      // Tentar indexador primeiro (rápido)
      if (this.apiService.available) {
        try {
          const apiAxolotls = await this.apiService.getAxolotls({ active: true });
          this.axolotesRegistrados = apiAxolotls.map((ax: any) => {
            const birthTs = typeof ax.birthDate === 'string' ? new Date(ax.birthDate) : new Date(Number(ax.birthDate) * 1000);
            const dataNascimento = birthTs.toLocaleDateString('pt-BR', {
              day: '2-digit', month: 'short', year: 'numeric'
            });
            return {
              id: ax.id,
              name: ax.name,
              species: ax.species,
              morphData: ax.morphData,
              tankId: ax.tankId,
              birthDate: dataNascimento,
              photoHash: ax.photoHash || '',
              registeredBy: ax.registeredBy || '',
              attestationUID: ax.attestationUID || '',
              img: this.getImagemPadraoAxolote(ax.id)
            };
          });
          this.fonteDosDados = 'indexador';
          this.aplicarSelecaoPreferida();
          return;
        } catch (apiError) {
          console.warn('Indexador indisponível para axolotes, usando blockchain:', apiError);
        }
      }

      // Fallback: blockchain (lento)
      this.fonteDosDados = 'blockchain';
      const contract = this.web3Service.contracts.registry;
      if (!contract) return;

      const total = Number(await this.comTimeout(contract.nextAxolotlId(), 15000));
      const limite = Math.min(total, 400);
      const resultados: any[] = [];

      for (let i = 1; i < limite; i++) {
        try {
          const ax = await this.comTimeout(contract.getAxolotl(i), 8000);
          resultados.push(ax);
        } catch {
          // ignora item com erro e continua
        }
      }

      this.axolotesRegistrados = resultados
        .filter((ax: any) => ax.active)
        .map((ax: any) => {
          const dataNascimento = new Date(Number(ax.birthDate) * 1000).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
          });

          return {
            id: Number(ax.id),
            name: ax.name,
            species: ax.species,
            morphData: ax.morphData,
            tankId: Number(ax.tankId),
            birthDate: dataNascimento,
            photoHash: String(ax.photoHash),
            registeredBy: String(ax.registeredBy),
            attestationUID: String(ax.attestationUID),
            img: this.getImagemPadraoAxolote(Number(ax.id))
          };
        });

      this.aplicarSelecaoPreferida();
    } catch {
      this.erroCarregamento = 'Falha ao carregar axolotes da blockchain.';
    } finally {
      this.carregando = false;
      this.cdr.detectChanges();
    }
  }

  get axolotesFiltrados(): any[] {
    if (this.filtroTanqueId) {
      return this.axolotesRegistrados.filter(ax => ax.tankId === this.filtroTanqueId);
    }
    return this.axolotesRegistrados;
  }

  async buscarPorId() {
    if (!this.buscaId) return;

    const encontrado = this.axolotesRegistrados.find(ax => ax.id === this.buscaId);
    if (encontrado) {
      this.selecionarAxolote(encontrado.id);
      return;
    }

    // Tentar buscar diretamente da blockchain
    try {
      const contract = this.web3Service.contracts.registry;
      if (!contract) return;

      const ax = await contract.getAxolotl(this.buscaId);
      if (!ax.active) {
        Swal.fire('Não encontrado', `Axolote #${this.buscaId} está inativo.`, 'info');
        return;
      }

      this.axolotesRegistrados.push({
        id: Number(ax.id),
        name: ax.name,
        species: ax.species,
        morphData: ax.morphData,
        tankId: Number(ax.tankId),
        birthDate: new Date(Number(ax.birthDate) * 1000).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }),
        photoHash: String(ax.photoHash),
        registeredBy: String(ax.registeredBy),
        attestationUID: String(ax.attestationUID),
        img: this.getImagemPadraoAxolote(Number(ax.id))
      });

      this.selecionarAxolote(Number(ax.id));
    } catch {
      Swal.fire('Não encontrado', `Axolote #${this.buscaId} não existe.`, 'info');
    }
  }

  selecionarAxolote(id: number) {
    this.axoloteSelecionadoId = id;
    this.axoloteAtual = this.axolotesRegistrados.find(ax => ax.id === id);
    this.detalheAberto = !!this.axoloteAtual;
    this.editando = false;
    this.transferindo = false;

    if (this.axoloteAtual) {
      this.carregarHistoricoDoTanque(this.axoloteAtual.tankId);
    }
  }

  voltarParaGaleria(): void {
    this.detalheAberto = false;
    this.axoloteSelecionadoId = null;
    this.axoloteAtual = null;
    this.historicoTanque = [];
    this.registrosMonitoramento = [];
    this.editando = false;
    this.transferindo = false;
  }

  // ─── Ações de escrita (via relayer) ──────────────────────────────────────

  iniciarEdicao(): void {
    if (!this.axoloteAtual) return;
    this.editando = true;
    this.editNome = this.axoloteAtual.name;
    this.editMorfologia = this.axoloteAtual.morphData;
    this.editPhotoHash = this.axoloteAtual.photoHash;
  }

  cancelarEdicao(): void {
    this.editando = false;
  }

  async salvarEdicao(): Promise<void> {
    if (!this.axoloteAtual || !this.editNome || !this.editMorfologia) return;

    this.enviandoTx = true;
    try {
      const contract = this.web3Service.contracts.registry;
      if (!contract) return;

      let photoHash = this.editPhotoHash.trim();
      if (!photoHash) {
        photoHash = this.axoloteAtual.photoHash;
      } else {
        try {
          photoHash = ethers.zeroPadValue(photoHash, 32);
        } catch {
          Swal.fire('Hash inválido', 'O hash informado não é válido.', 'warning');
          return;
        }
      }

      Swal.fire({ title: 'Atualizando...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

      await this.relayerService.relayWrite(contract, 'updateAxolotl', [
        BigInt(this.axoloteAtual.id), this.editNome, this.editMorfologia, photoHash,
      ]);

      Swal.fire('Sucesso!', 'Axolote atualizado.', 'success');
      this.editando = false;
      await this.carregarAxolotes();
      this.selecionarAxolote(this.axoloteAtual.id);
    } catch (error: any) {
      Swal.fire('Erro', error.message || 'Falha ao atualizar.', 'error');
    } finally {
      this.enviandoTx = false;
    }
  }

  iniciarTransferencia(): void {
    this.transferindo = true;
    this.transferTanqueId = null;
  }

  cancelarTransferencia(): void {
    this.transferindo = false;
  }

  async confirmarTransferencia(): Promise<void> {
    if (!this.axoloteAtual || !this.transferTanqueId) return;

    this.enviandoTx = true;
    try {
      const contract = this.web3Service.contracts.registry;
      if (!contract) return;

      Swal.fire({ title: 'Transferindo...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

      await this.relayerService.relayWrite(contract, 'transferAxolotl', [
        BigInt(this.axoloteAtual.id), BigInt(this.transferTanqueId),
      ]);

      Swal.fire('Sucesso!', 'Axolote transferido.', 'success');
      this.transferindo = false;
      await this.carregarAxolotes();
      this.selecionarAxolote(this.axoloteAtual.id);
    } catch (error: any) {
      Swal.fire('Erro', error.message || 'Falha ao transferir.', 'error');
    } finally {
      this.enviandoTx = false;
    }
  }

  async desativarAxolote(): Promise<void> {
    if (!this.axoloteAtual) return;

    const resultado = await Swal.fire({
      title: 'Desativar axolote?',
      text: `Deseja desativar "${this.axoloteAtual.name}"?`,
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

      await this.relayerService.relayWrite(contract, 'deactivateAxolotl', [
        BigInt(this.axoloteAtual.id),
      ]);

      Swal.fire('Sucesso!', 'Axolote desativado.', 'success');
      this.voltarParaGaleria();
      await this.carregarAxolotes();
    } catch (error: any) {
      Swal.fire('Erro', error.message || 'Falha ao desativar.', 'error');
    } finally {
      this.enviandoTx = false;
    }
  }

  // ─── Monitoramento ───────────────────────────────────────────────────────

  async carregarHistoricoDoTanque(tankId: number) {
    this.carregandoHistorico = true;
    this.historicoTanque = [];
    this.registrosMonitoramento = [];

    try {
      const monContract = this.web3Service.contracts.monitoring;
      if (!monContract) return;

      const total = Number(await monContract.nextMeasurementId());
      const tempHistorico: RegistroMonitoramentoAxolote[] = [];

      for (let i = total - 1; i >= 1; i--) {
        const m = await monContract.getMeasurement(i);

        if (Number(m.tankId) === tankId) {
          const temperatura = Number(m.temperature) / 100;
          const ph = Number(m.ph) / 100;
          const amonia = Number(m.ammonia) / 100;
          const nitritos = Number(m.no2) / 100;
          const timestampMs = Number(m.timestamp) * 1000;
          const especie = String(this.axoloteAtual?.species || 'A. mexicanum');
          const alertasForaPadrao = this.calcularAlertasForaPadrao(temperatura, ph, amonia, nitritos, especie);

          tempHistorico.push({
            id: i,
            dataCompleta: new Date(timestampMs).toLocaleString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            }),
            temperatura: temperatura.toFixed(1),
            ph: ph.toFixed(1),
            oxigenioDissolvido: (Number(m.dissolvedOxygen) / 100).toFixed(1),
            amonia: amonia.toFixed(2),
            nitritos: nitritos.toFixed(2),
            alertasForaPadrao,
            responsavel: this.encurtarEndereco(String(m.recorder)),
            timestampMs,
          });
        }
      }

      this.registrosMonitoramento = tempHistorico.sort((a, b) => b.timestampMs - a.timestampMs);
    } catch {
      // erro silencioso
    } finally {
      this.carregandoHistorico = false;
      this.cdr.detectChanges();
    }
  }

  get registrosMonitoramentoFiltrados(): RegistroMonitoramentoAxolote[] {
    if (this.filtroPeriodo === 'all') return this.registrosMonitoramento;

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

  // ─── Helpers ─────────────────────────────────────────────────────────────

  isAttestationValid(uid: string): boolean {
    return !!uid && uid !== '0x0000000000000000000000000000000000000000000000000000000000000000';
  }

  encurtarEndereco(endereco: string): string {
    if (!endereco || endereco.length < 10) return endereco;
    return `${endereco.slice(0, 6)}...${endereco.slice(-4)}`;
  }

  private aplicarSelecaoPreferida(): void {
    if (this.axolotesRegistrados.length === 0) return;

    const idPreferido = this.axolotePreferidoId ?? this.preferenciaRotaId;
    if (idPreferido) {
      const porId = this.axolotesRegistrados.find(ax => ax.id === idPreferido);
      if (porId) {
        this.selecionarAxolote(porId.id);
        return;
      }
    }

    const nomePreferido = this.axolotePreferidoNome ?? this.preferenciaRotaNome;
    if (nomePreferido) {
      const nomeNormalizado = nomePreferido.toLowerCase();
      const porNome = this.axolotesRegistrados.find((ax) => String(ax.name).toLowerCase() === nomeNormalizado);
      if (porNome) {
        this.selecionarAxolote(porNome.id);
        return;
      }
    }
    this.voltarParaGaleria();
  }

  private async garantirContratoRegistry(maxTentativas = 3): Promise<boolean> {
    for (let tentativa = 0; tentativa < maxTentativas; tentativa++) {
      if (this.web3Service.contracts?.registry) return true;

      await this.web3Service.checkConnection();
      if (this.web3Service.contracts?.registry) return true;

      await this.esperar(500);
    }

    return false;
  }

  private async comTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
    let timeoutHandle: ReturnType<typeof setTimeout> | null = null;

    const timeoutPromise = new Promise<never>((_, reject) => {
      timeoutHandle = setTimeout(() => reject(new Error('timeout')), timeoutMs);
    });

    try {
      return await Promise.race([promise, timeoutPromise]);
    } finally {
      if (timeoutHandle) clearTimeout(timeoutHandle);
    }
  }

  private esperar(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private calcularAlertasForaPadrao(temperatura: number, ph: number, amonia: number, nitritos: number, especie: string): number {
    const limites = CATALOGO_PARAMETROS_AXOLOTE[especie] ?? CATALOGO_PARAMETROS_AXOLOTE['A. mexicanum'];

    let alertas = 0;
    if (temperatura < limites.temperatura.min || temperatura > limites.temperatura.max) alertas++;
    if (ph < limites.ph.min || ph > limites.ph.max) alertas++;
    if (amonia < limites.amonia.min || amonia > limites.amonia.max) alertas++;
    if (nitritos < limites.nitritos.min || nitritos > limites.nitritos.max) alertas++;

    return alertas;
  }

  private getImagemPadraoAxolote(id: number): string {
    const imagens = ['axolote-negro.png', 'axolote-dourado.png', 'axolote-branco.png', 'axolote-rosa.png'];
    return `/assets/${imagens[id % imagens.length]}`;
  }
}
