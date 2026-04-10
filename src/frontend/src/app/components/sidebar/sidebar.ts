import { Component, OnInit, inject, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Web3Service } from '../../services/web3';
import { AuthService } from '../../services/auth.service';
import { LucideAngularModule, LogOut, PlusCircle, Droplet, ClipboardEdit, CheckSquare, LayoutDashboard, Waves, Microscope, Building2, ShieldCheck, Activity, UserPlus } from 'lucide-angular';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class SidebarComponent implements OnInit {
  public web3Service = inject(Web3Service);
  private auth = inject(AuthService);
  private router = inject(Router);

  @Input() menuAtivo: string = 'home';
  @Input() cargoUsuario: string = '';
  @Output() menuSelecionado = new EventEmitter<string>();

  readonly LogOutIcon = LogOut;
  readonly PlusCircleIcon = PlusCircle;
  readonly DropletIcon = Droplet;
  readonly ClipboardEditIcon = ClipboardEdit;
  readonly CheckSquareIcon = CheckSquare;
  readonly LayoutDashboardIcon = LayoutDashboard;
  readonly WavesIcon = Waves;
  readonly MicroscopeIcon = Microscope;
  readonly Building2Icon = Building2;
  readonly ShieldCheckIcon = ShieldCheck;
  readonly ActivityIcon = Activity;
  readonly UserPlusIcon = UserPlus;

  ngOnInit() {
    // A inicialização já deve ter ocorrido no login ou app.component
  }

  get tituloPainel(): string {
    const role = (this.cargoUsuario || '').toLowerCase();
    if (role === 'admin') return 'Painel Administrativo';
    if (role === 'gerente') return 'Painel do Gerente';
    if (role === 'operador' || role === 'caretaker') return 'Painel do Cuidador';
    if (role === 'auditor') return 'Vis\u00e3o Geral do Auditor';
    return 'Vis\u00e3o Geral';
  }
  get carteiraEncurtada(): string {
    const addr = this.web3Service.address;
    if (!addr) return 'Não conectado';
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  }

  selecionarMenu(menu: string, event: Event) {
    event.preventDefault();
    this.menuSelecionado.emit(menu);
  }

  desconectar() {
    this.auth.reset();
    this.web3Service.disconnect();
    this.router.navigate(['/login']);
  }
}


