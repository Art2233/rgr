import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { IUser, UserRole } from "../../http/login.service";
import { ExtendLoginStateAction } from "./actions";
import { IStore } from "../../reducer";

export interface ILoginState {
    user?: IUser,
    errorMessage?: string;
    isAdmin?: boolean;
}

export const loginState: ILoginState = { };

export const reducer = createReducer(
    loginState,
    on(ExtendLoginStateAction, (state, { loginState }) => ({
        ...state,
        ...loginState,
    })),
);

const selectLoginFeature = createFeatureSelector<IStore, ILoginState>('loginPage');

export const selectLoginState = createSelector(
    selectLoginFeature,
    (state: ILoginState) => state,
);

export const selectCurrentUser = createSelector(
    selectLoginState,
    (state) => state.user,
);

export const selectIsAdmin = createSelector(
    selectLoginState,
    (state) => state.user?.role === UserRole.Admin,
);

export const selectLoginErrorMessage = createSelector(
    selectLoginState,
    (state) => state.errorMessage,
);