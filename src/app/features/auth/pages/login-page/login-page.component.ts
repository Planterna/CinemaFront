import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-page.component.html',
})
export class LoginPage {
  fb = inject(FormBuilder);
  router = inject(Router);
  authService = inject(AuthService);

  hasError = signal(false);
  errorMessage = signal('');
  isPosting = signal(false);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]],
  });

  onSubmit() {
    if (this.loginForm.invalid) {
      this.showError('Revisa los campos del formulario antes de continuar.');
      return;
    }

    this.isPosting.set(true);

    const { email, password } = this.loginForm.value;

    this.authService.login({ email: email!, password: password! }).subscribe({
      next: () => {
        this.isPosting.set(false);
        if (this.authService.isAdmin()) {
          this.router.navigateByUrl('/admin/dashboard');
        } else {
          this.router.navigateByUrl('/cinema');
        }
      },
      error: (err) => {
        this.isPosting.set(false);
        const mensajeBackend =
          err.error?.message || 'Error al iniciar sesión. Intenta de nuevo.';
        this.showError(mensajeBackend);
      },
    });
  }

  private showError(message: string) {
    this.errorMessage.set(message);
    this.hasError.set(true);
    setTimeout(() => {
      this.hasError.set(false);
    }, 3000); 
  }
}
