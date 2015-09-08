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
        vm.now = new Date().getTime();
        vm.year = new Date().getFullYear();

        init();

        function init() {
            ridersDataService.gettingRiders({
                    limit: 100,
                    skip: 1,
                    sort: '-_id'
                })
                .then(function (riders) {
                    vm.riders = riders;
                    riders.forEach(function (element) {
                        element.age = vm.now - new Date(element.dob);
                        element.age = Math.floor(element.age / 31536000000);
                    }, this);
                });
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