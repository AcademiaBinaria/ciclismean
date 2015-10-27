var express = require('express');
var crudApi = require('./util/crudApi.js');
var usersData = require('../../data/usersData.js');
var jwt = require('../../jwt.js');
var convert = require('../../convert.js');

var router = express.Router({
    mergeParams: true
});

var schema = {
    id: "rolesDetails",
    type: "object",
    properties: {
        _id: {
            type: "string"
        },
        name: {
            type: "string"
        },
        password: {
            type: "string"
        },
        email: {
            type: "string"
        }
    },
    required: ["_id", "name", "password", "email"]
}


router.post('/session', function (req, res) {
    usersData.findingByEmailPassword(req.body.email, req.body.password)
        .then(function (user) {
            checkNewSession(user, res);
        })
        .fail(function (err) {
            convert.resError(err, res);
        });

});


function checkNewSession(user, res) {
    if (user) {
        delete user.password;
        return jwt.generate(JSON.stringify(user), res);
    } else {
        convert.resError({
            error: "Invalid email or password"
        }, res, 401);
    }
}

crudApi(router, usersData, schema);

module.exports = router;
