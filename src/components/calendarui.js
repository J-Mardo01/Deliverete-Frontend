import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendarstyles.css'; // Custom styles for highlighting
import { Dialog, DialogTitle, DialogContent, Typography } from '@mui/material';
import api from '../api';

const CalendarUI = () => {
    const [date, setDate] = useState(new Date());
    const [orders, setOrders] = useState([]);
    const [selectedOrders, setSelectedOrders] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Fetch all orders from the backend
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await api.get('/orders/');
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    // Handle date selection
    const handleDateClick = (selectedDate) => {
        setDate(selectedDate);

        // Filter orders for the selected date
        const formattedDate = selectedDate.toISOString().split('T')[0];
        const ordersForDate = orders.filter(
            (order) => order.delivery_date === formattedDate
        );

        setSelectedOrders(ordersForDate);
        setIsDialogOpen(true);
    };

    // Highlight days with deliveries
    const highlightDates = ({ date }) => {
        const formattedDate = date.toISOString().split('T')[0];
        return orders.some((order) => order.delivery_date === formattedDate)
            ? 'highlight' // Add a custom class for these dates
            : null;
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Orders Calendar
            </Typography>
            <Calendar
                onClickDay={handleDateClick}
                tileClassName={highlightDates} // Add custom class to highlighted tiles
                style={{ width: '100%', maxWidth: '800px', margin: 'auto' }} // Adjust size
            />

            {/* Dialog for showing orders on the selected date */}
            <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
                <DialogTitle>Orders for {date.toDateString()}</DialogTitle>
                <DialogContent>
                    {selectedOrders.length > 0 ? (
                        selectedOrders.map((order) => (
                            <Typography key={order.order_id} sx={{ mb: 2 }}>
                                <strong>Order ID:</strong> {order.order_id} <br />
                                <strong>Username:</strong> {order.username} <br />
                                <strong>Volume:</strong> {order.volume} <br />
                                <strong>Address:</strong> {order.address} <br />
                                <strong>Status:</strong> {order.status}
                            </Typography>
                        ))
                    ) : (
                        <Typography>No orders for this date.</Typography>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CalendarUI;
