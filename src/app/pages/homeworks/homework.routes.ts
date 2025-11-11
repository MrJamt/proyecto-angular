import { Routes } from '@angular/router';

export const homeworkRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/homework-list/homework-list')
  },
  {
    path: 'create-homework',
    loadComponent: () => import('./components/homework-create/homework-create')
  },
  {
    path: '**',
    redirectTo: ''
  }
];

export default homeworkRoutes;