import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { AdminDashboardPage } from './pages/admin-dashboard-page/admin-dashboard-page.component';

export default [
  {
    path: '',
    component: AdminLayoutComponent,
    // canMatch: [IsAdminGuard], // Descomenta esto cuando tengas la seguridad
    children: [
      { path: 'dashboard', component: AdminDashboardPage },

      {
        path: 'movie',
        loadChildren: () => import('../movie/movie-admin.routes'),
      },
      {
        path: 'room',
        loadChildren: () => import('../room/room-admin.routes'),
      },
      {
        path: 'assignment',
        loadChildren: () => import('../assignment/assignment-admin.routes'),
      },
      { path: '**', redirectTo: 'dashboard' },
    ],
  },
] as Routes;
