import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './admin-layout.component.html',
})
export class AdminLayoutComponent {
  isSidebarOpen = signal<boolean>(false);
  authService = inject(AuthService);
  currentUser = this.authService.currentUser;

  toggleSidebar() {
    this.isSidebarOpen.update((state) => !state);
  }

  logout() {
    this.authService.logout();
  }
}
