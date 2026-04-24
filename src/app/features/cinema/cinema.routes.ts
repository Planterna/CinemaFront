import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page.component';
import { CinemaFrontLayout } from './layout/cinema-front-layout/cinema-front-layout.component';
import { NotFoundPage } from './pages/not-found-page/not-found-page.component';

export const CinemaRoutes: Routes = [
  {
    path: 'cinema',
    component: CinemaFrontLayout,
    children: [
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
  {
    path: '**',
    redirectTo: 'cinema'
  }
];
export default CinemaRoutes;
