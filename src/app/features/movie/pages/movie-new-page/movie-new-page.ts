import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MovieService } from '../../../../core/services/movie.service';
import { MoviesResponse } from '../../../../shared/models/movie.model';

@Component({
  selector: 'app-movie-new',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './movie-new-page.html',
})
export class MovieNewPage {
  fb = inject(FormBuilder);
  activatedRoute = inject(ActivatedRoute);
  route = inject(Router);
  movieService = inject(MovieService);

  hasError = signal(false);

  movie = signal<MoviesResponse | null>(null);

  movieForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    duracion: [1, [Validators.required, Validators.min(30)]],
    activo: [false]
  });
  id = this.activatedRoute.snapshot.params['id'];

  onSubmit() {
    if (this.movieForm.invalid) {
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);
      return;
    }

    const { nombre = '', duracion = 0, activo=false } = this.movieForm.value;

    this.movieService
      .createMovie({
        nombre: nombre!,
        duracion: duracion!,
        activo: activo!
      })
      .subscribe(() => {
        console.log('Movie created');
        setTimeout(() => {
          this.route.navigateByUrl(`cinema/movie`);
        }, 3000);
      });

    this.hasError.set(true);
    setTimeout(() => {
      this.hasError.set(false);
    }, 2000);
  }
}
