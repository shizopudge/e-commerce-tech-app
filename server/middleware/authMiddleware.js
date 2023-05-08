const {admin} = require('../firebase_config.js');
const apiExceptionResponses = require('../apiResponses/apiExceptionResponses.js');

class AuthMiddleware {

  checkAuth(req, res, next) {
    if(req.headers.authorization) {
      const token = req.headers.authorization;
      if(token) {
        admin.auth().verifyIdToken(token, true)
          .then(() => {
            next()                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
          }).catch(() => {
            const exception = apiExceptionResponses.unauthorized();
            res.status(exception.status).send(exception);
          });
        } else {
        const exception = apiExceptionResponses.unauthorized();
        res.status(exception.status).send(exception);
        }
      } else {
        const exception = apiExceptionResponses.unauthorized();
        res.status(exception.status).send(exception);
      }
    }
  
   async checkRole(req, res, next) {
    if(req.headers.authorization) { 
      const token = req.headers.authorization;
      await admin.auth().verifyIdToken(token).then(claims => {
          if(claims.admin === true) {
            next();
          } else {
            const exception = apiExceptionResponses.noPemission();
            res.status(exception.status).send(exception);
          }
          }).catch(() => {
          const exception = apiExceptionResponses.noPemission();
          res.status(exception.status).send(exception);
          });
      } else {
        const exception = apiExceptionResponses.unauthorized();
        res.status(exception.status).send(exception);
      }
   }
}

module.exports = new AuthMiddleware();