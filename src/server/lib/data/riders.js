var colName = 'riders';
var _crud = require('./util/crud.js')
    .crud(colName,
        { total_victories: -1,
        name: 1 });

exports.crud = _crud;
