import { Component, inject, input, output } from '@angular/core';
import { MoviesResponse } from '../../../../shared/models/movie.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-table',
  imports: [],
  templateUrl: './movie-table.component.html'
})
export class MovieTableComponent {

  router = inject(Router);

  movies = input.required<MoviesResponse[]>();
  edit = output<any>();
  

}
