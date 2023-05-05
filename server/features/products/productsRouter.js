const Router = require('express');
const router = new Router;
const productsController = require('./productsController.js');

router.post('/', productsController.create);

router.get('/:id', productsController.getOne);

router.get('/', productsController.getAll);

router.get('/v1/search', productsController.searchProduct);

router.delete('/:id', productsController.delete);

router.delete('/image/:id/:imageLink', productsController.deleteOneImage);

router.delete('/images/:id', productsController.deleteImages);

router.put('/:id', productsController.update);

router.put('/image/:id', productsController.uploadImage);

router.put('/images/:id', productsController.uploadImages);

module.exports = router;
