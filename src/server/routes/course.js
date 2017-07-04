var Course = require('../controllers/course');
var CourseController = new Course();

var routes = require('express').Router();

routes.post('/new', (req, res) => {
    if (req.user.role !== 'Admin' || req.user.role !== 'Moderator') {
        res.status(401).end();
    } else {
        CourseController.create(req.body.newcourse, (data) => {
            res.json(data);
        });
    }
});

module.exports = routes;