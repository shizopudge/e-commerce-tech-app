const authRepository = require('./authRepository.js');
const apiExceptionResponses = require('../../apiResponses/apiExceptionResponses.js');

class AuthController {
    async signUp(req, res, next) {
        try {
            const email = req.body.email;
            const username = req.body.username;
            const password = req.body.password;
            const files = req.files;
            await authRepository.signUp(email, password).then(response => {
                if(response.uid) {
                    req.body.uid = response.uid;
                    req.body.username = username;
                    req.body.email = email;
                    req.body.isAdmin = false;
                    req.files = files;
                    next();
                } else {
                    console.log(response.message);
                    res.status(response.status).send(response);
                }
            });
        } catch (error) {
            const exception = apiExceptionResponses.internalServerError(error.toString())
            console.log(exception);
            res.send(exception);
        }
    }

    async signUpAsAdmin(req, res, next) {
        try {
            const email = req.body.email;
            const username = req.body.username;
            const password = req.body.password;
            const files = req.files;
            await authRepository.signUpAsAdmin(email, password).then(response => {
                if(response.uid) {
                    req.body.uid = response.uid;
                    req.body.username = username;
                    req.body.email = email;
                    req.body.isAdmin = true;
                    req.files = files;
                    next();
                } else {
                    console.log(response.message);
                    res.status(response.status).send(response);
                }
            });
        } catch (error) {
            const exception = apiExceptionResponses.internalServerError(error.toString())
            console.log(exception);
            res.send(exception);
        }
    }
}

module.exports = new AuthController();