import { Component, inject, signal } from '@angular/core';
import { MovieTableComponent } from '../../components/movie-table/movie-table.component';
import { MovieService } from '../../../../core/services/movie.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { MoviesResponse } from '../../../../shared/models/movie.model';
import { ModalType } from '../../components/movie-alert/movie-alert.component';
import { ModalGlobalComponent } from '../../../../shared/components/modal-global/modal-global.component';

@Component({
  selector: 'app-movie-admin-page.component',
  imports: [MovieTableComponent, RouterLink, ModalGlobalComponent],
  templateUrl: './movie-admin-page.component.html',
})
export class MovieAdminPage {
  movieService = inject(MovieService);
  router = inject(Router);

  isModalOpen = signal<boolean>(false);
  movieSeleccionada = signal<MoviesResponse | null>(null);
  tipoModal = signal<ModalType | null>(null);
  tituloModal = signal<string>('');
  descripcionModal = signal<string>('');

  movieResource = rxResource({
    loader: () => this.movieService.getMovie(),
  });

  editMovie = (movie: MoviesResponse) => {
    this.router.navigate(['/admin/movie/edit/', movie.id_pelicula]);
  };

  deletedMovie = () => {
    const movie = this.movieSeleccionada();
    this.movieService.deleteMovie(movie?.id_pelicula!).subscribe({
      next: () => {
        this.tipoModal.set('SUCCESS');
        this.tituloModal.set('Eliminación Éxitosa');
        this.descripcionModal.set('La pelicula se eliminó con éxito');
        this.isModalOpen.set(true);
        this.movieResource.reload();
      },
      error: () => {
        this.tipoModal.set('ERROR');
        this.tituloModal.set('No se pudo eliminar');
        this.descripcionModal.set('La pelicula no se puedo eliminar');
        this.isModalOpen.set(true);
      },
    });
  };

  abrirModalEliminar(movie: MoviesResponse) {
    this.movieSeleccionada.set(movie);
    this.tipoModal.set('WARNING');
    this.tituloModal.set('¿Estas Seguro de Eliminar?');
    this.descripcionModal.set(
      `Esta pelicula sera eliminada del sistema? - ${movie.nombre}`,
    );
    this.isModalOpen.set(true);
  }

  cerrarModal() {
    this.isModalOpen.set(false);
    this.tituloModal.set('');
    this.descripcionModal.set('');
    this.movieSeleccionada.set(null);
  }
}
