import { Component } from '@angular/core';
import { INotification, NotificationsService, NotificationType } from './notifications.service';
import { Subscription } from 'rxjs';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-notifications',
    imports: [NgbToast],
    templateUrl: './notifications.component.html',
    styleUrl: './notifications.component.scss',
})
export class NotificationsComponent {
    notifications: INotification[] = [];
    private processing = false;
    private queue: INotification[] = [];

    private sub$!: Subscription;

    constructor(private notificationsService: NotificationsService) {}

    ngOnDestroy(): void {
        this.sub$?.unsubscribe();
    }

    ngOnInit() {
        this.sub$ = this.notificationsService.notifications$.subscribe((n) => {
            this.queue.push(n);

            this.processQueue();
        });
    }

    private processQueue() {
        if (this.processing) {
            return;
        }

        const next = this.queue.shift();

        if (!next) {
            return;
        }

        this.processing = true;

        this.notifications = [next];

        const delay = next.delay ?? 3000;

        setTimeout(() => {
            this.remove(next);

            this.processing = false;

            this.processQueue();
        }, delay);
    }

    remove(notification: INotification) {
        this.notifications = this.notifications.filter((n) => n !== notification);
    }
}
