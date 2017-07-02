var UserModel = require('../models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

class Auth {

    login(user, password, callback) {
        UserModel.findOne({email: user}, (err, user) => {
            if (err) throw err;
            if (!user) {
                callback({
                    success: false
                });
            } else {
                bcrypt.compare(password, user.password, (err, success) => {
                    if (err) throw err;
                    if (!success) {
                        callback({
                            success: success
                        });
                    } else {
                        jwt.sign({
                            user: user.email,
                            firstName: user.firstName,
                            role: user.role
                        }, 'highsecure', {
                            expiresIn: '1d'
                        }, (err, token) => {
                            if (err) throw err;
                            callback({
                                success: success,
                                token: token
                            });
                        });
                    }
                })
            }

        });
    }

    register(firstName, lastName, email, password, callback) {

        UserModel.findOne({email: email}, (err, user) => {
            if (err) throw err;
            if (!user) {
                bcrypt.genSalt(15, (err, salt) => {
                    if (err) throw err;
                    bcrypt.hash(password, salt, (err, hash) => {
                        if (err) throw err;
                        new UserModel({
                            firstName: firstName,
                            lastName: lastName,
                            email: email,
                            password: hash
                        }).save();
                        callback(
                            {success: true}
                        );
                    });

                });
            } else {
                callback({
                    success: false
                });
            }
        });
    }
}

module.exports = Auth;