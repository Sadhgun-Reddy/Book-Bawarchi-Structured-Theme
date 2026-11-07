const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const { verifyToken, isAdmin } = require('../middlewares/auth.middleware');

router.get('/', verifyToken, isAdmin, usersController.getAllUsers);

module.exports = router;
