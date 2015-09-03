"use strict";
(function () {
    angular
        .module('competitions', ['ui.router'])
        .config(config)
        .directive('competitions', directive)
        .factory('competitionDataService', competitionDataService)

    function config($stateProvider) {
        $stateProvider
            .state('competitions', {
                url: '/competitions/:name',
                template: '<competitions></competitions>'
            });
    }

    function directive() {
        return {
            templateUrl: 'app/components/competitions/competitions.html',
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