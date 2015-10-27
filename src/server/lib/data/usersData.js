var colName = 'users';
var crudData = require('./util/crudData.js')
    .crud(colName, {
        _id: 1
    });

var mongodb = require('./util/mongodb.js');
exports.findingByEmailPassword = function (email, password) {
    return mongodb.findingOne(colName, {
        email: email,
        password: password
    }, null);
}

exports.crud = crudData;
