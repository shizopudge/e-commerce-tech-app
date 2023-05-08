const purchasedProductsRepository = require('./purchasedProductsRepository.js');
const apiExceptionResponses = require('../../apiResponses/apiExceptionResponses.js');

class PurchasedProductsController {
    async create(req, res) {
        try {
            const productId = req.params.productId;
            const buyersId = req.body.buyersId;
            const deliveryAddress = req.body.deliveryAddress;
            const deliveryTime = req.body.deliveryTime;
            await purchasedProductsRepository.create(productId, buyersId, deliveryAddress, deliveryTime).
            then(response => {
                if(response) {
                    if(response.status === 200) {
                        console.log('Purchased product successfully created');
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
            const updatedFields = req.body;
            await purchasedProductsRepository.update(updatedFields, id).then(response => {
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

    async getOne(req, res) {
        try {
            const id = req.params.id;
            await purchasedProductsRepository.getOne(id).then(response => {
                if(response) {
                    if(response.status === 200) {
                        console.log('Successfully get user');
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
            const lastPurchasedProductId = req.query.lastPurchasedProductId;
            await purchasedProductsRepository.getAll(lastPurchasedProductId).then(response => {
                if(response) {
                    if(response.status === 200) {
                        console.log('Successfully get all purchased products');
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

    async getAllUsersPurchasedProducts(req, res) {
        try {
            const userId = req.params.userId;
            const lastPurchasedProductId = req.query.lastPurchasedProductId;
            await purchasedProductsRepository.getAllUsersPurchasedProducts(lastPurchasedProductId, userId).then(response => {
                if(response) {
                    if(response.status === 200) {
                        console.log('Successfully get all users purchased products');
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

    async getUserStatsOfPusrchases(req, res) {
        try {
            const uid = req.params.uid;
            const period = req.body.period;
            await purchasedProductsRepository.getUserStatsOfPusrchases(period, uid).then(response => {
                if(response) {
                    if(response.status === 200) {
                        console.log('Successfully get users stats of purchases');
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

    async filterAndSortAllPurchasedProduct(req, res) {
        try {
            const lastPurchasedProductId = req.query.lastPurchasedProductId;
            const isDelivered = req.query.isDelivered;
            const discount = req.query.discount;
            const orderByPurchaseDate = req.query.orderByPurchaseDate;
            const orderByPrice = req.query.orderByPrice;
            const period = req.body.period;
            await purchasedProductsRepository.filterAndSortAllPurchasedProduct(lastPurchasedProductId, period, isDelivered, discount, orderByPurchaseDate, orderByPrice).then(response => {
                if(response) {
                    if(response.status === 200) {
                        console.log('Purchased products successfully filtered');
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

    async filterAndSortUserPurchasedProduct(req, res) {
        try {
            const userId = req.query.userId;
            const lastPurchasedProductId = req.query.lastPurchasedProductId;
            const isDelivered = req.query.isDelivered;
            const discount = req.query.discount;
            const orderByPurchaseDate = req.query.orderByPurchaseDate;
            const orderByPrice = req.query.orderByPrice;
            const period = req.body.period;
            await purchasedProductsRepository.filterAndSortUserPurchasedProduct(lastPurchasedProductId, period, isDelivered, discount, orderByPurchaseDate, orderByPrice, userId).then(response => {
                if(response) {
                    if(response.status === 200) {
                        console.log('Purchased products successfully filtered');
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

module.exports = new PurchasedProductsController();