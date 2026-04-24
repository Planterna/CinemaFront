import { Component, inject, signal } from '@angular/core';
import { MovieService } from '../../../../core/services/movie.service';
import { RoomService } from '../../../../core/services/room.service';
import { AssignmentMovieService } from '../../../../core/services/assignment.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-layout',
  imports: [DatePipe],
  templateUrl: './admin-layout.component.html',
})
export class AdminLayoutComponent {
  movieService = inject(MovieService);
  roomService = inject(RoomService);
  assignmentService = inject(AssignmentMovieService);

  movieResource = rxResource({
    loader: () => this.movieService.getMovie()
  })

  roomResource = rxResource({
    loader: () => this.roomService.getRoom()
  })

  assignmentResource = rxResource({
    loader: () => this.assignmentService.getAssignment()
  })

  isSidebarOpen = signal<boolean>(false);

  toggleSidebar() {
    this.isSidebarOpen.update(state => !state);
  }

 }
