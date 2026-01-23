import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RoomService } from '../../../../room/services/room.service';
import { RoomsResponse } from '../../../../room/interfaces/room.interface';

@Component({
  selector: 'app-room-edit-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './room-edit-page.html',
})
export class RoomEditPage implements OnInit {
  fb = inject(FormBuilder);
  activatedRoute = inject(ActivatedRoute);
  route = inject(Router);
  roomService = inject(RoomService);
  room = signal<RoomsResponse | null>(null);

  hasError = signal(false);

  roomForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    estado: ['Activa', [Validators.required, Validators.minLength(5)]],
  });

  id = this.activatedRoute.snapshot.params['id'];

  ngOnInit(): void {
    this.roomService
      .getRoomForId(this.id)
      .subscribe((data) => this.room.set(data));
  }

  onSubmit() {
    if (this.roomForm.invalid) {
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);
      return;
    }

    const { nombre = '', estado = 'Activa' } = this.roomForm.value;

    this.roomService
      .updateRoom({
        id_sala: +this.id,
        nombre: nombre!,
        estado: estado!,
      })
      .subscribe(() => {
        setTimeout(() => {
          this.route.navigateByUrl(`cinema/room/${this.id}`);
        }, 3000);
      });

    this.hasError.set(true);
    setTimeout(() => {
      this.hasError.set(false);
    }, 2000);
  }
}
