import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export enum NotificationType {
    Success = 'success',
    Error = 'error',
    Warning = 'warning',
    Info = 'info',
}

export interface INotification {
    delay: number;
    message: string;
    type: NotificationType;
}

@Injectable({
    providedIn: 'root',
})
export class NotificationsService {
    private toastQueue$ = new Subject<INotification>();

    error(message: string, delay = 3000) {
        this.show({ delay, message, type: NotificationType.Error });
    }

    info(message: string, delay = 3000) {
        this.show({ delay, message, type: NotificationType.Info });
    }

    show(message: INotification) {
        this.toastQueue$.next(message);
    }

    success(message: string, delay = 3000) {
        this.show({ delay, message, type: NotificationType.Success });
    }

    warning(message: string, delay = 3000) {
        this.show({ delay, message, type: NotificationType.Warning });
    }

    get notifications$(): Observable<INotification> {
        return this.toastQueue$.asObservable();
    }
}
