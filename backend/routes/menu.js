const express = require('express');
const { MenuItem } = require('../db');
const router = express.Router();

// Get menu items for a specific caterer
router.get('/caterer/:catererId', async (req, res) => {
    try {
        const menuItems = await MenuItem.find({ caterer_id: req.params.catererId }).lean();

        const formattedItems = menuItems.map(item => ({
            ...item,
            id: item._id.toString()
        }));

        res.json(formattedItems);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch menu items' });
    }
});

module.exports = router;
