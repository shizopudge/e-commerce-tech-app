const Router = require('express');
const router = new Router;
const authRouter = require('./features/auth/authRouter.js');
const usersRouter = require('./features/users/usersRouter.js');
const productsRouter = require('./features/products/productsRouter.js');

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/products', productsRouter);

module.exports = router;