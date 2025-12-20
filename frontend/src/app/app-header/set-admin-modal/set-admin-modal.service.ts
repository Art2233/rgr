import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SetAdminModalComponent } from './set-admin-modal.component';
import { IUser } from '../../http/login.service';

@Injectable({
  providedIn: 'root',
})
export class SetAdminModalService {
    constructor(
        private modal: NgbModal,
    ) { }

    open(users: IUser[]) {
        const ref = this.modal.open(SetAdminModalComponent, {
            size: 'md',
        });

        ref.componentInstance.users = users;

        return ref.result;
    }
}
