const Router = require('express');
const router = new Router;
const authRouter = require('./features/auth/authRouter.js');
const usersRouter = require('./features/users/usersRouter.js');
const productsRouter = require('./features/products/productsRouter.js');
const purchasedProductsRouter = require('./features/purchasedProducts/purchasedProductsRouter.js');
const reviews = require('./features/reviews/reviewsRouter.js');

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/products', productsRouter);
router.use('/purchasedProducts', purchasedProductsRouter);
router.use('/reviews', reviews);

module.exports = router;