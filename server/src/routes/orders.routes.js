const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orders.controller');
const { verifyToken, isAdmin } = require('../middlewares/auth.middleware');

router.post('/', verifyToken, ordersController.createOrder);
router.get('/', verifyToken, ordersController.getOrders);
router.put('/:id/status', verifyToken, isAdmin, ordersController.updateOrderStatus);

module.exports = router;
