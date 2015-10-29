"use strict";
(function () {
    angular
        .module('addRider', ['ui.router', 'formMessages'])
        .config(config)
        .directive('addRider', directive)


    function config($stateProvider) {
        $stateProvider
            .state('add-rider', {
                url: '/forms/add-rider',
                template: '<add-rider></add-rider>'
            });
    }

    function directive() {
        return {
            templateUrl: 'app/components/user/forms/addRider.html',
            controller: controller,
            controllerAs: "vm",
            bindToController: true
        }
    }

    function controller(UtilService, teamsDataService, ridersDataService, $state, $rootScope, competitionDataService) {
        var vm = this;
        var limit = 100;
        vm.has_error = UtilService.has_error;

        init();

        function init() {
            vm.rider = new ridersDataService.riders();
            vm.roles = UtilService.getRoles();
            competitionDataService.gettingCompetitions({
                limit: limit
            }).then(function (data) {
                vm.competitions = data;
            });
            teamsDataService.gettingTeams({
                limit: limit
            }).then(function (data) {
                vm.teams = data;
            });
            vm.showMessage = false;
        }

        $rootScope.$watch(function () {
            return vm.team_rol
        }, function (newValue, oldValue) {
            if (newValue) {
                vm.rider.team_rol = newValue.role;
                vm.rider.rol_icon = newValue.rol_icon;
            }
        });

        $rootScope.$watch(function () {
            return vm.riderTeam
        }, function (newValue, oldValue) {
            if (newValue) {
                vm.rider.team = vm.riderTeam._id;
                vm.rider.safe_name_team = vm.riderTeam.safe_name;
            }
        });

        $rootScope.$watch(function () {
            return vm.rider._id;
        }, function (newValue, oldValue) {
            if (newValue) {
                vm.rider.safe_name = UtilService.getSafeName(vm.rider._id);
            }
        });

        vm.addYear = function () {
            if (!vm.rider.seasons)
                vm.rider.seasons = [];
            vm.rider.seasons.push({
                "year": 2015,
                "team": "",
                "palmares": []
            })
        };

        vm.addCompetition = function (palmares) {
            palmares.push({
                "competition": "",
                "position": "",
                "victories": 0
            })
        };

        vm.saveRider = function () {
            if (!vm.addRiderForm.$invalid) {
                var rider = vm.rider.$save();
                vm.showMessage = true;
            }
        }
    }
})();
