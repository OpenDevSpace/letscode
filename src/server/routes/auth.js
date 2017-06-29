var Auth = require('../controllers/auth');
var AuthController = new Auth();

var routes = require('express').Router();

routes.post('/register', (req, res) => {
    AuthController.register("Blubb", "Hello", "email4", "secure", (result) => {
        if (result) {
            message = 'User created successfully!';
        } else {
            message = 'Error! User already in database!';
        }
        res.json({
            success: result,
            message: message
        });
    });

});

module.exports = routes;