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


exports.findingByKeywords = function (keywords) {
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
    }, null);
}
