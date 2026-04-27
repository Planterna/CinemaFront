import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AssignmentMovieService } from '../../../../core/services/assignment.service';
import { MovieService } from '../../../../core/services/movie.service';
import { RoomService } from '../../../../core/services/room.service';
import { EMPTY } from 'rxjs';
import { AssignmentResponseDTO } from '../../../../shared/models/assignment.model';
import { ModalType } from '../../../movie/components/movie-alert/movie-alert.component';
import { ModalGlobalComponent } from '../../../../shared/components/modal-global/modal-global.component';

@Component({
  selector: 'app-assignment-edit-page',
  imports: [ReactiveFormsModule, RouterLink, ModalGlobalComponent],
  templateUrl: './assignment-edit-page.component.html',
  styles: ``,
})
export class AssignmentEditPage {
  movieService = inject(MovieService);
  roomService = inject(RoomService);
  assignmentService = inject(AssignmentMovieService);
  fb = inject(FormBuilder);
  activatedRoute = inject(ActivatedRoute);
  route = inject(Router);

  tipoModal = signal<ModalType | null>(null);
  tituloModal = signal<string>('');
  descripcionModal = signal<string>('');
  hasError = signal(false);
  isModalOpen = signal<boolean>(false);
  assignmentSeleccionada = signal<AssignmentResponseDTO | null>(null);

  id = this.activatedRoute.snapshot.params['id'];

  movieResource = rxResource({
    loader: () => this.movieService.getMovie(),
  });

  roomResource = rxResource({
    loader: () => this.roomService.getRoomActived(),
  });

  assignmentResource = rxResource({
    request: () => this.activatedRoute.snapshot.params['id'],
    loader: ({ request: id }) => {
      if (!id) {
        setTimeout(() => {
          this.route.navigate(['/admin/assignment']);
        }, 500);
        return EMPTY;
      } else return this.assignmentService.getAssignmentForId(id);
    },
  });

  assignmentForm = this.fb.group({
    id_sala: [, [Validators.required]],
    id_pelicula: [, [Validators.required]],
    fecha_publicacion: [, [Validators.required]],
    fecha_fin: [, [Validators.required]],
    activo: [false],
  });

  onSubmit() {
    if (this.assignmentForm.invalid) {
      this.hasError.set(true);
      setTimeout(() => this.hasError.set(false), 2000);
      return;
    }

    const { id_sala, id_pelicula, fecha_publicacion, fecha_fin, activo } =
      this.assignmentForm.value;

    this.assignmentService
      .updateAssignment({
        id_pelicula_sala: this.id,
        id_pelicula: id_pelicula!,
        id_sala: id_sala!,
        fecha_publicacion: fecha_publicacion!,
        fecha_fin: fecha_fin!,
        activo: activo!,
      })
      .subscribe({
        next: () => {
          this.tipoModal.set('SUCCESS');
          this.tituloModal.set('Actualización Exitosa');
          this.descripcionModal.set('La asignación se modifico con exito');
          this.isModalOpen.set(true);
        },
        error: () => {
          this.tipoModal.set('ERROR');
          this.tituloModal.set('No se pudo actualizar');
          this.descripcionModal.set('La asignación no se puedo modificar');
          this.isModalOpen.set(true);
        },
      });
  }

  parseDate = (date: Date | string | null): string => {
    if (!date) return '';
    const dateStr = typeof date === 'string' ? date : date.toISOString();
    return dateStr.split('T')[0];
  };

  abrirModalEliminar(assignment: AssignmentResponseDTO) {
    this.assignmentSeleccionada.set(assignment);
    this.isModalOpen.set(true);
  }

  cerrarModal() {
    this.isModalOpen.set(false);
    this.tituloModal.set('');
    this.descripcionModal.set('');
    this.assignmentSeleccionada.set(null);
  }
}
