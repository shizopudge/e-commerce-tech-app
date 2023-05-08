const Router = require('express');
const router = new Router;
const productsController = require('./productsController.js');
const authMiddleware = require('../../middleware/authMiddleware.js');

router.post('/', authMiddleware.checkAuth, authMiddleware.checkRole, productsController.create); 

router.get('/:id', authMiddleware.checkAuth, productsController.getOne);

router.get('/', authMiddleware.checkAuth, productsController.getAll);

router.get('/v1/search', authMiddleware.checkAuth, productsController.searchAndFilterAndSortProduct);

router.delete('/:id', authMiddleware.checkAuth, authMiddleware.checkRole, productsController.delete);

router.delete('/image/:id/:imageLink', authMiddleware.checkAuth, authMiddleware.checkRole, productsController.deleteOneImage);

router.delete('/images/:id', authMiddleware.checkAuth, authMiddleware.checkRole, productsController.deleteImages);

router.put('/:id', authMiddleware.checkAuth, authMiddleware.checkRole, productsController.update);

router.put('/image/:id', authMiddleware.checkAuth, authMiddleware.checkRole, productsController.uploadImage);

router.put('/images/:id', authMiddleware.checkAuth, authMiddleware.checkRole, productsController.uploadImages);

router.put('/cart/:productId/:uid', authMiddleware.checkAuth, productsController.addToCart);

router.put('/wishlist/:productId/:uid', authMiddleware.checkAuth, productsController.addToWishlist);

module.exports = router;
