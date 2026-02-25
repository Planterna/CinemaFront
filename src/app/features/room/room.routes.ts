import { Routes } from '@angular/router';
import { RoomPage } from './pages/room-page/room-page';
import { RoomEditPage } from './pages/room-edit-page/room-edit-page';
import { RoomNewPage } from './pages/room-new-page/room-new-page';

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
