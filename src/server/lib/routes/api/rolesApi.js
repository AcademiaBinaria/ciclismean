var express = require('express');
var crudApi = require('./util/crudApi.js');
var rolesData = require('../../data/rolesData.js');

var router = express.Router({
    mergeParams: true
});
var schema = {
        id: "rolesDetails",
        type: "object",
        properties: {
            _id: { type: "string" },
            name: { type: "string" }
        },
        required: ["_id", "name"]
    }
crudApi(router,rolesData, schema);
    
module.exports = router;