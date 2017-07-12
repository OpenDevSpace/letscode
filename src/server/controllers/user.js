var UserModel = require('../models/user');
var bcrypt = require('bcryptjs');


/**
 * User class, contains functions for handling user actions
 */
class User {

    /**
     * Helper function, used by update() as soon as the server request has finished
     * @param user
     * @param data
     * @param callback
     */
    waitUntilHashReady(user, data, callback) {
        for (let prop in data) {
            if(prop === "courses"){
                if(user.courses.map((course, index) => {
                        return course.courseID.toString();
                    }).indexOf(data.courses.toString()) !== -1){

                    let courseIndex = user.courses.map((course, index) => {
                        return course.courseID.toString();
                    }).indexOf(data.courses.toString());

                    if(user.courses[courseIndex].taskID.map((task, index) => {
                            return task;
                        }).indexOf(data.taskID.toString()) === -1){
                        user.courses[courseIndex].taskID.push(data.taskID);
                    } else {
                        console.log("already in list");
                    }

                } else {
                    user[prop].push({
                        courseID: data.courses
                    });
                }

            } else {
                user[prop] = data[prop];
            }
        }
        user.save((saveErr, updUser) => {
            if (saveErr) {
                callback({
                    success: false,
                    message: 'Error while updating user: ' + err
                });
            } else {
                callback({
                    success: true,
                    user: updUser
                })
            }
        });
    }

    /**
     * Updating a user
     * @param id User ID
     * @param data What to update?
     * @param callback
     */
    update(id, data, callback) {
        UserModel.findById(id, (err, user) => {
            if (err) {
                callback({
                    success: false,
                    message: 'An error occurred!'
                });
            } else if (!user) {
                callback({
                    success: false,
                    message: 'User not found!'
                })
            } else {
                if (data.data) {
                    bcrypt.compare(data.data.oldPassword, user.password, (passCompareErr, success) => {
                        if (passCompareErr) throw passCompareErr;
                        if (!success) {
                            callback({
                                success: false,
                                message: "Wrong old password."
                            });
                        } else {
                            bcrypt.genSalt(15, (saltErr, salt) => {
                                if (saltErr) throw saltErr;
                                bcrypt.hash(data.data.newPassword, salt, (hashErr, hash) => {
                                    if (hashErr) throw hashErr;
                                    data.password = hash;
                                    delete data.data;
                                    this.waitUntilHashReady(user, data, (cb) => {
                                        callback(cb);
                                    });
                                });
                            });
                        }
                    });
                } else if (data.email && data.userSettingsUpdate) {
                    bcrypt.compare(data.password, user.password, (errPassCheck, successPassCheck) => {
                        if (errPassCheck) throw errPassCheck;
                        if (!successPassCheck) {
                            callback({
                                success: false,
                                message: 'Cannot change email. Password wrong.'
                            });
                        } else {
                            this.waitUntilHashReady(user, {
                                email: data.email
                            }, (cb) => {
                                callback(cb);
                            });
                        }
                    });
                } else {
                    this.waitUntilHashReady(user, data, (cb) => {
                        callback(cb);
                    });
                }
            }
        });
    }

    /**
     * Lists all users, if logged in user is admin
     * @param role current user role
     * @param callback
     */
    listAll(role, callback) {
        if (role !== "Admin") {
            callback({
                success: false
            });
        } else {
            UserModel.find({}, (err, res) => {
                if (err) throw err;
                callback({
                    success: true,
                    data: res
                });
            });
        }
    }

    /**
     * load userdata to dashboard
     * @param userID ID of user
     * @param callback
     */
    doAfterLogin(userID, callback) {
        UserModel.findById(userID, (err, user) => {
            if (err) throw err;
            callback({
                _id: user._id,
                firstName: user.firstName,
                courses: user.courses,
                role: user.role
            })
        })
    }

    /**
     * Called to delete course data from User Collection
     * @param userID UserID
     * @param courseID CourseID
     * @param callback
     */
    unenroll(userID, courseID, callback) {

        UserModel.findByIdAndUpdate(userID, {
            $pull: {
                courses: { courseID: courseID }
            }
        }, {'new': true}, (err, result) => {
            if (err) throw err;
            callback({
                data: result
            });
        });
    }

    /**
     * Called if a task is solved successfully. Writes task ID to User Collection, if not already there
     * @param userID UserID
     * @param courseID CourseID
     * @param taskID TaskID
     * @param callback
     */
    taskSolved(userID, courseID, taskID, callback) {
        UserModel.findOneAndUpdate({'_id': userID, 'courses.courseID': courseID}, {
            $addToSet: {
                'courses.$.taskID': taskID
            }
        }, (err, result) => {
            if (err) {
                callback({
                    success: false,
                    message: err
                });
            } else {
                callback({
                    success: true,
                    message: 'Successfully saved solved task'
                });
            }
        });
    }
}

module.exports = User;