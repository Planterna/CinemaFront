import { Component, output } from '@angular/core';

@Component({
  selector: 'movie-search',
  imports: [],
  templateUrl: './movie-search.html',
})
export class MovieSearch {

  action = output<any>();
  
}
