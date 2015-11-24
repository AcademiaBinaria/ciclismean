var colName = 'competitions';
var crudData = require('./util/crudData.js')
	.crud(colName, {
		_id: 1
	});

exports.crud = crudData;


var mongodb = require('./util/mongodb.js');
exports.findingById = function (id) {
	return mongodb.findingOne(colName, {
		_id: id
	}, null);
}

exports.findingAllCompetitions = function () { //colName, query, proj, skip, limit, sort
	return mongodb.finding(colName, {});
}

exports.updatingCompetition = function (competition) { //colName, query, proj, skip, limit, sort
	var id = competition._id;
	delete competition._id;
	console.log(competition);
	return mongodb.updating(colName, {
		_id: id
	}, competition);
}
