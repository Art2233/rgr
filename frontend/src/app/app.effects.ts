import { HeaderEffects } from "./app-header/storage/effects";
import { LoginEffects } from "./login-page/storage/login.effects";
import { railwayPageEffects } from "./railway-page/storage/effects";

export const EFFECTS = [
    ...railwayPageEffects,
    LoginEffects,
    HeaderEffects,
];