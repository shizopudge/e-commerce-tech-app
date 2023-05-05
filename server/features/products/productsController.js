const productsRepository = require('./productsRepository.js');
const apiExceptionResponses = require('../../apiResponses/apiExceptionResponses.js');

class ProductsController {
    async create(req, res) {
        try {
            const title = req.body.title;
            const description = req.body.description;
            const characteristics = req.body.characteristics;
            const quantity = req.body.quantity;
            const price = req.body.price;
            const productCode = req.body.productCode;
            const modelCode = req.body.modelCode;
            const productType = req.body.productType;
            const files = req.files;
            await productsRepository.create(title, files, description, characteristics, quantity, price, productCode, modelCode, productType).
            then(response => {
                if(response) {
                    if(response.status === 200) {
                        console.log('Product successfully created');
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
            await productsRepository.getOne(id).then(response => {
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
            const lastTitle = req.query.lastTitle;
            await productsRepository.getAll(lastTitle).then(response => {
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

    async delete(req, res) {
        try {
            const id = req.params.id;
            await productsRepository.delete(id).then(response => {
                if(response) {
                    if(response.status === 200) {
                        console.log('Product successfully deleted');
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
            const updatedProduct = req.body;
            await productsRepository.update(updatedProduct, id).then(response => {
                if(response) {
                    if(response.status === 200) {
                        console.log('Product successfully updated');
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

    async deleteOneImage(req, res) {
        try {
            const id = req.params.id;
            const imageLink = req.params.imageLink;
            await productsRepository.deleteOneImage(imageLink, id).then(response => {
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

    async deleteImages(req, res) {
        try {
            const id = req.params.id;
            const imagesLinks = req.body.imagesLinks;
            await productsRepository.deleteImages(imagesLinks, id).then(response => {
                if(response) {
                    if(response.status === 200) {
                        console.log('Images successfully deleted');
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
            await productsRepository.uploadImage(id, files).then(response => {
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

    async uploadImages(req, res) {
        try {
            const id = req.params.id;
            const files = req.files;
            await productsRepository.uploadImages(id, files).then(response => {
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

    async searchProduct(req, res) {
        try {
            const query = req.query.query;
            const lastTitle = req.query.lastTitle;
            const isLatest = req.query.isLatest;
            const isBestseller = req.query.isBestseller;
            const minRating = req.query.minRating;
            const discount = req.query.discount;
            const inStock = req.query.inStock;
            const minReliability = req.query.minReliability;
            const minPrice = req.query.minPrice;
            const maxPrice = req.query.maxPrice;
            const productType = req.query.productType;
            const orderBy = req.query.orderBy;
            await productsRepository.searchProduct(query, lastTitle, isLatest, isBestseller, minRating, discount, inStock, minReliability, minPrice, maxPrice, productType, orderBy).then(response => {
                if(response) {
                    if(response.status === 200) {
                        console.log('Products successfully searched');
                        if(response.data.totalCount === 0) {
                            res.status(404).send(apiExceptionResponses.notFound());
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


module.exports = new ProductsController();