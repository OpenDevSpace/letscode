var mongoose = require('mongoose');

var courses = mongoose.Schema({
    courseID: {type: mongoose.Schema.Types.ObjectId, ref: 'Course'},
    taskID: {type: Array}
}, {_id: false});

module.exports = mongoose.model('User', new mongoose.Schema({
    email: {type: String, required: true, index: {unique: true}},
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    role: {type: String, enum: ['Standard', 'Moderator', 'Admin'], default: 'Standard'},
    courses: [courses],
    created: {type: Date, default: Date.now()},
    active: {type: Boolean, default: true},
    notifications: {type: Boolean, default: false},
    publicProfile: {type: Boolean, default: false},
    courseSuggestions: {type: Boolean, default: false}
}));