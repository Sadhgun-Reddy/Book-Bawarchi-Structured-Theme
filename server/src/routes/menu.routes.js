const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menu.controller');
const { verifyToken, isAdmin } = require('../middlewares/auth.middleware');

router.get('/caterer/:catererId', menuController.getMenuByCaterer);
router.post('/', verifyToken, isAdmin, menuController.createMenuItem);
router.put('/:id', verifyToken, isAdmin, menuController.updateMenuItem);
router.delete('/:id', verifyToken, isAdmin, menuController.deleteMenuItem);

module.exports = router;
