const {beginner} = require('./levelsDto.js');


const createUserDto = (id, username, email, image, isAdmin) => {
    return {
    id: id,
    username: username, 
    email: email,
    phone: null, 
    bonuses: 0, 
    level: beginner(0), 
    isAdmin: isAdmin ? isAdmin : false, 
    bankCards: [], 
    cart: [], 
    wishlist: [], 
    image: image ? image : null, 
    address: null,
    }
}

module.exports = createUserDto;