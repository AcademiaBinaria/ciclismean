var colName = 'roles';
var _crud = require('./util/crud.js')
    .crud(colName,
        { _id: 1 });

exports.crud = _crud;