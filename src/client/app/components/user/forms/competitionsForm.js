"use strict";
(function () {
    angular
        .module('competitionForm', ['ui.router', 'formMessages'])
        .config(config)
        .directive('competitionForm', directive)


    function config($stateProvider) {
        $stateProvider
            .state('edit-competitons', {
                url: '/forms/competitions',
                template: '<competition-form></competition-form>'
            });
    }

    function directive() {
        return {
            templateUrl: 'app/components/user/forms/competitionsForm.html',
            controller: controller,
            controllerAs: "vm",
            bindToController: true
        }
    }

    function controller(UtilService, $state, $rootScope, competitionDataService, $stateParams, $scope, $uibModal) {
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
            competitionDataService.gettingCompetitions({
                limit: limit
            }).then(function (data) {
                vm.competitions = data;
            });
        }


        vm.addForm = function () {
            vm.competition = new competitionDataService.competitions();
            vm.showForm = true;
            vm.add = true;
        };

        vm.editForm = function (index) {
            vm.competition = new competitionDataService.competition();
            for (var propertyName in vm.competitions[index]) {
                vm.competition[propertyName] = vm.competitions[index][propertyName];
            }
            vm.showForm = true;
            vm.add = false;
        };

        vm.saveCompetition = function () {
            if (!vm.addCompetitionForm.$invalid) {
                if (vm.add) {
                    vm.competition.$save();
                    vm.competitions.push(vm.competition);
                    vm.message = "Añadida competition: ";
                }
                vm.showMessage = true;
                vm.showForm = false;
            }
        }

        vm.editCompetition = function () {
            if (!vm.addCompetitionForm.$invalid) {
                if (!vm.add) {
                    vm.competition.$update();
                    vm.message = "Editada competición: ";
                    init();
                }
                vm.showMessage = true;
                vm.showForm = false;
            }
        }

        vm.removeCompetition = function (index) {
            vm.competition = new competitionDataService.competition();
            vm.competition._id = vm.competitions[index]._id;
            vm.competition.$delete().then(function () {
                vm.message = "Borrada competición: ";
                vm.showMessage = true;
                init();
            });
        }

    }
})();
