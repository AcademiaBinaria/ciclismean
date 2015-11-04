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

    function directive(UtilService) {
        return {
            templateUrl: UtilService.host + 'app/components/teams/riders/riders.html',
            controller: controller,
            controllerAs: "vm",
            bindToController: true
        }
    }

    function controller(ridersDataService) {
        var vm = this;
        vm.now = new Date().getTime();
        vm.year = new Date().getFullYear();
        var skip = 0;
        var limit = 12;
        vm.riders = [];


        vm.init = function () {
            ridersDataService.gettingRiders({
                    limit: limit,
                    skip: skip,
                    sort: '-_id'
                })
                .then(function (riders) {
                    riders.forEach(function (rider) {
                        rider.age = vm.now - new Date(rider.dob);
                        rider.age = Math.floor(rider.age / 31536000000);
                        vm.riders.push(rider);
                    });
                    skip += limit;
                });
        };

        vm.init();

    }

    function ridersDataService($resource) {
        var factory = {};
        factory.riders = $resource('api/riders', {});
        factory.rider = $resource('api/riders/:id', {
            id: '@_id'
        }, {
            'update': {
                method: 'PUT'
            }
        });
        var riderskeywords = $resource('api/riders/keywords/:keywords');

        factory.gettingRiders = function (params) {
            return factory.riders.query(params).$promise;
        }

        factory.gettingRidersBykeywords = function (params) {
            return riderskeywords.query(params).$promise;
        }

        return factory;
    }
})();
