var express = require('express');
var crud = require('./util/crud.js');
var riders = require('../../data/riders.js');

var router = express.Router({
    mergeParams: true
});

var schema = {
        id: "ridersDetails",
        type: "object",
        properties: {
            _id: { type: "string" },
            safe_name: { type: "string" },
            team: { type: "string" },
            safe_name_team: { type: "string" },
            country: { type: "string" }
        },
        required: ["_id", "safe_name", "team", "safe_name_team","country"]
    }
crud(router,riders, schema);


module.exports = router;


