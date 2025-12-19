import { Routes } from '@angular/router';
import { RailwayContainerComponent } from './railway-page/railway-container/railway-container.component';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => RailwayContainerComponent,
    },
];
