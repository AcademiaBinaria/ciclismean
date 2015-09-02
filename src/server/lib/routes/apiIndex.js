var express = require('express');

/** routing for api calls */
module.exports.apiRoutes = function (app) {
    app.use('/api/roles', require('./api/rolesApi.js'));
    app.use('/api/users', require('./api/usersApi.js'));

    app.use('/api/riders', require('./api/ridersApi.js'));
    app.use('/api/teams', require('./api/teamsApi.js'));
    app.use('/api/competitions', require('./api/competitionsApi.js'));

}

