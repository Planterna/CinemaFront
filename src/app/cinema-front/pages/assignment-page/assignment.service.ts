import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap, tap } from 'rxjs';

export interface Assignment {
  id?: number;
  id_pelicula: number;
  id_sala: number;
  fecha_publicacion: Date;
  fecha_fin: Date;
}

const baseUrl = environment.baseUrl;

@Injectable({ providedIn: 'root' })
export class AssignmentMovieService {
  private http = inject(HttpClient);

  getAsignaciones(): Observable<Assignment[]> {
    return this.http
      .get<Assignment[]>(`${baseUrl}/asignaciones`)
      .pipe(tap((resp) => console.log(resp)));
  }
  getAssignmentForRoomId(id: number): Observable<Assignment> {
    return this.http.get<Assignment>(`${baseUrl}/asignaciones/sala/${id}`);
  }

  deleteAssignment(id: number): Observable<Assignment> {
    return this.http.delete<Assignment>(`${baseUrl}/asignaciones/${id}`);
  }

  createAssignment(assignment: Assignment): Observable<Assignment> {
    return this.http.post<Assignment>(`${baseUrl}/asignaciones`, assignment);
  }
}
