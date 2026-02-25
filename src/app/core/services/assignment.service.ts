import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AssignmentResponse } from '../../shared/models/assignment.model';

const baseUrl = environment.baseUrl;

@Injectable({ providedIn: 'root' })
export class AssignmentMovieService {
  private http = inject(HttpClient);

  getAsignaciones(): Observable<AssignmentResponse[]> {
    return this.http
      .get<AssignmentResponse[]>(`${baseUrl}/asignaciones`)
      .pipe(tap((resp) => console.log(resp)));
  }
  getAssignmentForRoomId(id: number): Observable<AssignmentResponse> {
    return this.http.get<AssignmentResponse>(
      `${baseUrl}/asignaciones/sala/${id}`,
    );
  }

  deleteAssignment(id: number): Observable<AssignmentResponse> {
    return this.http.delete<AssignmentResponse>(
      `${baseUrl}/asignaciones/${id}`,
    );
  }

  createAssignment(
    assignment: AssignmentResponse,
  ): Observable<AssignmentResponse> {
    return this.http.post<AssignmentResponse>(
      `${baseUrl}/asignaciones`,
      assignment,
    );
  }
}
