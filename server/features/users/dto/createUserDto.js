const {beginner} = require('./levelsDto.js');


const createUserDto = (id, username, email, image, points) => {
    return {
    id: id,
    username: username, 
    email: email,
    phone: null, 
    bonuses: 0, 
    level: beginner(points), 
    isAdmin: false, 
    bankCards: [], 
    cart: [], 
    wishlist: [], 
    image: image ? image : null, 
    isAccountVerified: false,
    address: null,
    }
}

module.exports = createUserDto;