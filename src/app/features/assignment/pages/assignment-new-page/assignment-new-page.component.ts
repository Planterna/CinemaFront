import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AssignmentMovieService } from '../../../../core/services/assignment.service';
import { MovieService } from '../../../../core/services/movie.service';
import { RoomService } from '../../../../core/services/room.service';
import { ModalGlobalComponent } from '../../../../shared/components/modal-global/modal-global.component';
import { AssignmentResponseDTO } from '../../../../shared/models/assignment.model';
import { ModalType } from '../../../movie/components/movie-alert/movie-alert.component';

@Component({
  selector: 'app-assignment-new-page',
  imports: [ReactiveFormsModule, RouterLink, ModalGlobalComponent],
  templateUrl: './assignment-new-page.component.html',
  styles: ``,
})
export class AssignmentNewPage {
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
      .createAssignment({
        id_pelicula: id_pelicula!,
        id_sala: id_sala!,
        fecha_publicacion: fecha_publicacion!,
        fecha_fin: fecha_fin!,
        activo: activo!,
      })
      .subscribe({
        next: () => {
          this.tipoModal.set('SUCCESS');
          this.tituloModal.set('Creación Exitosa');
          this.descripcionModal.set('La asignación se crep con exito');
          this.isModalOpen.set(true);
        },
        error: () => {
          this.tipoModal.set('ERROR');
          this.tituloModal.set('No se pudo crear');
          this.descripcionModal.set('La asignación no se pudo crear');
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
