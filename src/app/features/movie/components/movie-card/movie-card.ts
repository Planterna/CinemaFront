import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MoviesResponse } from '../../../../shared/models/movie.model';

@Component({
  selector: 'app-movie-card',
  imports: [RouterLink],
  templateUrl: './movie-card.html',
})
export class MovieCard {
  movies = input.required<MoviesResponse[]>();
}
