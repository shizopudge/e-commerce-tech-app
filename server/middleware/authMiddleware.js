const admin = require('../firebase_config.js');

module.exports = function (req, res, next) {
  const token = req.headers.authorization.split(' ')[1];
    if (token) {
      admin.auth().verifyIdToken(token, true)
        .then(() => {
          next()                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
        }).catch(() => {
          res.status(403).send('Unauthorized')
        });
    } else {
      res.status(403).send('Unauthorized')
    }
  }