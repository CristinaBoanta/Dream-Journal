import { ReactNode } from 'react';

export interface Dream {
    _id: string;
    title: string;
    description: string;
    createdAt: string;
    sentiment: string;
}
export interface FormattedDreamDate {
    date: string;
    count: number;
    positive: number;
    negative: number;
}
export interface AggregatedData {
    [date: string]: {
      positive: number;
      negative: number;
    };
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