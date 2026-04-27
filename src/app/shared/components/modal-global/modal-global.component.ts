import { Component, input, output } from '@angular/core';
import { MovieAlertComponent } from '../../../features/movie/components/movie-alert/movie-alert.component';
import { RoomAlertComponent } from "../../../features/room/components/room-alert/room-alert.component";
import { AssignmentAlertComponent } from "../../../features/assignment/components/assignment-alert/assignment-alert.component";

export type ModalType = 'SUCCESS' | 'WARNING' | 'ERROR';
export type ModuleType = 'MOVIE' | 'ROOM' | 'ASSIGNMENT';

@Component({
  selector: 'app-modal-global',
  imports: [MovieAlertComponent, RoomAlertComponent, AssignmentAlertComponent],
  templateUrl: './modal-global.component.html',
  styles: ``,
})
export class ModalGlobalComponent {
  tipo = input.required<ModalType>();
  modulo = input.required<ModuleType>();
  titulo = input.required<string>();
  descripcion = input.required<string>();

  onClose = output<void>();
  onAccept = output<void>();

  get showAcceptButton(): boolean {
    return this.tipo() === 'WARNING';
  }
}
