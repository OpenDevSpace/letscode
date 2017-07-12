var CourseModel = require('../models/course');
var _ = require('lodash');
var extend = require('util')._extend;

class Course {

    /**
     * Creates a new course.
     * @param Object with all data for course model, see models/course
     * @param userID current userID
     * @param callback
     */
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
            }
        });
    }

    /**
     * Used to update a course
     * @param data data, which changed
     * @param callback
     */
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

    /**
     * Adds a new task to a course
     * @param data
     * @param callback
     */
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

    /**
     * Edits a task
     * @param course CourseID
     * @param task TaskID
     * @param data task data (object required)
     * @param callback
     */
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

    /**
     * Sends tasks of a given course to a client, combines correct and false answers
     * @param courseID current course, id
     * @param selectedTask
     * @param userData
     * @param callback
     */
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

    /**
     * List courses, with filtering
     * @param filter Object for filtering results
     * @param order Object for ordering results
     * @param callback
     */
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

    /**
     * Checks if the given answers of a task are correct
     * @param courseID Which course is a user editing?
     * @param taskID Which task is a user working on?
     * @param givenAnswers Array with all given answers (string)
     * @param callback
     */
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

                let correctAnswers = course.task[course.task.map((e) => {
                    return e._id.toString()
                }).indexOf(taskID)].options.correctAnswers.sort();

                let clozeWord = course.task[course.task.map((e) => {
                    return e._id.toString()
                }).indexOf(taskID)].cloze.clozeWord;

                if (course.task[course.task.map((e) => {
                        return e._id.toString()
                    }).indexOf(taskID)].taskType === "cloze") {

                    if (givenAnswers[0] !== clozeWord[0]) {
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
                } else if (course.task[course.task.map((e) => {
                        return e._id.toString()
                    }).indexOf(taskID)].taskType === "coding") {
                    callback({
                        success: true,
                        message: "code will be checked! (coming soon)",
                        isCoding: true
                    })
                } else {
                    let temp = false;
                    if (correctAnswers.length !== givenAnswers.length) {
                        callback({
                            success: false,
                            answersChecked: true,
                            message: 'Not correct'
                        });
                        temp = true;
                    } else {
                        _.forEach(correctAnswers, (value, key) => {
                            console.log(givenAnswers[key]);
                            console.log(correctAnswers[key]);
                            //noinspection JSAnnotator
                            if (givenAnswers[key] !== correctAnswers[key]) {
                                callback({
                                    success: false,
                                    answersChecked: true,
                                    message: 'Not correct'
                                });
                                temp = true;
                                return false;
                            }
                        });
                        if(!temp) {
                            callback({
                                success: true
                            });
                        }
                    }
                }

            }
        });
    }
}

module.exports = Course;