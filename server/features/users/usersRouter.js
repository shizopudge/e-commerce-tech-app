const Router = require('express');
const router = new Router;
const usersController = require('./usersController.js');
const authMiddleware = require('../../middleware/authMiddleware.js');

router.post('/', authMiddleware.checkAuth, authMiddleware.checkRole, usersController.create);

router.delete('/:id', authMiddleware.checkAuth, usersController.delete);

router.delete('/image/:id', authMiddleware.checkAuth,  usersController.deleteImage);

router.get('/:id', authMiddleware.checkAuth, usersController.getOne);

router.get('/', authMiddleware.checkAuth, authMiddleware.checkRole, usersController.getAll);

router.get('/v1/search', authMiddleware.checkAuth, usersController.searchAndFilterAndSortUser);

router.put('/image/:id', authMiddleware.checkAuth, usersController.uploadImage);

router.put('/:id', authMiddleware.checkAuth, usersController.update);

module.exports = router;
