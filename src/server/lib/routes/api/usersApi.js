var express = require('express');
var crudApi = require('./util/crudApi.js');
var usersData = require('../../data/usersData.js');

var router = express.Router({
    mergeParams: true
});

var schema = {
        id: "rolesDetails",
        type: "object",
        properties: {
            _id: { type: "string" },
            name: { type: "string" },
            password: { type: "string" },
            email: { type: "string" }
        },
        required: ["_id", "name", "password", "email"]
    }
crudApi(router,usersData, schema);
    
module.exports = router;