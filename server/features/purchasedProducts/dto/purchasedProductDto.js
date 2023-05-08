const purchasedProductDto = (id, productId, buyersId, purchasedAt, purchasePrice, discount, earnedBonuses, earnedExp, deliveryDate, deliveryAddress) => {
    return {
        id: id,
        productId: productId,
        buyersId: buyersId,
        purchasedAt: purchasedAt,
        purchasePrice: purchasePrice,
        discount: discount,
        earnedBonuses: earnedBonuses,
        earnedExp: earnedExp,
        deliveryDate: deliveryDate,
        deliveryAddress: deliveryAddress,
    }
}

module.exports = purchasedProductDto;