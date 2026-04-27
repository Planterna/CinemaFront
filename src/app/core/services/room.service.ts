import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap, map, switchMap } from 'rxjs';
import { environment } from './../../../environments/environment';
import { RoomsResponse } from '../../shared/models/room.model';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private http = inject(HttpClient);

  getRoom(): Observable<RoomsResponse[]> {
    return this.http
      .get<RoomsResponse[]>(`${baseUrl}/room`)
      .pipe(tap((resp) => console.log(resp)));
  }
  getRoomActived(): Observable<RoomsResponse[]> {
    return this.http
      .get<RoomsResponse[]>(`${baseUrl}/room`)
      .pipe(map((resp) => resp.filter((r) => r.estado === 'Activa')));
  }

  getRoomForId(id: string): Observable<RoomsResponse> {
    return this.http.get<RoomsResponse>(`${baseUrl}/room/${id}`);
  }

  updateRoom(movie: RoomsResponse): Observable<RoomsResponse> {
    return this.http.put<RoomsResponse>(
      `${baseUrl}/room/${movie.id_sala}`,
      movie,
    );
  }

  deleteRoom(id: string): Observable<RoomsResponse> {
    return this.http.delete<RoomsResponse>(`${baseUrl}/room/${id}`);
  }
  createRoom(room: RoomsResponse): Observable<RoomsResponse> {
    return this.http.post<RoomsResponse>(`${baseUrl}/room`, room);
  }
}
