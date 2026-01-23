import { Component, inject, OnInit, signal } from '@angular/core';
import { MovieService } from '../../../movie/services/movie.service';
import { RoomService } from '../../../room/services/room.service';
import { MoviesResponse } from '../../../movie/interfaces/movie.interface';
import { RoomsResponse } from '../../../room/interfaces/room.interface';

@Component({
  selector: 'app-assignment-page',
  imports: [],
  templateUrl: './assignment-page.html',
})
export class AssignmentPage implements OnInit{
  movieService = inject(MovieService);
  roomService = inject(RoomService);

  movies = signal<MoviesResponse[]>([])
  rooms = signal<RoomsResponse[]>([])

  ngOnInit(): void{
    this.movieService.getMovie().subscribe((data) => this.movies.set(data));
    this.roomService.getRoomActived().subscribe((data) => this.rooms.set(data));
  }
}
