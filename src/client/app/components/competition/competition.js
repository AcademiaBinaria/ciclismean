"use strict";
(function () {
    angular
        .module('competition', ['ui.router'])
        .config(config)
        .directive('competition', directive)
        .factory('competitionDataService', competitionDataService)

    function config($stateProvider) {
        $stateProvider
            .state('competition', {
                url: '/competition/:name',
                template: '<competition></competition>'
            });
    }

    function directive() {
        return {
            templateUrl: 'app/components/competition/competition.html',
            controller: controller,
            controllerAs: "vm",
            bindToController: true
        }
    }

    function controller() {
        var vm = this;

    }

    function competitionDataService($resource) {
        var factory = {};

        return factory;
    }


})();