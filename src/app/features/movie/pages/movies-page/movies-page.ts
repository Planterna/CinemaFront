import { Component, inject, OnInit, signal } from '@angular/core';
import { MovieCard } from '../../../movie/components/movie-card/movie-card';
import { MovieService } from '../../../../core/services/movie.service';
import { RouterLink } from '@angular/router';
import { MoviesResponse } from '../../../../shared/models/movie.model';
import { MovieSearch } from "../../components/movie-search/movie-search";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movies-page',
  imports: [MovieCard, RouterLink, MovieSearch],
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

  searchMovie(event: any) {
    const name = event.target.value.toLowerCase().trim();

    if (name === '') this.movies();
    else this.movieService.getMovieForName(name).subscribe((data) =>
      data!.length > 0 ? this.movies.set(data!) : this.movies.set([])
     );


    }


}


