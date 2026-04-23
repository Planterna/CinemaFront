import { Component, inject, OnInit, signal } from '@angular/core';
import { RoomCard } from '../../../room/components/room-card/room-card.component';
import { RoomService } from '../../../../core/services/room.service';
import { RouterLink } from '@angular/router';
import { RoomsResponse } from '../../../../shared/models/room.model';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-room-page',
  imports: [RoomCard, RouterLink],
  templateUrl: './room-page.component.html',
})
export class RoomPage {
  roomsService = inject(RoomService);
  roomResource = rxResource({
    loader: () => {
      return this.roomsService.getRoom();
    },
  });
}
