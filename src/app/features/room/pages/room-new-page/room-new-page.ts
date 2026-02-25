import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RoomService } from '../../../../core/services/room.service';

@Component({
  selector: 'app-room-new-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './room-new-page.html',
})
export class RoomNewPage {
  fb = inject(FormBuilder);
  activatedRoute = inject(ActivatedRoute);
  route = inject(Router);
  roomService = inject(RoomService);

  hasError = signal(false);

  roomForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    estado: ['Activa', [Validators.required, Validators.minLength(5)]],
  });

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
      .createRoom({
        nombre: nombre!,
        estado: estado!,
      })
      .subscribe(() => {
        console.log('Created room')
        setTimeout(() => {
          this.route.navigateByUrl(`cinema/room`);
        }, 3000);
      });

    this.hasError.set(true);
    setTimeout(() => {
      this.hasError.set(false);
    }, 2000);
  }
}
