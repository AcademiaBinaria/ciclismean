"use strict";

/** Creates the express application*/
exports.createApp = function () {
    var express = require('express');
    var middleware = require('./middleware.js');
    var staticFiles = require('./routes/staticFiles.js')
    var api = require('./routes/api.js')
    var other = require('./routes/other.js')
    
    // creataing the express application
    var app = express();
    
    // middleware configuration
    middleware.useExpressLog(app);
    middleware.useCache(app);
    middleware.useCompression(app);
    middleware.useUploader(app);
    middleware.useBodyParser(app);
    middleware.useSecurity(app);
    
    // routes
    staticFiles.staticFileRoutes(app);
    api.apiRoutes(app);
    other.otherRoutes(app);
    
    return app;
};
