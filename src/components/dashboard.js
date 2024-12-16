import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import api from '../api';

const Dashboard = () => {
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersResponse = await api.get('/users/');
                const ordersResponse = await api.get('/orders/');
                setTotalUsers(usersResponse.data.length);
                setTotalOrders(ordersResponse.data.length);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <Grid container spacing={3} sx={{ mt: 3, p: 2 }}>
            <Grid item xs={12} md={6}>
                <Paper elevation={3} sx={{ padding: 2 }}>
                    <Typography variant="h6">Total Users</Typography>
                    <Typography variant="h4">{totalUsers}</Typography>
                </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
                <Paper elevation={3} sx={{ padding: 2 }}>
                    <Typography variant="h6">Total Orders</Typography>
                    <Typography variant="h4">{totalOrders}</Typography>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
