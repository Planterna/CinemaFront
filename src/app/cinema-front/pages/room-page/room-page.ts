import { Component, inject, OnInit, signal } from '@angular/core';
import { RoomCard } from '../../../room/components/room-card/room-card';
import { RoomsResponse } from '../../../room/interfaces/room.interface';
import { RoomService } from '../../../room/services/room.service';

@Component({
  selector: 'app-room-page',
  imports: [RoomCard],
  templateUrl: './room-page.html',
})
export class RoomPage implements OnInit {
  roomsService = inject(RoomService);
  rooms = signal<RoomsResponse[]>([]);

  ngOnInit(): void {
    this.chargeData();
  }

  chargeData() {
    this.roomsService.getRoom().subscribe((data) => this.rooms.set(data));
  }
}
