import { Routes } from '@angular/router';
import { NonInjection } from './non-injection/non-injection';

export const routes: Routes = [
    {
        path: 'non-injected',
        loadComponent: () => NonInjection
    }
];
