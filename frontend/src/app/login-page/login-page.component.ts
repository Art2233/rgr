import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { IStore } from '../reducer';
import * as LoginPageActions from './storage/actions';

@Component({
    selector: 'app-login-page',
    imports: [FormsModule, CommonModule],
    templateUrl: './login-page.component.html',
    styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
    userName: string = '';
    password: string = '';
    showPassword: boolean = false;
    isRegisterMode: boolean = false;
    registerUsername: string = '';
    registerPassword: string = '';
    confirmPassword: string = '';
    showRegisterPassword: boolean = false;
    showConfirmPassword: boolean = false;
    errorMessage: string = '';

    LoginPageActions = LoginPageActions;

    constructor(
        private http: HttpClient,
        public store: Store<IStore>,
    ) {}

    onRegister() {
        if (this.registerPassword !== this.confirmPassword) {
            this.errorMessage = 'Passwords do not match';
            return;
        }
        this.errorMessage = '';
        this.store.dispatch(
            LoginPageActions.RegisterAction({
                userName: this.registerUsername,
                password: this.registerPassword,
            }),
        );
    }

    togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
    }

    toggleRegisterPasswordVisibility() {
        this.showRegisterPassword = !this.showRegisterPassword;
    }
}
