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

    function controller(UtilService, teamsDataService, ridersDataService, $state) {
        var vm = this;
        vm.rider = new ridersDataService.riders();
        vm.roles = UtilService.getRoles();
        teamsDataService.gettingTeams({
            limit: 100
        }).then(function (data) {
            vm.teams = data;
        });
        vm.showMessage = false;

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
            vm.rider.team = vm.riderTeam._id;
            vm.rider.safe_name_team = vm.riderTeam.safe_name;
            vm.rider.safe_name = UtilService.getSafeName(vm.rider._id);
            var rider = vm.rider.$save();
            console.log(rider);
            if (rider)
                vm.showMessage = true;
        }
    }
})();
