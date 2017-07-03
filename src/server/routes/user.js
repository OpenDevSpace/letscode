var User = require('../controllers/user');
var UserController = new User();

var routes = require('express').Router();

routes.get('/list', (req, res) => {
    UserController.listAll((users) => {
        res.json(users);
    });
});

routes.get('/dashboard', (req, res) => {
    UserController.loadDashboard(req.user.userID, (user) =>{
        res.json(user);
    });
})

routes.get('/afterlogin', (req, res) => {
    UserController.doAfterLogin(req.user.userID, (user) => {
        res.json(user);
    })
})

module.exports = routes;