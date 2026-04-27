import { Component, inject, input, output } from '@angular/core';
import { Router } from '@angular/router';
import { RoomsResponse } from '../../../../shared/models/room.model';
import { NoDataComponent } from "../../../../shared/components/no-data/no-data.component";

@Component({
  selector: 'app-room-table',
  imports: [NoDataComponent],
  templateUrl: './room-table.component.html',
})
export class RoomTableComponent {
  router = inject(Router);

  rooms = input.required<RoomsResponse[]>();
  edit = output<any>();
  delete = output<any>();
}
