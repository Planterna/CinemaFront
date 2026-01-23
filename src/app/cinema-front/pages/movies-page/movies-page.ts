import { Component, inject, OnInit, signal } from '@angular/core';
import { MovieService } from '../../../movie/services/movie.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { MovieCard } from '../../../movie/components/movie-card/movie-card';
import { MoviesResponse } from '../../../movie/interfaces/movie.interface';

@Component({
  selector: 'app-movies-page',
  imports: [MovieCard],
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
