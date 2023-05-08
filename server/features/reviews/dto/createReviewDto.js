const createReviewDto = (id, authorId, productId, title, body, rating, images, createdAt) => {
    return {
        id: id,
        authorId: authorId,
        productId: productId,
        likes: [],
        dislikes: [],
        title: title,
        body: body,
        rating: rating,
        images: images ? images : null,
        createdAt: createdAt,
    }
}

module.exports = createReviewDto;