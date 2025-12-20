import { Component, Input } from '@angular/core';
import { IUser, UserRole } from '../../http/login.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-set-admin-modal',
    imports: [CommonModule],
    templateUrl: './set-admin-modal.component.html',
    styleUrl: './set-admin-modal.component.scss',
})
export class SetAdminModalComponent {
    @Input() users: IUser[] = [];
    selectedUser: IUser | null = null;
    UserRole = UserRole;

    constructor(public modal: NgbActiveModal) {}

    selectUser(user: IUser) {
        if (user.role !== UserRole.Admin) {
            this.selectedUser = user;
        }
    }

    confirm() {
        this.modal.close(this.selectedUser);
    }

    cancel() {
        this.modal.close(null);
    }
}
