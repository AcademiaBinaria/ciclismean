var express = require('express');

/** routing for api calls */
module.exports.apiRoutes = function (app) {
    app.use('/api/roles', require('./api/roles.js'));
    app.use('/api/users', require('./api/users.js'));

    app.use('/api/riders', require('./api/riders.js'));
    app.use('/api/teams', require('./api/teams.js'));
    app.use('/api/competitions', require('./api/competitions.js'));

}

