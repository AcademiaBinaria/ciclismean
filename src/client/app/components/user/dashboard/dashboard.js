"use strict";
(function () {
    angular
        .module('dashboard', ['ui.router', 'formMessages'])
        .config(config)
        .directive('dashboard', directive)

    function config($stateProvider) {
        $stateProvider
            .state('dashboard', {
                url: '/dashboard',
                template: '<dashboard></dashboard>'
            });
    }

    function directive() {
        return {
            templateUrl: 'app/components/user/dashboard/dashboard.html',
            controller: controller,
            controllerAs: "vm",
            bindToController: true
        }
    }

    function controller(usersDataService, UtilService, $state, ridersDataService) {
        var vm = this;
        if (!UtilService.isLogged())
            $state.go('login');

        vm.findRiders = function () { //Más bonito pls
            ridersDataService.gettingRidersBykeywords({
                keywords: vm.keywords
            }).then(function (riders) {
                vm.riders = riders;
            });
        };

        vm.isSubmit = function (keypressed) {
            if (keypressed === 13) {
                vm.findRiders();
            }
        }

        vm.removeRider = function (index) {
            vm.rider = new ridersDataService.rider();
            vm.rider._id = vm.riders[index]._id;
            vm.rider.$delete().then(function () {
                vm.message = "Borrado ciclista: ";
                vm.showMessage = true;
                vm.findRiders();
            });
        }
    }
})();
