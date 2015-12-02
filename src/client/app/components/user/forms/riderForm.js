"use strict";
(function () {
	angular
		.module('riderForm', ['ui.router', 'formMessages'])
		.config(config)
		.directive('riderForm', directive)


	function config($stateProvider) {
		$stateProvider
			.state('add-rider', {
				url: '/forms/add-rider',
				template: '<rider-form></rider-form>'
			})
			.state('edit-rider', {
				url: '/forms/edit-rider/:id',
				template: '<rider-form></rider-form>'
			});
	}

	function directive() {
		return {
			templateUrl: 'app/components/user/forms/riderForm.html',
			controller: controller,
			controllerAs: "vm",
			bindToController: true
		}
	}

	function controller(UtilService, teamsDataService, ridersDataService, $state, $rootScope, competitionDataService, $stateParams, $location, settings) {
		var vm = this;
		var limit = 100;
		vm.has_error = UtilService.has_error;
		if (!UtilService.isLogged())
			$state.go('login');
		vm.alertStyle = "alert-success";

		init();

		function init() {
			vm.message = "Añadido ciclista: ";
			vm.roles = UtilService.getRoles();
			competitionDataService.gettingCompetitions({
				limit: limit
			}).then(function (data) {
				vm.competitions = data;
				teamsDataService.gettingTeams({
					limit: limit
				}).then(function (data) {
					vm.teams = data;
					if ($state.current.name == "edit-rider")
						initEditRider();
					else
						vm.rider = new ridersDataService.riders();
				});
			});
			vm.showMessage = false;

		}

		function initEditRider() {
			vm.message = "Editado ciclista";
			vm.rider = new ridersDataService.rider();
			vm.riderId = vm.rider._id;
			var url_safe_name = $stateParams.id;
			ridersDataService.gettingRiders({
				limit: 1,
				q: 'safe_name:' + url_safe_name
			}).then(function (rider) {
				for (var propertyName in rider[0]) {
					vm.rider[propertyName] = rider[0][propertyName];
				}
				vm.rider.dob = new Date(Date.parse(vm.rider.dob));
				if (!vm.rider.retired)
					vm.rider.retired = false
				vm.teams.forEach(function (team) {
					if (team._id == vm.rider.team)
						vm.riderTeam = team;
				});
				vm.roles.forEach(function (role) {
					if (role.role == vm.rider.team_rol) {
						vm.team_rol = role;
					}
				});
			});
			vm.editPage = ($state.current.name == "edit-rider");
		}

		vm.removeSeason = function (index) {
			vm.rider.seasons.splice(index, 1)
		}

		vm.removeCompetition = function (season, competition) {
			vm.rider.seasons[season].palmares.splice(competition, 1);
		}

		$rootScope.$watch(function () {
			return vm.team_rol
		}, function (newValue, oldValue) {
			if (newValue) {
				vm.rider.team_rol = newValue.role;
				vm.rider.rol_icon = newValue.rol_icon;
			}
		});

		$rootScope.$watch(function () {
			return vm.riderTeam
		}, function (newValue, oldValue) {
			if (newValue) {
				vm.rider.team = vm.riderTeam._id;
				vm.rider.safe_name_team = vm.riderTeam.safe_name;
			}
		});

		$rootScope.$watch(function () {
			return vm.rider._id;
		}, function (newValue, oldValue) {
			if (newValue) {
				vm.rider.safe_name = UtilService.getSafeName(vm.rider._id);
			}
		});

		vm.addYear = function () {
			if (!vm.rider.seasons)
				vm.rider.seasons = [];
			vm.rider.seasons.push({
				"year": settings.currentSeason,
				"team": "",
				"palmares": []
			})
		};

		vm.addCompetition = function (palmares) {
			palmares.push({
				"competition": "",
				"position": "",
				"victories": 0
			})
		};

		vm.saveRider = function () {
			if (!vm.addRiderForm.$invalid) {
				if (!vm.rider.retired)
					vm.rider.retired = false
				vm.rider.$save();
				vm.showMessage = true;
			}
		}

		vm.editRider = function () {
			if (!vm.addRiderForm.$invalid) {
				console.log(vm.rider);
				vm.rider.$update({
					_id: vm.riderId
				}).then(function (data) {
					vm.hideForm = true;
				});
				/*new ridersDataService.rider({
				    _id: id
				}).$delete();*/
				vm.showMessage = true;
			}
		}

		vm.removeRider = function (index) {
			vm.rider = new ridersDataService.rider();
			vm.rider._id = vm.rider[index]._id;
			vm.rider.$delete().then(function () {
				vm.message = "Borrado corredor: ";
				vm.showMessage = true;
				init();
			});
		}

	}
})();
