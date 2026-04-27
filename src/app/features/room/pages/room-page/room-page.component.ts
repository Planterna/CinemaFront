import { Component, inject, OnInit, signal } from '@angular/core';
import { RoomCard } from '../../../room/components/room-card/room-card.component';
import { RoomService } from '../../../../core/services/room.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { NoDataComponent } from "../../../../shared/components/no-data/no-data.component";

@Component({
  selector: 'app-room-page',
  imports: [RoomCard, NoDataComponent],
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
