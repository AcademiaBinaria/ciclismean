var Q = require('q');
var MongoClient = require('mongodb').MongoClient;
var logger = require('../logger.js');
var settings = require('../settings.js');
var convert = require('../convert.js');


module.exports = {
	/** connects to a database */
	connecting:connecting,
	/** performs a find operation that returna an array*/
	finding: finding,
	/** performs a find operation that returns an item*/
	findingOne:findingOne,
	/** performs an aggegation operation */
	aggregating:aggregating,
	/** inserts a new document  */
	inserting:inserting,
	/** updates matched documents  */
	updating:updating,
	/** removes matched documents  */
	removing:removing
}

function connecting() {
    var deferred = Q.defer();
    MongoClient.connect(settings.mongoUrl, function (err, db) {
        convert.cllbck2prom(err, db, deferred);
    });
    return deferred.promise;
}

function finding(colName, query, proj, skip, limit, sort) {
	logger.debug(colName + " find : " + JSON.stringify(query));
	var _skip = skip || 0;
	var _limit = limit || 1000;
	var _sort = sort || { _id: -1 };
	var deferred = Q.defer();
	connecting()
		.then(function (db) {
			var coll = db.collection(colName);
			var cursor = proj ? coll.find(query, proj) : cursor = coll.find(query);
			cursor
				.skip(_skip)
				.limit(_limit)
				.sort(_sort)
				.toArray(function (err, result) {
					convert.cllbck2prom(err, result, deferred);
				});
		})
		.fail(function (err) {
			convert.cllbck2prom(err, null, deferred);
		});
	return deferred.promise;
}

function findingOne(colName, query, projection) {
	var deferred = Q.defer();
	connecting()
		.then(function (db) {
			var col =db.collection(colName);
			if(projection){
				col.findOne(query, projection , function (err, result) {
					convert.cllbck2prom(err, result, deferred);
				});}
			else{
				col.findOne(query,  function (err, result) {
					convert.cllbck2prom(err, result, deferred);
				});
			}
		})
		.fail(function (err) {
			convert.cllbck2prom(err, null, deferred);
		});
	return deferred.promise;
}

function aggregating(colName, query) {
	var deferred = Q.defer();
	connecting()
		.then(function (db) {
			db.collection(colName)
				.aggregate(query, function (err, result) {
					convert.cllbck2prom(err, result, deferred);
				});
		})
		.fail(function (err) {
			convert.cllbck2prom(err, null, deferred);
		});
	return deferred.promise;
}

function inserting(colName, document) {
	logger.debug(colName + " insert : " + JSON.stringify(document));
	var deferred = Q.defer();
	connecting()
		.then(function (db) {
			db.collection(colName)
				.insert(document,{w:1}, function (err, result) {
					convert.cllbck2prom(err, document, deferred);
				});
		})
		.fail(function (err) {
			convert.cllbck2prom(err, null, deferred);
		});
	return deferred.promise;
}

function updating(colName, query, update, options) {
	logger.debug(colName + " update : " + JSON.stringify(query) + JSON.stringify(update));
	var deferred = Q.defer();
	connecting()
		.then(function (db) {
			db.collection(colName)
				.update(query, update, options, function (err, result) {
					convert.cllbck2prom(err, result, deferred);
				});
		})
		.fail(function (err) {
			convert.cllbck2prom(err, null, deferred);
		});
	return deferred.promise;
}

function removing(colName, query, options) {
	logger.debug(colName + " removing : " + JSON.stringify(query));
	var deferred = Q.defer();
	connecting()
		.then(function (db) {
			db.collection(colName)
				.remove(query, options || {safe: true}, function (err, result) {
					convert.cllbck2prom(err, result, deferred);
			});
		})
		.fail(function (err) {
			convert.cllbck2prom(err, null, deferred);
		});
	return deferred.promise;
}