import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-page',
  imports: [FormsModule, CommonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  username: string = '';
  password: string = '';
  showPassword: boolean = false;

  onLogin() {
    console.log('Login attempt:', this.username, this.password);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
