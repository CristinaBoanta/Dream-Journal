import { ReactNode } from 'react';

export interface Dream {
    _id: string;
    title: string;
    description: string;
    createdAt: string;
    sentiment: string;
}

export interface PropsWithChildren {
    children: ReactNode;
}

export interface DreamState {
    dreams: null | Dream[]
}

export interface User {
    token: String;
    email: String;
    password: String;
}

export interface AuthState {
    user: User;
}

export interface Action {
    type: String;
    payload: any;
}