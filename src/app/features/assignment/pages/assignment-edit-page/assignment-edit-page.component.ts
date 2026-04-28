import { Component, inject, signal, DestroyRef, effect } from '@angular/core';
import { rxResource, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AssignmentMovieService } from '../../../../core/services/assignment.service';
import { MovieService } from '../../../../core/services/movie.service';
import { RoomService } from '../../../../core/services/room.service';
import { EMPTY } from 'rxjs';
import { ModalType } from '../../../movie/components/movie-alert/movie-alert.component';
import { ModalGlobalComponent } from '../../../../shared/components/modal-global/modal-global.component';

@Component({
  selector: 'app-assignment-edit-page',
  imports: [ReactiveFormsModule, RouterLink, ModalGlobalComponent],
  templateUrl: './assignment-edit-page.component.html',
})
export class AssignmentEditPage {
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

  minDateFin = signal<string>('');
  maxDateFin = signal<string>('');

  id = this.activatedRoute.snapshot.params['id'];

  movieResource = rxResource({
    loader: () => this.movieService.getMovie(),
  });

  roomResource = rxResource({
    loader: () => this.roomService.getRoomActived(),
  });

  assignmentResource = rxResource({
    request: () => this.id,
    loader: ({ request: id }) => {
      if (!id) {
        setTimeout(() => this.route.navigate(['/admin/assignment']), 500);
        return EMPTY;
      }
      return this.assignmentService.getAssignmentForId(id);
    },
  });

  assignmentForm = this.fb.group({
    id_sala: ['', [Validators.required]],
    id_pelicula: ['', [Validators.required]],
    fecha_publicacion: ['', [Validators.required]],
    fecha_fin: [{ value: '', disabled: true }, [Validators.required]],
    activo: [false],
  });

  constructor() {
    this.assignmentForm
      .get('fecha_publicacion')
      ?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((fechaInicio) => {
        this.actualizarLimites(fechaInicio);
      });

    effect(() => {
      const assignment = this.assignmentResource.value();
      if (assignment) {
        const fechaPub = this.parseDate(assignment.fecha_publicacion);
        const fechaFin = this.parseDate(assignment.fecha_fin);

        this.actualizarLimites(fechaPub);

        this.assignmentForm.patchValue({
          id_sala: assignment.id_sala,
          id_pelicula: assignment.id_pelicula,
          fecha_publicacion: fechaPub,
          fecha_fin: fechaFin,
          activo: assignment.activo,
        });
      }
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
    if (
      fechaFinActual &&
      (fechaFinActual < fechaInicio || fechaFinActual > fechaMaxFormateada)
    ) {
      controlFin?.setValue('');
    }
  }

  parseDate = (date: Date | string | null | undefined): string => {
    if (!date) return '';
    const dateStr =
      typeof date === 'string' ? date : new Date(date).toISOString();
    return dateStr.split('T')[0];
  };

  onSubmit() {
    if (this.assignmentForm.invalid) {
      this.hasError.set(true);
      setTimeout(() => this.hasError.set(false), 2000);
      return;
    }

    const { id_sala, id_pelicula, fecha_publicacion, fecha_fin, activo } =
      this.assignmentForm.getRawValue(); 

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
          this.descripcionModal.set('La asignación se modificó con éxito');
          this.isModalOpen.set(true);
        },
        error: (err) => {
          this.tipoModal.set('ERROR'); 
          this.tituloModal.set('No se pudo actualizar');
          this.descripcionModal.set(
            err.error?.message || 'La asignación no se pudo modificar',
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
