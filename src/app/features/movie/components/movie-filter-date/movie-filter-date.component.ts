import { Component, output } from '@angular/core';

@Component({
  selector: 'app-movie-filter-date',
  imports: [],
  templateUrl: './movie-filter-date.component.html',
  styles: ``,
})
export class MovieFilterDateComponent {
  action = output<[string,string]>();
}
