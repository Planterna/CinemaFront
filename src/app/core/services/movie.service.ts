import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map, switchMap, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MoviesResponse } from '../../shared/models/movie.model';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private http = inject(HttpClient);

  getMovie(): Observable<MoviesResponse[]> {
    return this.http
      .get<MoviesResponse[]>(`${baseUrl}/movie`)
      .pipe(tap((resp) => console.log(resp)));
  }

  getMovieForId(id: string): Observable<MoviesResponse> {
    return this.http.get<MoviesResponse>(`${baseUrl}/movie/${id}`);
  }

  getMovieForDate(fecha_publicacion: string, fecha_fin: string): Observable<MoviesResponse[] | null> {
    return this.http.get<MoviesResponse[]>(
      `${baseUrl}/movie/date/${fecha_publicacion}/${fecha_fin}`,
    );
  }

  getMovieForName(name: string): Observable<MoviesResponse[] | null> {
    return this.http.get<MoviesResponse[]>(`${baseUrl}/movie/title/${name}`);
  }

  updateMovie(movie: MoviesResponse): Observable<MoviesResponse> {
    return this.http.put<MoviesResponse>(
      `${baseUrl}/movie/${movie.id_pelicula}`,
      movie,
    );
  }

  deleteMovie(id: string): Observable<MoviesResponse> {
    return this.http.delete<MoviesResponse>(`${baseUrl}/movie/${id}`);
  }
  createMovie(movie: MoviesResponse): Observable<MoviesResponse> {
    return this.http.post<MoviesResponse>(`${baseUrl}/movie`, movie);
  }
}
