var Task = require('../controllers/task');
var TaskController = new Task();

var routes = require('express').Router();

var mongoose = require('mongoose');

routes.post('/new', (req, res) => {
    if (req.user.role !== 'Admin' && req.user.role !== 'Moderator') {
        res.status(401).end();
    } else {
        TaskController.create(req.body, (data) => {
            res.json(data);
        });
    }
});

routes.get('/listall/:courseID', (req, res) => {
    TaskController.list({
        belongsTo: mongoose.Types.ObjectId(req.params.courseID)
    }, (tasks) => {
        console.log(tasks.data[0]);
            res.json(tasks.data[0]);
        });
});

module.exports = routes;

