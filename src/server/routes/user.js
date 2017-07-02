var User = require('../controllers/user');
var UserController = new User();

var routes = require('express').Router();

routes.post('/new', (req, res) => {

    if (typeof req.body.firstName !== String || typeof req.body.lastName !== String ||typeof req.body.emailInput !== String || typeof req.body.password !== String) {
        res.status(400).json({
            success: false,
            message: 'Error 400'
        });
    }

    UserController.register(req.body.firstName, req.body.lastName, req.body.emailInput, req.body.password, (result) => {
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

routes.get('/list', (req, res) => {
    UserController.listAll((users) => {
        res.json(users);
    });
});

module.exports = routes;