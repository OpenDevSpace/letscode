var mongoose = require('mongoose');

module.exports = mongoose.model('Course', mongoose.Schema({
    title: {type: String, required: true},
    description: String,
    language: {type: String, enum: ['web', 'java', 'c', 'python'], required: true},
    tags: [{type: String}],
    timestamp: {type: Date, default: Date.now()},
    active: {type: Boolean, default: false}
}));