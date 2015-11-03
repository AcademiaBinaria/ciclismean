var express = require('express');
var crudApi = require('./util/crudApi.js');
var ridersData = require('../../data/ridersData.js');
var jwt = require('../../jwt.js');
var convert = require('../../convert.js');

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



router.get('/keywords/:keywords', function (req, res) {
        console.log(req.params);
        ridersData.findingByKeywords(req.params.keywords).then(function (data) {
            res.send(data);
        }).fail(function (err) {
            convert.resError(err, res);
        });
    })
    .put('/:rider', function (req, res) {
        var tokenDecoded = jwt.decode(req.headers['x-access-token']);
        jwt.verify(req, res);
        console.log("PUT");
        ridersData.findingById(req.params.rider).then(function (data) {
            res.send(data);
            if (data)
                convert.prom2res(ridersData.crud.updating(req.params.rider, req.body), res, 200);
            else {
                ridersData.crud.removing(req.params.rider);
                convert.prom2res(ridersData.crud.inserting(req.body), res, 200);
            }
        });
    });

crudApi(router, ridersData, schema);

module.exports = router;
