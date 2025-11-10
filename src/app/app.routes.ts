import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/home/home')
    },
    {
        path: 'homeworks',
        loadComponent: () => import('./pages/homeworks/homeworks')
    },
    {
        path: '**',
        redirectTo: 'homeworks'
    }
];