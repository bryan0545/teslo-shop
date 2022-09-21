import { AuthState } from '.';
import { IUser } from '../../interfaces';

type AuthActionType = { type: 'Auth - Login'; payload: IUser } | { type: 'Auth - Logout' };

export const authReducer = (state: AuthState, actions: AuthActionType): AuthState => {
  switch (actions.type) {
    case 'Auth - Login':
      return {
        ...state,
        isLoggedIn: true,
        user: actions.payload,
      };
    case 'Auth - Logout':
      return {
        ...state,
        isLoggedIn: false,
        user: undefined,
      };

    default:
      return state;
  }
};
