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
                url: '/competitions',
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

    function controller(competitionDataService, ridersDataService) {
        var vm = this;
        vm.showLoader = true;

        init();

        function init() {
            ridersDataService.gettingRidersByDorsal().then(function (riders) {
                vm.showLoader = false;
                vm.riders = riders;
                vm.riders_bak = [];
                for (var i = 0; i < vm.riders.length; i++) {
                    vm.riders[i].dorsal_actual = parseInt(vm.riders[i].dorsal_actual);
                    vm.riders_bak[i] = angular.copy(vm.riders[i]);
                }
            });
            /* competitionDataService.gettingCompetitions({
                     limit: 10000,
                     sort: 'status'
                 })
                 .then(function (competitions) {
                     vm.competitions = competitions;
                 });*/
        }

        vm.changeFilter = function () {
            if (vm.dorsal_actual == "" || !vm.dorsal_actual) {
                vm.riders = angular.copy(vm.riders_bak);
                delete vm.dorsal_actual;
            }
        }

    }

    function competitionDataService($resource) {
        var factory = {};

        factory.competitions = $resource('api/competitions', {});
        factory.competition = $resource('api/competitions/:id', {
            id: '@_id'
        }, {
                'update': {
                    method: 'PUT'
                }
            });

        factory.gettingCompetitions = function (params) {
            return factory.competitions.query(params).$promise;
        }

        return factory;
    }

})();