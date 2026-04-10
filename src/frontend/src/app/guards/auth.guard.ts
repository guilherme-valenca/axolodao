import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Web3Service } from '../services/web3';

export const authGuard: CanActivateFn = async (_route, _state) => {
  const web3   = inject(Web3Service);
  const router = inject(Router);

  // Se o usuário fez logout explícito, não tenta reconectar
  if (web3.isLoggedOut) {
    router.navigate(['/login']);
    return false;
  }

  // Tenta reconectar silenciosamente caso já tenha conectado antes
  if (!web3.address) {
    await web3.checkConnection().catch(() => null);
  }

  if (!web3.address) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
