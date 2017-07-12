var User = require('../controllers/user');
var UserController = new User();

var routes = require('express').Router();

/**
 * Update a given user
 * User needs to be admin OR editing their own account
 */
routes.post('/update/:userID', (req, res) => {
    if (req.user.role !== 'Admin' && req.params.userID.toString() !== req.user.userID.toString()) {
        res.status(401).end();
    } else {
        UserController.update(req.params.userID, req.body, (data) => {
            res.json(data);
        });
    }
});

/**
 * List all users, Admin role reguired!
 */
routes.get('/listall', (req, res) => {
    UserController.listAll(req.user.role, (users) => {
        if(!users.success){
            res.status(401).end();
        } else {
            res.json(users.data);
        }
    });
});

/**
 * Route called after login to store some user details in a client
 */
routes.get('/afterlogin', (req, res) => {
    UserController.doAfterLogin(req.user.userID, (user) => {
        res.json(user);
    })
});

/**
 * Route to unenroll from a course
 */
routes.get('/unenroll/:courseID', (req, res) => {
    UserController.unenroll(req.user.userID, req.params.courseID, (newCourses) => {
        res.json(newCourses);
    });
});

module.exports = routes;