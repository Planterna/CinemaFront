import { Component, output, signal } from '@angular/core';

@Component({
  selector: 'app-movie-filter-date',
  imports: [],
  templateUrl: './movie-filter-date.component.html',
  styles: ``,
})
export class MovieFilterDateComponent {
  action = output<[string,string]>();
  minDate = signal<string>('');
  maxDate = signal<string>('');

  actualizarLimites(fechaInicio: string) {
    if (!fechaInicio) {
      this.minDate.set('');
      this.maxDate.set('');
      return;
    }

    this.minDate.set(fechaInicio);

    const fechaMax = new Date(fechaInicio);
    fechaMax.setMonth(fechaMax.getMonth() + 1);

    const fechaMaxFormateada = fechaMax.toISOString().split('T')[0];
    
    this.maxDate.set(fechaMaxFormateada);
  }
}
