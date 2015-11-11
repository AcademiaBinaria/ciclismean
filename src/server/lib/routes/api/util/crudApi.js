var logger = require('../../../logger.js');
var notificationsData = require('../../../data/notificationsData.js');
var convert = require('../../../convert.js');
var ZSchema = require("z-schema");
var validator = new ZSchema({});
var gcm = require('node-gcm');
var settings = require('../../../settings.js');

module.exports = crudRouter;


function sendNotifications(result) {
    var message = new gcm.Message();
    var sender = new gcm.Sender(settings.APIkey);
    notificationsData.findingByRegistrationId().then(function (regIds) {
        console.log(regIds);
    });
    var regTokens = ['dXKskZZxKys:APA91bGPAC1UUQhAt440hZ-blUqdc9Cmd_mMdTQj-aXi9EvOfyMkksXlhhS9nMnizsvwkk4vjARNYza2M8NHJEFbJVttD_B_8rAUE-puU6SFo9hrzxpMQsxB3tcYtg8LGePCyAdR6uYw'];

    message.addData('message', result._id + " | " + result.team);
    message.addData('title', 'Nuevo ciclista');
    message.timeToLive = 3000;
    console.log(regTokens);
    sender.send(message, {
        registrationIds: regTokens
    }, function (err, result) {
        if (err)
            console.log(err);
        else
            console.log(result);
    });

}

function crudRouter(router, data, schema) {
    var crud = data.crud;
    router
        .get('/', function (req, res) {
            convert.prom2res(crud.finding(convert.req2mongo(req)), res, 200);
        })
        .get('/:id', function (req, res) {
            convert.prom2res(crud.finding(convert.req2mongo(req)), res, 200);
        })
        .post('/', function (req, res) {
            if (req.originalUrl == "/api/riders") {
                sendNotifications(req.body);
            }
            if (!schema || validator.validate(req.body, schema)) {
                convert.prom2res(crud.inserting(req.body), res, 201);
            } else {
                var error = validator.getLastError();
                res.status(400).send(error);
            }
        })
        .put('/:id', function (req, res) {
            convert.prom2res(crud.updating(req.params.id, req.body), res, 200);
        })
        .delete('/:id', function (req, res) {
            convert.prom2res(crud.removing(req.params.id), res, 204);
        });
    return router;
}
