var morgan = require('morgan');
var logger = require('./logger.js');
var cache = require('./cache.js');
var compression = require('compression');
var multer = require('multer');
var bodyParser = require('body-parser');


/** configures a the logging system */
exports.useExpressLog = function expressLog(app) {
    app.use(morgan(logger.morgan_json, {
        "skip": function (req, res) {
            return false;//res.statusCode < 100
        },
        "stream": logger.morgan_stream
    }));
    app.use(clientErrorHandler);
    function clientErrorHandler(err, req, res, next) {
        logger.error(err.message, err.stack);
        if (req.xhr) {
            res.send(500, {
                error: err.message
            });
        } else {
            next(err);
        }
    }
};
/** intitializes cache */
exports.useCache = function (app) {
    cache.initCache();
};
/** uses the compression middleware to gzip files sent to the client */
exports.useCompression = function (app) {
    app.use(compression());
};
/** uses an uploader to receive files by post */
exports.useUploader = function uploader(app) {
    app.use(multer({ inMemory: true, limits: { fieldNameSize: 100, files: 1 } }));
};
/** parses body and urls to get JSON objects */
exports.useBodyParser = function useBodyParser(app) {
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
}
/** configures the security system for protected routes */
exports.useSecurity = function name(app) {
    app.use('/api/priv/', function (req, res, next) {
        // TODO: JWT
        next();
    });
}