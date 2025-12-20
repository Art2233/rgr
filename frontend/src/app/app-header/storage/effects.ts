import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UsersService } from "../../http/users.service";
import { SetAdminUserAction } from "./actions";
import { filter, from, switchMap } from "rxjs";
import { SetAdminModalService } from "../set-admin-modal/set-admin-modal.service";

@Injectable()
export class HeaderEffects {
    constructor(
        private actions$: Actions,
        private usersService: UsersService,
        private setAdminModalService: SetAdminModalService,
    ) {}

    setAdminUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SetAdminUserAction),
            switchMap(() => {
                return this.usersService.getUsers().pipe(
                    switchMap((users) => {
                        const sortedUsers = users.sort((a, b) => a.role.localeCompare(b.role));
                        return from(this.setAdminModalService.open(sortedUsers)).pipe(
                            filter((user) => !!user),
                            switchMap((user) => {
                                return this.usersService.setAdminUser(user!.id);
                            }),
                        )
                    }),
                );
            })
        ), { dispatch: false}
    );
}