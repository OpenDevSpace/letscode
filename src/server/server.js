var express = require('express');
var bodyparser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var cors = require('cors');

var app = express();

var authRoutes = require('./routes/auth');
var userRoutes = require('./routes/user');
var courseRoutes = require('./routes/course');

var authMiddleware = require('./controllers/auth-middleware');

/**
 * Starts an expressJS server, in production frontend will run on the same port
 */

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(cors({
    origin: 'http://localhost:3000'
}));

console.log(path.join(__dirname, '../../build'));

app.use(express.static(path.join(__dirname, '../../build')))

// Middleware: all routes behind API require an auth!
app.use('/api', authMiddleware);

app.use('/api/user', userRoutes);
app.use('/api/course', courseRoutes);

app.use('/auth', authRoutes);


var port = process.env.port || 8080;

var config = require('./config');

mongoose.connect(config.database);

app.listen(port);

