var express = require('express');
var bodyparser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var cors = require('cors');

var app = express();

var authRoutes = require('./routes/auth');
var userRoutes = require('./routes/user');


var authMiddleware = require('./controllers/auth-middleware');

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
app.use(cors({
    origin: 'http://localhost:3000'
}));

console.log(path.join(__dirname, '../../build'));

app.use(express.static(path.join(__dirname, '../../build')))

app.use('/api', authMiddleware);

app.use('/api/user', userRoutes);

app.use('/auth', authRoutes);


var port = process.env.port || 8080;

var config = require('./config');

mongoose.connect(config.database);

app.listen(port);

