"use strict";
(function () {
    angular
        .module('team', ['ui.router', 'riders'])
        .config(config)
        .directive('team', directive)

    function config($stateProvider) {
        $stateProvider
            .state('team', {
                url: '/equipos/:id/2017',
			//url: '/equipos/:id/:year',
                template: '<team></team>'
            });
    }

    function directive() {
        return {
            templateUrl: 'app/components/teams/team/team.html',
            controller: controller,
            controllerAs: "vm",
            bindToController: true
        }
    }

    function controller(ridersDataService, teamsDataService, $stateParams, $timeout) {
        var vm = this;
        vm.showLoader = true;
        vm.team_id = $stateParams.id;
        vm.team = new teamsDataService.team.query({
            q: 'safe_name:' + $stateParams.id
        });

        init();

        function init() {
            ridersDataService.gettingRiders({
                limit: 50,
                q: 'safe_name_team:' + vm.team_id
            }).then(function (riders) {
                $timeout(function () {
                    vm.showLoader = false;
                }, 1000);
                vm.riders = riders;
            });
        };
    }
})();
