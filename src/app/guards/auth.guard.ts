import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/infrastructure/auth.service';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLoggedIn ? true : router.parseUrl('/login');
}
