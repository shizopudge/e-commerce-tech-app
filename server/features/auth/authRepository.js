const {admin} = require('../../firebase_config.js');

class AuthRepository {
    async signUp(req, res)  {
        const userResponse = await admin.auth().createUser({
            email: req.body.email, 
            password: req.body.password,
        });
        res.send(userResponse);
    }

    async generateToken(req, res) {
        const uid = req.body.uid;
        const authtoken = await admin.auth().createCustomToken(uid);
        res.send(authtoken);
    }
}

module.exports = new AuthRepository();