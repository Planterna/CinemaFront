import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-edit',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './movie-edit-page.html',
})
export class MovieEditPage {
  fb = inject(FormBuilder);
  activatedRoute = inject(ActivatedRoute);

  hasError = signal(false);
  isPosting = signal(false);

  movieForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    duracion: [1, [Validators.required, Validators.min(30)]],
  });

  onSubmit() {
    if (this.movieForm.invalid) {
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);
      return;
    }

    const { nombre = '', duracion = 30 } = this.movieForm.value;
    // this.authService.login(email!, password!).subscribe((isAuthenticated) => {
    //   if (isAuthenticated) {
    //     this.router.navigateByUrl('/');
    //     return;
    //   }
    //   this.hasError.set(true);
    //   setTimeout(() => {
    //     this.hasError.set(false);
    //   }, 2000);
    // });
  }
}
