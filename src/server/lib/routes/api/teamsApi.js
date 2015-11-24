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
		_id: {
			type: "string"
		},
		safe_name: {
			type: "string"
		},
		uci: {
			type: "string"
		},
		status: {
			type: "string"
		},
		country: {
			type: "string"
		}
	},
	required: ["_id", "safe_name"]
}
router
	.get('/:id/riders', function (req, res) {
		convert.prom2res(ridersData.finding({
			query: {
				"team": req.params.id
			}
		}), res);
	});
	/*.put('/:competition', function (req, res) {
		var tokenDecoded = jwt.decode(req.headers['x-access-token']);
		jwt.verify(req, res);
		//ridersData.findingById(req.params.rider).then(function (data) {
		//res.send(data);
		//if (data) {
		console.log(req.params.competition + "---" + req.body._id);delete req.body._id;
		convert.prom2res(teamsData.crud.updating(req.params.competition, req.body), res, 200);
		//} else {
		//	ridersData.crud.removing(req.params.rider);
		//	convert.prom2res(ridersData.crud.inserting(req.body), res, 200);
		//}
		//});
	});*/

crudApi(router, teamsData, schema);

module.exports = router;
