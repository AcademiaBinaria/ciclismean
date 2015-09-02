var logger = require('../../logger.js');
var express = require('express');
var crud = require('./util/crud.js');
var competitions = require('../../data/competitions.js');

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
    
crud(router,competitions, schema);




module.exports = router;