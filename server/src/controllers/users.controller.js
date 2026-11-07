const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
  try {
    // Exclude passwords
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};
