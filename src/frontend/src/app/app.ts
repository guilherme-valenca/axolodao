import { Component, HostListener, OnDestroy, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { Web3Service } from './services/web3';
import { AuthService } from './services/auth.service';
import { ApiService } from './services/api.service';
import { LucideAngularModule, Search, Bell } from 'lucide-angular';
import Swal from 'sweetalert2';

type NivelNotificacao = 'red' | 'yellow' | 'green';

type NotificacaoHistorico = {
  id: number;
  nivel: NivelNotificacao;
  titulo: string;
  texto: string;
  tanque: string;
  recebidoEm: string;
};

type NotificacaoToast = {
  uiId: number;
  nivel: NivelNotificacao;
  titulo: string;
  texto: string;
  tanque: string;
  recebidoEm: string;
};

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FormsModule, SidebarComponent, LucideAngularModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly web3Service = inject(Web3Service);
  private readonly authService = inject(AuthService);
  private readonly apiService = inject(ApiService);
  private notificacoesPollingHandle: ReturnType<typeof setInterval> | null = null;
  private idsNotificacoesConhecidas = new Set<number>();
  private toastSeq = 0;

  protected menuAtivo = 'home';
  protected cargoUsuario = '';
  protected readonly SearchIcon = Search;
  protected readonly BellIcon = Bell;
  protected notificacoesAbertas = false;
  protected historicoNotificacoes: NotificacaoHistorico[] = [];
  protected notificacoesToast: NotificacaoToast[] = [];
  protected termoPesquisaGlobal = '';

  constructor() {
    this.sincronizarMenuComRota(this.router.url);

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        const navigationEvent = event as NavigationEnd;
        this.sincronizarMenuComRota(navigationEvent.urlAfterRedirects);

        // Após login, o cargo pode não estar sincronizado porque carregarCargoUsuario()
        // rodou antes da wallet estar conectada. Re-sincroniza ao navegar para área protegida.
        if (!this.cargoUsuario && this.authService.role !== 'none') {
          this.sincronizarCargo();
        }
      });
  }

  async ngOnInit(): Promise<void> {
    await this.carregarCargoUsuario();
    await this.carregarNotificacoes(false);
    this.iniciarPollingNotificacoes();
  }

  ngOnDestroy(): void {
    if (this.notificacoesPollingHandle) {
      clearInterval(this.notificacoesPollingHandle);
      this.notificacoesPollingHandle = null;
    }
  }

  protected shouldHideSidebar(): boolean {
    const routePath = this.router.url.split('?')[0];
    return routePath === '/' || routePath === '/login';
  }

  protected onMenuSelecionado(menu: string): void {
    this.menuAtivo = menu;

    // Menus que são tabs internos do tela-inicial (não têm rota própria funcional)
    const tabsInternas = ['home', 'tanques', 'axolotes', 'monitoramento', 'cadastro-axolote', 'cadastro-tanque', 'validacao', 'registro-membro', 'diagnostico', 'instituicoes'];

    if (tabsInternas.includes(menu)) {
      this.router.navigate(['/tela-inicial'], { queryParams: { menu } });
    }
  }

  @HostListener('document:click')
  protected onDocumentoClick(): void {
    if (!this.notificacoesAbertas) return;
    this.notificacoesAbertas = false;
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    this.notificacoesAbertas = false;
  }

  protected toggleNotificacoes(event: Event): void {
    event.stopPropagation();
    this.notificacoesAbertas = !this.notificacoesAbertas;
  }

  protected onClickPainelNotificacoes(event: Event): void {
    event.stopPropagation();
  }

  protected removerToast(uiId: number): void {
    this.notificacoesToast = this.notificacoesToast.filter((item) => item.uiId !== uiId);
  }

  protected async pesquisarGlobal(): Promise<void> {
    const termoOriginal = this.termoPesquisaGlobal.trim();
    const termo = this.normalizarBusca(termoOriginal);

    if (!termo) {
      return;
    }

    const tipoPreferido =
      termo.includes('tanque') ? 'tanque' :
      termo.includes('axolote') ? 'axolote' :
      null;

    const tanque = tipoPreferido !== 'axolote'
      ? await this.buscarTanquePorTermo(termoOriginal)
      : null;

    if (tanque) {
      this.termoPesquisaGlobal = '';
      await this.router.navigate(['/tela-inicial'], { queryParams: { menu: 'tanques', tankId: tanque.id } });
      return;
    }

    const axolote = tipoPreferido !== 'tanque'
      ? await this.buscarAxolotePorTermo(termoOriginal)
      : null;

    if (axolote) {
      this.termoPesquisaGlobal = '';
      const queryParams = axolote.id
        ? { menu: 'axolotes', id: axolote.id }
        : { menu: 'axolotes', nome: axolote.nome };
      await this.router.navigate(['/tela-inicial'], { queryParams });
      return;
    }

    Swal.fire('Não encontrado', 'Nenhum tanque ou axolote corresponde à busca informada.', 'info');
  }

  protected get notificacoesNaoLidas(): number {
    return this.historicoNotificacoes.filter((item) => item.nivel !== 'green').length;
  }

  private sincronizarMenuComRota(url: string): void {
    const [path, queryString = ''] = (url || '').split('?');
    const queryParams = new URLSearchParams(queryString);
    const menuQuery = queryParams.get('menu');

    const menuPorRota: Record<string, string> = {
      '/tela-inicial': 'home',
      '/tanques': 'tanques',
      '/axolotes': 'axolotes',
      '/monitoramento': 'monitoramento',
      '/cadastro-axolote': 'cadastro-axolote',
      '/cadastro-tanque': 'cadastro-tanque',
      '/validacao': 'validacao',
      '/registro-membro': 'registro-membro',
    };

    if (path === '/tela-inicial' && menuQuery) {
      this.menuAtivo = menuQuery;
      return;
    }

    this.menuAtivo = menuPorRota[path] ?? 'home';
  }

  private async buscarTanquePorTermo(termoOriginal: string): Promise<{ id: number; name: string } | null> {
    const termo = this.normalizarBusca(termoOriginal);
    const id = this.extrairIdBusca(termoOriginal);

    if (this.apiService.available) {
      try {
        const tanques = await this.apiService.getTanks({ active: true });
        const encontrado = tanques.find((tanque: any) => this.matchBusca(id, termo, Number(tanque.id), String(tanque.name)));
        if (encontrado) {
          return { id: Number(encontrado.id), name: String(encontrado.name) };
        }
      } catch {
        // segue para fallback on-chain
      }
    }

    await this.web3Service.checkConnection();
    const tanques = await this.web3Service.buscarTanquesAtivos();
    const encontrado = tanques.find((tanque) => this.matchBusca(id, termo, tanque.id, tanque.name));
    return encontrado ? { id: encontrado.id, name: encontrado.name } : null;
  }

  private async buscarAxolotePorTermo(termoOriginal: string): Promise<{ id?: number; nome: string } | null> {
    const termo = this.normalizarBusca(termoOriginal);
    const id = this.extrairIdBusca(termoOriginal);

    if (this.apiService.available) {
      try {
        const axolotes = await this.apiService.getAxolotls({ active: true });
        const encontrado = axolotes.find((axolote: any) => this.matchBusca(id, termo, Number(axolote.id), String(axolote.name)));
        if (encontrado) {
          return { id: Number(encontrado.id), nome: String(encontrado.name) };
        }
      } catch {
        // segue para fallback on-chain
      }
    }

    await this.web3Service.checkConnection();
    const registry = this.web3Service.contracts.registry;
    if (!registry) {
      return null;
    }

    const total = Number(await registry['nextAxolotlId']());
    for (let i = 1; i < total; i++) {
      try {
        const axolote = await registry['getAxolotl'](i);
        if (!axolote.active) continue;

        if (this.matchBusca(id, termo, Number(axolote.id), String(axolote.name))) {
          return { id: Number(axolote.id), nome: String(axolote.name) };
        }
      } catch {
        // ignora item com erro
      }
    }

    return null;
  }

  private matchBusca(idBuscado: number | null, termoBuscado: string, idAtual: number, nomeAtual: string): boolean {
    const nomeNormalizado = this.normalizarBusca(nomeAtual);
    if (idBuscado !== null && idAtual === idBuscado) {
      return true;
    }

    return nomeNormalizado.includes(termoBuscado);
  }

  private extrairIdBusca(termoOriginal: string): number | null {
    const correspondencia = termoOriginal.match(/\d+/);
    if (!correspondencia) return null;

    const id = Number(correspondencia[0]);
    return Number.isFinite(id) && id > 0 ? id : null;
  }

  private normalizarBusca(valor: string): string {
    return String(valor ?? '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();
  }

  private iniciarPollingNotificacoes(): void {
    if (this.notificacoesPollingHandle) {
      clearInterval(this.notificacoesPollingHandle);
    }

    this.notificacoesPollingHandle = setInterval(() => {
      void this.carregarNotificacoes(true);
    }, 12000);
  }

  private async carregarCargoUsuario(): Promise<void> {
    try {
      await this.web3Service.checkConnection();
      if (!this.web3Service.contracts.access || !this.web3Service.address) {
        this.cargoUsuario = '';
        return;
      }

      // Callback para atualizar sidebar quando detecção de gerente completa (async)
      this.authService.onRoleChange = () => this.sincronizarCargo();

      await this.authService.detectRoles();
      this.sincronizarCargo();
    } catch {
      this.cargoUsuario = '';
    }
  }

  private sincronizarCargo(): void {
    const role = this.authService.role;
    if (role === 'admin') this.cargoUsuario = 'admin';
    else if (role === 'gerente') this.cargoUsuario = 'gerente';
    else if (role === 'caretaker') this.cargoUsuario = 'operador';
    else if (role === 'auditor') this.cargoUsuario = 'auditor';
    else this.cargoUsuario = '';
  }

  private async carregarNotificacoes(mostrarPopupNovas: boolean): Promise<void> {
    try {
      const monitoring = this.web3Service.contracts.monitoring;
      const registry = this.web3Service.contracts.registry;
      if (!monitoring) {
        this.historicoNotificacoes = [];
        return;
      }

      const total = Number(await monitoring['nextMeasurementId']());
      const alertas: NotificacaoHistorico[] = [];

      for (let i = total - 1; i >= 1; i--) {
        const m = await monitoring['getMeasurement'](i);
        const tankId = Number(m['tankId']);
        const temperatura = Number(m['temperature']) / 100;
        const ph = Number(m['ph']) / 100;
        const amonia = Number(m['ammonia']) / 100;
        const no2 = Number(m['no2']) / 100;
        const o2 = Number(m['dissolvedOxygen']) / 100;
        const recebidoEm = new Date(Number(m['timestamp']) * 1000).toLocaleString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        });

        let nomeTanque = `Tanque ${tankId}`;
        if (registry) {
          try {
            const t = await registry['getTank'](tankId);
            nomeTanque = String(t['name'] || nomeTanque);
          } catch {
            // fallback
          }
        }

        const critico = temperatura < 14 || temperatura > 20 || ph < 6 || ph > 8.5 || amonia > 0.25 || no2 > 0.15 || o2 < 5;
        const moderado = temperatura < 16 || temperatura > 18 || ph < 6.5 || ph > 8.0 || amonia > 0 || no2 > 0 || o2 < 6.5;

        if (critico) {
          alertas.push({
            id: i,
            nivel: 'red',
            titulo: 'Atenção, valores críticos',
            texto: `Temperatura ${temperatura.toFixed(1)}°C | pH ${ph.toFixed(1)} | O2 ${o2.toFixed(1)} mg/L`,
            tanque: nomeTanque,
            recebidoEm,
          });
        } else if (moderado) {
          alertas.push({
            id: i,
            nivel: 'yellow',
            titulo: 'Atenção, oscilação',
            texto: `Temperatura ${temperatura.toFixed(1)}°C | pH ${ph.toFixed(1)} | O2 ${o2.toFixed(1)} mg/L`,
            tanque: nomeTanque,
            recebidoEm,
          });
        } else {
          alertas.push({
            id: i,
            nivel: 'green',
            titulo: 'Registrado com sucesso',
            texto: `Parâmetros estáveis. Temperatura ${temperatura.toFixed(1)}°C e pH ${ph.toFixed(1)}.`,
            tanque: nomeTanque,
            recebidoEm,
          });
        }

        if (alertas.length >= 30) break;
      }

      const novos = alertas.filter((item) => !this.idsNotificacoesConhecidas.has(item.id));
      if (mostrarPopupNovas && novos.length > 0) {
        const novosOrdenados = [...novos].sort((a, b) => a.id - b.id);
        for (const alerta of novosOrdenados) {
          this.adicionarToastNotificacao(alerta);
        }
      }

      this.idsNotificacoesConhecidas = new Set(alertas.map((item) => item.id));
      this.historicoNotificacoes = alertas;
    } catch {
      this.historicoNotificacoes = [];
    }
  }

  private adicionarToastNotificacao(alerta: NotificacaoHistorico): void {
    const uiId = ++this.toastSeq;
    this.notificacoesToast = [{ uiId, ...alerta }, ...this.notificacoesToast].slice(0, 4);
    setTimeout(() => this.removerToast(uiId), 6500);
  }
}
