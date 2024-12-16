import React, { useState, useEffect } from 'react';
import api from '../api';
import OrderForm from './orderform';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [orderToEdit, setOrderToEdit] = useState(null);

    const fetchOrders = async () => {
        try {
            const response = await api.get('/orders/');
            setOrders(response.data);
            setIsLoading(false);
        } catch (err) {
            setError('Failed to fetch orders.');
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleDelete = async (orderId) => {
        try {
            await api.delete(`/orders/${orderId}`);
            alert('Order deleted successfully!');
            fetchOrders();
        } catch (error) {
            console.error('Error deleting order:', error);
            alert('Failed to delete order.');
        }
    };

    if (isLoading) {
        return (
            <Typography variant="h6" align="center" sx={{ mt: 4 }}>
                Loading orders...
            </Typography>
        );
    }

    if (error) {
        return (
            <Typography variant="h6" align="center" color="error" sx={{ mt: 4 }}>
                {error}
            </Typography>
        );
    }

    return (
        <Box p={4}>
            <Typography variant="h4" gutterBottom>
                Order Management
            </Typography>

            <OrderForm
                onOrderAdded={fetchOrders}
                onOrderEdited={fetchOrders}
                orderToEdit={orderToEdit}
                setOrderToEdit={setOrderToEdit}
            />

            <TableContainer component={Paper} sx={{ mt: 4 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Order ID</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Volume</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Delivery Date</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.order_id}>
                                <TableCell>{order.order_id}</TableCell>
                                <TableCell>{order.username}</TableCell>
                                <TableCell>{order.volume}</TableCell>
                                <TableCell>{order.address}</TableCell>
                                <TableCell>{order.delivery_date}</TableCell>
                                <TableCell>{order.status}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => setOrderToEdit(order)} color="primary">
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(order.order_id)} color="error">
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default OrderList;
