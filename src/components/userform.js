import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';
import api from '../api';

const UserForm = ({ onUserAdded, onUserEdited, userToEdit, setUserToEdit }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Populate the form fields if editing a user
    useEffect(() => {
        if (userToEdit) {
            setUsername(userToEdit.username);
            setEmail(userToEdit.email);
            setPassword(''); // Leave password blank for editing
        }
    }, [userToEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (userToEdit) {
            // Edit user (PUT request)
            try {
                await api.put(`/users/${userToEdit.user_id}`, { username, email });
                alert('User updated successfully!');
                onUserEdited(); // Refresh the user list
                setUserToEdit(null); // Reset form state
                setUsername('');
                setEmail('');
                setPassword('');
            } catch (error) {
                console.error('Error editing user:', error);
                alert('Failed to update user.');
            }
        } else {
            // Add user (POST request)
            try {
                await api.post('/users/', { username, email, password });
                alert('User created successfully!');
                onUserAdded(); // Refresh the user list
                setUsername('');
                setEmail('');
                setPassword('');
            } catch (error) {
                console.error('Error creating user:', error);
                alert('Failed to create user.');
            }
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
                fullWidth
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={{ mb: 2 }}
            />
            <TextField
                fullWidth
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 2 }}
            />
            {!userToEdit && (
                <TextField
                    fullWidth
                    label="Password"
                    variant="outlined"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ mb: 2 }}
                />
            )}
            <Button type="submit" variant="contained" color="primary">
                {userToEdit ? 'Update User' : 'Add User'}
            </Button>
        </Box>
    );
};

export default UserForm;
