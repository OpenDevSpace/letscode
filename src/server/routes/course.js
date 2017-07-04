var Course = require('../controllers/course');
var CourseController = new Course();

var routes = require('express').Router();

routes.post('/new', (req, res) => {
    if (req.user.role !== 'Admin' && req.user.role !== 'Moderator') {
        res.status(401).end();
    } else {
        CourseController.create(req.body, req.user.userID, (data) => {
            res.json(data);
        });
    }
});

routes.get('/listall', (req, res) => {
    if (req.user.role !== 'Admin' && req.user.role !== 'Moderator') {
        res.status(401).end();
    } else {
        CourseController.list({}, {language: 1}, (courses) => {
            res.json(courses);
        });
    }
});

routes.get('/listactive', (req, res) => {
    CourseController.list({
        active: true
    }, {title: 1}, (courses) => {
        courses['createdBy'] = null
        res.json(courses);
    })
})

module.exports = routes;