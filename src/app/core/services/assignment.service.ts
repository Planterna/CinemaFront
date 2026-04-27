import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  AssignmentResponse,
  AssignmentResponseDTO,
} from '../../shared/models/assignment.model';

const baseUrl = environment.baseUrl;

@Injectable({ providedIn: 'root' })
export class AssignmentMovieService {
  private http = inject(HttpClient);

  getAssignment(): Observable<AssignmentResponse[]> {
    return this.http.get<AssignmentResponse[]>(`${baseUrl}/assignment`);
  }

  getAssignmentForId(id: string): Observable<AssignmentResponse> {
    return this.http.get<AssignmentResponse>(`${baseUrl}/assignment/${id}`);
  }
  getAssignmentFull(): Observable<AssignmentResponseDTO[]> {
    return this.http.get<AssignmentResponseDTO[]>(`${baseUrl}/assignment/full`);
  }
  getAssignmentFullActived(): Observable<AssignmentResponseDTO[]> {
    return this.http
      .get<AssignmentResponseDTO[]>(`${baseUrl}/assignment/full`)
      .pipe(
        map((data) => {
          return data.filter((assignment) => assignment.activo === true);
        }),
      );
  }
  getAssignmentForRoomId(id: string): Observable<AssignmentResponse> {
    return this.http.get<AssignmentResponse>(
      `${baseUrl}/assignment/sala/${id}`,
    );
  }

  deleteAssignment(id: string): Observable<AssignmentResponse> {
    return this.http.delete<AssignmentResponse>(`${baseUrl}/assignment/${id}`);
  }

  createAssignment(
    assignment: AssignmentResponse,
  ): Observable<AssignmentResponse> {
    return this.http.post<AssignmentResponse>(
      `${baseUrl}/assignment`,
      assignment,
    );
  }

  updateAssignment(data: AssignmentResponse): Observable<AssignmentResponse> {
    return this.http.put<AssignmentResponse>(
      `${baseUrl}/assignment/${data.id_pelicula_sala}`,
      data,
    );
  }
}
