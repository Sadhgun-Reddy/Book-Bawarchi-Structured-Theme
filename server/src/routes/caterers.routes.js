const express = require('express');
const router = express.Router();
const caterersController = require('../controllers/caterers.controller');
const { verifyToken, isAdmin } = require('../middlewares/auth.middleware');

router.get('/', caterersController.getAllCaterers);
router.get('/:id', caterersController.getCatererById);
router.post('/', verifyToken, isAdmin, caterersController.createCaterer);
router.put('/:id', verifyToken, isAdmin, caterersController.updateCaterer);
router.delete('/:id', verifyToken, isAdmin, caterersController.deleteCaterer);

module.exports = router;
