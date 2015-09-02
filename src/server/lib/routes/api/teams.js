var express = require('express');
var crud = require('./util/crud.js');
var teams = require('../../data/teams.js');
var riders = require('../../data/riders.js');
var convert = require('../../convert.js');

var router = express.Router({
    mergeParams: true
});


var schema = {
        id: "ridersDetails",
        type: "object",
        properties: {
            _id: { type: "string" },
            safe_name: { type: "string" },
            uci: { type: "string" },
            status: { type: "string" },
            country: { type: "string" }
        },
        required: ["_id", "safe_name"]
    }
crud(router,teams, schema);

router
    .get('/:id/riders', function (req, res) {
        convert.prom2res(riders.finding({query:{"team":req.params.id}}), res);
    });

module.exports = router;

