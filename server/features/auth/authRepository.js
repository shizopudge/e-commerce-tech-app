const {admin} = require('../../firebase_config.js');
const apiSuccessfulResponses = require('../../apiResponses/apiSuccessfulResponses.js');
const apiExceptionResponses = require('../../apiResponses/apiExceptionResponses.js');

class AuthRepository {

    async signUp(email, password)  {
        if(email && password) {
            const user = await admin.auth().createUser({
                email: email, 
                password: password,
                emailVerified: false,
            });
            if(user) {
                admin.auth().setCustomUserClaims(user.uid, {admin: false});
                return user;
            } else {
                return apiExceptionResponses.internalServerError();
            }
        } else {
            if (!email) {
                return apiExceptionResponses.badRequest('We could not get users email');
            }
            if (!password) {
                return apiExceptionResponses.badRequest('We could not get users password');
            }
        }
    }

    async signUpAsAdmin(email, password) {
        if(email && password) {
            const user = await admin.auth().createUser({
                email: email, 
                password: password,
                emailVerified: true,
            });
            if(user) {
                admin.auth().setCustomUserClaims(user.uid, {admin: true});
                return user;
            } else {
                return apiExceptionResponses.internalServerError();
            }
        } else {
            if (!email) {
                return apiExceptionResponses.badRequest('We could not get users email');
            }
            if (!password) {
                return apiExceptionResponses.badRequest('We could not get users password');
            }
        }
    }
}

module.exports = new AuthRepository();