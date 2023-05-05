const usersRepository = require('./usersRepository.js');
const apiExceptionResponses = require('../../apiResponses/apiExceptionResponses.js');
const { response } = require('express');

class UsersController {
    async create(req, res) {
        try {
            const username = req.body.username;
            const email = req.body.email;
            const files = req.files;
            await usersRepository.create(username, email, files).
            then(response => {
                if(response) {
                    if(response.status === 200) {
                        console.log('User successfully created');
                        res.status(200).send(response);
                    } else {
                        console.log(response.message);
                        res.status(response.status).send(response);
                    }
                } else {
                    const exception = apiExceptionResponses.internalServerError()
                    console.log(exception);
                    res.send(exception);
                }
            });
        } catch (error) {
            const exception = apiExceptionResponses.internalServerError(error.toString())
            console.log(exception);
            res.send(exception);
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id;
            await usersRepository.delete(id).then(response => {
                if(response) {
                    if(response.status === 200) {
                        console.log('User successfully deleted');
                        res.status(200).send(response);
                    } else {
                        console.log(response.message);
                        res.status(response.status).send(response);
                    }
                } else {
                    const exception = apiExceptionResponses.internalServerError()
                    console.log(exception);
                    res.send(exception);
                }
            });
        } catch (error) {
            const exception = apiExceptionResponses.internalServerError(error.toString())
            console.log(exception);
            res.send(exception);
        }
    }

    async getOne(req, res) {
        try {
            const id = req.params.id;
            await usersRepository.getOne(id).then(response => {
                if(response) {
                    if(response.status === 200) {
                        console.log('Successfully get all users');
                        res.status(200).send(response);
                    } else {
                        console.log(response.message);
                        res.status(response.status).send(response);
                    }
                } else {
                    const exception = apiExceptionResponses.internalServerError()
                    console.log(exception);
                    res.send(exception);
                }
            });
        } catch (error) {
            const exception = apiExceptionResponses.internalServerError(error.toString())
            console.log(exception);
            res.send(exception);
        }
    }

    async getAll(req, res) {
        try {
            const lastUsername = req.query.lastUsername;
            await usersRepository.getAll(lastUsername).then(response => {
                if(response) {
                    if(response.status === 200) {
                        console.log('Successfully get all users');
                        res.status(200).send(response);
                    } else {
                        console.log(response.message);
                        res.status(response.status).send(response);
                    }
                } else {
                    const exception = apiExceptionResponses.internalServerError()
                    console.log(exception);
                    res.send(exception);
                }
            });
        } catch (error) {
            const exception = apiExceptionResponses.internalServerError(error.toString())
            console.log(exception);
            res.send(exception);
        }
    }

    async deleteImage(req, res) {
        try {
            const id = req.params.id;
            await usersRepository.deleteImage(id).then(response => {
                if(response) {
                    if(response.status === 200) {
                        console.log('Image successfully deleted');
                        res.status(200).send(response);
                    } else {
                        console.log(response.message);
                        res.status(response.status).send(response);
                    }
                } else {
                    const exception = apiExceptionResponses.internalServerError()
                    console.log(exception);
                    res.send(exception);
                }
            });
        } catch (error) {
            const exception = apiExceptionResponses.internalServerError(error.toString())
            console.log(exception);
            res.send(exception);
        }
    }

    async uploadImage(req, res) {
        try {
            const id = req.params.id;
            const files = req.files;
            await usersRepository.uploadImage(id, files).then(response => {
                if(response) {
                    if(response.status === 200) {
                        console.log('Image successfully uploaded');
                        res.status(200).send(response);
                    } else {
                        console.log(response.message);
                        res.status(response.status).send(response);
                    }
                } else {
                    const exception = apiExceptionResponses.internalServerError()
                    console.log(exception);
                    res.send(exception);
                }
            });
        } catch (error) {
            const exception = apiExceptionResponses.internalServerError(error.toString())
            console.log(exception);
            res.send(exception);
        }
    }

    async update(req, res) {
        try {
            const id = req.params.id;
            const updatedUser = req.body;
            await usersRepository.update(updatedUser, id).then(response => {
                if(response) {
                    if(response.status === 200) {
                        console.log('User successfully updated');
                        res.status(200).send(response);
                    } else {
                        console.log(response.message);
                        res.status(response.status).send(response);
                    }
                } else {
                    const exception = apiExceptionResponses.internalServerError()
                    console.log(exception);
                    res.send(exception);
                }
            });
        } catch (error) {
            const exception = apiExceptionResponses.internalServerError(error.toString())
            console.log(exception);
            res.send(exception);
        }
    }

    async searchUser(req, res) {
        try {
            const query = req.query.query;
            const lastUsername = req.query.lastUsername;
            await usersRepository.searchUser(query, lastUsername).then(response => {
                if(response) {
                    if(response.status === 200) {
                        console.log('Users successfully searched');
                        if(response.data.totalCount === 0) {
                                res.status(404).send({message: 'Not found'});
                        } else {
                            res.status(200).send(response);
                        }
                    } else {
                        console.log(response.message);
                        res.status(response.status).send(response);
                    }
                } else {
                    const exception = apiExceptionResponses.internalServerError()
                    console.log(exception);
                    res.send(exception);
                }
            });
        } catch (error) {
            const exception = apiExceptionResponses.internalServerError(error.toString())
            console.log(exception);
            res.send(exception);
        }
    }
}

module.exports = new UsersController();