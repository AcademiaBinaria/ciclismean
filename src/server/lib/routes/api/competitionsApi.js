var logger = require('../../logger.js');
var express = require('express');
var crudApi = require('./util/crudApi.js');
var competitionsData = require('../../data/competitionsData.js');

var router = express.Router({
    mergeParams: true
});


var schema = {
        id: "competitionDetails",
        type: "object",
        properties: {
            _id: { type: "string" },
            category: { type: "string" }
        },
        required: ["_id", "category"]
    }
    
crudApi(router,competitionsData, schema);




module.exports = router;