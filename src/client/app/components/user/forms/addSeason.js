"use strict";
(function () {
    angular
        .module('addSeason', ['ui.router', 'formMessages'])
        .config(config)
        .directive('addSeason', directive)


    function config($stateProvider) {
        $stateProvider
            .state('add-season', {
                url: '/forms/addSeason',
                template: '<add-season></add-season>'
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
        var limit = 100;
        vm.has_error = UtilService.has_error;
        var year = new Date().getFullYear();

        init();

        function init() {
            if (!UtilService.isLogged())
                $state.go('login');
        }

        vm.addSeason = function () {
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
