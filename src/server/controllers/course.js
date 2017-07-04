var CourseModel = require('../models/course');

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
            .exec((err, res) => {
                if (err) throw err;
                callback({
                    success: true,
                    data: res
                });
            })
    }
}

module.exports = Course;