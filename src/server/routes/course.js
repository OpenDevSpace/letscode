var Course = require('../controllers/course');
var CourseController = new Course();

var routes = require('express').Router();

var mongoose = require('mongoose');

routes.post('/new', (req, res) => {
    if (req.user.role !== 'Admin' && req.user.role !== 'Moderator') {
        res.status(401).end();
    } else {
        CourseController.create(req.body, req.user.userID, (data) => {
            res.json(data);
        });
    }
});

routes.post('/update/:courseID', (req, res) => {
    //console.log(req.body);
    CourseController.update(req.body, (data) => {
        console.log(data);
    });

    //res.send(res.send(req.params.courseID));
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

routes.get('/coursedetail/:courseID', (req, res) => {
    CourseController.list({
        active: true,
        _id: mongoose.Types.ObjectId(req.params.courseID)
    }, {}, (course) => {
        console.log(course.data[0]);
        res.json(course.data[0]);
    })
})

module.exports = routes;

