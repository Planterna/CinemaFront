import { Component, inject } from '@angular/core';
import { MovieTableComponent } from "../../components/movie-table/movie-table.component";
import { MovieService } from '../../../../core/services/movie.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { MoviesResponse } from '../../../../shared/models/movie.model';

@Component({
  selector: 'app-movie-admin-page.component',
  imports: [MovieTableComponent],
  templateUrl: './movie-admin-page.component.html',
})
export class MovieAdminPage {
  movieService = inject(MovieService);
  router = inject(Router)

  movieResource = rxResource({
    loader: () => this.movieService.getMovie(),
  });

  editMovie = (movie: MoviesResponse) => {
    this.router.navigate(['/admin/movie-edit/', movie.id_pelicula]);
  };
}
