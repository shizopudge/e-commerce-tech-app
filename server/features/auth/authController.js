const authRepository = require('./authRepository.js');

class AuthController {
    async signUp(req, res)  {
        try {
            await authRepository.signUp(req, res);
        } catch (error) {
            res.send(error);
        }
    }

    async generateToken() {
        try {
            await authRepository.generateToken(req, res);
        } catch (error) {
            res.send(error);
        }
    }
}

module.exports = new AuthController();