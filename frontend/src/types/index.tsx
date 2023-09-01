import { ReactNode } from 'react';

export interface Dream {
    _id: string;
    title: string;
    description: string;
    createdAt: string;
}

export interface DreamContextProviderProps {
    children: ReactNode;
}

export interface DreamState {
    dreams: null | Dream[]
}