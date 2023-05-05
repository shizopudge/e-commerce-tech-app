const {db, fieldValue} = require('../../firebase_config.js');
const apiExceptionResponses = require('../../apiResponses/apiExceptionResponses.js');
const apiSuccessfulResponses = require('../../apiResponses/apiSuccessfulResponses.js');
const uuid = require('uuid');
const shortUuid = require('short-uuid');
const filesService = require('../../service/filesService.js');
const createProductDto = require('../products/dto/createProductDto.js');

class ProductsRepository {
    async create(title, files, description, characteristics, quantity, price, productCode, modelCode, productType) {
        const id = uuid.v4();
        if(title && description && characteristics && quantity && price && productCode && modelCode && productType) {
            quantity = parseInt(quantity);
            price = parseFloat(price);
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
                    const product = createProductDto(id, title, description, imagesNames, characteristics, quantity, price, productCode, modelCode, productType);
                    const response = await db.collection('products').doc(id).create(product);
                    filesService.uploadProductImages(images);
                    return apiSuccessfulResponses.successfullResponse(response);
                } else {
                    const image = files.images;
                    const imageId = shortUuid.generate();
                    const fileName = id + ` ${imageId}`  + '.jpg';  
                    const product = createProductDto(id, title, description, [fileName], characteristics, quantity, price, productCode, modelCode, productType);
                    const response = await db.collection('products').doc(id).create(product);
                    filesService.uploadProductImage(image, fileName);
                    return apiSuccessfulResponses.successfullResponse(response);
                }
            } else {
                const product = createProductDto(id, title, description, null, characteristics, quantity, price, productCode, modelCode, productType);
                const response = await db.collection('products').doc(id).create(product);
                return apiSuccessfulResponses.successfullResponse(response);
            }  
        } else {
            if (!title) {
                return apiExceptionResponses.badRequest('We could not get product title');
            }
            if (!description) {
                return apiExceptionResponses.badRequest('We could not get product description');
            }
            if (!characteristics) {
                return apiExceptionResponses.badRequest('We could not get product characteristics');
            }
            if (!quantity) {
                return apiExceptionResponses.badRequest('We could not get product quantity');
            }
            if (!price) {
                return apiExceptionResponses.badRequest('We could not get product price');
            }
            if (!productCode) {
                return apiExceptionResponses.badRequest('We could not get product product code');
            }
            if (!modelCode) {
                return apiExceptionResponses.badRequest('We could not get product model code');
            }
            if (!productType) {
                return apiExceptionResponses.badRequest('We could not get product product type');
            }
        }
    }

    async getOne(id) {
        if(id) {
            const ref = db.collection('products').doc(id);
            const response = (await ref.get()).data();
            if(response) {
                return apiSuccessfulResponses.successfullResponse(null, response);
            } else {
                return apiExceptionResponses.notFound();
            }
        } else {
            return apiExceptionResponses.badRequest('We could not get product id');
        }
    }

    async getAll(lastTitle) {
        const products = [];
        const countRef = db.collection('products').count();
        const totalCount = (await countRef.get()).data().count;
        const pageCount = Math.ceil(totalCount / 10);
        if(lastTitle) {
            const ref = db.collection('products').limit(10).orderBy('title').startAfter(lastUsername);
            const response = await ref.get();
            response.docs.forEach((doc) => {
                products.push(doc.data());
            });
            return apiSuccessfulResponses.successfullResponse(null, {pageCount, totalCount, count: products.length, products,});
        } else {
            const ref = db.collection('products').limit(10).orderBy('title');
            const response = await ref.get();
            response.docs.forEach((doc) => {
                products.push(doc.data());
            });
            return apiSuccessfulResponses.successfullResponse(null, {pageCount, totalCount, count: products.length, products,});
        }
    }

    async delete(id) {
        if(id) {
            const ref = db.collection('products').doc(id);
            const product = (await ref.get()).data();
            if(product) {
                const response = await ref.delete();
                if(product.images.length > 0) {
                    if(product.images.length > 1) {
                        filesService.deleteProductImages(product.images);
                    } else {
                        filesService.deleteProductImage(product.images[0]);
                    }
                }
                return apiSuccessfulResponses.successfullResponse(response);
            } else {
                return apiExceptionResponses.notFound();
            }
        } else {
            return apiExceptionResponses.badRequest('We could not get product id');
        }
    }

    async update(updatedProduct, id) {
         if(id){
            if(updatedProduct) {
                const ref = db.collection('products').doc(id);
                const product = (await ref.get()).data();
                if(product) {
                    const response = await ref.update(updatedProduct);
                    return apiSuccessfulResponses.successfullResponse(response);
                } else {
                    return apiExceptionResponses.notFound();
                }
            } else {
                return apiExceptionResponses.badRequest('We could not get updated product');
            }
        } else {
            return apiExceptionResponses.badRequest('We could not get product id');
        }
    }

    async deleteOneImage(imageLink, id) {
        const ref = db.collection('products').doc(id);
        const product = (await ref.get()).data();
        if(product) {
            if(product.images.includes(imageLink)) {
                const filteredProductImages = product.images.filter((link) => {
                    return link != imageLink;
                });
                const response = await ref.update({images: filteredProductImages});
                filesService.deleteProductImage(imageLink);
                return apiSuccessfulResponses.successfullResponse(response);
            } else {
                return apiExceptionResponses.badRequest('The image you want to delete does not exist');
            }
        } else {
            return apiExceptionResponses.notFound();
        }
    }

    async deleteImages(imagesLinks, id) {
        const ref = db.collection('products').doc(id);
        const product = (await ref.get()).data();
        if(product) {
            if(imagesLinks) {
                const filteredProductImages = product.images.filter((imageLink) => {
                    return !imagesLinks.includes(imageLink);
                })
                const response = await ref.update({images: filteredProductImages});
                filesService.deleteProductImages(imagesLinks);
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
            const ref = db.collection('products').doc(id);
            const product = (await ref.get()).data();
            if(product) {
                if(files) {
                    const image = files.image;
                    const imageId = shortUuid.generate();
                    const ref = db.collection('products').doc(id);
                    const product = (await ref.get()).data();
                        if(product && image) {
                            if(product.images.length < 8) {
                                const fileName = id + imageId + '.jpg';
                                const response = await ref.update({images: fieldValue.arrayUnion(fileName)});
                                filesService.uploadProductImage(image, fileName);
                                return apiSuccessfulResponses.successfullResponse(response);
                            } else {
                                return apiExceptionResponses.badRequest('Could not upload more than 8 images');
                            }
                        } else {
                            if(!image) {
                                return apiExceptionResponses.badRequest('We could not get your image');
                            }
                            if(!product) {
                                return apiExceptionResponses.notFound();
                            }
                            return apiExceptionResponses.internalServerError();
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
            const ref = db.collection('products').doc(id);
            const product = (await ref.get()).data();
            if(product) {
                if(files) {
                    const ref = db.collection('products').doc(id);
                    const product = (await ref.get()).data();
                        if(product && files.images) {
                            if(files.images.length > 1) {
                                if(product.images) {
                                    if((product.images.length + files.images.length) <= 8) {
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
                                        filesService.uploadProductImages(images);
                                        return apiSuccessfulResponses.successfullResponse(response);
                                    } else {
                                        return apiExceptionResponses.badRequest('Could not upload more than 8 images');
                                    }
                                } else {
                                    if(files.images.length <= 8) {
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
                                        filesService.uploadProductImages(images);
                                        return apiSuccessfulResponses.successfullResponse(response);
                                    } else {
                                        return apiExceptionResponses.badRequest('Could not upload more than 8 images');
                                    }
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

    async searchProduct(query, lastTitle, isLatest, isBestseller, minRating, discount, inStock, minReliability, minPrice, maxPrice, productType, orderBy) {
        const products = [];
        let indexOfLastReturnedProduct = null;
        let ref = null;
        let matchingToSearchedProducts = null;
        if(orderBy) {
            ref = db.collection('products').orderBy('price', orderBy);
        } else {
            ref = db.collection('products').orderBy('title', 'desc');
        }
        if(ref) {
            const response = await ref.get();
            response.docs.forEach((doc) => {
                products.push(doc.data());
            });
            const eligibleProducts = this._sortProducts(isLatest, isBestseller, minRating, discount, inStock, minReliability, minPrice, maxPrice, productType, products);
            if(lastTitle) {
                indexOfLastReturnedProduct = eligibleProducts.findIndex(product => product.title === lastTitle);
            }
            if(query) {
                matchingToSearchedProducts = eligibleProducts.filter(product => {
                        if(product.title.toLowerCase().includes(query.toLowerCase())) {
                            return product;
                        }
                    });
            } else {
                matchingToSearchedProducts = eligibleProducts;
            }
            const totalCount = matchingToSearchedProducts.length;
            const pageCount = Math.ceil(totalCount / 10);
            const productsToReturn = matchingToSearchedProducts.slice(indexOfLastReturnedProduct !== null ? indexOfLastReturnedProduct + 1 : 0, 10);
            return apiSuccessfulResponses.successfullResponse(null, {pageCount, totalCount, count: productsToReturn.length, productsToReturn});
        } else {
            return apiExceptionResponses.internalServerError();
        }
    }

    _sortProducts(isLatest, isBestseller, minRating, discount, inStock, minReliability, minPrice, maxPrice, productType, products) {
        const unsuitableProducts = products.filter((product) => {
            if(isLatest) {
                if(product.isLatest !== true) {
                    return product;
                }
            }
            if(isBestseller) {
                if(product.isBestseller !== true) {
                    return product;
                }
            }
            if(minRating) {
                if(product.rating < minRating) {
                    return product;
                }
            }
            if(discount) {
                if(product.discount == null) {
                    return product;
                }
            }
            if(inStock) {
                if(product.quantity == 0) {
                    return product;
                }
            }
            if(minReliability) {
                if(product.reliability < minReliability) {
                    return product;
                }
            }
            if(minPrice) {
                if(product.price < minPrice) {
                    return product;
                }
            }
            if(maxPrice) {
                if(product.price > maxPrice) {
                    return product;
                }
            }
            if(productType) {
                if(product.productType !== productType) {
                    return product;
                }
            }
        });
        const eligibleProducts = products.filter(product => {
            if(!unsuitableProducts.includes(product)) {
                return product;
            }
        });
        //? for(let i = 0; i < products.length; i++) {
        //     const product = products[i];
        //     for(let j = 0; j < unsuitableProducts.length; j++) {
        //         const unsuitableProduct = unsuitableProducts[i];
        //         if(product === unsuitableProduct) {
        //             eligibleProducts.splice(i, 1);
        //         }
        //     }
        // }
        return eligibleProducts;
    }
}

module.exports = new ProductsRepository();