var logger = require('../../logger.js');
var express = require('express');
var crudApi = require('./util/crudApi.js');
var notificationsData = require('../../data/notificationsData.js');

var router = express.Router({
    mergeParams: true
});


crudApi(router, notificationsData);




module.exports = router;
