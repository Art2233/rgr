import { Routes } from '@angular/router';
import { NonInjection } from './non-injection/non-injection';
import { MainPage } from './main-page/main-page';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => MainPage,
    },
    {
        path: 'non-injected',
        loadComponent: () => NonInjection,
    },
];
