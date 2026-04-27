import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (token && authService.isTokenExpired()) {
    authService.logout();
    return throwError(() => new Error('Sesión expirada localmente'));
  }

  let peticion = req;
  if (token) {
    peticion = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }

  return next(peticion).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !req.url.includes('/login')) {
        console.warn('El backend rechazó el token (401). Cerrando sesión...');
        authService.logout();
      }

      return throwError(() => error);
    }),
  );
};
