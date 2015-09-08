"use strict";
(function () {
    angular
        .module('teams', ['ui.router', 'riders', 'team', 'rider'])
        .config(config)
        .directive('teams', directive)
        .factory('teamsDataService', teamsDataService)

    function config($stateProvider) {
        $stateProvider
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

    function controller(teamsDataService) {
        var vm = this;

        function getTeams(status) {
            return teamsDataService.gettingTeams({
                limit: 100,
                sort: '-_id',
                q: 'status:' + status
            });
        }

        init();

        function init() {
            vm.year = new Date().getFullYear();
            getTeams('WT').then(function (teams) {
                vm.teams_WT = teams;
            });
            getTeams('PCT').then(function (teams) {
                vm.teams_PCT = teams;
            })
        }
    }

    function teamsDataService($resource) {
        var factory = {};

        var teams = $resource('api/teams', {});

        factory.gettingTeams = function (params) {
            return teams.query(params).$promise;
        }

        return factory;
    }
})();