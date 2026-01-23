import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'cinema',
    loadChildren: () => import('./cinema-front/cinema-front.routes'),
  },
  {
    path: '',
    loadChildren: () => import('./auth/auth.routes'),
  },
];
