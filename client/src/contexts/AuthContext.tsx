import React, { useState, useContext, createContext, useCallback } from "react";
import { authService } from "@/services/authService";
import type { AuthState, User } from "@/types";

interface AuthContextValue extends AuthState {
    isAuthenticated: boolean;
    login: (user: User, token: string) => void,
    logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

const getInitialState = (): AuthState => {
    const token = localStorage.getItem('token');
    const userRaw = localStorage.getItem('user');
    try {
        const user: User | null = userRaw ? (JSON.parse(userRaw)) : null;
        return { token, user }
    }
    catch {
        return { token: null, user: null }
    }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<AuthState>(getInitialState)
    const isAuthenticated = Boolean(state.token && state.user);

    const login = useCallback((user: User, token: string) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setState({ user, token })
    }, []);

    const logout = useCallback(() => {
        authService.logout();
        setState({ user: null, token: null });
    }, []);

    return (
        <AuthContext.Provider value={{ ...state, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const zz = useContext(AuthContext)
    if (!zz) throw new Error('useAuth must be used inside <AuthProvider>')
    return zz;
}