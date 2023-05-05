const Router = require('express');
const router = new Router;
const authController = require('./authController.js');
const authMiddleware = require('../../middleware/authMiddleware.js');

router.post('/signUp', authController.signUp);

router.get('/token', authMiddleware, authController.generateToken);

module.exports = router;
