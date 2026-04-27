import { Component, input } from '@angular/core';
import { ModalType } from '../../../movie/components/movie-alert/movie-alert.component';

@Component({
  selector: 'app-assignment-alert',
  imports: [],
  templateUrl: './assignment-alert.component.html',
  styles: ``,
})
export class AssignmentAlertComponent {
  descripcion = input.required<string>();
  tipoAlerta = input.required<ModalType>();
}
