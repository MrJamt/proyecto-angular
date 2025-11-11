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
    path: 'edit-homework/:id',
    loadComponent: () => import('./components/homework-edit/homework-edit')
  },    
  {
    path: '**',
    redirectTo: ''
  }
];

export default homeworkRoutes;