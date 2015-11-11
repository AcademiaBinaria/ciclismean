var colName = 'notifications';
var mongodb = require('./util/mongodb.js');
var crudData = require('./util/crudData.js')
    .crud(colName, {
        name: 1
    });

exports.crud = crudData;



exports.findingByRegistrationId = function (regId) {
    return mongodb.findingOne(colName, {
        registrationId: regId
    }, null);
}

exports.updateRegistrationIds = function (regId) {
    return mongodb.inserting(colName, {
        registrationId: regId
    }, null);
}

exports.findingRegistrationIds = function (regId) {
    return mongodb.finding(colName, {}, {
        "registrationId": 1
    });
}
