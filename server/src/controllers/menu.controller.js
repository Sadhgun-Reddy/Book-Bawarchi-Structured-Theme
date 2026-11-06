const MenuItem = require('../models/MenuItem');

exports.getMenuByCaterer = async (req, res) => {
  try {
    const { catererId } = req.params;
    const menuItems = await MenuItem.find({ catererId });
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching menu items', error: error.message });
  }
};

exports.createMenuItem = async (req, res) => {
  try {
    const newItem = new MenuItem(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: 'Error creating menu item', error: error.message });
  }
};
