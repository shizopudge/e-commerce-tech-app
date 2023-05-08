const Router = require('express');
const router = new Router;
const authController = require('./authController.js');
const usersController = require('../users/usersController.js');

router.post('/signUp', authController.signUp, usersController.create);

router.post('/signUpAsAdmin', authController.signUpAsAdmin, usersController.create);

module.exports = router;
