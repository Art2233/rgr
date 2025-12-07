import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-main-page',
    imports: [],
    templateUrl: './main-page.html',
    styleUrl: './main-page.scss',
})
export class MainPage {
    constructor(
        private router: Router
    ) {}
    goTo(url: 'non-injected' | 'railway') {
        this.router.navigate([url]);
    }
}
