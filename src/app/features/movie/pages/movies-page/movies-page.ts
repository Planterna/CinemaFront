import { Component, inject, OnInit, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { MovieCard } from '../../../movie/components/movie-card/movie-card';
import { MovieService } from '../../../../core/services/movie.service';
import { RouterLink } from '@angular/router';
import { MoviesResponse } from '../../../../shared/models/movie.model';

@Component({
  selector: 'app-movies-page',
  imports: [MovieCard, RouterLink],
  templateUrl: './movies-page.html',
})
export class MoviesPage implements OnInit {
  movieService = inject(MovieService);

  movies = signal<MoviesResponse[]>([]);

  ngOnInit(): void {
    this.chargeData();
  }

  chargeData() {
    this.movieService.getMovie().subscribe((data) => this.movies.set(data));
  }
}
