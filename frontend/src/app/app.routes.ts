import { Routes } from '@angular/router';
import { RailwayContainerComponent } from './railway-page/railway-container/railway-container.component';
import { LoginPageComponent } from './login-page/login-page.component';

export const routes: Routes = [
    {
        path: 'railway',
        loadComponent: () => RailwayContainerComponent,
    },
    {
        path: 'login',
        loadComponent: () => LoginPageComponent,
    },
    {
        path: '**',
        redirectTo: 'login',
    },
];
