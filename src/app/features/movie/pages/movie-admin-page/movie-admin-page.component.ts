import { Component, inject, signal } from '@angular/core';
import { MovieTableComponent } from '../../components/movie-table/movie-table.component';
import { MovieService } from '../../../../core/services/movie.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { MoviesResponse } from '../../../../shared/models/movie.model';
import { ModalType } from '../../components/movie-alert/movie-alert.component'; // Ajustar si es necesario
import { ModalGlobalComponent } from '../../../../shared/components/modal-global/modal-global.component';
import { MovieSearch } from '../../components/movie-search/movie-search.component';
import { MovieFilterDateComponent } from '../../components/movie-filter-date/movie-filter-date.component';

@Component({
  selector: 'app-movie-admin-page', 
  imports: [
    MovieTableComponent,
    RouterLink,
    ModalGlobalComponent,
    MovieSearch,
    MovieFilterDateComponent,
  ],
  templateUrl: './movie-admin-page.component.html',
})
export class MovieAdminPage {
  movieService = inject(MovieService);
  router = inject(Router);

  // Estados del Modal
  isModalOpen = signal<boolean>(false);
  movieSeleccionada = signal<MoviesResponse | null>(null);
  tipoModal = signal<ModalType | null>(null);
  tituloModal = signal<string>('');
  descripcionModal = signal<string>('');

  filtros = signal({ nombre: '', fechaInicio: '', fechaFin: '' });

  movieResource = rxResource({
    request: () => this.filtros(),
    loader: ({ request }) => {
     /*  if (request.fechaInicio && request.fechaFin) {
        return this.movieService.getMovieForDate(
          request.fechaInicio,
          request.fechaFin,
        );
      } */

      if (request.nombre) {
        return this.movieService.getMovieForName(request.nombre);
      }

      return this.movieService.getMovie();
    },
  });


  searchMovie(event: string) {
    const name = event.toLowerCase().trim();
    // Prioridad a la búsqueda: borramos las fechas
    this.filtros.set({ nombre: name, fechaInicio: '', fechaFin: '' });
  }

  filterByDate(fechas: [string, string]) {
    const [inicio, fin] = fechas;
    if (!inicio || !fin) return;

    this.filtros.set({ nombre: '', fechaInicio: inicio, fechaFin: fin });
  }


  editMovie = (movie: MoviesResponse) => {
    this.router.navigate(['/admin/movie/edit/', movie.id_pelicula]);
  };

  abrirModalEliminar(movie: MoviesResponse) {
    this.movieSeleccionada.set(movie);
    this.tipoModal.set('WARNING');
    this.tituloModal.set('¿Estás seguro de eliminar?');
    this.descripcionModal.set(
      `¿Esta película será eliminada del sistema? - ${movie.nombre}`,
    );
    this.isModalOpen.set(true);
  }

  cerrarModal() {
    this.isModalOpen.set(false);
    this.tituloModal.set('');
    this.descripcionModal.set('');
    this.movieSeleccionada.set(null);
  }

  deletedMovie = () => {
    const movie = this.movieSeleccionada();
    if (!movie) return;

    this.movieService.deleteMovie(movie.id_pelicula!).subscribe({
      next: () => {
        this.tipoModal.set('SUCCESS');
        this.tituloModal.set('Eliminación Exitosa');
        this.descripcionModal.set('La película se eliminó con éxito.');
        // Recargamos los datos manteniendo los filtros actuales
        this.movieResource.reload();
      },
      error: () => {
        this.tipoModal.set('ERROR');
        this.tituloModal.set('No se pudo eliminar');
        this.descripcionModal.set(
          'Ocurrió un problema de conexión al intentar eliminar la película.',
        );
      },
    });
  };
}
