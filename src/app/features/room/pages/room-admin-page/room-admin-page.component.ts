import { Component, inject, signal } from '@angular/core';
import { RoomTableComponent } from '../../components/room-table/room-table.component';
import { RoomService } from '../../../../core/services/room.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { RoomsResponse } from '../../../../shared/models/room.model';
import { Router, RouterLink } from '@angular/router';
import { ModalGlobalComponent } from '../../../../shared/components/modal-global/modal-global.component';
import { ModalType } from '../../../movie/components/movie-alert/movie-alert.component';

@Component({
  selector: 'app-room-admin-page',
  imports: [RoomTableComponent, RouterLink, ModalGlobalComponent],
  templateUrl: './room-admin-page.component.html',
})
export class RoomAdminPage {
  roomService = inject(RoomService);
  router = inject(Router);
  tipoModal = signal<ModalType | null>(null);
  tituloModal = signal<string>('');
  descripcionModal = signal<string>('');

  hasError = signal(false);
  isModalOpen = signal<boolean>(false);
  roomSeleccionada = signal<RoomsResponse | null>(null);

  roomResource = rxResource({
    loader: () => this.roomService.getRoom(),
  });

  editRoom = (room: RoomsResponse) => {
    this.router.navigate(['/admin/room/edit/', room.id_sala]);
  };

  deletedRoom = () => {
    const room = this.roomSeleccionada();
    this.roomService.deleteRoom(room?.id_sala!).subscribe({
      next: () => {
        this.tipoModal.set('SUCCESS');
        this.tituloModal.set('Eliminación Éxitosa');
        this.descripcionModal.set('La sala se eliminó con éxito');
        this.isModalOpen.set(true);
        this.roomResource.reload();
      },
      error: () => {
        this.tipoModal.set('ERROR');
        this.tituloModal.set('No se pudo eliminar');
        this.descripcionModal.set('La sala no se puedo eliminar');
        this.isModalOpen.set(true);
      },
    });
  };

  abrirModalEliminar(movie: RoomsResponse) {
    this.roomSeleccionada.set(movie);
    this.tipoModal.set('WARNING');
    this.tituloModal.set('¿Estas Seguro de Eliminar?');
    this.descripcionModal.set(
      `Esta sala sera eliminada del sistema? - ${movie.nombre}`,
    );
    this.isModalOpen.set(true);
  }

  cerrarModal() {
    this.isModalOpen.set(false);
    this.tituloModal.set('');
    this.descripcionModal.set('');
    this.roomSeleccionada.set(null);
  }
}
