var mongoose = require('mongoose');

module.exports = mongoose.model('Task', mongoose.Schema({
    title: {type: String, required: true},
    taskType: {type: String, enum: ['coding', 'qanda'], required: true},
    introduction: {type: String},
    question: {type: String, required: true},
    sampleCode: {type: String},
    answer: {type: String},
    tags: [{type: String}],
    belongsTo: {type: mongoose.Schema.Types.ObjectId, ref: 'Course'}
}));