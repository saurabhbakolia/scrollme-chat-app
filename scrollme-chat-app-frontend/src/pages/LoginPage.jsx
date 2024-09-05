// src/pages/LoginPage.js
import { useEffect } from 'react';
import { auth, provider, signInWithPopup } from '../services/firebase';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigate('/'); // Redirect to the homepage if already logged in
            }
        });
        return () => unsubscribe(); // Cleanup on unmount
    }, [navigate]);

    const handleLogin = async () => {
        try {
            await signInWithPopup(auth, provider);
            navigate('/'); // Redirect to the homepage after successful login
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <button type="button" onClick={handleLogin}>Login with Google</button>
        </div>
    );
};

export default LoginPage;
