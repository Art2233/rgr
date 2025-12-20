import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from './login.service';

@Injectable({
    providedIn: 'root',
})
export class UsersService {
    constructor(
        private http: HttpClient,
    ) {}

    getUsers() {
        return this.http.get<IUser[]>('get-users');
    }

    setAdminUser(userId: number) {
        return this.http.put(`set-admin-user/${userId}`, {});
    }
}
