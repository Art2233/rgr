import { ILoginState, reducer as loginReducer } from "./login-page/storage/reducer";
import { IRailwayState, reducer as railwayReducer } from "./railway-page/storage/reducer";

export interface IStore {
    railwayPage: IRailwayState;
    loginPage: ILoginState;
}

export const reducers = {
    railwayPage: railwayReducer,
    loginPage: loginReducer,
};