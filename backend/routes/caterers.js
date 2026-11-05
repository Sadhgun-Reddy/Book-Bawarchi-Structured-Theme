const express = require('express');
const { Caterer } = require('../db');
const router = express.Router();

// Get all caterers
router.get('/', async (req, res) => {
    try {
        const caterers = await Caterer.find().lean();
        // Map _id to id
        const formattedCaterers = caterers.map(c => ({
            ...c,
            id: c._id.toString()
        }));
        res.json(formattedCaterers);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch caterers' });
    }
});

// Get a single caterer by ID
router.get('/:id', async (req, res) => {
    try {
        const caterer = await Caterer.findById(req.params.id).lean();
        if (!caterer) {
            return res.status(404).json({ error: 'Caterer not found' });
        }

        caterer.id = caterer._id.toString();

        res.json(caterer);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch caterer' });
    }
});

module.exports = router;
