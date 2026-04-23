import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MovieService } from '../../../../core/services/movie.service';
import { RoomService } from '../../../../core/services/room.service';
import { AssignmentMovieService } from '../../../../core/services/assignment.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-assignment-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './assignment-page.component.html',
})
export class AssignmentPage {
  movieService = inject(MovieService);
  roomService = inject(RoomService);
  assignment = inject(AssignmentMovieService);
  fb = inject(FormBuilder);
  activatedRoute = inject(ActivatedRoute);
  route = inject(Router);

  movieResource = rxResource({
    loader: () => this.movieService.getMovie()
  })

  roomResource = rxResource({
    loader: () => this.roomService.getRoomActived()
  })
  
  hasError = signal(false);
  
  assignmentForm = this.fb.group({
    id_sala: [, [Validators.required]],
    id_pelicula: [, [Validators.required]],
    fecha_publicacion: [, [Validators.required]],
    fecha_fin: [, [Validators.required]],
  });

  onSubmit() {
    if (this.assignmentForm.invalid) {
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);
      return;
    }

    const {
      id_sala = '',
      id_pelicula = '',
      fecha_publicacion = '',
      fecha_fin = '',
    } = this.assignmentForm.value;

    this.assignment
      .createAssignment({
        id_pelicula: id_pelicula!,
        id_sala: id_sala!,
        fecha_publicacion: fecha_publicacion!,
        fecha_fin: fecha_fin!,
      })
      .subscribe(() => {
        setTimeout(() => {
          console.log('Se creo la asignación... redireccionando');
          this.route.navigateByUrl(`cinema/dashboard`);
        }, 3000);
      });

    this.hasError.set(true);
    setTimeout(() => {
      this.hasError.set(false);
    }, 2000);
  }
}
