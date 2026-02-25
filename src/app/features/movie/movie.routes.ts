import { Routes } from '@angular/router';
import { MoviesPage } from './pages/movies-page/movies-page';
import { MovieEditPage } from './pages/movie-edit-page/movie-edit-page';
import { MovieNewPage } from './pages/movie-new-page/movie-new-page';

export const MovieRoutes: Routes = [
  {
    path: '',
    component: MoviesPage,
  },
  {
    path: 'new',
    component: MovieNewPage,
  },
  {
    path: 'edit/:id',
    component: MovieEditPage,
  },
];
