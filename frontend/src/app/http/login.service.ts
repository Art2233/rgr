import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

export enum UserRole {
    Admin = 'ADMIN',
    User = 'USER',
}

export interface IUser {
    id: number;
    userName: string;
    password: string;
    role: UserRole;
}

@Injectable({
    providedIn: 'root',
})
export class LoginService {
    constructor(
        private http: HttpClient,
    ) {}

    login(userName: string, password: string) {
        return this.http.post<IUser>('login', { userName, password });
    }

    logout() {
        return this.http.post('logout', {});
    }

    register(userName: string, password: string) {
        return this.http.post<IUser>('register', { userName, password });
    }
}