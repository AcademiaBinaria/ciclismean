"use strict";
(function () {
    angular
        .module('teamForm', ['ui.router', 'formMessages'])
        .config(config)
        .directive('teamForm', directive)


    function config($stateProvider) {
        $stateProvider
            .state('edit-team', {
                url: '/forms/edit-team',
                template: '<team-form></team-form>'
            });
    }

    function directive() {
        return {
            templateUrl: 'app/components/user/forms/teamForm.html',
            controller: controller,
            controllerAs: "vm",
            bindToController: true
        }
    }

    function controller(UtilService, teamsDataService, ridersDataService, $state, $rootScope, competitionDataService, $stateParams) {
        var vm = this;
        var limit = 100;
        vm.has_error = UtilService.has_error;
        vm.showForm = false;

        init();

        function init() {
            teamsDataService.gettingTeams({
                limit: limit
            }).then(function (data) {
                vm.teams = data;
                vm.team = new teamsDataService.teams();
            });
            vm.showMessage = false;

        }

        $rootScope.$watch(function () {
            return vm.team._id;
        }, function (newValue, oldValue) {
            if (newValue) {
                vm.team.safe_name = UtilService.getTeamSafeName(vm.team._id);
            } else {
                vm.team.safe_name = "";
            }
        });

        vm.addForm = function () {
            if (!vm.addTeamForm.$invalid) {
                vm.showForm = true;
                vm.add = true;
            }
        };

        vm.editForm = function (index) {
            if (!vm.addTeamForm.$invalid) {
                vm.showForm = true;
                vm.add = false;
                for (var propertyName in vm.teams[index]) {
                    vm.team[propertyName] = vm.teams[index][propertyName];
                }
            }
        };

        vm.saveTeam = function () {
            if (!vm.addTeamForm.$invalid) {
                console.log(vm.team);
                if (vm.add) {
                    vm.team.$save();
                    vm.teams.push(vm.team);
                    vm.message = "Añadido equipo: ";
                }
                /*else{vm.message = "Editado equipo: ";
                                    vm.team
                                }*/
                vm.showMessage = true;
                vm.showForm = false;
            }
        }
    }
})();
