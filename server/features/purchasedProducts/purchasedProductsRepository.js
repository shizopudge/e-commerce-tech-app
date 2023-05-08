const {db, fieldValue} = require('../../firebase_config.js');
const uuid = require('uuid');
const apiExceptionResponses = require('../../apiResponses/apiExceptionResponses.js');
const apiSuccessfulResponses = require('../../apiResponses/apiSuccessfulResponses.js');
const purchasedProductDto = require('./dto/purchasedProductDto.js');
const usersRepository = require('../users/usersRepository.js');
const serverUtils = require('../../service/utils.js');

class PurchasedProductsRepository {
    async create(productId, buyersId, deliveryAddress, deliveryTime) {
        const id = uuid.v4();
        if(productId && buyersId && deliveryAddress, deliveryTime) {
                const date = new Date().toUTCString();
                let purchasePrice = null;
                let discount = null;
                const product = (await db.collection('products').doc(productId).get()).data();
                if(product.discount) {
                    discount = product.discount;
                    purchasePrice = product.price - ((product.price / 100) * discount);
                } else {
                    purchasePrice = product.price;
                }
                const userResponse = await usersRepository.getOne(buyersId);
                const user = userResponse.data;
                if(!user) {
                    return apiExceptionResponses.notFound('User not found');
                }
                const userExpAndBonusRatio = serverUtils.computeExpAndBonusByLevel(user.level.level);
                const earnedBonuses = (purchasePrice / 100) * userExpAndBonusRatio.bonusesPercent * userExpAndBonusRatio.bonusesRatio;
                const earnedExp = (((purchasePrice / 100)) * userExpAndBonusRatio.expPercent + earnedBonuses) * userExpAndBonusRatio.expRatio;
                const deliveryDate = new Date(new Date(new Date().getTime()+(deliveryTime*24*60*60*1000)).setHours(0, 0, 0, 0)).toUTCString();
                const purchasedProduct = purchasedProductDto(id, productId, buyersId, date, purchasePrice, discount, earnedBonuses, earnedExp, deliveryDate, deliveryAddress);
                const newBonuses = user.bonuses + earnedBonuses;
                const newExp = user.level.points + earnedExp;
                const newLevel = serverUtils.levelUp(user.level.level, newExp);
                await usersRepository.update({bonuses: newBonuses, level: newLevel}, buyersId);
                const response = await db.collection('purchasedProducts').doc(id).create(purchasedProduct);
                return apiSuccessfulResponses.successfullResponse(response);
        } else {
            if (!productId) {
                return apiExceptionResponses.badRequest('We could not get product id');
            }
            if (!buyersId) {
                return apiExceptionResponses.badRequest('We could not get buyers id');
            }
            if (!deliveryAddress) {
                return apiExceptionResponses.badRequest('We could not get delivery address');
            }
            if (!deliveryTime) {
                return apiExceptionResponses.badRequest('We could not get delivery time');
            }
        }
    }

    async update(updatedFields, purchasedProductId) {
        if(purchasedProductId) {
            if(updatedFields) {
                const ref = db.collection('purchasedProducts').doc(purchasedProductId);
                const purchasedProduct = (await ref.get()).data();
                if(purchasedProduct) {
                    const response = await ref.update(updatedFields);
                    return apiSuccessfulResponses.successfullResponse(response);
                } else {
                    return apiExceptionResponses.notFound();
                }
            } else {
                return apiExceptionResponses.badRequest('We could not get updated user');
            }
        } else {
            return apiExceptionResponses.badRequest('We could not get user id');
        }
    }

    async getOne(id) {
        if(id) {
            const ref = db.collection('purchasedProducts').doc(id);
            const response = await ref.get();
            if(response.data()) {
                return apiSuccessfulResponses.successfullResponse(null, response.data());
            } else {
                return apiExceptionResponses.notFound();
            }
        } else {
            return apiExceptionResponses.badRequest('We could not get purchased product id');
        }
    }

    async getAll(lastPurchasedProductId) {
        const purchasedProducts = [];
        const countRef = db.collection('purchasedProducts').count();
        const totalCount = (await countRef.get()).data().count;
        const pageCount = Math.ceil(totalCount / 10);
        if(lastPurchasedProductId) {
            const ref = db.collection('purchasedProducts').limit(10).orderBy('purchasedAt', 'desc').startAfter(lastPurchasedProductId);
            const response = await ref.get();
            response.docs.forEach((doc) => {
                purchasedProducts.push(doc.data());
            });
            return apiSuccessfulResponses.successfullResponse(null, {pageCount, totalCount, count: purchasedProducts.length, purchasedProducts,});
        } else {
            const ref = db.collection('purchasedProducts').limit(10).orderBy('purchasedAt', 'desc');
            const response = await ref.get();
            response.docs.forEach((doc) => {
                purchasedProducts.push(doc.data());
            });
            return apiSuccessfulResponses.successfullResponse(null, {pageCount, totalCount, count: purchasedProducts.length, purchasedProducts,});
        }
    }

    async getAllUsersPurchasedProducts(lastPurchasedProductId, userId) {
        const purchasedProducts = [];
        const countRef = db.collection('purchasedProducts').count();
        const totalCount = (await countRef.get()).data().count;
        const pageCount = Math.ceil(totalCount / 10);
        if(lastPurchasedProductId) {
            const ref = db.collection('purchasedProducts').limit(10).where('buyersId', '==', userId).orderBy('purchasedAt', 'desc').startAfter(lastPurchasedProductId);
            const response = await ref.get();
            response.docs.forEach((doc) => {
                purchasedProducts.push(doc.data());
            });
            return apiSuccessfulResponses.successfullResponse(null, {pageCount, totalCount, count: purchasedProducts.length, purchasedProducts,});
        } else {
            const ref = db.collection('purchasedProducts').limit(10).where('buyersId', '==', userId).orderBy('purchasedAt', 'desc');
            const response = await ref.get();
            response.docs.forEach((doc) => {
                purchasedProducts.push(doc.data());
            });
            return apiSuccessfulResponses.successfullResponse(null, {pageCount, totalCount, count: purchasedProducts.length, purchasedProducts,});
        }
    }

    async getUserStatsOfPusrchases(period, uid) {
        if(uid) {
            let moneySpent = 0;
            let bonusesEarned = 0;
            let expEarned = 0;
            let purchasedProductCount = 0;
            const ref = db.collection('purchasedProducts').where('buyersId', '==', uid);
            if(period) {
                const startDate = new Date(period.startDate).getTime();
                const endDate = new Date(period.endDate).getTime();
                const response = await ref.get();
                if(response) {
                    const purchasedProductFilteredByPeriod = response.docs.filter(doc => {
                        const purchasedProduct = doc.data();
                        const purchasedAt = new Date(purchasedProduct.purchasedAt).getTime();
                        if(purchasedAt >= startDate && purchasedAt <= endDate) {
                            return doc;
                        }
                    });
                    purchasedProductFilteredByPeriod.forEach(doc => {
                            const purchasedProduct = doc.data();
                            moneySpent += purchasedProduct.purchasePrice;
                            bonusesEarned += purchasedProduct.earnedBonuses;
                            expEarned += purchasedProduct.earnedExp;
                            purchasedProductCount++;
                    });
                    return apiSuccessfulResponses.successfullResponse('Stats by period', {moneySpent, bonusesEarned, expEarned, purchasedProductCount, period});
                }  else {
                    return apiExceptionResponses.notFound();
                }
            } else {
                purchasedProductCount = (await ref.count().get()).data().count;
                const response = await ref.get();
                if(response) {
                    response.docs.forEach(doc => {
                        const purchasedProduct = doc.data();
                        moneySpent += purchasedProduct.purchasePrice;
                        bonusesEarned += purchasedProduct.earnedBonuses;
                        expEarned += purchasedProduct.earnedExp;
                    });
                    return apiSuccessfulResponses.successfullResponse('All time stats', {moneySpent, bonusesEarned, expEarned, purchasedProductCount});
                } else {
                    return apiExceptionResponses.notFound();
                }
            }
        } else {
            return apiExceptionResponses.badRequest('We could not get user id');
        }
    }

    async filterAndSortUserPurchasedProduct(lastPurchasedProductId, period, isDelivered, discount, orderByPurchaseDate, orderByPrice, userId) {
        const purchasedProducts = [];
        let indexOfLastReturnedPurchasedProduct = null;
        let ref = null;
        if(userId) {
            if(orderByPurchaseDate) {
                ref = db.collection('purchasedProducts').where('buyersId', '==', userId).orderBy('purchasedAt', orderByPurchaseDate);
            } else if (orderByPrice) {
                ref = db.collection('purchasedProducts').where('buyersId', '==', userId).orderBy('purchasePrice', orderByPrice);
            } else {
                ref = db.collection('purchasedProducts').where('buyersId', '==', userId).orderBy('purchasedAt', 'desc');
            }
        } else {
            return apiExceptionResponses.badRequest('We could not get user id')
        }
        if(ref) {
            const response = await ref.get();
            response.docs.forEach((doc) => {
                purchasedProducts.push(doc.data());
            });
            const eligiblePurchasedProducts = this._filterPurchasedProducts(period, isDelivered, discount, purchasedProducts);
            if(lastPurchasedProductId) {
                indexOfLastReturnedPurchasedProduct = eligiblePurchasedProducts.findIndex(purchasedProduct => purchasedProduct.id === lastPurchasedProductId);
            }
            const totalCount = eligiblePurchasedProducts.length;
            const pageCount = Math.ceil(totalCount / 10);
            const purchasedProductsToReturn = eligiblePurchasedProducts.slice(indexOfLastReturnedPurchasedProduct !== null ? indexOfLastReturnedPurchasedProduct + 1 : 0, 10);
            return apiSuccessfulResponses.successfullResponse(null, {pageCount, totalCount, count: purchasedProductsToReturn.length, purchasedProducts: purchasedProductsToReturn});
        } else {
            return apiExceptionResponses.internalServerError();
        }
    }

    async filterAndSortAllPurchasedProduct(lastPurchasedProductId, period, isDelivered, discount, orderByPurchaseDate, orderByPrice) {
        const purchasedProducts = [];
        let indexOfLastReturnedPurchasedProduct = null;
        let ref = null;
        if(orderByPurchaseDate) {
            ref = db.collection('purchasedProducts').orderBy('purchasedAt', orderByPurchaseDate);
        } else if (orderByPrice) {
            ref = db.collection('purchasedProducts').orderBy('purchasePrice', orderByPrice);
        } else {
            ref = db.collection('purchasedProducts').orderBy('purchasedAt', 'desc');
        }
        if(ref) {
            const response = await ref.get();
            response.docs.forEach((doc) => {
                purchasedProducts.push(doc.data());
            });
            const eligiblePurchasedProducts = this._filterPurchasedProducts(period, isDelivered, discount, purchasedProducts);
            if(lastPurchasedProductId) {
                indexOfLastReturnedPurchasedProduct = eligiblePurchasedProducts.findIndex(purchasedProduct => purchasedProduct.id === lastPurchasedProductId);
            }
            const totalCount = eligiblePurchasedProducts.length;
            const pageCount = Math.ceil(totalCount / 10);
            const purchasedProductsToReturn = eligiblePurchasedProducts.slice(indexOfLastReturnedPurchasedProduct !== null ? indexOfLastReturnedPurchasedProduct + 1 : 0, 10);
            return apiSuccessfulResponses.successfullResponse(null, {pageCount, totalCount, count: purchasedProductsToReturn.length, purchasedProducts: purchasedProductsToReturn});
        } else {
            return apiExceptionResponses.internalServerError();
        }
    }

    _filterPurchasedProducts(period, isDelivered, discount, purchasedProducts) {
        let discountInt = null;
        if(discount) {
            discountInt = parseInt(discount);
        }
        const unsuitablePurchasedProducts = purchasedProducts.filter((purchasedProduct) => {
            if(isDelivered) {
                const isDeliveredBool = isDelivered === 'true' ? true : false;
                const deliveryDate = new Date(purchasedProduct.deliveryDate);
                if(isDeliveredBool) {
                    if(deliveryDate > new Date()) {
                        return purchasedProduct;
                    }
                } else {
                    if(deliveryDate < new Date()) {
                        return purchasedProduct;
                    }
                }
            }
            if(discountInt) {
                if(discountInt !== 0) {
                    if(purchasedProduct.discount === null) {
                        return purchasedProduct;
                    }
                    if(purchasedProduct.discount < discountInt) {
                        return purchasedProduct;
                    }
                }
            }
            if(period) {
                const purchasedAt = new Date(purchasedProduct.purchasedAt);
                const startDate = new Date(period.startDate);
                const endDate = new Date(period.endDate);
                if(purchasedAt < startDate) {
                    return purchasedProduct;
                }
                if(purchasedAt > endDate) {
                    return purchasedProduct;
                }
            }
        });
        const eligiblePurchasedProducts = purchasedProducts.filter(purchasedProduct => {
            if(!unsuitablePurchasedProducts.includes(purchasedProduct)) {
                return purchasedProduct;
            }
        });
        return eligiblePurchasedProducts;
    }
}

module.exports = new PurchasedProductsRepository();