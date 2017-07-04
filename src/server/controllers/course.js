var CourseModel = require('../models/course');

class Course {
    create(data, callback) {
        var course = new CourseModel(data);
        course.save((err, newcourse) => {
            if (err) {
                callback({
                    success: false,
                    message: 'An error occurred!'
                });
            } else {
                callback({
                    success: true,
                    course: newcourse
                });
            }
        });
    }
}

module.exports = Course;