import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MovieService } from '../../../../core/services/movie.service';
import { MoviesResponse } from '../../../../shared/models/movie.model';

@Component({
  selector: 'app-movie-edit',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './movie-edit-page.html',
})
export class MovieEditPage implements OnInit {
  fb = inject(FormBuilder);
  activatedRoute = inject(ActivatedRoute);
  route = inject(Router);
  movieService = inject(MovieService);

  hasError = signal(false);

  movie = signal<MoviesResponse | null>(null);

  movieForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    duracion: [1, [Validators.required, Validators.min(30)]],
    activo: [false],
  });
  id = this.activatedRoute.snapshot.params['id'];

  ngOnInit(): void {
    this.movieService
      .getMovieForId(this.id)
      .subscribe((data) => this.movie.set(data));
  }

  onSubmit() {
    if (this.movieForm.invalid) {
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);
      return;
    }

    const { nombre = '', duracion = 0, activo = false } = this.movieForm.value;

    this.movieService
      .updateMovie({
        id_pelicula: +this.id,
        nombre: nombre!,
        duracion: duracion!,
        activo: activo!,
      })
      .subscribe(() => {
        console.log('Movie edit');
        setTimeout(() => {
          this.route.navigateByUrl(`cinema/movie/edit/${this.id}`);
        }, 3000);
      });

    this.hasError.set(true);
    setTimeout(() => {
      this.hasError.set(false);
    }, 2000);
  }
}
