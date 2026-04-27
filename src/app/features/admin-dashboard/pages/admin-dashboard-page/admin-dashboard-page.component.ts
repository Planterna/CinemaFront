import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { AssignmentMovieService } from '../../../../core/services/assignment.service';
import { MovieService } from '../../../../core/services/movie.service';
import { RoomService } from '../../../../core/services/room.service';
import { AssignmentTableComponent } from '../../../assignment/components/assignment-table/assignment-table.component';

@Component({
  selector: 'app-admin-dashboard-page',
  imports: [AssignmentTableComponent],
  templateUrl: './admin-dashboard-page.component.html',
})
export class AdminDashboardPage {
  movieService = inject(MovieService);
  roomService = inject(RoomService);
  assignmentService = inject(AssignmentMovieService);

  movieResource = rxResource({
    loader: () => this.movieService.getMovie(),
  });

  roomResource = rxResource({
    loader: () => this.roomService.getRoom(),
  });

  roomActivedResource = rxResource({
    loader: () => this.roomService.getRoomActived(),
  });

  assignmentResource = rxResource({
    loader: () => this.assignmentService.getAssignmentFullActived(),
  });
}
