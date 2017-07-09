var UserModel = require('../models/user');
var bcrypt = require('bcryptjs');

class User {
    register(firstName, LastName, email, password, callback) {

        var success = false;

        UserModel.findOne({email: email}, (err, user) => {
            if (err) throw err;
            if (!user) {
                new UserModel({
                    firstName: firstName,
                    lastName: LastName,
                    email: email,
                    password: password
                }).save();
                success = true;
            } else {
                success = false;
            }
            callback(success);
        });
    }

    waitUntilHashReady(user, data, callback) {
        for (let prop in data) {
            if(prop === "courses"){
                if(user.courses.map((course, index) => {
                        return course.courseID.toString();
                    }).indexOf(data.courses.toString()) !== -1){

                    let courseIndex = user.courses.map((course, index) => {
                        return course.courseID.toString();
                    }).indexOf(data.courses.toString());

                    console.log(data.taskID);

                    user.courses[courseIndex].taskID.push(data.taskID)

                    console.log(user.courses[courseIndex].taskID);

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
                                    console.log(data);
                                    this.waitUntilHashReady(user, data, (cb) => {
                                        callback(cb);
                                    });
                                });
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

    loadDashboard(userID, callback) {
        UserModel.findById(userID, (err, user) => {
            if (err) throw err;
            callback({
                firstName: user.firstName,
                courses: user.courses,
                role: user.role
            });
        })
    }

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
}

module.exports = User;