var UserModel = require('../models/user');

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

    listAll(role, callback){
        if(role !== "Admin") {
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

    loadDashboard(userID, callback){
        UserModel.findById(userID, (err, user) => {
            if (err) throw err;
            callback({
                firstName: user.firstName,
                courses: user.courses,
                role: user.role
            });
        })
    }

    doAfterLogin(userID, callback){
        UserModel.findById(userID, (err, user) => {
            if (err) throw err;
            callback({
                firstName: user.firstName,
                courses: user.courses,
                role: user.role
            })
        })
    }
}

module.exports = User;