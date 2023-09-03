import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard = () => {
  console.log('auth guard');
  const router = inject(Router);

  return router.parseUrl('/login');
}
