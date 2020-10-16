// Actions
import { AuthActions, AuthActionTypes } from '../_actions/auth.actions';
// Models
import { User } from '../_models/user.model';
import { Base } from '../_models/bases.model';

export interface AuthState {
  loggedIn: boolean;
  authToken: string;
  user: User;
  isUserLoaded: boolean;
  isBasesLoaded: boolean;
  bases: Base[];
  baseSelected: number;
}

export const initialAuthState: AuthState = {
  loggedIn: false,
  authToken: undefined,
  user: undefined,
  isUserLoaded: false,
  isBasesLoaded: false,
  bases:[],
  baseSelected: undefined
};

export function authReducer(state = initialAuthState, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionTypes.Login: {
      const token: string = action.payload.authToken;
      return {
        loggedIn: true,
        authToken: token,
        user: undefined,
        isUserLoaded: false,
        isBasesLoaded: false,
        bases: [],
        baseSelected: undefined
      };
    }

    case AuthActionTypes.Register: {
      const token: string = action.payload.authToken;
      return {
        loggedIn: true,
        authToken: token,
        user: undefined,
        isUserLoaded: false,
        isBasesLoaded: false,
        bases:[],
        baseSelected: undefined
      };
    }

    case AuthActionTypes.Logout:
      return initialAuthState;

    case AuthActionTypes.UserLoaded: {
      debugger;
      const user: User = action.payload.user;
      return {
        ...state,
        user,
        isUserLoaded: true
      };
    }

    case AuthActionTypes.UserBasesLoaded: {
      const bases: Base[] = action.payload.bases;
      return {
        ...state,
        bases,
        isBasesLoaded: true
      };
    }

    case AuthActionTypes.SelectBase: {
      const baseSelected: number = action.payload.baseId;
      return{
        ...state,
        baseSelected
      };
    }

    default:
      return state;
  }
}
