import { createContext, useReducer, useEffect } from "react";
import { Action, AuthState, PropsWithChildren } from '../types';

export const AuthContext = createContext({});

export const authReducer = (state: AuthState, action: Action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null }
        default:
            return state
    }
} 

export const AuthContextProvider = ({children}: PropsWithChildren) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    useEffect(() => {
        const userJson = localStorage.getItem('user');

        if (userJson) {
            const user = JSON.parse(userJson);
            dispatch({ type: 'LOGIN', payload: user });
        }
    },[])

    // console.log("AuthContext state:", state);

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}