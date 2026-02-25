import { Component, inject, OnInit, signal } from '@angular/core';
import { RoomCard } from '../../../room/components/room-card/room-card';
import { RoomService } from '../../../../core/services/room.service';
import { RouterLink } from '@angular/router';
import { RoomsResponse } from '../../../../shared/models/room.model';

@Component({
  selector: 'app-room-page',
  imports: [RoomCard, RouterLink],
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
