import { Routes } from '@angular/router';
import { RailwayContainerComponent } from './railway-page/railway-container/railway-container.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { authGuard, isUserAuth } from './guards/auth-guard.service';

export const routes: Routes = [
    {
        path: 'railway',
        loadComponent: () => RailwayContainerComponent,
        canActivate: [authGuard],
    },
    {
        path: 'login',
        loadComponent: () => LoginPageComponent,
        canActivate: [isUserAuth]
    },
    {
        path: '**',
        redirectTo: 'login',
    },
];
