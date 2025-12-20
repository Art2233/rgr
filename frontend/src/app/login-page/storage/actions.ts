import { createAction, props } from "@ngrx/store";
import { ILoginState } from "./reducer";

export const ExtendLoginStateAction = createAction(
    '[Login Page] Extend Login State Action',
    props<{ loginState: Partial<ILoginState> }>(),
);

export const LoginAction = createAction(
    '[Login Page] Login Action',
    props<{ userName: string, password: string }>(),
);

export const LogoutAction = createAction(
    '[Login Page] Logout Action',
);

export const RegisterAction = createAction(
    '[Login Page] Register Action',
    props<{ userName: string, password: string }>(),
);