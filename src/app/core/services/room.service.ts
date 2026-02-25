import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap, map, switchMap } from 'rxjs';
import { environment } from './../../../environments/environment.development';
import { RoomsResponse } from '../../shared/models/room.model';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private http = inject(HttpClient);

  getRoom(): Observable<RoomsResponse[]> {
    return this.http
      .get<RoomsResponse[]>(`${baseUrl}/salas`)
      .pipe(tap((resp) => console.log(resp)));
  }
  getRoomActived(): Observable<RoomsResponse[]> {
    return this.http
      .get<RoomsResponse[]>(`${baseUrl}/salas`)
      .pipe(map((resp) => resp.filter((r) => r.estado === 'Activa')));
  }

  getRoomForId(id: number): Observable<RoomsResponse> {
    return this.http.get<RoomsResponse>(`${baseUrl}/salas/${id}`);
  }

  updateRoom(movie: RoomsResponse): Observable<RoomsResponse> {
    return this.http.put<RoomsResponse>(
      `${baseUrl}/salas/${movie.id_sala}`,
      movie,
    );
  }

  deleteRoom(id: number): Observable<RoomsResponse> {
    return this.getRoomForId(id).pipe(
      map((movie) => ({ ...movie, status: false })),
      switchMap((body) =>
        this.http.put<RoomsResponse>(`${baseUrl}/salas/${id}`, body),
      ),
    );
  }
  createRoom(room: RoomsResponse): Observable<RoomsResponse> {
    return this.http.post<RoomsResponse>(`${baseUrl}/salas`, room);
  }
}
