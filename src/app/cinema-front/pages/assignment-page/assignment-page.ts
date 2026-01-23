import { Component, inject, OnInit, signal } from '@angular/core';
import { MovieService } from '../../../movie/services/movie.service';
import { RoomService } from '../../../room/services/room.service';
import { MoviesResponse } from '../../../movie/interfaces/movie.interface';
import { RoomsResponse } from '../../../room/interfaces/room.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AssignmentMovieService } from './assignment.service';

@Component({
  selector: 'app-assignment-page',
  imports: [ReactiveFormsModule],
  templateUrl: './assignment-page.html',
})
export class AssignmentPage implements OnInit {
  movieService = inject(MovieService);
  roomService = inject(RoomService);
  assignment = inject(AssignmentMovieService);
  fb = inject(FormBuilder);

  assignmentForm = this.fb.group({
    id_sala: [, [Validators.required]],
    id_pelicula: [, [Validators.required]],
    fecha_publicacion: [, [Validators.required]],
    fecha_fin: [ , [Validators.required]],
  });

  activatedRoute = inject(ActivatedRoute);
  route = inject(Router);

  movies = signal<MoviesResponse[]>([]);
  rooms = signal<RoomsResponse[]>([]);
  hasError = signal(false);

  ngOnInit(): void {
    this.movieService.getMovie().subscribe((data) => this.movies.set(data));
    this.roomService.getRoomActived().subscribe((data) => this.rooms.set(data));
  }

  onSubmit() {
    if (this.assignmentForm.invalid) {
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);
      return;
    }

    const {
      id_sala = 0,
      id_pelicula = 0,
      fecha_publicacion = new Date(),
      fecha_fin = new Date(),
    } = this.assignmentForm.value;

    this.assignment
      .createAssignment({
        id_pelicula: +id_pelicula!,
        id_sala: +id_sala!,
        fecha_publicacion: new Date(fecha_publicacion!),
        fecha_fin: new Date(fecha_fin!),
      })
      .subscribe(() => {
        setTimeout(() => {
          console.log('Se creo la asignación... redireccionando')
          this.route.navigateByUrl(`cinema/dashboard`);
        }, 3000);
      });

    this.hasError.set(true);
    setTimeout(() => {
      this.hasError.set(false);
    }, 2000);
  }
}
