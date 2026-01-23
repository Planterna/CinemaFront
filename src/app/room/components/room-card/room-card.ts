import { Component, input } from '@angular/core';
import { RoomsResponse } from '../../interfaces/room.interface';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-room-card',
  imports: [RouterLink],
  templateUrl: './room-card.html',
})
export class RoomCard {
  rooms = input.required<RoomsResponse[]>();
}
