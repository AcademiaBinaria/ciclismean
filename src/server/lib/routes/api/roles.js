var express = require('express');
var crud = require('./util/crud.js');
var roles = require('../../data/roles.js');

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
crud(router,roles, schema);
    
module.exports = router;