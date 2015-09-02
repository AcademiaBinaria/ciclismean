var colName = 'teams';
var crudData = require('./util/crudData.js')
    .crud(colName,
        { name: 1 });

exports.crud = crudData;

