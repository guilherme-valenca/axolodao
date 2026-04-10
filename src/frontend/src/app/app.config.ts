import {
  ApplicationConfig,
  EnvironmentProviders,
  makeEnvironmentProviders,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  Droplets,
  Eye,
  LUCIDE_ICONS,
  LucideIconProvider,
  LucideIcons,
  Pencil,
  Plus,
  Shield,
  Trash2,
  User,
  Wallet,
  CheckCircle,
  AlertTriangle,
  Loader2,
  RefreshCw,
} from 'lucide-angular';

import { routes } from './app.routes';

function provideLucideIcons(icons: LucideIcons): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider(icons),
    },
  ]);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideLucideIcons({ Plus, Pencil, Trash2, Eye, Droplets, Shield, User, Wallet, CheckCircle, AlertTriangle, Loader2, RefreshCw }),
  ],
};
