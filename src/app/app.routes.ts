import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'cinema',
    loadChildren: () => import('./features/cinema/cinema.routes'),
  },
  {
    path: '',
    loadChildren: () => import('./features/auth/auth.routes'),
  },
];
