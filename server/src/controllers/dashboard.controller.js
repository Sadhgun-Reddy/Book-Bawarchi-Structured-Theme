const Order = require('../models/Order');
const User = require('../models/User');

exports.getStats = async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments();

        const aggregation = await Order.aggregate([
            { $group: { _id: null, totalRevenue: { $sum: "$totalAmount" } } }
        ]);
        const totalRevenue = aggregation.length > 0 ? aggregation[0].totalRevenue : 0;

        const activeUsers = await User.countDocuments();

        res.json({
            totalOrders,
            totalRevenue,
            activeUsers
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching stats', error: error.message });
    }
};
