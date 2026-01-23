import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { CinemaFrontLayout } from './layout/cinema-front-layout/cinema-front-layout';
import { NotFoundPage } from './pages/not-found-page/not-found-page';
import { MoviesPage } from './pages/movies-page/movies-page';
import { RoomPage } from './pages/room-page/room-page';
import { DashboardPage } from './pages/dashboard-page/dashboard-page';
import { MovieEditPage } from './pages/movies-page/movie-edit-page/movie-edit-page';
import { AssignmentPage } from './pages/assignment-page/assignment-page';
import { RoomEditPage } from './pages/room-page/room-edit-page/room-edit-page';

export const CinemaFrontRoutes: Routes = [
  {
    path: '',
    component: CinemaFrontLayout,
    children: [
      {
        path: '',
        component: HomePage,
      },
      {
        path: 'movie',
        component: MoviesPage,
      },
      {
        path: 'movie/:id',
        component: MovieEditPage,
      },
      {
        path: 'room',
        component: RoomPage,
      },
      {
        path: 'room/:id',
        component: RoomEditPage,
      },
      {
        path: 'dashboard',
        component: DashboardPage,
      },
      {
        path: 'assignment',
        component: AssignmentPage,
      },
      {
        path: '**',
        component: NotFoundPage,
      },
    ],
  },
];
export default CinemaFrontRoutes;
