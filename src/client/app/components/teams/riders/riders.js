"use strict";
(function () {
    angular
        .module('riders', ['ui.router', 'ngResource'])
        .config(config)
        .directive('riders', directive)
        .factory('riderDataService', riderDataService)

    function config($stateProvider) {
        $stateProvider
            .state('riders', {
                url: '/riders',
                template: '<riders></riders>'
            });
    }

    function directive() {
        return {
            templateUrl: 'app/components/teams/riders/riders.html',
            controller: controller,
            controllerAs: "vm",
            bindToController: true
        }
    }

    function controller(riderDataService) {
        var vm = this;

        init();

        function init() {
            riderDataService.gettingRiders({
                    limit: 100,
                    skip: 1,
                    sort: '-_id'
                })
                .then(function (riders) {
                    vm.riders = riders;
                })
        }

    }

    function riderDataService($resource) {
        var factory = {};

        var riders = $resource('api/riders', {});

        factory.gettingRiders = function (params) {
            return riders.query(params).$promise;
        }

        return factory;
    }
})();