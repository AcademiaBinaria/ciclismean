"use strict";
(function () {
    angular
        .module('teams', ['ui.router', 'riders'])
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

    function controller(teamsDataService, $rootScope) {
        var vm = this;

    }

    function teamsDataService($resource) {
        var factory = {};



        return factory;
    }
})();