import { Routes } from '@angular/router';
import { RoomPage } from './pages/room-page/room-page.component';
import { RoomEditPage } from './pages/room-edit-page/room-edit-page.component';
import { RoomNewPage } from './pages/room-new-page/room-new-page.component';

export const RoomRoutes: Routes = [
  {
    path: '',
    component: RoomPage,
  },
  {
    path: 'new',
    component: RoomNewPage,
  },
  {
    path: 'edit/:id',
    component: RoomEditPage,
  },
];
