import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanMatchFn = (route, segments) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAdmin() && !authService.isTokenExpired()) {
    return true;
  }

  authService.logout();

  return router.createUrlTree(['/cinema']);
};
