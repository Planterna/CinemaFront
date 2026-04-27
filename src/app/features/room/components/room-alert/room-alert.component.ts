import { Component, input } from '@angular/core';
import { ModalType } from '../../../movie/components/movie-alert/movie-alert.component';

@Component({
  selector: 'app-room-alert',
  imports: [],
  templateUrl: './room-alert.component.html',
  styles: ``,
})
export class RoomAlertComponent {
  descripcion = input.required<string>();
  tipoAlerta = input.required<ModalType>();
}