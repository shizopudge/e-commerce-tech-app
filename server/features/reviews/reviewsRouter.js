const Router = require('express');
const router = new Router;
const reviewsController = require('./reviewsController.js');
const authMiddleware = require('../../middleware/authMiddleware.js');

router.post('/',  reviewsController.create);

router.delete('/image/:id/:imageLink', authMiddleware.checkAuth, reviewsController.deleteOneImage);

router.delete('/images/:id', authMiddleware.checkAuth, reviewsController.deleteImages);

router.put('/:id', authMiddleware.checkAuth, reviewsController.update);

router.put('/image/:id', authMiddleware.checkAuth, reviewsController.uploadImage);

router.put('/images/:id', authMiddleware.checkAuth, reviewsController.uploadImages);

router.get('/:productId/:userId', authMiddleware.checkAuth, reviewsController.getUserProductReview);

router.get('/:userId', authMiddleware.checkAuth, reviewsController.getUserReviews);

router.get('/v1/sort/user/:userId', authMiddleware.checkAuth, reviewsController.sortUserReviews);

router.get('/v1/sort/:productId', authMiddleware.checkAuth, reviewsController.sortAllProductReviews);

module.exports = router;
