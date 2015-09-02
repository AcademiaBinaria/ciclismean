var cache = require('../cache.js');

/** non controlled routes */
module.exports.otherRoutes = function (app) {
    app.get('/*', function (req, res, next) {
        // redirect everything else to index.html
        // TODO: control if it should respond with a 404
        cache.getFile(req, res, '/');
    });
}