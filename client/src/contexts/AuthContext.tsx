import React, { useState, useContext, createContext, useCallback } from "react";
import type { AuthState, User } from "@/types";

interface AuthContextValue extends AuthState {
    login: (user: User, token: string) => void,
    logout: () => void
}

const AuthContext = createContext<AuthContextValue>(null)

const getInitialState = (): AuthState => {
    const token = localStorage.getItem('token');
    const userRaw = localStorage.getItem('user');
    try{
       const user: User | null = userRaw ? (JSON.parse(userRaw)) : null;
       return { token, user, isAuthenticated: !!token && !!user }
    }
    catch{
        return { token: null, user: null, isAuthenticated: false }
    }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<AuthState>(getInitialState)

    const login = useCallback((user: User, token: string) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setState({ user, token, isAuthenticated: true })
    }, [])

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setState({ user: null, token: null, isAuthenticated: false })
    }, []) 

    return (
        <AuthContext.Provider value={{ ...state, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const zz = useContext(AuthContext)
    if (!zz) throw new Error('useAuth must be used inside <AuthProvider>')
    return zz;
}