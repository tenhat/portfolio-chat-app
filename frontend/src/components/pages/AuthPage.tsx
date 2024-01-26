// AuthPage.jsx
import React from 'react';
import LoginForm from '../organisms/LoginForm';
import SignupForm from '../organisms/SignupForm';
import { login, register } from '../../utils/auth';

const AuthPage = () => {
    const handleSignup = (username: string, password: string, email: string) => {
        register(username, password, email);
    };

    return (
        <div>
            <h1>Login</h1>
            <LoginForm />

            <h1>Sign Up</h1>
            <SignupForm onSignup={handleSignup} />
        </div>
    );
};

export default AuthPage;
