import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AssignmentResponse } from '../../shared/models/assignment.model';

const baseUrl = environment.baseUrl;

@Injectable({ providedIn: 'root' })
export class AssignmentMovieService {
  private http = inject(HttpClient);

  getAssignment(): Observable<AssignmentResponse[]> {
    return this.http
      .get<AssignmentResponse[]>(`${baseUrl}/assignment`)
      .pipe(tap((resp) => console.log(resp)));
  }
  getAssignmentForRoomId(id: string): Observable<AssignmentResponse> {
    return this.http.get<AssignmentResponse>(
      `${baseUrl}/assignment/sala/${id}`,
    );
  }

  deleteAssignment(id: string): Observable<AssignmentResponse> {
    return this.http.delete<AssignmentResponse>(
      `${baseUrl}/assignment/${id}`,
    );
  }

  createAssignment(
    assignment: AssignmentResponse,
  ): Observable<AssignmentResponse> {
    return this.http.post<AssignmentResponse>(
      `${baseUrl}/assignment`,
      assignment,
    );
  }
}
