import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        if (window.confirm('Are you sure you want to sign out?')) {
            localStorage.removeItem('authToken');
            navigate('/login');
        }
    };

    return (
        <nav className="navbar">
            <h1>Deliverete</h1>
            <ul>
                <li><a href="/users">Users</a></li>
                <li><a href="/orders">Orders</a></li>
                <li><a href="/calendar">Calendar</a></li>
                <li>
                    <button onClick={handleSignOut}>
                        Sign Out
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;

