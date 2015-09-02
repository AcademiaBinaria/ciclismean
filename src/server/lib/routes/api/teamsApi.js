var express = require('express');
var crudApi = require('./util/crudApi.js');
var teamsData = require('../../data/teamsData.js');
var ridersData = require('../../data/ridersData.js');
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
crudApi(router,teamsData, schema);

router
    .get('/:id/riders', function (req, res) {
        convert.prom2res(ridersData.finding({query:{"team":req.params.id}}), res);
    });

module.exports = router;

