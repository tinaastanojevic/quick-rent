
import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    const [roles, setRoles] = useState('');
    const [isReady, setIsReady] = useState(false);


    useEffect(() => {
        const token = localStorage.getItem("jwt_token");
        setIsLoggedIn(!!token);
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            setUser(JSON.parse(storedUser));

            const payload = JSON.parse(atob(token.split('.')[1]));
            setRoles(payload["role"]);
        }
        setIsReady(true);

    }, []);

    const login = (userData) => {
        saveToLocalStorage(userData);
        setUser(userData);
        setIsLoggedIn(true);

        const payload = JSON.parse(atob(userData.token.split('.')[1]));
        setRoles(payload["role"]);
    }

    const saveToLocalStorage = (userData) => {
        localStorage.setItem("jwt_token", userData.token);


        localStorage.setItem("user", JSON.stringify({
            id: userData.id,
            username: userData.username,
        }));
    }

    const logout = () => {
        localStorage.removeItem("jwt_token");
        localStorage.removeItem("user");
        setRoles('');
        setIsLoggedIn(false);
    }

    const register = (userData) => {
        saveToLocalStorage(userData);
        setUser(userData);
        setIsLoggedIn(true);
    }

    const getUserId = () => {
        if (user !== null)
            return user.id;
        else return null;
    }

    const getUsername = () => {
        if (user !== null)
            return user.username;
        else return null;
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, register, user, roles, isReady, getUserId,getUsername }}>
            {children}
        </AuthContext.Provider>
    );
};