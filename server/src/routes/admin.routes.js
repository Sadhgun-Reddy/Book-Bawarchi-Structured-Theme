const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { verifyToken, isAdmin } = require('../middlewares/auth.middleware');

router.get('/stats', verifyToken, isAdmin, adminController.getStats);

module.exports = router;
