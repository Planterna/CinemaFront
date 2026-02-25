import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RoomsResponse } from '../../../../shared/models/room.model';

@Component({
  selector: 'app-room-card',
  imports: [RouterLink],
  templateUrl: './room-card.html',
})
export class RoomCard {
  rooms = input.required<RoomsResponse[]>();
}
