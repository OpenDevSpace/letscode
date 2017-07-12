var UserModel = require('../models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

class Auth {

    /**
     * Handles login requests using bcrypt, if success: sending token to client
     * @param user username / email
     * @param password user password, unencrypted
     * @param callback
     */
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
                            userID: user._id,
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

    /**
     * Handles user registration, all fields are required
     * @param firstName First name of the user
     * @param lastName Second name
     * @param email email
     * @param password password in plaintext
     * @param callback
     */
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