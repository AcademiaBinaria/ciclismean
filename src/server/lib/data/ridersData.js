var colName = 'riders';
var crudData = require('./util/crudData.js')
    .crud(colName,
        { total_victories: -1,
        name: 1 });

exports.crud = crudData;
