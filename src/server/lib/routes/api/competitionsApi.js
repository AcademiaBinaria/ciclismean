var logger = require('../../logger.js');
var express = require('express');
var crudApi = require('./util/crudApi.js');
var competitionsData = require('../../data/competitionsData.js');

var router = express.Router({
	mergeParams: true
});


var schema = {
	id: "competitionDetails",
	type: "object",
	properties: {
		_id: {
			type: "string"
		},
		category: {
			type: "string"
		}
	},
	required: ["_id", "category"]
}

crudApi(router, competitionsData, schema);

router
	.put('/:competition', function (req, res) {
		var tokenDecoded = jwt.decode(req.headers['x-access-token']);
		jwt.verify(req, res);
		convert.prom2res(competitionsData.updatingCompetition(req.params.competition, req.body), res, 200);
	});


module.exports = router;
