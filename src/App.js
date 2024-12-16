import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import UserList from './components/userlist';
import Dashboard from './components/dashboard';
import OrderList from './components/orderlist';
import CalendarUI from './components/calendarui';
import LoginForm from './components/loginform';
import RegisterForm from './components/registerform';
import PrivateRoute from './components/privateroute';
import './App.css';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="/users" element={<PrivateRoute><UserList /></PrivateRoute>} />
                <Route path="/orders" element={<PrivateRoute><OrderList /></PrivateRoute>} />
                <Route path="/calendar" element={<PrivateRoute><CalendarUI /></PrivateRoute>} />
            </Routes>
        </Router>
    );
}

export default App;
