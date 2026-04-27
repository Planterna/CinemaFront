import { Routes } from '@angular/router';
import { adminGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes'),
  },
  {
    path: 'admin',
    canMatch: [adminGuard],
    loadChildren: () =>
      import('./features/admin-dashboard/admin-dashboard.routes'),
  },
  {
    path: 'cinema',
    loadChildren: () => import('./features/cinema/cinema.routes'),
  },
  {
    path: '',
    redirectTo: 'cinema',
    pathMatch: 'full',
  },
];
