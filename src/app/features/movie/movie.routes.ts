import { Routes } from '@angular/router';
import { MoviesPage } from './pages/movies-page/movies-page.component';
import { MovieEditPage } from './pages/movie-edit-page/movie-edit-page.component';
import { MovieNewPage } from './pages/movie-new-page/movie-new-page.component';

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
