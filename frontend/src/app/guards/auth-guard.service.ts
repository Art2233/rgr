import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { IStore } from '../reducer';

export const authGuard: CanActivateFn = () => {
    const router = inject(Router);
    const store = inject(Store<IStore>);

    return store.select((s) => s.loginPage.user).pipe(
        map((user) => {
            if (!user) {
                router.navigate(['/login']);
                return false;
            }
            return true;
        }),
    );
};

export const isUserAuth: CanActivateFn = () => {
    const router = inject(Router);
    const store = inject(Store<IStore>);

    return store.select((s) => s.loginPage.user).pipe(
        map((user) => {
            if (user) {
                router.navigate(['/railway']);
                return false;
            }
            return true;
        }),
    );
};