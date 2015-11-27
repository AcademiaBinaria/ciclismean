"use strict";
(function () {
	angular
		.module('navbar', ['ui.router'])
		.directive('navbar', directive)

	function directive() {
		return {
			templateUrl: 'app/_common/navbar/navbar.html',
			controller: controller,
			controllerAs: "vm",
			bindToController: true
		}
	}

	function controller($state, UtilService, $rootScope) {
		var vm = this;
		vm.username = UtilService.getSession();

		this.isActive = function (state) {
			return $state.is(state);
		}

		vm.logout = function () {
			UtilService.removeSession();
		}

		$rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
			vm.username = UtilService.getSession();
			console.log(vm.username);
		});

		$rootScope.$on('$locationChangeStart', function (event, toState, toParams, fromState, fromParams) {
			vm.username = UtilService.getSession();
			console.log(vm.username);
		});
	}
})();
