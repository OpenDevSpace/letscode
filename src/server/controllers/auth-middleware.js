var jwt = require('jsonwebtoken');
var User = require('../models/user');


/**
 * Middleware. Used to check if a user owns a valid token. If yes: write signed data to req.user
 * @param req
 * @param res
 * @param next
 */
module.exports = (req, res, next) => {

    if (!req.headers.authentication) {
        return res.status(401).end();
    }

    const token = req.headers.authentication.split(' ')[1];

    jwt.verify(token, 'highsecure', (err, data) => {
        if (err) return res.status(401).end();
        User.findById(data.userID, (usrErr, user) => {
            if (usrErr || !user) {
                return res.status(401).end();
            } else {
                req.user = data;
                next();
            }
        });
    });

};