import { Component, input } from '@angular/core';

@Component({
  selector: 'no-data',
  imports: [],
  templateUrl: './no-data.component.html',
  styles: ``,
})
export class NoDataComponent {
  titulo = input.required<string>();
}
