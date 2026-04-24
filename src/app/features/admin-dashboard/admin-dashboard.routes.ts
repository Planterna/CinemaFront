import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { AdminDashboardPage } from './pages/admin-dashboard-page/admin-dashboard-page.component';
import { MovieAdminPage } from '../movie/pages/movie-admin-page/movie-admin-page.component';
import { RoomAdminPage } from '../room/pages/room-admin-page/room-admin-page.component';
import { MovieEditPage } from '../movie/pages/movie-edit-page/movie-edit-page.component';
import { RoomEditPage } from '../room/pages/room-edit-page/room-edit-page.component';
import { AssignmentPage } from '../assignment/pages/assignment-page/assignment-page.component';

export const adminDashboardRoutes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    //canMatch: [IsAdminGuard],
    children: [
      {
        path: 'dashboard',
        component: AdminDashboardPage,
      },
      {
        path: 'movie',
        component: MovieAdminPage,
      },
      {
        path: 'movie-edit/:id',
        component: MovieEditPage,
      },
      {
        path: 'room',
        component: RoomAdminPage,
      },
      {
        path: 'room-edit/:id',
        component: RoomEditPage,
      },
      {
        path: 'assignment',
        component: AssignmentPage
      },
      /*  {
        path: 'products/:id',
        component: ,
      },  */
      {
        path: '**',
        redirectTo: 'dashboard',
      },
    ],
  },
];
export default adminDashboardRoutes;
