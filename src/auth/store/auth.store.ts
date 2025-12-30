import type { User } from '@/interface/users.interface'
import { create } from 'zustand'
import { loginAction } from '../action/login.action';
import { checkAuthAction } from '../action/check-auth.action';
import { registerAction } from '../action/register.action';

type AuthStatus = 'authenticated' | 'not-authenticated' |'checking';

type AuthState = { 
    // Properties
    user: User | null;
    token: string | null;
    authStatus: AuthStatus;
    //Getters
    isAdmin: () => boolean;
    //Action
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    checkAuthStatus: () => Promise<boolean>;
    register: (email: string, password: string, role: string) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
    user: null,
    token: null,
    authStatus: 'checking',
    
    isAdmin: () => {
       const roles = get().user?.role || "";
       return roles.includes('admin');
    },
   
    login: async(email: string, password: string) => {
        try {
            const data = await loginAction(email, password);
            localStorage.setItem('token', data.token);

            set({user: data.user, token: data.token, authStatus:'authenticated'})
            return true;

        } catch (error) {
           console.log(error)
           localStorage.removeItem('token');
           set({user: null, token: null, authStatus:'not-authenticated'})
           return false;
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        set({user: null, token: null, authStatus: 'not-authenticated'})
    },

    checkAuthStatus: async() => {
       try {
          const {user, token} = await checkAuthAction();       
          set({
            user: user,
            token: token,
            authStatus: 'authenticated'
          });
          return true;
       } catch {
          set({
            user: undefined,
            token: undefined,
            authStatus: 'not-authenticated',
          });
          return false;
       }
    },
    
     register: async(email: string, password: string, role: string) => {
        try {
            const data = await registerAction(email, password, role);
            localStorage.setItem('token', data.token);

            set({user: data.user, token: data.token, authStatus:'authenticated'})
            return true;

        } catch (error) {
           console.log(error)
           localStorage.removeItem('token');
           set({user: null, token: null, authStatus:'not-authenticated'})
           return false;
        }
    },
}))


