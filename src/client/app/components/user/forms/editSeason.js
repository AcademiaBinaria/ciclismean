"use strict";
(function () {
    angular
        .module('riderSeason', ['ui.router', 'formMessages'])
        .config(config)
        .directive('riderSeason', directive)


    function config($stateProvider) {
        $stateProvider
            .state('edit-rider-season', {
                url: '/forms/edit-rider-season/:safe_name',
                template: '<rider-season></rider-season>'
            });
    }

    function directive() {
        return {
            templateUrl: 'app/components/user/forms/editSeason.html',
            controller: controller,
            controllerAs: "vm",
            bindToController: true
        }
    }

    function controller(UtilService, teamsDataService, ridersDataService, $state, $rootScope, competitionDataService, $stateParams) {
        var vm = this;
        var limit = 10000;
        vm.has_error = UtilService.has_error;
        var year = new Date().getFullYear();

        init();

        function init() {
            if (!UtilService.isLogged())
                $state.go('login');
            teamsDataService.gettingTeams({
                limit: limit
            }).then(function (data) {
                vm.teams = data;
                vm.rider = new ridersDataService.rider();
                var url_safe_name = $stateParams.safe_name;
                ridersDataService.gettingRiders({
                    limit: 1,
                    q: 'safe_name:' + url_safe_name
                }).then(function (rider) {
                    competitionDataService.gettingCompetitions({
                        limit: limit
                    }).then(function (data) {
                        vm.competitions = data;
                    });
                    for (var propertyName in rider[0]) {
                        vm.rider[propertyName] = rider[0][propertyName];
                    }
                    vm.rider.seasons.forEach(function (season) {
                        if (season.year == year)
                            vm.currentSeason = season;
                    });
                });
            });
        }

        vm.addCompetition = function () {
            vm.currentSeason.palmares.push({
                competition: vm.competition,
                position: "-",
                victories: "0"
            });
        }

        vm.editRider = function () {
            if (!vm.editSeasonForm.$invalid) {
                vm.rider.seasons.forEach(function (season, index) {
                    if (season.year == year)
                        vm.rider.seasons[index] = vm.currentSeason;
                });
                vm.rider.$update({
                    _id: vm.riderId
                });
                $state.go("dashboard");
            }
        }

    }
})();
