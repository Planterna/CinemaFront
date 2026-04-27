import { Routes } from '@angular/router';
import { RoomAdminPage } from './pages/room-admin-page/room-admin-page.component';
import { RoomNewPage } from './pages/room-new-page/room-new-page.component';
import { RoomEditPage } from './pages/room-edit-page/room-edit-page.component';

export default [
  {
    path: '',
    component: RoomAdminPage,
  },
  {
    path: 'new',
    component: RoomNewPage,
  },
  {
    path: 'edit/:id',
    component: RoomEditPage, 
  },
] as Routes;
