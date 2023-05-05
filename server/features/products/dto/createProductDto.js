const createProductDto = (id, title, description, images, characteristics, quantity, price, productCode, modelCode, productType) => {
    return {
    id: id, 
    title: title,
    description: description, 
    images: images, 
    characteristics: characteristics, 
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
    }
}

module.exports = createProductDto;