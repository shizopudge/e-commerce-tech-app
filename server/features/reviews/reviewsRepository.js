const createReviewDto = require('./dto/createReviewDto.js');
const {db, fieldValue} = require('../../firebase_config.js');
const uuid = require('uuid');
const shortUuid = require('short-uuid');
const filesService = require('../../service/filesService.js');
const apiExceptionResponses = require('../../apiResponses/apiExceptionResponses.js');
const apiSuccessfulResponses = require('../../apiResponses/apiSuccessfulResponses.js');

class ReviewsRepository {
    async create(authorId, productId, body, rating, files) {
        const id = uuid.v4();
        if(authorId && productId && body && rating) {
            const userReviewResponse = await this.getUserProductReview(authorId, productId);
            const userReview = userReviewResponse.data;
            if(userReview) {
                return apiExceptionResponses.badRequest('User is already have review about this product');
            }
            const createdAt = new Date().toUTCString();
            const title = body.split(' ').slice(0, 10).join(' ');
            if(files) {
                const images = [];
                const imagesNames = []
                if (files.images.length) {
                    for(let i = 0; i < files.images.length; i++) {
                        const imageId = shortUuid.generate();
                        const fileName = id + ` ${imageId}` + '.jpg';              
                        images.push({
                            img: files.images[i],
                            fileName: fileName,
                        });
                        imagesNames.push(fileName);
                    }
                    const review = createReviewDto(id, authorId, productId, title, body, rating, imagesNames, createdAt);
                    const response = await db.collection('reviews').doc(id).create(review);
                    filesService.uploadReviewImages(images);
                    return apiSuccessfulResponses.successfullResponse(response);
                } else {
                    const image = files.images;
                    const imageId = shortUuid.generate();
                    const fileName = id + ` ${imageId}`  + '.jpg';  
                    const review = createReviewDto(id, authorId, productId, title, body, rating, [fileName], createdAt);
                    const response = await db.collection('reviews').doc(id).create(review);
                    filesService.uploadReviewImage(image, fileName);
                    return apiSuccessfulResponses.successfullResponse(response);
                }
            } else {
                const review = createReviewDto(id, authorId, productId, title, body, rating, null, createdAt);
                const response = await db.collection('reviews').doc(id).create(review);
                return apiSuccessfulResponses.successfullResponse(response);
            }  
        } else {
            if (!authorId) {
                return apiExceptionResponses.badRequest('We could not get review author id');
            }
            if (!productId) {
                return apiExceptionResponses.badRequest('We could not get review product id');
            }
            if (!body) {
                return apiExceptionResponses.badRequest('We could not get review body');
            }
            if (!rating) {
                return apiExceptionResponses.badRequest('We could not get review rating');
            }
        }
    }

    async update(updatedFields, id) {
        if(id){
           if(updatedFields) {
               const ref = db.collection('reviews').doc(id);
               const product = (await ref.get()).data();
               if(product) {
                   const response = await ref.update(updatedFields);
                   return apiSuccessfulResponses.successfullResponse(response);
               } else {
                   return apiExceptionResponses.notFound();
               }
           } else {
               return apiExceptionResponses.badRequest('We could not get updated review');
           }
       } else {
           return apiExceptionResponses.badRequest('We could not get review id');
       }
   }

    async deleteOneImage(imageLink, id) {
        const ref = db.collection('reviews').doc(id);
        const review = (await ref.get()).data();
        if(review) {
            if(review.images.includes(imageLink)) {
                const filteredReviewImages = review.images.filter((link) => {
                    return link != imageLink;
                });
                const response = await ref.update({images: filteredReviewImages});
                filesService.deleteReviewImage(imageLink);
                return apiSuccessfulResponses.successfullResponse(response);
            } else {
                return apiExceptionResponses.badRequest('The image you want to delete does not exist');
            }
        } else {
            return apiExceptionResponses.notFound();
        }
    }

    async deleteImages(imagesLinks, id) {
        const ref = db.collection('reviews').doc(id);
        const review = (await ref.get()).data();
        if(review) {
            if(imagesLinks) {
                const filteredReviewImages = review.images.filter((imageLink) => {
                    return !imagesLinks.includes(imageLink);
                })
                const response = await ref.update({images: filteredReviewImages});
                filesService.deleteReviewImages(imagesLinks);
                return apiSuccessfulResponses.successfullResponse(response);
            } else {
                return apiExceptionResponses.badRequest('We could not get what images you choose to delete');
            } 
        } else {
            return apiExceptionResponses.notFound();
        }
    }
    
    async uploadImage(id, files) {
        if(id) {
            const ref = db.collection('reviews').doc(id);
            const review = (await ref.get()).data();
            if(review) {
                if(files) {
                    const image = files.image;
                    const imageId = shortUuid.generate();
                        if(image) {
                            const fileName = id + imageId + '.jpg';
                            if(review.images) {
                                if(review.images.length < 8) {
                                    const response = await ref.update({images: fieldValue.arrayUnion(fileName)});
                                    filesService.uploadReviewImage(image, fileName);
                                    return apiSuccessfulResponses.successfullResponse(response);
                                } else {
                                    return apiExceptionResponses.badRequest('Could not upload more than 8 images');
                                }
                            } else {
                                const response = await ref.update({images: [fileName]});
                                filesService.uploadReviewImage(image, fileName);
                                return apiSuccessfulResponses.successfullResponse(response);
                            }
                        } else {
                            return apiExceptionResponses.badRequest('We could not get your image');
                        }
                    } else {
                        return apiExceptionResponses.badRequest('We could not get your picture');
                    }
            } else {
                return apiExceptionResponses.notFound();
            }
        } else {
            return apiExceptionResponses.badRequest('We could not get product id');
        }
    }

    async uploadImages(id, files) {
        if(id) {
            const ref = db.collection('reviews').doc(id);
            const review = (await ref.get()).data();
            if(review) {
                if(files) {
                        if(files.images) {
                            if(files.images.length > 1) {
                                if(review.images) {
                                    if((review.images.length + files.images.length) <= 8) {
                                        const images = [];
                                        const imagesNames = [];
                                        for(let i = 0; i < files.images.length; i++) {
                                            const imageId = shortUuid.generate();
                                            const fileName = id + ` ${imageId}` + '.jpg';              
                                            images.push({
                                                img: files.images[i],
                                                fileName: fileName,
                                            });
                                            imagesNames.push(fileName);
                                        }
                                        const response = await ref.update({images: fieldValue.arrayUnion(...imagesNames)});
                                        filesService.uploadReviewImages(images);
                                        return apiSuccessfulResponses.successfullResponse(response);
                                    } else {
                                        return apiExceptionResponses.badRequest('Could not upload more than 8 images');
                                    }
                                } else {
                                        const images = [];
                                        const imagesNames = [];
                                        for(let i = 0; i < files.images.length; i++) {
                                            const imageId = shortUuid.generate();
                                            const fileName = id + ` ${imageId}` + '.jpg';              
                                            images.push({
                                                img: files.images[i],
                                                fileName: fileName,
                                            });
                                            imagesNames.push(fileName);
                                        }
                                        const response = await ref.update({images: imagesNames});
                                        filesService.uploadReviewImages(images);
                                        return apiSuccessfulResponses.successfullResponse(response);
                                }
                            } else {
                                return apiExceptionResponses.badRequest('If you are uploading 1 image then you need to use a different route');
                            }
                        } else {
                            if(!images) {
                                return apiExceptionResponses.badRequest('We could not get your images');
                            }
                            if(!product) {
                                return apiExceptionResponses.notFound();
                            }
                            return apiExceptionResponses.internalServerError();
                        }
                    } else {
                        return apiExceptionResponses.badRequest('We could not get your images');
                    }
            } else {
                return apiExceptionResponses.notFound();
            }
        } else {
            return apiExceptionResponses.badRequest('We could not get product id');
        }
    }

    async getUserProductReview(userId, productId) {
        if(userId && productId) {
            const ref = db.collection('reviews').where('productId', '==', productId);
            const response = await ref.get();
            const reviews = [];
            let userReview = null;
            response.docs.forEach((doc) => {
                reviews.push(doc.data());
            });
            reviews.forEach(review => {
                if(review.authorId === userId) {
                    userReview = review;
                }
            });
            if(userReview) {
                return apiSuccessfulResponses.successfullResponse('User review', userReview);
            } else {
                return apiExceptionResponses.notFound();
            }
        } else {
            if(!userId) {
                return apiExceptionResponses.badRequest('We could not get user id');
            }
            if(!productId) {
                return apiExceptionResponses.badRequest('We could not get product id');
            }
            return apiExceptionResponses.internalServerError();
        }
    }

    async getUserReviews(lastReviewId, userId) {
        if(userId) {
            const reviews = [];
            const countRef = db.collection('reviews').where('authorId', '==', userId).count();
            const totalCount = (await countRef.get()).data().count;
            const pageCount = Math.ceil(totalCount / 10);
            if(lastReviewId) {
                const ref = db.collection('reviews').limit(10).where('authorId', '==', userId).orderBy('createdAt', 'desc').startAfter(lastReviewId);
                const response = await ref.get();
                response.docs.forEach((doc) => {
                    reviews.push(doc.data());
                });
                return apiSuccessfulResponses.successfullResponse(null, {pageCount, totalCount, count: reviews.length, reviews,});
            } else {
                const ref = db.collection('reviews').limit(10).where('authorId', '==', userId).orderBy('createdAt', 'desc');
                const response = await ref.get();
                response.docs.forEach((doc) => {
                    reviews.push(doc.data());
                });
                return apiSuccessfulResponses.successfullResponse(null, {pageCount, totalCount, count: reviews.length, reviews,});
            }
        } else {
            return apiExceptionResponses.badRequest('We could not get user id');
        }
    }

    async sortUserReviews(lastReviewId, orderBy, userId) {
        const reviews = [];
        let indexOfLastReturnedReview = null;
        if(userId) {
            const ref = db.collection('reviews').where('authorId', '==', userId).orderBy('createdAt', 'desc');
        if(ref) {
            const response = await ref.get();
            response.docs.forEach((doc) => {
                reviews.push(doc.data());
            });
            if(lastReviewId) {
                indexOfLastReturnedReview = reviews.findIndex(review => review.id === lastReviewId);
            }
            if(orderBy) {
                if(orderBy == 'date') {
                    reviews.sort((a, b) => {
                        const aCreatedAt = new Date(a.createdAt).getTime();
                        const bCreatedAt = new Date(b.createdAt).getTime();
                        if(aCreatedAt > bCreatedAt) {
                            return -1;
                        }
                        if(aCreatedAt < bCreatedAt) {
                            return 1
                        }
                        return 0;
                    });
                }
                if(orderBy == 'popular') {
                    reviews.sort((a, b) => {
                        const aLikes = a.likes.length;
                        const bLikes = b.likes.length;
                        const aDislikes = a.dislikes.length;
                        const bDislikes = b.dislikes.length;
                        if(aLikes > bLikes && aDislikes < bDislikes) {
                            return -1;
                        }
                        if(aLikes < bLikes && aDislikes > bDislikes) {
                            return 1
                        }
                        return 0;
                    });
                }
            }
            const totalCount = reviews.length;
            const pageCount = Math.ceil(totalCount / 10);
            const reviewsToReturn = reviews.slice(indexOfLastReturnedReview !== null ? indexOfLastReturnedReview + 1 : 0, 10);
            return apiSuccessfulResponses.successfullResponse(null, {pageCount, totalCount, count: reviewsToReturn.length, reviews: reviewsToReturn});
        } else {
            return apiExceptionResponses.internalServerError();
        }
        } else {
            return apiExceptionResponses.badRequest('We could not get user id');
        }
    }

    async sortAllProductReviews(productId, lastReviewId, orderBy) {
        if(productId) {
            const reviews = [];
            let indexOfLastReturnedReview = null;
            const ref = db.collection('reviews').where('productId', '==', productId);
            if(ref) {
                const response = await ref.get();
                response.docs.forEach((doc) => {
                    reviews.push(doc.data());
                });
                if(lastReviewId) {
                    indexOfLastReturnedReview = reviews.findIndex(review => review.id === lastReviewId);
                }
                if(orderBy) {
                    if(orderBy == 'date') {
                        reviews.sort((a, b) => {
                            const aCreatedAt = new Date(a.createdAt).getTime();
                            const bCreatedAt = new Date(b.createdAt).getTime();
                            if(aCreatedAt > bCreatedAt) {
                                return -1;
                            }
                            if(aCreatedAt < bCreatedAt) {
                                return 1
                            }
                            return 0;
                        });
                    }
                    if(orderBy == 'popular') {
                        reviews.sort((a, b) => {
                            let aRatio = a.likes.length / a.dislikes.length;
                            let bRatio = b.likes.length / b.dislikes.length;
                            if(isNaN(aRatio)) {
                                aRatio = 0;
                            }
                            if(isNaN(bRatio)) {
                                bRatio = 0;
                            }
                            if(aRatio > bRatio) {
                                return -1;
                            }
                            if(aRatio < bRatio) {
                                return 1
                            }
                            return 0;
                        });
                    }
                }
                const totalCount = reviews.length;
                const pageCount = Math.ceil(totalCount / 10);
                const reviewsToReturn = reviews.slice(indexOfLastReturnedReview !== null ? indexOfLastReturnedReview + 1 : 0, 10);
                return apiSuccessfulResponses.successfullResponse(null, {pageCount, totalCount, count: reviewsToReturn.length, reviews: reviewsToReturn});
            } else {
                return apiExceptionResponses.internalServerError();
            }
        } else {
            return apiExceptionResponses.badRequest('We could not get product id');
        }
    }
}

module.exports = new ReviewsRepository();