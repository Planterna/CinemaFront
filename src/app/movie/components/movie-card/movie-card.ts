import { Component, input } from '@angular/core';
import { MoviesResponse } from '../../interfaces/movie.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  imports: [RouterLink],
  templateUrl: './movie-card.html',
})
export class MovieCard {
  movies = input.required<MoviesResponse[]>();
}
