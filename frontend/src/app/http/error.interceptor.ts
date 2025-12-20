import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { catchError, throwError } from 'rxjs';
import { NotificationsService } from '../shared/notifications/notifications.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const notificationsService = inject(NotificationsService);

    return next(req).pipe(
        catchError((err) => {
            notificationsService.error(err?.message ?? 'An error occurred');
            return throwError(() => err);
        }),
    );
};