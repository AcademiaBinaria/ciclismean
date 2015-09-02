var express = require('express');
var crud = require('./util/crud.js');
var users = require('../../data/users.js');

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
crud(router,users, schema);
    
module.exports = router;