var cache = require('../cache.js');

/** routing for files fetched from fs */
module.exports.staticFileRoutes = function (app) {
    /** base route for index.html */
    app.get('/', function (req, res, next) {
        cache.getFile(req, res);
    });
    /** routes for client side static files */
    app.get('/app/*', function (req, res, next) {
        cache.getFile(req, res);
    });
    /** routes for client side static files */
    app.get('/node_modules/*', function (req, res, next) {
        cache.getFile(req, res);
    });
}