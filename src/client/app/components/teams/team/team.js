"use strict";
(function () {
    angular
        .module('team', ['ui.router', 'riders'])
        .config(config)
        .directive('team', directive)

    function config($stateProvider) {
        $stateProvider
            .state('team', {
                url: '/equipos/:id/:year',
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

    function controller(ridersDataService, $stateParams) {
        var vm = this;
        vm.team_id = $stateParams.id;

        init();

        function init() {
            ridersDataService.gettingRiders({
                limit: 50,
                q: 'safe_name_team:' + vm.team_id
            }).then(function (riders) {
                vm.riders = riders;
            });
        };
    }
})();
