var Task = require('../controllers/task');
var TasskController = new Task();

var routes = require('express').Router();

var mongoose = require('mongoose');

routes.post('/new', (req, res) => {
    if (req.user.role !== 'Admin' && req.user.role !== 'Moderator') {
        res.status(401).end();
    } else {
        TasskController.create(req.body, (data) => {
            res.json(data);
        });
    }
});

/*
routes.get('/listall', (req, res) => {
    if (req.user.role !== 'Admin' && req.user.role !== 'Moderator') {
        res.status(401).end();
    } else {
        CourseController.list({}, {language: 1}, (courses) => {
            res.json(courses);
        });
    }
});
*/

module.exports = routes;

