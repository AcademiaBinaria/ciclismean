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

    function controller(competitionDataService) {
        var vm = this;

        init();

        function init() {
            competitionDataService.gettingCompetitions({
                    limit: 10000,
                    sort: 'status'
                })
                .then(function (competitions) {
                    vm.competitions = competitions;
                });
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
