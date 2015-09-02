var logger = require('./logger.js');

module.exports = {
    /** promise to response */
    prom2res: promise2response,
    /** request to mongo query */
    req2mongo: request2mongoq,
    /** takes callback parameters and returns a promise response */
    cllbck2prom: callback2Promise
}

function promise2response(prom, res, statusOk) {
    prom
        .then(function response(result) {
            if (typeof result == "undefined" || result == null || (Array.isArray(result) && result.length <= 0)) {
                logger.warn("no result found ");
                res.status(404).json();
            } else {
                logger.debug("result: ", JSON.stringify(result));
                res.status(statusOk).json(result);
            }
        })
        .fail(function error(err) {
            if (err.code === 11000) {
                logger.warn(err);
                res.status(409).send(err);
            }
            else {
                logger.error(err);
                res.status(500).send(err);
            }
        });
}

function request2mongoq(req) {
    var mongoQuery = {}
    // coll/:id
    if (req.params.id) {
        mongoQuery.query = {};
        mongoQuery.query._id = req.params.id;
    }
    // coll/?search=text
    if (req.query.search) {
        var regexOperator = {
            $regex: ".*" + req.query.search + ".*",
            $options: 'i'
        }
        mongoQuery.search = regexOperator;
    }

    // coll/?skip=1&limit=1000
    mongoQuery.skip = parseInt(req.query.skip) || 0;
    mongoQuery.limit = parseInt(req.query.limit) || 10;

    // coll/?sort=field:-field2:field3
    if (req.query.sort) {
        mongoQuery.sort = {};
        var sortFields = req.query.sort.split(":");
        sortFields.forEach(function (sortField) {
            mongoQuery.sort[sortField] = sortField.substring("-") ? -1 : 1
        })
    }
    // coll/?q=field:value
    if (req.query.q) {
        mongoQuery.query = {};
        if (req.query.q instanceof Array) {
            req.query.q.forEach(function (queryField) {
                parseQueryField(queryField);
            })
        } else {
            parseQueryField(req.query.q);
        }

        function parseQueryField(queryField) {
            var queryPairs = queryField.split(":");
            mongoQuery.query[queryPairs[0]] = queryPairs[1];
        }
    }
    return mongoQuery;
}


function callback2Promise(err, result, deferred) {
    if (err) {
        logger.error(err);
        deferred.reject(err);
    } else {
        deferred.resolve(result);
    }
}