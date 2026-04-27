import { Routes } from '@angular/router';
import { CinemaFrontLayout } from './layout/cinema-front-layout/cinema-front-layout.component';
import { HomePage } from './pages/home-page/home-page.component';
import { NotFoundPage } from './pages/not-found-page/not-found-page.component';

export default [
  {
    path: '',
    component: CinemaFrontLayout,
    children: [
      { path: 'home', component: HomePage },
      {
        path: 'movie',
        loadChildren: () => import('../movie/movie-client.routes'),
      },
      {
        path: 'room',
        loadChildren: () => import('../room/room-client.routes'),
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', component: NotFoundPage },
    ],
  },
] as Routes;
