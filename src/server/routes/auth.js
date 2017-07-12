var routes = require('express').Router();
var auth = require('../controllers/auth');
var AuthController = new auth();

/**
 * Sends login data to POST route, calls AuthController.login()
 * required: req.body.user, req.body.password
 */
routes.post('/login', (req, res) => {
    AuthController.login(req.body.user, req.body.password, (result) => {
        if (!result.success) {
            res.status(401).end();
        } else {
            res.send(result);
        }
    });
});

/**
 * Sends login data to POST route, calls AuthController.register()
 * required: req.body.firstName, req.body.lastName, req.body.email, req.body.password
 * password in plaintext
 */
routes.post('/register', (req, res) => {
    AuthController.register(req.body.firstName, req.body.lastName, req.body.email, req.body.password, (result) => {
        res.send(result);
    });
});

module.exports = routes;