var logger = require('../../logger.js');
var express = require('express');
var crudApi = require('./util/crudApi.js');
var notificationsData = require('../../data/notificationsData.js');
var convert = require('../../convert.js');

var router = express.Router({
    mergeParams: true
});



router.post('/', function (req, res) {
    notificationsData.findingByRegistrationId(req.body.registrationId)
        .then(function (reg) {
            console.log(reg);
            if (!reg) {
                convert.prom2res(notificationsData.updateRegistrationIds(req.body.registrationId), res, 201);
            } else {
                res.send(reg);
            }
        })
        .fail(function (err) {
            convert.resError(err, res);
        });
});

crudApi(router, notificationsData);


module.exports = router;
