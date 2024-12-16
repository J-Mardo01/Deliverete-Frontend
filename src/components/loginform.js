import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './loginform.css';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        try {
            const response = await axios.post('http://127.0.0.1:5000/auth/login', {
                email,
                password,
            });

            const { token } = response.data;

            // Save the token to localStorage
            localStorage.setItem('authToken', token);

            // Navigate to dashboard or users page
            navigate('/dashboard');
        } catch (err) {
            setError('Invalid email or password. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Login</h2>
                {error && <p className="error">{error}</p>}
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="login-button">Login</button>
            </form>
            <div className="register-container">
                <p>
                    Don't have an account?{' '}
                    <button
                        onClick={() => navigate('/register')}
                        className="register-link"
                    >
                        Register here!
                    </button>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;
