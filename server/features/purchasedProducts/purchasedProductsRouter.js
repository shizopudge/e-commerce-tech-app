const Router = require('express');
const router = new Router;
const purchasedProductsController = require('./purchasedProductsController.js');
const authMiddleware = require('../../middleware/authMiddleware.js');

router.post('/:productId', authMiddleware.checkAuth, purchasedProductsController.create);

router.put('/:id', authMiddleware.checkAuth, purchasedProductsController.update);

router.get('/v1/admin/filter', authMiddleware.checkAuth, purchasedProductsController.filterAndSortAllPurchasedProduct);

router.get('/v1/user/filter', authMiddleware.checkAuth, purchasedProductsController.filterAndSortUserPurchasedProduct);

router.get('/:id', authMiddleware.checkAuth, purchasedProductsController.getOne);

router.get('/', authMiddleware.checkAuth, purchasedProductsController.getAll);

router.get('/user/:userId', authMiddleware.checkAuth, purchasedProductsController.getAllUsersPurchasedProducts);

router.get('/user/stats/:uid', authMiddleware.checkAuth, purchasedProductsController.getUserStatsOfPusrchases);

module.exports = router;
