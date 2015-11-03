var jwt = require('jsonwebtoken');
var logger = require('./logger.js');
var settings = require("./settings.js");

exports.generate = function (user, res) {
    user.password = "";
    var token = jwt.sign(user, secret(), {
        expiresInMinutes: 20
    });
    return res.status(201).json({
        token: token
    });
}


exports.verify = function (req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(403).send();
    try {
        req.user = jwt.verify(token, secret());
    } catch (err) {
        console.error(err);
        return res.status(403).send();
    }
}

exports.decode = function (token) {
    return jwt.decode(token);
}

function secret() {
    return settings.secret + "agorabinaria";
}
