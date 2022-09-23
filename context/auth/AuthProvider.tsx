import Cookies from 'js-cookie';
import { FC, PropsWithChildren, useReducer, useEffect } from 'react';
import { AuthContext, authReducer } from '.';
import { tesloApi } from '../../api';
import { IUser } from '../../interfaces';
import axios from 'axios';
import { useRouter } from 'next/router';
import { CookiesTypes } from '../../constants/cookies';
import { signOut, useSession } from 'next-auth/react';

export interface AuthState {
  isLoggedIn: boolean;
  user?: IUser;
}

const AuthInitialState: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AuthInitialState);
  const { data, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      dispatch({ type: 'Auth - Login', payload: data.user as IUser });
    }
  }, [status, data]);

  // useEffect(() => {
  //   checkToken();
  // }, []);

  // const checkToken = async () => {
  //   if (!Cookies.get('token')) return;

  //   try {
  //     const { data } = await tesloApi('/user/validate-token');
  //     const { token, user } = data;
  //     Cookies.set('token', token);
  //     dispatch({ type: 'Auth - Login', payload: user });
  //   } catch (error) {
  //     Cookies.remove('token');
  //   }
  // };

  const loginUser = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data } = await tesloApi.post('/user/login', { email, password });
      const { token, user } = data;
      Cookies.set('token', token);
      dispatch({ type: 'Auth - Login', payload: user });
      return true;
    } catch (error) {
      return false;
    }
  };

  const registerUser = async (name: string, email: string, password: string): Promise<{ hasError: boolean; message?: string }> => {
    try {
      const { data } = await tesloApi.post('/user/register', { name, email, password });
      const { token, user } = data;
      Cookies.set('token', token);
      dispatch({ type: 'Auth - Login', payload: user });
      return {
        hasError: false,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { message } = error.response?.data as { message: string };
        return {
          hasError: true,
          message,
        };
      }

      return {
        hasError: true,
        message: 'No se pudo crear el usuario - intentelo de nuevo',
      };
    }
  };

  const logOut = () => {
    Cookies.remove(CookiesTypes.CART);
    Cookies.remove('firstName');
    Cookies.remove('lastName');
    Cookies.remove('address');
    Cookies.remove('address2');
    Cookies.remove('zip');
    Cookies.remove('city');
    Cookies.remove('country');
    Cookies.remove('phone');
    signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        loginUser,
        registerUser,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
