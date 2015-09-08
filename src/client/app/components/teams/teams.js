"use strict";
(function () {
    angular
        .module('teams', ['ui.router', 'riders', 'team'])
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

    function controller(teamsDataService) {
        var vm = this;

        init();

        function init() {
            teamsDataService.gettingTeams({
                    limit: 100,
                    sort: 'status'
                })
                .then(function (teams) {
                    vm.teams = teams;
                });
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
