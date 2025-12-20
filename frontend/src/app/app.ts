import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotificationsComponent } from './shared/notifications/notifications.component';
import { AppHeaderComponent } from './app-header/app-header.component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, NotificationsComponent, AppHeaderComponent],
    templateUrl: './app.html',
    styleUrls: ['./app.scss'],
    standalone: true
})
export class App {

}
