import { DreamsContext } from "../context/DreamsContext";
import { useContext } from "react";
import { DreamState } from '../types';

interface DreamContext {
    dispatch: React.Dispatch<any>,
}

export const useDreamsContext = (): DreamContext & DreamState=> {
    const context = useContext<any>(DreamsContext);

    if (!context) {
        throw Error('context error');
    }

    return context;
}