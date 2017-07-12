var CourseModel = require('../models/course');
var _ = require('lodash');
var extend = require('util')._extend;

class Course {
    create(data, userID, callback) {
        var course = new CourseModel(data);
        course.createdBy = userID;
        course.save((err, newcourse) => {
            if (err) {
                callback({
                    success: false,
                    message: err
                });
            } else {
                callback({
                    success: true,
                    course: newcourse
                });
                console.log("Success");
                console.log(newcourse);
            }
        });
    }


    update(data, callback) {
        CourseModel.findById(data._id, (err, course) => {
            if (err) {
                callback({
                    success: false,
                    message: 'An error occurred!'
                });
            } else if (!course) {
                callback({
                    success: false,
                    message: 'Requested course not found!'
                });
            } else {

                for (var prop in data) {
                    course[prop] = data[prop];
                }

                course.save((saveErr, updCourse) => {
                    if (err) {
                        callback({
                            success: false,
                            message: 'Error while updating course: ' + err
                        });
                    } else {
                        callback({
                            success: true,
                            course: updCourse
                        })
                    }
                });
            }
        });
    }

    addTask(data, callback) {
        CourseModel.findById(data._id, (err, course) => {
            if (err) {
                callback({
                    success: false,
                    message: 'An error occurred!'
                });
            } else if (!course) {
                callback({
                    success: false,
                    message: 'Requested course not found!'
                });
            } else {
                course['task'].push(data.task);


                course.save((saveErr, updCourse) => {
                    if (err) {
                        callback({
                            success: false,
                            message: 'Error while updating course: ' + err
                        });
                    } else {
                        callback({
                            success: true,
                            course: updCourse
                        })
                    }
                });
            }
        });
    }

    editTask(course, task, data, callback) {
        CourseModel.findOneAndUpdate({'_id': course, 'task._id': task}, {
            '$set': {
                'task.$': data
            }
        }, (err, result) => {
            if (err) throw err;
            callback({
                data: result
            });
        });
    }

    getTask(courseID, selectedTask, userData, callback) {
        CourseModel.findById(courseID, (err, course) => {
            if (err) {
                callback({
                    success: false,
                    message: 'An error occurred!'
                });
            } else if (!course) {
                callback({
                    success: false,
                    message: 'Requested course not found!'
                });
            } else {
                let combinedTasks = [];
                let newCourse = course.toObject();


                _.forEach(course.task, (value, key) => {
                    combinedTasks.push(value.options.falseAnswers.join(','), value.options.correctAnswers.join(','));
                    _.extend(newCourse.task[key], {
                        combinedTasks: combinedTasks
                    });
                    delete newCourse.task[key].options;
                });

                callback({
                    success: true,
                    tasks: newCourse.task
                });
            }
        })
    }


    list(filter, order, callback) {
        CourseModel.find(filter)
            .sort(order)
            .populate('createdBy')
            .exec((err, res) => {
                if (err) throw err;
                callback({
                    success: true,
                    data: res
                });
            });
    }

    courseDetail(filter, callback) {
        CourseModel.find(filter)
            .populate('_id')
            .exec((err, res) => {
                if (err) throw err;
                callback({
                    success: true,
                    data: res
                });
            });
    }
}

module.exports = Course;