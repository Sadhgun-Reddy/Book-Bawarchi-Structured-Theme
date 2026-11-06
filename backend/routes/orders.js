const express = require('express');
const { Order } = require('../db');
const router = express.Router();

// Create a new order
router.post('/', async (req, res) => {
    const { userId, catererId, totalAmount, eventDate, guestCount, specialInstructions, items } = req.body;

    try {
        const mappedItems = items.map(item => ({
            menu_item_id: item.menuItemId,
            quantity: item.quantity,
            price_at_time: item.price
        }));

        const newOrder = await Order.create({
            user_id: userId,
            caterer_id: catererId,
            total_amount: totalAmount,
            event_date: eventDate,
            guest_count: guestCount,
            special_instructions: specialInstructions,
            items: mappedItems
        });

        res.status(201).json({ id: newOrder._id.toString(), message: 'Order created successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create order' });
    }
});

// Get orders for a specific user
router.get('/user/:userId', async (req, res) => {
    try {
        const orders = await Order.find({ user_id: req.params.userId }).lean();
        const formattedOrders = orders.map(order => ({ ...order, id: order._id.toString() }));
        res.json(formattedOrders);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
});

// Get orders for a specific caterer
router.get('/caterer/:catererId', async (req, res) => {
    try {
        const orders = await Order.find({ caterer_id: req.params.catererId }).lean();
        const formattedOrders = orders.map(order => ({ ...order, id: order._id.toString() }));
        res.json(formattedOrders);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
});

module.exports = router;
