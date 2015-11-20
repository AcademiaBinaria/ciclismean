"use strict";
(function () {
	angular
		.module('riderCard', [])
		.directive('riderCard', directive)

	function directive() {
		return {
			templateUrl: 'app/components/teams/riders/rider-card/rider-card.html',
			controller: controller,
			controllerAs: "vm",
			bindToController: true,
			scope: {
				riderId: "="
			}
		}
	}

	function controller(UtilService, riderLogicService, settings) {
		var vm = this;
		init();

		vm.getRiderImage = riderLogicService.getRiderImageUrl(vm.riderId);

		vm.getRiderFlag = riderLogicService.getRiderFlag(vm.riderId.country);

		vm.getMaillot = function (team) {
			return "assets/images/teams_covers/" + vm.year + "/" + team + ".png"
		};

		function getCurrentVictories() {
			vm.riderId.seasons.forEach(function (season) {
				if (parseInt(season.year) == vm.year) {
					var victories = 0;
					season.palmares.forEach(function (competition) {
						if (competition.victories != "-") {
							victories += parseInt(competition.victories);
						}
					});
					vm.riderId.currentVictories;
				}
			});
		}

		function init() {
			vm.year = settings.currentSeason;
			vm.riderId.age = UtilService.calculateAge(vm.riderId.dob);
			vm.riderId.dob = new Date(vm.riderId.dob);
			getCurrentVictories();
		}

	}
})();
