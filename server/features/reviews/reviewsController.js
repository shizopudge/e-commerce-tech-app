const reviewsRepository = require('./reviewsRepository.js');
const apiExceptionResponses = require('../../apiResponses/apiExceptionResponses.js');

class ReviewsController {

    async create(req, res) {
        try {
            const authorId = req.body.authorId;
            const productId = req.body.productId;
            const body = req.body.body;
            const rating = req.body.rating;
            const files = req.files;
            await reviewsRepository.create(authorId, productId, body, rating, files).
            then(response => {
                if(response) {
                    if(response.status === 200) {
                        console.log('Review successfully created');
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
            await reviewsRepository.update(updatedFields, id).then(response => {
                if(response) {
                    if(response.status === 200) {
                        console.log('Review successfully updated');
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
            await reviewsRepository.deleteOneImage(imageLink, id).then(response => {
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
            await reviewsRepository.deleteImages(imagesLinks, id).then(response => {
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
            await reviewsRepository.uploadImage(id, files).then(response => {
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
            await reviewsRepository.uploadImages(id, files).then(response => {
                if(response) {
                    if(response.status === 200) {
                        console.log('Images successfully uploaded');
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

    async sortAllProductReviews(req, res) {
        try {
            const productId = req.params.productId;
            const lastReviewId = req.query.lastReviewId;
            const orderBy = req.query.orderBy;
            await reviewsRepository.sortAllProductReviews(productId, lastReviewId, orderBy).then(response => {
                if(response) {
                    if(response.status === 200) {
                        console.log('Successfully sorted all product reviews');
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

    async sortUserReviews(req, res) {
        try {
            const userId = req.params.userId;
            const lastReviewId = req.query.lastReviewId;
            const orderBy = req.query.orderBy;
            await reviewsRepository.sortUserReviews(lastReviewId, orderBy, userId).then(response => {
                if(response) {
                    if(response.status === 200) {
                        console.log('Successfully sorted user reviews');
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

    async getUserReviews(req, res) {
        try {
            const userId = req.params.userId;
            const lastReviewId = req.query.lastReviewId;
            await reviewsRepository.getUserReviews(lastReviewId, userId).then(response => {
                if(response) {
                    if(response.status === 200) {
                        console.log('Successfully get user reviews');
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

    async getUserProductReview(req, res) {
        try {
            const userId = req.params.userId;
            const productId = req.params.productId;
            await reviewsRepository.getUserProductReview(userId, productId).then(response => {
                if(response) {
                    if(response.status === 200) {
                        console.log('Successfully get user product review');
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
}

module.exports = new ReviewsController();