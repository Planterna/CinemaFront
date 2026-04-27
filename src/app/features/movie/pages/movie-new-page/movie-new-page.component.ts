import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MovieService } from '../../../../core/services/movie.service';
import { MoviesResponse } from '../../../../shared/models/movie.model';
import { ModalGlobalComponent } from '../../../../shared/components/modal-global/modal-global.component';
import { ModalType } from '../../components/movie-alert/movie-alert.component';

@Component({
  selector: 'app-movie-new',
  imports: [ReactiveFormsModule, RouterLink, ModalGlobalComponent],
  templateUrl: './movie-new-page.component.html',
})
export class MovieNewPage {
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

  movieForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    duracion: [1, [Validators.required, Validators.min(30)]],
    activo: [false],
    imagen_url: [''],
  });
  id = this.activatedRoute.snapshot.params['id'];

  onSubmit() {
    if (this.movieForm.invalid) {
      this.hasError.set(true);
      setTimeout(() => this.hasError.set(false), 2000);
      return;
    }

    const { nombre, duracion, activo, imagen_url } = this.movieForm.value;

    this.movieService
      .createMovie({
        nombre: nombre!,
        duracion: duracion!,
        activo: activo!,
        imagen_url: imagen_url!,
      })
      .subscribe({
        next: () => {
          this.tipoModal.set('SUCCESS');
          this.tituloModal.set('Creado correctamente');
          this.descripcionModal.set('La pelicula se creo con exito');
          this.isModalOpen.set(true);
        },
        error: () => {
          this.tipoModal.set('ERROR');
          this.tituloModal.set('No se pudo crear');
          this.descripcionModal.set('La pelicula no se pudo crear');
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
