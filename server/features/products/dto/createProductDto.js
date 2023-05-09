const createProductDto = (id, brand, title, description, images, quantity, price, productCode, modelCode, productType) => {
    return {
    id: id, 
    brand: brand,
    title: title,
    description: description, 
    images: images ? images : null, 
    rating: null, 
    quantity: quantity, 
    price: price, 
    reliability: null, 
    productCode: productCode, 
    modelCode: modelCode,
    discount: null,
    productType: productType,
    isBestseller: false,
    isLatest: true,
    reviewsCount: 0,
    }
}

module.exports = createProductDto;