import http from './http';
import { User } from './types';

export interface SignInProps {
    account: string
    password: string
}

export interface SignUpProps {
    account: string
    password: string
    invite_code?: string
}

export const SignIn = (body: SignInProps) => {
    return http.post<any, { user: User }>('/login', body);
}

export const SignUp = (body: SignUpProps) => {
    return http.post<any, { uid: number }>('/register', body);
}

export const GetUserInfo = (uid: number) => {
    return http.get<any, { user: User }>(`/userinfo?uid=${uid}`);
}