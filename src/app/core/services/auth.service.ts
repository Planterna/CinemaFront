import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs';
import {jwtDecode} from 'jwt-decode'
import { AuthInterface } from '../../shared/models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = environment.baseUrl;

  currentUser = signal<any | null>(
    JSON.parse(localStorage.getItem('cinema_user') || 'null'),
  );

  login(credenciales: AuthInterface) {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, credenciales).pipe(
      tap((respuesta) => {
        localStorage.setItem('cinema_token', respuesta.token);
        localStorage.setItem('cinema_user', JSON.stringify(respuesta.user));

        this.currentUser.set(respuesta.user);
      }),
    );
  }

  register(datosUsuario: AuthInterface) {
    return this.http.post<any>(`${this.apiUrl}/auth/register`, datosUsuario);
  }

  logout() {
    localStorage.removeItem('cinema_token');
    localStorage.removeItem('cinema_user');
    this.currentUser.set(null);
    this.router.navigate(['/cinema']);
  }

  getToken(): string | null {
    return localStorage.getItem('cinema_token');
  }

  isAdmin(): boolean {
    return this.currentUser()?.rol === 'ADMIN';
  }

  isTokenExpired(): boolean {
    const token = this.getToken();

    if (!token) return true;

    try {
      const decodedToken: any = jwtDecode(token);

      if (!decodedToken.exp) return false;

      const expirationDate = decodedToken.exp * 1000;
      const currentDate = Date.now();

      return currentDate >= expirationDate;
    } catch (error) {
      return true;
    }
  }
}
