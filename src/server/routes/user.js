var User = require('../controllers/user');
var UserController = new User();

var routes = require('express').Router();

routes.post('/update/:userID', (req, res) => {
    if (req.user.role !== 'Admin' && req.body._id.toString() !== req.user.userID.toString()) {
        res.status(401).end();
    } else {
        UserController.update(req.body, (data) => {
            console.log("UserController.update");
            console.log(data);
        })
        res.json(data);
    }
});

routes.get('/listall', (req, res) => {
    UserController.listAll(req.user.role, (users) => {
        if(!users.success){
            res.status(401).end();
        } else {
            res.json(users.data);
        }
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