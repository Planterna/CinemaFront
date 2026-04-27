import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RoomService } from '../../../../core/services/room.service';
import { RoomsResponse } from '../../../../shared/models/room.model';
import { ModalType } from '../../../movie/components/movie-alert/movie-alert.component';
import { ModalGlobalComponent } from "../../../../shared/components/modal-global/modal-global.component";

@Component({
  selector: 'app-room-new-page',
  imports: [ReactiveFormsModule, RouterLink, ModalGlobalComponent],
  templateUrl: './room-new-page.component.html',
})
export class RoomNewPage {
  fb = inject(FormBuilder);
  activatedRoute = inject(ActivatedRoute);
  route = inject(Router);
  roomService = inject(RoomService);

  tipoModal = signal<ModalType | null>(null);
  tituloModal = signal<string>('');
  descripcionModal = signal<string>('');
  hasError = signal(false);
  isModalOpen = signal<boolean>(false);
  roomSeleccionada = signal<RoomsResponse | null>(null);

  dataSelected = ['Activa', 'Mantenimiento', 'Inactiva'];

  roomForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    estado: ['Activa', [Validators.required, Validators.minLength(5)]],
    imagen_url: [''],
    activo: [false],
  });

  onSubmit() {
    if (this.roomForm.invalid) {
      this.hasError.set(true);
      setTimeout(() => this.hasError.set(false), 2000);
      return;
    }

    const { nombre, estado, activo, imagen_url } = this.roomForm.value;

    this.roomService
      .createRoom({
        nombre: nombre!,
        estado: estado!,
        activo: activo!,
        imagen_url: imagen_url!,
      })
      .subscribe({
        next: () => {
          this.tipoModal.set('SUCCESS');
          this.tituloModal.set('Actualización Exitosa');
          this.descripcionModal.set('La sala se modifico con exito');
          this.isModalOpen.set(true);
        },
        error: () => {
          this.tipoModal.set('ERROR');
          this.tituloModal.set('No se pudo actualizar');
          this.descripcionModal.set('La sala no se puedo modificar');
          this.isModalOpen.set(true);
        },
      });
  }
  abrirModalEliminar(room: RoomsResponse) {
    this.roomSeleccionada.set(room);
    this.isModalOpen.set(true);
  }

  cerrarModal() {
    this.isModalOpen.set(false);
    this.tituloModal.set('');
    this.descripcionModal.set('');
    this.roomSeleccionada.set(null);
  }
}
