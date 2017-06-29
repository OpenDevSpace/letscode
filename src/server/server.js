var express = require('express');
var bodyparser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

var authRoutes = require('./routes/auth');

var app = express();

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

console.log(path.join(__dirname, '../../build'));

app.use(express.static(path.join(__dirname, '../../build')))

var apiRoutes = require('./apiRoutes')(app);


var port = process.env.port || 8080;

var config = require('./config');

mongoose.connect(config.database);

app.listen(port);

