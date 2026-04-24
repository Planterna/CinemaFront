import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';

export const adminDashboardRoutes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    //canMatch: [IsAdminGuard],
    children: [
      /* {
        path: 'products',
        component: ,
      },
      {
        path: 'products/:id',
        component: ,
      }, */
      /* {
        path: '**',
        redirectTo: 'products',
      }, */
    ],
  },
];
export default adminDashboardRoutes;