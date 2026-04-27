import { Routes } from '@angular/router';
import { MovieAdminPage } from './pages/movie-admin-page/movie-admin-page.component';
import { MovieEditPage } from './pages/movie-edit-page/movie-edit-page.component';
import { MovieNewPage } from './pages/movie-new-page/movie-new-page.component';

export default [
  { path: '', component: MovieAdminPage },
  { path: 'new', component: MovieNewPage },
  { path: 'edit/:id', component: MovieEditPage },
] as Routes;
