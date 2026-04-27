import { Routes } from '@angular/router';
import { AssignmentPage } from './pages/assignment-page/assignment-page.component';
import { AssignmentNewPage } from './pages/assignment-new-page/assignment-new-page.component';
import { AssignmentEditPage } from './pages/assignment-edit-page/assignment-edit-page.component';

export default [
  {
    path: '',
    component: AssignmentPage,
  },
  {
    path: 'new',
    component: AssignmentNewPage,
  },
  {
    path: 'edit/:id',
    component: AssignmentEditPage,
  },
] as Routes;
