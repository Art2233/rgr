import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as LoginActions from "./actions";
import { catchError, concat, of, switchMap } from "rxjs";
import { LoginService, UserRole } from "../../http/login.service";
import { Router } from "@angular/router";

@Injectable()
export class LoginEffects {
    constructor(
        private actions$: Actions,
        private loginService: LoginService,
        private router: Router,
    ) { }

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LoginActions.LoginAction),
            switchMap(({ userName, password }) => {
                return this.loginService.login(userName, password).pipe(
                    switchMap((user) => {
                        this.router.navigate(['/railway']);

                        return concat(
                            of(LoginActions.ExtendLoginStateAction({
                                loginState: {
                                    user,
                                    isAdmin: user.role === UserRole.Admin,
                                }
                            })),
                        )
                    }),
                    catchError((error) => {
                        return of(LoginActions.ExtendLoginStateAction({
                            loginState: {
                                errorMessage: error.error?.message || 'Login failed',
                            }
                        }));
                    },
                ));
            }),
        ),
    );

    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LoginActions.LogoutAction),
            switchMap(() => {
                return this.loginService.logout().pipe(
                    switchMap(() => {
                        this.router.navigate(['/login']);
                        return of(LoginActions.ExtendLoginStateAction({
                            loginState: {
                                user: undefined,
                            }
                        }));
                    }),
                );
            }),
        ),
    );

    register$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LoginActions.RegisterAction),
            switchMap(({ userName, password }) => {
                return this.loginService.register(userName, password).pipe(
                    switchMap((user) => {
                        this.router.navigate(['/railway']);
                        return concat(
                            of(LoginActions.ExtendLoginStateAction({
                                loginState: {
                                    user,
                                    isAdmin: user.role === UserRole.Admin,
                                }
                            })),
                        )
                    }),
                    catchError((error) => {
                        return of(LoginActions.ExtendLoginStateAction({
                            loginState: {
                                errorMessage: error.error?.message || 'Registration failed',
                            }
                        }));
                    }
                ));
            }),
        ),
    );
}