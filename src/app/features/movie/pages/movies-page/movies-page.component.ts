import { Component, inject, OnInit, signal } from '@angular/core';
import { MovieCard } from '../../../movie/components/movie-card/movie-card.component';
import { MovieService } from '../../../../core/services/movie.service';
import { RouterLink } from '@angular/router';
import { MoviesResponse } from '../../../../shared/models/movie.model';
import { MovieSearch } from '../../components/movie-search/movie-search.component';
import { Observable } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-movies-page',
  imports: [MovieCard, RouterLink, MovieSearch],
  templateUrl: './movies-page.component.html',
})
export class MoviesPage {
  movieService = inject(MovieService);
  searchTerm = signal<string>('');

  moviesResource = rxResource({
    request: () => this.searchTerm(),
    loader: ({ request: name }) => {
      if (!name) return this.movieService.getMovie();
      else return this.movieService.getMovieForName(name);
    }
  })

  searchMovie(event: string) {
    const name = event.toLowerCase().trim();

    this.searchTerm.set(name);
  }


}


