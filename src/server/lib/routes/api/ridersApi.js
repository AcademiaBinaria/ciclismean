var express = require('express');
var crudApi = require('./util/crudApi.js');
var ridersData = require('../../data/ridersData.js');

var router = express.Router({
    mergeParams: true
});

var schema = {
    id: "ridersDetails",
    type: "object",
    properties: {
        _id: {
            type: "string"
        },
        safe_name: {
            type: "string"
        },
        team: {
            type: "string"
        },
        safe_name_team: {
            type: "string"
        },
        country: {
            type: "string"
        }
    },
    required: ["_id", "safe_name", "team", "safe_name_team", "country"]
}
crudApi(router, ridersData, schema);

router.get('/keywords/:keywords', function (req, res) {
    console.log(req.params);
    ridersData.findingByKeywords(req.params.keywords).then(function (data) {
        res.send(data);
    }).fail(function (err) {
        convert.resError(err, res);
    });
});

module.exports = router;
