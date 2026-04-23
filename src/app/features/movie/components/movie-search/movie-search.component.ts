import { Component, output } from '@angular/core';

@Component({
  selector: 'movie-search',
  imports: [],
  templateUrl: './movie-search.component.html',
})
export class MovieSearch {

  action = output<any>();
  
}
