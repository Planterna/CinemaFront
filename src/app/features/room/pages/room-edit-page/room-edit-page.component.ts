import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RoomService } from '../../../../core/services/room.service';
import { RoomsResponse } from '../../../../shared/models/room.model';
import { ModalType } from '../../../movie/components/movie-alert/movie-alert.component';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, EMPTY, tap } from 'rxjs';
import { ModalGlobalComponent } from "../../../../shared/components/modal-global/modal-global.component";

@Component({
  selector: 'app-room-edit-page',
  imports: [ReactiveFormsModule, RouterLink, ModalGlobalComponent],
  templateUrl: './room-edit-page.component.html',
})
export class RoomEditPage {
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

  id = this.activatedRoute.snapshot.params['id'];

  dataSelected = ['Activa', 'Mantenimiento', 'Inactiva'];

  roomForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    estado: ['Activa', [Validators.required, Validators.minLength(5)]],
    imagen_url: [''],
    activo: [false],
  });

  roomResource = rxResource({
    loader: () =>
      this.roomService.getRoomForId(this.id).pipe(
        tap((room) => {
          if (!room) this.route.navigate([`admin/room`]);
        }),
        catchError((err) => {
          this.route.navigate([`admin/room`]);
          return EMPTY;
        }),
      ),
  });

  onSubmit() {
    if (this.roomForm.invalid) {
      this.hasError.set(true);
      setTimeout(() => this.hasError.set(false), 2000);
      return;
    }

    const { nombre, estado, activo, imagen_url } = this.roomForm.value;

    this.roomService
      .updateRoom({
        id_sala: this.id,
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
