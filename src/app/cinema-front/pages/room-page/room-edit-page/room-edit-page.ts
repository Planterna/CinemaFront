import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-room-edit-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './room-edit-page.html',
})
export class RoomEditPage {
  fb = inject(FormBuilder);
  activatedRoute = inject(ActivatedRoute);

  hasError = signal(false);
  isPosting = signal(false);

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

    const { nombre = '', estado = '' } = this.roomForm.value;
    // this.authService.login(email!, password!).subscribe((isAuthenticated) => {
    //   if (isAuthenticated) {
    //     this.router.navigateByUrl('/');
    //     return;
    //   }
    //   this.hasError.set(true);
    //   setTimeout(() => {
    //     this.hasError.set(false);
    //   }, 2000);
    // });
  }
}
