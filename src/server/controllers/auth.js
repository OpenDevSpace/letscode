var User = require('../models/user');

class Auth {

    register(firstName, LastName, email, password, callback) {

        var success = false;

        User.findOne({email: email}, (err, user) => {
            if (err) throw err;
            if (!user) {
                new User({
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

}

module.exports = Auth;