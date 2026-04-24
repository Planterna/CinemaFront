import { Component, inject, input, output } from '@angular/core';
import { Router } from '@angular/router';
import { RoomsResponse } from '../../../../shared/models/room.model';

@Component({
  selector: 'app-room-table',
  imports: [],
  templateUrl: './room-table.component.html',
})
export class RoomTableComponent {
  router = inject(Router);

  rooms = input.required<RoomsResponse[]>();
  edit = output<any>();
}
