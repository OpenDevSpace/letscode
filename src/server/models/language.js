var mongoose = require('mongoose');

module.exports = mongoose.model('Language', mongoose.Schema({
    name: String,
}));