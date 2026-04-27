import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MovieService } from '../../../../core/services/movie.service';
import { MoviesResponse } from '../../../../shared/models/movie.model';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, EMPTY, tap } from 'rxjs';
import { ModalType, ModalGlobalComponent } from '../../../../shared/components/modal-global/modal-global.component';

@Component({
  selector: 'app-movie-edit',
  imports: [ReactiveFormsModule, RouterLink, ModalGlobalComponent],
  templateUrl: './movie-edit-page.component.html',
})
export class MovieEditPage {
  fb = inject(FormBuilder);
  activatedRoute = inject(ActivatedRoute);
  route = inject(Router);
  movieService = inject(MovieService);

  tipoModal = signal<ModalType | null>(null);
  tituloModal = signal<string>('');
  descripcionModal = signal<string>('');
  hasError = signal(false);
  isModalOpen = signal<boolean>(false);
  movieSeleccionada = signal<MoviesResponse | null>(null);

  id = this.activatedRoute.snapshot.params['id'];

  movieResource = rxResource({
    loader: () =>
      this.movieService.getMovieForId(this.id).pipe(
        tap((movie) => {
          if (!movie) this.route.navigate(['/admin/movie']);
        }),
        catchError((err) => {
          this.route.navigate(['/admin/movie']);
          return EMPTY;
        }),
      ),
  });

  movieForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    duracion: [1, [Validators.required, Validators.min(30)]],
    imagen_url: [''],
    activo: [false],
  });

  onSubmit() {
    if (this.movieForm.invalid) {
      this.hasError.set(true);
      setTimeout(() => this.hasError.set(false), 2000);
      return;
    }

    const { nombre, duracion, activo } = this.movieForm.value;

    this.movieService
      .updateMovie({
        id_pelicula: this.id,
        nombre: nombre!,
        duracion: Number(duracion!),
        activo: activo!,
      })
      .subscribe({
        next: () => {
          this.tipoModal.set('SUCCESS');
          this.tituloModal.set('Actualización Exitosa');
          this.descripcionModal.set('La pelicula se modifico con exito');
          this.isModalOpen.set(true);
        },
        error: () => {
          this.tipoModal.set('ERROR');
          this.tituloModal.set('No se pudo actualizar');
          this.descripcionModal.set('La pelicula no se puedo modificar');
          this.isModalOpen.set(true);
        },
      });
  }

  abrirModalEliminar(movie: MoviesResponse) {
    this.movieSeleccionada.set(movie);
    this.isModalOpen.set(true);
  }

  cerrarModal() {
    this.isModalOpen.set(false);
    this.tituloModal.set('');
    this.descripcionModal.set('');
    this.movieSeleccionada.set(null);
  }
}
