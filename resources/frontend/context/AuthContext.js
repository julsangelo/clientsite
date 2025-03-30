import React, { createContext, useContext, useEffect, useState } from "react";
import { authCheck } from "../ajax/backend";
import { setCsrfToken } from "../ajax/axios";
import { Navigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        authCheck((response) => {
            setIsLoggedIn(response.loggedIn);
            setUser(response.user);
            if (response.csrfToken) {
                document
                    .querySelector('meta[name="csrf-token"]')
                    .setAttribute("content", response.csrfToken);
                setCsrfToken(response.csrfToken);
            }
        });
    }, [update]);

    if (isLoggedIn === null) return null;

    const toggleUpdate = () => {
        setUpdate((prev) => !prev);
    };

    return (
        <AuthContext.Provider
            value={{ isLoggedIn, user, setIsLoggedIn, setUser, toggleUpdate }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
