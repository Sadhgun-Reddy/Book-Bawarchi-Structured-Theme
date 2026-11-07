const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menu.controller');
const { verifyToken, isAdmin } = require('../middlewares/auth.middleware');

router.get('/caterer/:catererId', menuController.getMenuByCaterer);
router.post('/', verifyToken, isAdmin, menuController.createMenuItem);

module.exports = router;
