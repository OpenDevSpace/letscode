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
    CourseController.update(req.body, (data) => {
        res.json(data);
    });

    //res.send(res.send(req.params.courseID));
});

routes.post('/addtask/:courseID', (req, res) => {
    CourseController.addTask(req.body, (data) => {
        res.json(data);
    });
    //res.send(res.send(req.params.courseID));
});

routes.post('/updatetask/:courseID/:taskID', (req, res) => {
    if (req.user.role !== 'Admin' && req.user.role !== 'Moderator') {
        res.status(401).end();
    }
    CourseController.editTask(req.params.courseID, req.params.taskID, req.body.task, (data) => {
        res.json(data);
    });
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

routes.get('/gettask/:selectedcourse/:selectedtask', (req, res) => {
    CourseController.getTask(req.params.selectedcourse, req.params.selectedtask, req.user, (task) => {
        res.json(task);
    });
});

routes.get('/getnexttask/:selectedcourse/:selectedtask', (req, res) => {
    CourseController.getNextTask(req.params.selectedcourse, req.params.selectedtask, req.user, (task) => {
        res.json(task);
    });
});

routes.get('/listactive', (req, res) => {
    CourseController.list({
        active: true
    }, {title: 1}, (courses) => {
        courses['createdBy'] = null;
        res.json(courses);
    })
});

routes.get('/coursedetail/:courseID', (req, res) => {
    CourseController.list({
        active: true,
        _id: mongoose.Types.ObjectId(req.params.courseID)
    }, {}, (course) => {
        res.json(course.data[0]);
    })
})

module.exports = routes;

