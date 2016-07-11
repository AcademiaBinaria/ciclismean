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

    function controller(ridersDataService, $timeout) {
        var vm = this;
        vm.showLoader = true;
        vm.now = new Date().getTime();
        vm.year = new Date().getFullYear();
        var skip = 0;
        var limit = 12;
        vm.riders = [];
        vm.keywords;
        vm.order = "total_victories";
        vm.showMore = true;
        vm.searchByKeywords = false;


        vm.init = function () {
            vm.searchByKeywords = false;
            ridersDataService.gettingRiders({
                limit: limit,
                skip: skip,
                sort: vm.order,
                q: 'retired:false'
            })
                .then(function (riders) {
                    fillRidersArray(riders)
                });
        };

        vm.init();

        vm.findBykeywords = function () {
            vm.searchByKeywords = true;
            ridersDataService.gettingRidersBykeywords({
                keywords: vm.keywords,
                limit: limit,
                skip: skip,
                q: 'retired: false'
            }).then(function (riders) {
                fillRidersArray(riders)
            });
        }

        vm.isSubmit = function (keypressed) {
            if (keypressed === 13) {
                skip = 0;
                vm.findBykeywords();
                vm.riders = [];
            }
        };

        vm.orderBy = function (param) {
            vm.order = param;
            skip = 0;
            vm.riders = [];
            vm.init();
        }

        function fillRidersArray(riders) {
            $timeout(function () {
                vm.showLoader = false;
            }, 1000);
            if (riders.length < limit) {
                vm.showMore = false;
            } else {
                vm.showMore = true;
            }
            riders.forEach(function (rider) {
                vm.riders.push(rider);
            });
            skip += limit;
        }

    }

    function ridersDataService($resource) {
        var factory = {};
        factory.addSeason = $resource('api/riders/add-season/:newSeasonYear', {});
        factory.riders = $resource('api/riders', {});
        factory.ridersByDorsal = $resource('api/riders/dorsal', {});
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

        factory.gettingRidersByDorsal = function () {
            return factory.ridersByDorsal.query().$promise;
        }

        factory.gettingRidersBykeywords = function (params) {
            return riderskeywords.query(params).$promise;
        }

        return factory;
    }
})();
