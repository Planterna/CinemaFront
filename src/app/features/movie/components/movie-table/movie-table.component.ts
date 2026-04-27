import { Component, inject, input, output } from '@angular/core';
import { MoviesResponse } from '../../../../shared/models/movie.model';
import { Router } from '@angular/router';
import { NoDataComponent } from "../../../../shared/components/no-data/no-data.component";

@Component({
  selector: 'app-movie-table',
  imports: [NoDataComponent],
  templateUrl: './movie-table.component.html',
})
export class MovieTableComponent {
  router = inject(Router);

  movies = input.required<MoviesResponse[]>();
  edit = output<any>();
  delete = output<any>();
}
