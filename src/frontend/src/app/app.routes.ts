import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

import { Login }          from './components/login/login';
import { TelaInicial }    from './components/tela-inicial/tela-inicial';
import { Tanques }        from './components/tanques/tanques';
import { Axolotes }       from './components/axolotes/axolotes';
import { Monitoramento }  from './components/monitoramento/monitoramento';
import { CadastroAxolote } from './components/cadastro-axolote/cadastro-axolote';
import { CadastroTanque } from './components/cadastro-tanque/cadastro-tanque';
import { RegistroMembro } from './components/registro-membro/registro-membro';

export const routes: Routes = [
  { path: '',      component: Login },
  { path: 'login', component: Login },

  { path: 'tela-inicial',    component: TelaInicial,    canActivate: [authGuard] },
  { path: 'tanques',         component: Tanques,         canActivate: [authGuard] },
  { path: 'axolotes',        component: Axolotes,        canActivate: [authGuard] },
  { path: 'monitoramento',   component: Monitoramento,   canActivate: [authGuard] },
  { path: 'validacao',       component: Monitoramento,   canActivate: [authGuard] },
  { path: 'cadastro-axolote', component: CadastroAxolote, canActivate: [authGuard] },
  { path: 'cadastro-tanque',  component: CadastroTanque,  canActivate: [authGuard] },
  { path: 'registro-membro', component: RegistroMembro,  canActivate: [authGuard] },

  { path: '**', redirectTo: 'login' },
];
