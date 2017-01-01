"use strict";
(function () {
	angular
		.module('teams', ['ui.router', 'riders', 'team', 'rider', 'riderCard'])
		.config(config)
		.directive('teams', directive)
		.factory('teamsDataService', teamsDataService)

	function config($stateProvider) {
		$stateProvider
			.state('home', {
				url: '/',
				template: '<teams></teams>'
			})
			.state('teams', {
				url: '/equipos',
				template: '<teams></teams>'
			});
	}

	function directive() {
		return {
			templateUrl: 'app/components/teams/teams.html',
			controller: controller,
			controllerAs: "vm",
			bindToController: true
		}
	}

	function controller(teamsDataService, UtilService, settings, $timeout) {
		var vm = this;
		vm.showLoader = true;

		function getTeams(status) {
			return teamsDataService.gettingTeams({
				limit: 100,
				sort: '-_id',
				q: 'status:' + status
			});
		}

		vm.getMaillot = function (team) {
			return "assets/images/teams_covers/" + vm.year + "/" + team + ".png"
		};


		init();

		function init() {
			vm.year = settings.currentSeason;
			getTeams('WT').then(function (teams) {
				vm.teams_WT = teams;
			});
			getTeams('PC').then(function (teams) {
				vm.teams_PCT = teams;
				$timeout(function () {
                    vm.showLoader = false;
                }, 1000);
			}).catch(function () {
				$timeout(function () {
                    vm.showLoader = false;
                }, 1000);
			});
		}
	}

	function teamsDataService($resource) {
		var factory = {};

		factory.teams = $resource('api/teams', {});

		factory.team = $resource('api/teams/:id', {}, {
			'update': {
				method: 'PUT'
			}
		});

		factory.gettingTeams = function (params) {
			return factory.teams.query(params).$promise;
		}

		return factory;
	}
})();
