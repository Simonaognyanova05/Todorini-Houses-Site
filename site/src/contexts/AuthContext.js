import { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

const initialState = {
    _id: '',
    email: '',
};

export const AuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(() => {
        const storedAdmin = localStorage.getItem('admin');
        return storedAdmin ? JSON.parse(storedAdmin) : initialState;
    });

    useEffect(() => {
        if (admin._id) {
            localStorage.setItem('admin', JSON.stringify(admin));
        } else {
            localStorage.removeItem('admin');
        }
    }, [admin]);

    const onLogin = (authData) => {
        setAdmin(authData);
    };

    const onLogout = () => {
        setAdmin(initialState);
    };

    return (
        <AuthContext.Provider value={{ admin, onLogin, onLogout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    let authData = useContext(AuthContext);

    return authData;
}