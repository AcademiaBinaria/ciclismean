"use strict";
(function () {
    angular
        .module('teamForm', ['ui.router', 'formMessages'])
        .config(config)
        .directive('teamForm', directive)


    function config($stateProvider) {
        $stateProvider
            .state('edit-team', {
                url: '/forms/teams',
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

    function controller(UtilService, teamsDataService, ridersDataService, $state, $rootScope, $stateParams) {
        var vm = this;
        var limit = 100;
        vm.has_error = UtilService.has_error;
        vm.showForm = false;
        vm.team_id = "";
        vm.showMessage = false;
        if (!UtilService.isLogged())
            $state.go('login');

        init();

        function init() {
            teamsDataService.gettingTeams({
                limit: limit
            }).then(function (data) {
                vm.teams = data;
            });

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
            vm.team = new teamsDataService.teams();
            if (!vm.addTeamForm.$invalid) {
                vm.showForm = true;
                vm.add = true;
            }
        };

        vm.editForm = function (index) {
            if (!vm.addTeamForm.$invalid) {
                vm.showForm = true;
                vm.add = false;
                vm.team = new teamsDataService.team();
                for (var propertyName in vm.teams[index]) {
                    vm.team[propertyName] = vm.teams[index][propertyName];
                }

            }
        };

        vm.saveTeam = function () {
            if (!vm.addTeamForm.$invalid) {
                vm.team_id = vm.team._id;
                if (vm.add) {
                    vm.team.$save();
                    vm.teams.push(vm.team);
                    vm.message = "Añadido equipo: ";
                }
                vm.showMessage = true;
                vm.showForm = false;
            }
        }

        vm.editTeam = function () {
            if (!vm.addTeamForm.$invalid) {
                vm.team_id = vm.team._id;
                if (!vm.add) {
                    vm.team.$update();
                    vm.message = "Editado equipo: ";
                    init();
                }
                vm.showMessage = true;
                vm.showForm = false;
            }
        }

        vm.removeTeam = function (index) {
            vm.team = new teamsDataService.team();
            vm.team._id = vm.teams[index]._id;
            vm.team.$delete().then(function () {
                vm.message = "Borrado equipo: ";
                vm.showMessage = true;
                init();
            });
        }

    }
})();
