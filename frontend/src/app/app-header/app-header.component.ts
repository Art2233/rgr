import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IStore } from '../reducer';
import { selectCurrentUser, selectIsAdmin } from '../login-page/storage/reducer';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbDropdown, NgbDropdownToggle, NgbDropdownMenu, NgbDropdownItem, NgbDropdownButtonItem } from '@ng-bootstrap/ng-bootstrap';
import * as LoginPageActions from '../login-page/storage/actions';
import { SetAdminUserAction } from './storage/actions';

@Component({
    selector: 'app-header',
    imports: [CommonModule, AsyncPipe, FormsModule, NgbDropdown, NgbDropdownToggle, NgbDropdownMenu, NgbDropdownItem, NgbDropdownButtonItem],
    templateUrl: './app-header.component.html',
    styleUrl: './app-header.component.scss',
})
export class AppHeaderComponent {
    user$ = this.store.select(selectCurrentUser);
    isAdmin$ = this.store.select(selectIsAdmin);

    logoutOptions = [{ label: 'Logout', value: 'logout' }];

    LoginPageActions = LoginPageActions;
    SetAdminUserAction = SetAdminUserAction;

    constructor(
        public store: Store<IStore>,
    ) {}
}
