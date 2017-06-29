var mongoose = require('mongoose');

module.exports = mongoose.model('User', new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    role: {type: String, enum: ['Standard', 'Moderator', 'Admin'], default: 'Standard'},
    courses: [{type: String, ref: 'Course'}],
    created: {type: Date, default: Date.now()}
}));