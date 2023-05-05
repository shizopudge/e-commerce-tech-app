const Router = require('express');
const router = new Router;
const usersController = require('./usersController.js');

router.post('/', usersController.create);

router.delete('/:id', usersController.delete);

router.delete('/image/:id', usersController.deleteImage);

router.get('/:id', usersController.getOne);

router.get('/', usersController.getAll);

router.get('/v1/search', usersController.searchUser);

router.put('/image/:id', usersController.uploadImage);

router.put('/:id', usersController.update);

module.exports = router;
