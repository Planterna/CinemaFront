import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes'),
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin-dashboard/admin-dashboard.routes'),
  },
  {
    path: '',
    loadChildren: () => import('./features/cinema/cinema.routes'),
  },
];
