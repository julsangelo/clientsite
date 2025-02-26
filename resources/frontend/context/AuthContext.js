import React, { createContext, useContext, useEffect, useState } from "react";
import { authCheck } from "../ajax/backend";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        authCheck((response) => {
            setIsLoggedIn(response.loggedIn);
            setUser(response.user)
        });
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
