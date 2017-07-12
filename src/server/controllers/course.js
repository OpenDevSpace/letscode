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
                let newCourse = course.toObject();


                _.forEach(course.task, (value, key) => {
                    let combinedTasks = [];
                        _.forEach(value.options.falseAnswers, (value) => {
                            combinedTasks.push(value)
                        });
                    _.forEach(value.options.correctAnswers, (value) => {
                            combinedTasks.push(value)
                        });
                    _.extend(newCourse.task[key], {
                        combinedTasks: combinedTasks.sort()
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

    checkAnswer(courseID, taskID, givenAnswers, callback) {
        CourseModel.findById(courseID, (err, course) => {
            if (err) throw err;
            if (!course) {
                callback({
                    success: false,
                    answersChecked: false,
                    message: 'Course not found'
                });
            } else {
                givenAnswers = givenAnswers.sort();
                console.log(course.task[course.task.map((e) => { return e._id.toString() }).indexOf(taskID)].options.correctAnswers.sort());
                console.log(givenAnswers);
                let correctAnswers = course.task[course.task.map((e) => { return e._id.toString() }).indexOf(taskID)].options.correctAnswers.sort();

                if(correctAnswers.length !== givenAnswers.length){
                    callback({
                        success: false,
                        answersChecked: true,
                        message: 'Not correct'
                    });
                } else {
                    _.forEach(correctAnswers, (value, key) => {
                        if (givenAnswers[key] !== correctAnswers[key]) {
                            callback({
                                success: false,
                                answersChecked: true,
                                message: 'Not correct'
                            });
                        } else {
                            callback({
                                success: true
                            });
                        }
                    });


                }

            }
        });
    }
}

module.exports = Course;