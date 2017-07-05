var TaskModel = require('../models/task');

class Task {
    create(data, callback) {
        var task = new TaskModel(data);
        task.save((err, newtask) => {
            if (err) {
                callback({
                    success: false,
                    message: err
                });
            } else {
                callback({
                    success: true,
                    task: newtask
                });
            }
        });
    }
/*
    update(data, callback) {
        console.log(data);
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
                        //console.log("Hier bin ich");
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
    */
}

module.exports = Task;