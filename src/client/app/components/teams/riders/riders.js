"use strict";
(function () {
    angular
        .module('riders', ['ui.router', 'ngResource'])
        .config(config)
        .directive('riders', directive)
        .factory('ridersDataService', ridersDataService)

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

    function controller(ridersDataService) {
        var vm = this;

        init();

        function init() {
            ridersDataService.gettingRiders({
                    limit: 100,
                    skip: 1,
                    sort: '-_id'
                })
                .then(function (riders) {
                    vm.riders = riders;
                })
        }

    }

    function ridersDataService($resource) {
        var factory = {};

        var riders = $resource('api/riders', {});

        factory.gettingRiders = function (params) {
            return riders.query(params).$promise;
        }

        return factory;
    }
})();