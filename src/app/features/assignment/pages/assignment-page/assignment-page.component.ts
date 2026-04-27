import { Component, inject, signal } from '@angular/core';
import { AssignmentTableComponent } from '../../components/assignment-table/assignment-table.component';
import { AssignmentMovieService } from '../../../../core/services/assignment.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { AssignmentResponseDTO } from '../../../../shared/models/assignment.model';
import { ModalGlobalComponent } from '../../../../shared/components/modal-global/modal-global.component';
import { ModalType } from '../../../movie/components/movie-alert/movie-alert.component';

@Component({
  selector: 'app-assignment-page',
  imports: [AssignmentTableComponent, RouterLink, ModalGlobalComponent],
  templateUrl: './assignment-page.component.html',
})
export class AssignmentPage {
  assignmentService = inject(AssignmentMovieService);
  router = inject(Router);

  isModalOpen = signal<boolean>(false);
  assignmentSeleccionada = signal<AssignmentResponseDTO | null>(null);
  tipoModal = signal<ModalType | null>(null);
  tituloModal = signal<string>('');
  descripcionModal = signal<string>('');

  assignmentResource = rxResource({
    loader: () => this.assignmentService.getAssignmentFull(),
  });

  editAssignment = (assignment: AssignmentResponseDTO) => {
    this.router.navigate([
      '/admin/assignment/edit/',
      assignment.id_pelicula_sala,
    ]);
  };

  deletedAssignment = () => {
    const assignment = this.assignmentSeleccionada();
    this.assignmentService
      .deleteAssignment(assignment?.id_pelicula_sala!)
      .subscribe({
        next: () => {
          this.tipoModal.set('SUCCESS');
          this.tituloModal.set('Eliminación Éxitosa');
          this.descripcionModal.set('La pelicula se eliminó con éxito');
          this.isModalOpen.set(true);
          this.assignmentResource.reload();
        },
        error: () => {
          this.tipoModal.set('ERROR');
          this.tituloModal.set('No se pudo eliminar');
          this.descripcionModal.set('La pelicula no se puedo eliminar');
          this.isModalOpen.set(true);
        },
      });
  };

  abrirModalEliminar(assignment: AssignmentResponseDTO) {
    this.assignmentSeleccionada.set(assignment);
    this.tipoModal.set('WARNING');
    this.tituloModal.set('¿Estas Seguro de Eliminar?');
    this.descripcionModal.set(
      `Esta pelicula sera eliminada del sistema? - ${assignment.nombre_pelicula} - ${assignment.nombre_sala}`,
    );
    this.isModalOpen.set(true);
  }

  cerrarModal() {
    this.isModalOpen.set(false);
    this.tituloModal.set('');
    this.descripcionModal.set('');
    this.assignmentSeleccionada.set(null);
  }
}
