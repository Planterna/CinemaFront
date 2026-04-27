import { Component, input } from '@angular/core';

export type ModalType = 'SUCCESS' | 'WARNING' | 'ERROR';

@Component({
  selector: 'app-movie-alert',
  imports: [],
  templateUrl: './movie-alert.component.html',
  styles: ``,
})
export class MovieAlertComponent {
  descripcion = input.required<string>();
  tipoAlerta = input.required<ModalType>();
}
