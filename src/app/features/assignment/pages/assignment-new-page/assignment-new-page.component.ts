import { Component, inject, signal, DestroyRef } from '@angular/core';
import { takeUntilDestroyed, rxResource } from '@angular/core/rxjs-interop';
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
})
export class AssignmentNewPage {
  movieService = inject(MovieService);
  roomService = inject(RoomService);
  assignmentService = inject(AssignmentMovieService);
  fb = inject(FormBuilder);
  activatedRoute = inject(ActivatedRoute);
  route = inject(Router);
  destroyRef = inject(DestroyRef);

  tipoModal = signal<ModalType | null>(null);
  tituloModal = signal<string>('');
  descripcionModal = signal<string>('');
  hasError = signal(false);
  isModalOpen = signal<boolean>(false);
  assignmentSeleccionada = signal<AssignmentResponseDTO | null>(null);

  minDateFin = signal<string>('');
  maxDateFin = signal<string>('');

  movieResource = rxResource({
    loader: () => this.movieService.getMovie(),
  });

  roomResource = rxResource({
    loader: () => this.roomService.getRoomActived(),
  });

  assignmentForm = this.fb.group({
    id_sala: ['', [Validators.required]],
    id_pelicula: ['', [Validators.required]],
    fecha_publicacion: ['', [Validators.required]],
    fecha_fin: [{ value: '', disabled: true }, [Validators.required]],
    activo: [true],
  });

  constructor() {
    this.assignmentForm
      .get('fecha_publicacion')
      ?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((fechaInicio) => {
        this.actualizarLimites(fechaInicio);
      });
  }

  private actualizarLimites(fechaInicio: string | null | undefined) {
    const controlFin = this.assignmentForm.get('fecha_fin');

    if (!fechaInicio) {
      this.minDateFin.set('');
      this.maxDateFin.set('');
      controlFin?.disable();
      controlFin?.setValue('');
      return;
    }

    controlFin?.enable();
    this.minDateFin.set(fechaInicio);

    const fechaMax = new Date(fechaInicio);
    fechaMax.setMonth(fechaMax.getMonth() + 1);
    const fechaMaxFormateada = fechaMax.toISOString().split('T')[0];

    this.maxDateFin.set(fechaMaxFormateada);

    const fechaFinActual = controlFin?.value;
    if (fechaFinActual) {
      if (fechaFinActual < fechaInicio || fechaFinActual > fechaMaxFormateada) {
        controlFin?.setValue('');
      }
    }
  }

  onSubmit() {
    if (this.assignmentForm.invalid) {
      this.hasError.set(true);
      setTimeout(() => this.hasError.set(false), 2000);
      return;
    }

    const { id_sala, id_pelicula, fecha_publicacion, fecha_fin, activo } =
      this.assignmentForm.getRawValue();

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
          this.descripcionModal.set('La asignación se creó con éxito');
          this.isModalOpen.set(true);
        },
        error: (err) => {
          this.tipoModal.set('ERROR');
          this.tituloModal.set('No se pudo crear');
          this.descripcionModal.set(
            err.error?.message || 'La asignación no se pudo crear',
          );
          this.isModalOpen.set(true);
        },
      });
  }

  cerrarModal() {
    this.isModalOpen.set(false);
    this.tituloModal.set('');
    this.descripcionModal.set('');
    if (this.tipoModal() === 'SUCCESS') {
      this.route.navigateByUrl('/admin/assignment');
    }
  }
}
