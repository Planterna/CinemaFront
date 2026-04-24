import { Component, inject } from '@angular/core';
import { RoomTableComponent } from "../../components/room-table/room-table.component";
import { RoomService } from '../../../../core/services/room.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { RoomsResponse } from '../../../../shared/models/room.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-admin-page',
  imports: [RoomTableComponent],
  templateUrl: './room-admin-page.component.html',
})
export class RoomAdminPage {
  roomService = inject(RoomService);
  router = inject(Router);
  roomResource = rxResource({
    loader: () => this.roomService.getRoom(),
  });

  editRoom = (room: RoomsResponse) => {
    this.router.navigate(['/admin/room-edit/', room.id_sala]);
  };
}
