var mongodb = require('./mongodb.js');
var logger = require('../../logger.js');

module.exports.crud = function (colname, sort, limit) {
    logger.debug("crud para " + colname);
    return {
        _colName : colname,
        _sort : sort || { _id: -1 },
        _limit : limit || 100,
        finding: finding,
        inserting: inserting,
        updating: updating,
        removing: removing
    };
}

function finding(mongoQuery) {
    return mongodb.finding(this._colName, mongoQuery.query, null, mongoQuery.skip, mongoQuery.limit || this._limit, mongoQuery.sort || this._sort);
}
function inserting(document) {
    return mongodb.inserting(this._colName, document);
}
function updating(document) {
     return mongodb.updating(this.colName, { _id: id }, document, null);
}
function removing(document) {
     return mongodb.removing(this.colName, { _id: id }, null);
}
