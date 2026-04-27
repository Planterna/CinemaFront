import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'front-navbar',
  imports: [RouterLink, NgIf],
  templateUrl: './front-navbar.component.html',
})
export class FrontNavbar {
  authService = inject(AuthService);
  isMenuOpen = false;
  currentUser = this.authService.currentUser;

  logout() {
    this.authService.logout();
  }
}
