var userRoutes = require('./routes/user');


module.exports = (app) => {
    app.use('/api/user', userRoutes);
}