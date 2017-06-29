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

    listAll(callback){
        UserModel.find({}, (err, res) => {
           if (err) throw err;
           callback(res);
        });
    }
}

module.exports = User;