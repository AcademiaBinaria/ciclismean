var colName = 'competitions';
var crudData = require('./util/crudData.js')
    .crud(colName,
        { _id: 1 });

exports.crud = crudData;



