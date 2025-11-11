import { Routes } from '@angular/router';

export const homeworkRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/homework-list/homework-list')
  },
  {
    path: '**',
    redirectTo: ''
  }
];

export default homeworkRoutes;