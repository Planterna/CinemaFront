import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MovieService } from '../../../movie/services/movie.service';
import { RoomService } from '../../../room/services/room.service';

@Component({
  selector: 'app-dashboard-page',
  imports: [RouterLink],
  templateUrl: './dashboard-page.html',
})
export class DashboardPage implements OnInit {
  totalMovies = signal<number>(1);
  totalRooms = signal<number>(1);
  totalRoomsActived = signal<number>(1);

  movieService = inject(MovieService);
  roomService = inject(RoomService);

  ngOnInit(): void {
    this.movieService
      .getMovie()
      .subscribe((data) => this.totalMovies.set(data.length));
    this.roomService
      .getRoom()
      .subscribe((data) => this.totalRooms.set(data.length));

    this.roomService
      .getRoomActived()
      .subscribe((data) => this.totalRoomsActived.set(data.length));
  }
}
