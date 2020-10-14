import { Action } from '@ngrx/store';
import { User } from '../_models/user.model';
import { Base } from '../_models/bases.model';

export enum AuthActionTypes {
    Login = '[Login] Action',
    Logout = '[Logout] Action',
    Register = '[Register] Action',
    UserRequested = '[Request User] Action',
    UserLoaded = '[Load User] Auth API',
    BasesRequested = '[Request Bases] Action',
    UserBasesLoaded = '[Load UserBases] Action'
}

export class Login implements Action {
    readonly type = AuthActionTypes.Login;
    constructor(public payload: { authToken: string }) { }
}

export class Logout implements Action {
    readonly type = AuthActionTypes.Logout;
}

export class Register implements Action {
    readonly type = AuthActionTypes.Register;
    constructor(public payload: { authToken: string }) { }
}


export class UserRequested implements Action {
    readonly type = AuthActionTypes.UserRequested;
}

export class UserLoaded implements Action {
    readonly type = AuthActionTypes.UserLoaded;
    constructor(public payload: { user: User }) { }
}

export class UserBasesLoaded implements Action {
    debugger;
    readonly type = AuthActionTypes.UserBasesLoaded;
    constructor(public payload: { bases: Base[] }) { }
}

export class BasesRequested implements Action {
    readonly type = AuthActionTypes.BasesRequested;
}



export type AuthActions = Login | Logout | Register | UserRequested | UserLoaded | UserBasesLoaded | UserLoaded;
