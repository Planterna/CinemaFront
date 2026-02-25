import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe, NgIf } from '@angular/common';
import { AssignmentMovieService } from '../../../../core/services/assignment.service';
import { MovieService } from '../../../../core/services/movie.service';
import { RoomService } from '../../../../core/services/room.service';
import { MoviesResponse } from '../../../../shared/models/movie.model';
import { RoomsResponse } from '../../../../shared/models/room.model';
import { AssignmentResponse } from '../../../../shared/models/assignment.model';

@Component({
  selector: 'app-dashboard-page',
  imports: [RouterLink, NgIf, DatePipe],
  templateUrl: './dashboard-page.html',
})
export class DashboardPage implements OnInit {
  totalMovies = signal<number>(1);
  totalRooms = signal<number>(1);
  totalRoomsActived = signal<number>(1);
  rooms = signal<RoomsResponse[]>([]);
  movies = signal<MoviesResponse[]>([]);
  assignments = signal<AssignmentResponse[]>([]);

  movieService = inject(MovieService);
  roomService = inject(RoomService);
  assignmentService = inject(AssignmentMovieService);

  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  ngOnInit(): void {
    this.movieService.getMovie().subscribe((data) => {
      (this.totalMovies.set(data.length), this.movies.set(data));
    });
    this.roomService.getRoom().subscribe((data) => {
      (this.totalRooms.set(data.length), this.rooms.set(data));
    });

    this.roomService
      .getRoomActived()
      .subscribe((data) => this.totalRoomsActived.set(data.length));

    this.assignmentService
      .getAsignaciones()
      .subscribe((data) => this.assignments.set(data));
  }
}
