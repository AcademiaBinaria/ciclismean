var colName = 'teams';
var _crud = require('./util/crud.js')
    .crud(colName,
        { name: 1 });

exports.crud = _crud;

