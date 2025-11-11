import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/home/home')
    },
    {
        path: 'homeworks',
        loadChildren: () => import('./pages/homeworks/homework.routes')
    },
    {
        path: '**',
        redirectTo: 'homeworks'
    }
];