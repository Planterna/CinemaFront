import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map, switchMap, tap } from 'rxjs';
import { MoviesResponse } from '../interfaces/movie.interface';

const baseUrl = `http://localhost:3500/peliculas/`;

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private http = inject(HttpClient);

  getMovie(): Observable<MoviesResponse[]> {
    return this.http
      .get<MoviesResponse[]>(baseUrl)
      .pipe(tap((resp) => console.log(resp)));
  }

  getMovieForId(id: number): Observable<MoviesResponse> {
    return this.http.get<MoviesResponse>(`${baseUrl}/${id}`);
  }

  updateMovie(movie: MoviesResponse): Observable<MoviesResponse> {
    return this.http.put<MoviesResponse>(`${baseUrl}/${movie.id_pelicula}`, {
      movie,
    });
  }

  deleteMovie(id: number): Observable<MoviesResponse> {
    return this.getMovieForId(id).pipe(
      map((movie) => ({ ...movie, status: false })),
      switchMap((body) =>
        this.http.put<MoviesResponse>(`${baseUrl}/${id}`, body),
      ),
    );
  }
  createMovie(movie: MoviesResponse): Observable<MoviesResponse> {
    return this.http.post<MoviesResponse>(baseUrl, movie);
  }
}
