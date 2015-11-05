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

    function controller(teamsDataService, UtilService) {
        var vm = this;

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
            vm.year = new Date().getFullYear();
            getTeams('WT').then(function (teams) {
                vm.teams_WT = teams;
            });
            getTeams('PC').then(function (teams) {
                vm.teams_PCT = teams;
            })
        }
    }

    function teamsDataService($resource) {
        var factory = {};

        factory.teams = $resource('api/teams', {});

        factory.team = $resource('api/teams/:id', {
            id: '@_id'
        }, {
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
