var mongoose = require('mongoose');
//var language = require('./language');

module.exports = mongoose.model('Course', mongoose.Schema({
    title: {type: String, required: true},
    description: String,
    language: {type: String, ref: 'Language'},
    timestamp: {type: Date, default: Date.now()},
    active: Boolean
}));