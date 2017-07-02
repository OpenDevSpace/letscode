var routes = require('express').Router();
var auth = require('../controllers/auth');
var AuthController = new auth();

routes.post('/login', (req, res) => {
    AuthController.login(req.body.user, req.body.password, (result) => {
        res.send(result);
    });
});

module.exports = routes;