const Order = require('../models/Order');
const User = require('../models/User');

exports.getStats = async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments();

        const orders = await Order.find();
        const revenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);

        const activeUsers = await User.countDocuments({ role: 'user' });

        res.json({
            totalOrders,
            revenue,
            activeUsers
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching stats', error: error.message });
    }
};
