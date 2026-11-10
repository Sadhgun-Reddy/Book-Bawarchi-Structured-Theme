const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.controller');
const { verifyToken, isAdmin } = require('../middlewares/auth.middleware');

router.get('/stats', verifyToken, isAdmin, dashboardController.getStats);

module.exports = router;
