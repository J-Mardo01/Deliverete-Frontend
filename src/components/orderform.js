import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';
import api from '../api';

const OrderForm = ({ onOrderAdded, onOrderEdited, orderToEdit, setOrderToEdit }) => {
    const [username, setUsername] = useState('');
    const [volume, setVolume] = useState('');
    const [address, setAddress] = useState('');
    const [deliveryDate, setDeliveryDate] = useState('');

    // Pre-fill form fields if editing an order
    useEffect(() => {
        if (orderToEdit) {
            setUsername(orderToEdit.username);
            setVolume(orderToEdit.volume);
            setAddress(orderToEdit.address);
            setDeliveryDate(orderToEdit.delivery_date);
        } else {
            // Clear fields if not editing
            setUsername('');
            setVolume('');
            setAddress('');
            setDeliveryDate('');
        }
    }, [orderToEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (orderToEdit) {
                // Update existing order
                await api.put(`/orders/${orderToEdit.order_id}`, {
                    volume: parseFloat(volume),
                    address,
                    delivery_date: deliveryDate,
                });
                alert('Order updated successfully!');
                onOrderEdited(); // Refresh the order list
                setOrderToEdit(null); // Reset form state
            } else {
                // Fetch user_id by username
                const userResponse = await api.get('/users/');
                const user = userResponse.data.find((u) => u.username === username);

                if (!user) {
                    alert('Username not found.');
                    return;
                }

                const user_id = user.user_id;

                // Create a new order
                await api.post('/orders/', {
                    user_id,
                    volume: parseFloat(volume),
                    address,
                    delivery_date: deliveryDate,
                });
                alert('Order created successfully!');
                onOrderAdded(); // Refresh the order list
            }

            // Reset fields
            setUsername('');
            setVolume('');
            setAddress('');
            setDeliveryDate('');
        } catch (error) {
            console.error('Error submitting order:', error);
            alert('Failed to submit order.');
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
                disabled={!!orderToEdit} // Disable username editing for existing orders
            />
            <TextField
                fullWidth
                label="Volume"
                variant="outlined"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                sx={{ mb: 2 }}
            />
            <TextField
                fullWidth
                label="Address"
                variant="outlined"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                sx={{ mb: 2 }}
            />
            <TextField
                fullWidth
                label="Delivery Date"
                type="date"
                variant="outlined"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                sx={{ mb: 2 }}
                InputLabelProps={{ shrink: true }}
            />
            <Button type="submit" variant="contained" color="primary">
                {orderToEdit ? 'Update Order' : 'Add Order'}
            </Button>
        </Box>
    );
};

export default OrderForm;
