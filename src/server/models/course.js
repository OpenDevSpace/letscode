var mongoose = require('mongoose');

module.exports = mongoose.model('Course', mongoose.Schema({
    title: {type: String, required: true},
    description: String,
    language: {type: String, enum: ['web', 'java', 'c', 'python'], required: true},
    tags: [{type: String}],
    level: {type: Number, enum: [1,2,3], required: true},
    timestamp: {type: Date, default: Date.now()},
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    active: {type: Boolean, default: false}
}));