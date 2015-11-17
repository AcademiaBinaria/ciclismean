var colName = 'riders';
var crudData = require('./util/crudData.js')
    .crud(colName, {
        total_victories: -1,
        name: 1
    });

exports.crud = crudData;

var mongodb = require('./util/mongodb.js');
exports.findingById = function (id) {
    return mongodb.findingOne(colName, {
        _id: id
    }, null);
}


exports.findingByKeywords = function (keywords, skip, limit) { //colName, query, proj, skip, limit, sort
    var rq = {
        $regex: ".*" + keywords + ".*",
        $options: 'i'
    };
    return mongodb.finding(colName, {
        $or: [{
            _id: rq
                }, {
            lob: rq
                }, {
            team: rq
                }, {
            safe_name: rq
                }, {
            team_rol: rq
                }]
    }, null, skip, limit);
}

exports.findingAllRiders = function () { //colName, query, proj, skip, limit, sort
    return mongodb.finding(colName, {});
}

exports.updatingRider = function (rider) { //colName, query, proj, skip, limit, sort
    var id = rider._id;
    delete rider._id;
    return mongodb.updating(colName, {
        _id: id
    }, rider);
}
