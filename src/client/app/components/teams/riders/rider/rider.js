"use strict";
(function () {
	angular
		.module('rider', ['ui.router'])
		.config(config)
		.directive('rider', directive)
		.factory('riderLogicService', riderLogicService);

	function config($stateProvider) {
		$stateProvider
			.state('rider', {
				url: '/equipos/:teamId/:year/:riderId',
				template: '<rider></rider>'
			});
	}

	function directive() {
		return {
			templateUrl: 'app/components/teams/riders/rider/rider.html',
			controller: controller,
			controllerAs: "vm",
			bindToController: true
		}
	}

	function controller($stateParams, ridersDataService, riderLogicService, competitionDataService, teamsDataService) {
		var vm = this;
		vm.riderId = $stateParams.riderId;

		init();

		function setSeasonTotalVictories(season) {
			var totalVictories = 0;
			season.palmares.forEach(function (competition) {
				if (competition.victories != "-") {
					totalVictories += parseInt(competition.victories);
				}
				if (competition.position == "1º" || competition.position == "1") {
					totalVictories += 1;
				}
			});
			season.totalVictories = totalVictories;
		}

		function init() {
			ridersDataService.gettingRiders({
				limit: 1,
				q: 'safe_name:' + vm.riderId
			}).then(function (riders) {
				vm.rider = riders[0];
				vm.imageUrl = riderLogicService.getRiderImageUrl(vm.rider);
				vm.rider.age = riderLogicService.getRiderAge(vm.rider.dob);
				vm.rider.flag = riderLogicService.getRiderFlag(vm.rider.country);
				competitionDataService.gettingCompetitions({
					limit: 200
				}).then(function (data) {
					vm.rider.seasons.forEach(function (season) {
						setSeasonTotalVictories(season);
						season.palmares.forEach(function (competition) {
							data.forEach(function (race) {
								if (competition.competition == race._id) {
									competition.category = race.category;
								}
							});
						});
					});
				});
			});
		}

		vm.getMaillot = function (team, year) {
			return "assets/images/teams_covers/" + year + "/" + team + ".png"
		};

		/*vm.getSafeNameTeam = function (team) {
			var teamFound = new teamsDataService.team();
			teamFound._id = team;
			console.log(teamFound);
			teamFound.$get().then(function (data) {
				return data.safe_name;
			});
		};*/

	}

	function riderLogicService() {
		var factory = {};

		factory.getRiderFlag = function (country) {
			return "assets/images/flags/" + country + ".png";
		}

		factory.getRiderAge = function (dob) {
			var dateOfBirth = new Date(dob);
			var ageDifMs = Date.now() - dateOfBirth.getTime();
			var ageDate = new Date(ageDifMs);
			return (ageDate.getUTCFullYear() - 1970);
		}

		factory.getRiderImageUrl = function (rider) {
			var year = new Date().getFullYear();
			var team = rider.safe_name_team;
			var rider = rider.safe_name;
			return "assets/images/riders_img/" + year + "/" + team + "/" + rider + ".jpg";
		}

		return factory;
	}


})();