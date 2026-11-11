const Order = require('../models/Order');
const User = require('../models/User');

exports.createOrder = async (req, res) => {
  try {
    const newOrder = new Order({ ...req.body, userId: req.user.id });
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ message: 'Error creating order', error: error.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    // If admin, return all orders. If user, return only their orders.
    const query = req.user.role === 'admin' ? {} : { userId: req.user.id };
    const orders = await Order.find(query).populate('catererId', 'name').populate('userId', 'email');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: 'Error updating order', error: error.message });
  }
};

exports.getStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();

    const revenueAgg = await Order.aggregate([
      { $match: { status: { $in: ['confirmed', 'completed'] } } },
      { $group: { _id: null, totalRevenue: { $sum: '$totalAmount' } } }
    ]);
    const totalRevenue = revenueAgg.length > 0 ? revenueAgg[0].totalRevenue : 0;

    const activeUsers = await User.countDocuments(); // Simple count for mock logic

    res.json({
      totalOrders,
      totalRevenue,
      activeUsers
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stats', error: error.message });
  }
};
