import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register-page.html',
})
export class RegisterPage {
  fb = inject(FormBuilder);
  router = inject(Router);

  hasSuccess = signal(false);
  hasError = signal(false);

  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    fullName: ['', [Validators.required, Validators.minLength(10)]],
  });

  onSubmit() {
    if (this.registerForm.invalid) {
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);
      return;
    }
    const { email = '', password = '', fullName = '' } = this.registerForm.value;

    // this.authService.register(email!, password!, fullName!).subscribe((isRegister) => {
    //   if (isRegister) {
    //     this.hasSuccess.set(true);
    //     setTimeout(() => {
    //       this.hasSuccess.set(false);
    //       this.router.navigateByUrl('/');
    //     }, 3000);
    //     return;
    //   }
    //   this.hasError.set(true);
    //   setTimeout(() => {
    //     this.hasError.set(false);
    //   }, 2000);
    // });
  }
}
