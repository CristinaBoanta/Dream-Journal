import { createContext, useReducer } from 'react';
import { PropsWithChildren, DreamState, Action } from '../types';

export const DreamsContext = createContext({});

export const dreamsReducer = (state: DreamState, action: Action) => {
    debugger;
    switch (action.type) {
        case 'SET_DREAMS':
        return {
            dreams: action.payload
        }
        case 'CREATE_DREAM':
        if(state.dreams !== null) {
            return {
                dreams: [action.payload, ...state.dreams]
            }
        }
        return state;
        case 'DELETE_DREAM':
        if(state.dreams !== null) {
            return {
                dreams: state.dreams.filter((dreamItem) => dreamItem._id !== action.payload._id)
            }
        }
        return state;
        default:
        return state;
    }

}

export const DreamContextProvider = ({ children }: PropsWithChildren) => {
    const [state, dispatch] = useReducer(dreamsReducer, {
        dreams: null
    });

    return (
        <DreamsContext.Provider value={{...state, dispatch}}>
            {children}
        </DreamsContext.Provider>
    )
}