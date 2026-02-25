import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { CinemaFrontLayout } from './layout/cinema-front-layout/cinema-front-layout';
import { NotFoundPage } from './pages/not-found-page/not-found-page';
import { DashboardPage } from './pages/dashboard-page/dashboard-page';

export const CinemaRoutes: Routes = [
  {
    path: '',
    component: CinemaFrontLayout,
    children: [
      {
        path: 'dashboard',
        component: DashboardPage,
      },
      {
        path: '',
        component: HomePage,
      },
      {
        path: 'movie',
        loadChildren: () =>
          import('../movie/movie.routes').then((m) => m.MovieRoutes),
      },
      {
        path: 'room',
        loadChildren: () =>
          import('../room/room.routes').then((r) => r.RoomRoutes),
      },
      {
        path: 'assignment',
        loadChildren: () =>
          import('../assignment/assignment.routes').then(
            (r) => r.AssignmentRoutes,
          ),
      },
      {
        path: '**',
        component: NotFoundPage,
      },
    ],
  },
];
export default CinemaRoutes;
