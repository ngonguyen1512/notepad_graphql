import { createContext, useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

export const AuthContext = createContext();

export default function AuthProvider({ children }) { // Corrected children prop
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [ isLoading, setIsLoading ] = useState(true);

    const auth = getAuth();

    useEffect(() => {
        const unsubscribed = auth.onIdTokenChanged((user) => {
            console.log('[From User]', user); // Simplified console log
            if (user) {
                setUser(user);
                if(user.accessToken !== localStorage.getItem('accessToken')){
                    localStorage.setItem('accessToken', user.accessToken);
                    window.location.reload();
                }
                
                setIsLoading(false);
                return;
            } else {
                // Reset user
                setIsLoading(false);
                setUser({});

                localStorage.clear();
                navigate('/login');
            }
        });
        return () => {
            unsubscribed();
        };
    }, [auth, navigate]);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {isLoading ? <CircularProgress /> : children}
        </AuthContext.Provider>
    );
}
