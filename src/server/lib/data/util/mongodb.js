var Q = require('q');
var MongoClient = require('mongodb').MongoClient;
var logger = require('../../logger.js');
var settings = require('../../settings.js');
var convert = require('../../convert.js');

var connection;

module.exports = {
    /** connects to a database */
    connecting: connecting,
    /** connection to a database */
    connection: connection,
    /** saves the current database connection*/
    setConnection: setConnection,
    /** performs a find operation that returna an array*/
    finding: finding,
    /** performs a find operation that returns an item*/
    findingOne: findingOne,
    /** performs an aggegation operation */
    aggregating: aggregating,
    /** inserts a new document  */
    inserting: inserting,
    /** updates matched documents  */
    updating: updating,
    /** removes matched documents  */
    removing: removing
}

function connecting() {
    var deferred = Q.defer();
    MongoClient.connect(settings.mongoUrl, function (err, db) {
        convert.cllbck2prom(err, db, deferred);
    });
    return deferred.promise;
}

function setConnection(db) {
    connection = db;
}

function finding(colName, query, proj, skip, limit, sort) {
    logger.debug(colName + " find : " + JSON.stringify(query));
    var _skip = skip || 0;
    var _limit = limit || 1000;
    if (query) {
        if (query.retired == "false" || query.retired == false) {
            query = {
                retired: {
                    $ne: true
                }
            };
        } else if (query.retired == "true") {
            query = {
                retired: true
            };
        }
    }
    if (sort) { //Fix for old order
        if (sort["-dob"] == -1) {
            sort = {
                dob: 1
            };
        }
    }
    var _sort = sort || {
        _id: -1
    };
    var deferred = Q.defer();
    var collection = connection.collection(colName);
    var cursor = proj ? collection.find(query, proj) : cursor = collection.find(query);
    cursor
        .skip(_skip)
        .limit(_limit)
        .sort(_sort)
        .toArray(function (err, result) {
            convert.cllbck2prom(err, result, deferred);
        });
    return deferred.promise;
}

function findingOne(colName, query, projection) {
    var deferred = Q.defer();
    var collection = connection.collection(colName);
    if (projection) {
        collection.findOne(query, projection, function (err, result) {
            convert.cllbck2prom(err, result, deferred);
        });
    } else {
        collection.findOne(query, function (err, result) {
            convert.cllbck2prom(err, result, deferred);
        });
    }
    return deferred.promise;
}

function aggregating(colName, query) {
    var deferred = Q.defer();
    connection.collection(colName)
        .aggregate(query, function (err, result) {
            convert.cllbck2prom(err, result, deferred);
        });
    return deferred.promise;
}

function inserting(colName, document) {
    logger.debug(colName + " insert : " + JSON.stringify(document));
    var deferred = Q.defer();
    connection.collection(colName)
        .insert(document, {
            w: 1
        }, function (err, result) {
            convert.cllbck2prom(err, document, deferred);
        });
    return deferred.promise;
}

function updating(colName, query, update, options) {
    logger.debug(colName + " update : " + JSON.stringify(query) + JSON.stringify(update));
    var deferred = Q.defer();
    connection.collection(colName)
        .update(query, {
            $set: update
        }, options, function (err, result) {
            convert.cllbck2prom(err, result, deferred);
        });
    return deferred.promise;
}

function removing(colName, query, options) {
    logger.debug(colName + " removing : " + JSON.stringify(query));
    var deferred = Q.defer();
    connection.collection(colName)
        .remove(query, options || {
            safe: true
        }, function (err, result) {
            convert.cllbck2prom(err, result, deferred);
        });
    return deferred.promise;
}
