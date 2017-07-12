var Course = require('../controllers/course');
var CourseController = new Course();
var User = require('../controllers/user');
var UserController = new User();

var routes = require('express').Router();

var mongoose = require('mongoose');

/**
 * Route to add a new course, calls CourseController method
 */
routes.post('/new', (req, res) => {
    if (req.user.role !== 'Admin' && req.user.role !== 'Moderator') {
        res.status(401).end();
    } else {
        CourseController.create(req.body, req.user.userID, (data) => {
            res.json(data);
        });
    }
});

/**
 * Update a course, add ID to URL
 */
routes.post('/update/:courseID', (req, res) => {
    CourseController.update(req.body, (data) => {
        res.json(data);
    });
});

/**
 * Add a task to a Course, requires courseID in URL
 */
routes.post('/addtask/:courseID', (req, res) => {
    CourseController.addTask(req.body, (data) => {
        res.json(data);
    });
    //res.send(res.send(req.params.courseID));
});

/**
 * Update a task, requires course and task id in URL
 */
routes.post('/updatetask/:courseID/:taskID', (req, res) => {
    if (req.user.role !== 'Admin' && req.user.role !== 'Moderator') {
        res.status(401).end();
    }
    CourseController.editTask(req.params.courseID, req.params.taskID, req.body.task, (data) => {
        res.json(data);
    });
});

/**
 * Lists all courses if user is Admin or Mod
 */
routes.get('/listall', (req, res) => {
    if (req.user.role !== 'Admin' && req.user.role !== 'Moderator') {
        res.status(401).end();
    } else {
        CourseController.list({}, {language: 1}, (courses) => {
            res.json(courses);
        });
    }
});

/**
 * Gets all the tasks of a selected course
 */
routes.get('/gettask/:selectedcourse/:selectedtask', (req, res) => {
    CourseController.getTask(req.params.selectedcourse, req.params.selectedtask, req.user, (tasks) => {
        res.json(tasks);
    });
});

/**
 * Sends all active courses as JSON, sorted by title
 */
routes.get('/listactive', (req, res) => {
    CourseController.list({
        active: true
    }, {title: 1}, (courses) => {
        courses['createdBy'] = null;
        res.json(courses);
    })
});

/**
 * Gets info for coursedetails
 */
routes.get('/coursedetail/:courseID', (req, res) => {
    CourseController.list({
        active: true,
        _id: mongoose.Types.ObjectId(req.params.courseID)
    }, {}, (course) => {
        res.json(course.data[0]);
    })
});

/**
 * Check if a task is solved. req.body.answers required as array
 * if everything is correct, UserController will be called to save it into the User Collection
 */
routes.post('/checktask/:courseID/:taskID', (req, res) => {
    CourseController.checkAnswer(req.params.courseID, req.params.taskID, req.body.answers, (cb) => {
        if (cb.success) {
            if (cb.isCoding) {
                res.json({
                    success: true,
                    message: 'Code received'
                });
            } else {
                UserController.taskSolved(req.user.userID, req.params.courseID, req.params.taskID, (saveSuccessfull) => {
                    res.json(saveSuccessfull);
                });
            }
        } else {
            res.json({
                success: false,
                message: 'Not solved correctly'
            });
        }
    });
});

module.exports = routes;

