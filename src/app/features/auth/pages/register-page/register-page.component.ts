import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register-page.component.html',
})
export class RegisterPage {
  fb = inject(FormBuilder);
  router = inject(Router);
  authService = inject(AuthService);

  hasError = signal(false);
  errorMessage = signal('');
  successMessage = signal('');
  isPosting = signal(false);

  registerForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]],
  });

  onSubmit() {
    if (this.registerForm.invalid) {
      this.showError('Por favor, completa todos los campos correctamente.');
      return;
    }

    this.isPosting.set(true);

    const { nombre, email, password } = this.registerForm.value;

    const newUser = {
      nombre: nombre!,
      email: email!,
      password: password!,
    };

    this.authService.register(newUser).subscribe({
      next: () => {
        this.isPosting.set(false);
        this.successMessage.set('¡Registro exitoso! Redirigiendo al login...');

        setTimeout(() => {
          this.router.navigateByUrl('/auth/login');
        }, 2000);
      },
      error: (err) => {
        this.isPosting.set(false);
        this.showError(
          err.error?.message || 'Hubo un error al registrar el usuario',
        );
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
