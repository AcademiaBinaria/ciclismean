var express = require('express');
var crudApi = require('./util/crudApi.js');
var ridersData = require('../../data/ridersData.js');
var competitionsData = require('../../data/competitionsData.js');
var jwt = require('../../jwt.js');
var convert = require('../../convert.js');
var logger = require("./../../logger.js");

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



router
    .get('/dorsal', function (req, res) {
        console.log('dorsal')
        ridersData.findingByDorsal().then(function (data) {
            res.send(data);
        }).fail(function (err) {
            convert.resError(err, res);
        });
    })
    .get('/keywords/:keywords', function (req, res) {
        ridersData.findingByKeywords(req.params.keywords, parseInt(req.query.skip), parseInt(req.query.limit)).then(function (data) {
            res.send(data);
        }).fail(function (err) {
            convert.resError(err, res);
        });
    })
    .post('/add-season/:year', function (req, res) {
        logger.info(req.params.year);
        ridersData.findingAllRiders().then(function (data) {
            data.forEach(function (rider) {
                var lastTeam = rider.team;
                if (rider.seasons.length > 0) {
                    lastTeam = rider.seasons[rider.seasons.length - 1].team;
                }
                if (rider.retired != true) {
                    rider.seasons.push({
                        year: parseInt(req.params.year),
                        team: lastTeam,
                        palmares: []
                    });
                    ridersData.updatingRider(rider).fail(function (err) {
                        logger.error(err);
                    });
                }
            });
            competitionsData.findingAllCompetitions().then(function (competitions) {
                competitions.forEach(function (competition) {
                    if (!competition.seasons) {
                        competition.seasons = [];
                    }
                    var stagesList = [];
                    //logger.debug(competition.numberStages);
                    for (var pos = 0; pos < competition.numberStages; pos++) {
                        //console.log(pos);
                        stagesList.push({
                            description: "Etapa " + pos,
                            winner: "-"
                        });
                    }
                    competition.seasons.push({
                        year: parseInt(req.params.year),
                        stages: stagesList,
                        winner: "",
                        mountain: "",
                        regularity: ""
                    });
                    competitionsData.updatingCompetition(competition).fail(function (err) {
                        logger.error(err);
                    });
                });
                res.send();
            }).fail(function (err) {
                convert.resError(err, res);
            });
        });
    })
    .put('/:rider', function (req, res) {
        var tokenDecoded = jwt.decode(req.headers['x-access-token']);
        jwt.verify(req, res);
        ridersData.findingById(req.params.rider).then(function (data) {
            if (data) {
                delete req.body._id;
                convert.prom2res(ridersData.crud.updating(req.params.rider, req.body), res, 200);
            } else {
                ridersData.crud.removing(req.params.rider);
                convert.prom2res(ridersData.crud.inserting(req.body), res, 200);
            }
        });
    });

crudApi(router, ridersData, schema);

module.exports = router;
