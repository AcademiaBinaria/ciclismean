"use strict";
(function () {
    angular
        .module('dashboard', ['ui.router', 'formMessages'])
        .config(config)
        .directive('dashboard', directive)

    function usersDataService($resource) {
        var factory = {};

        factory.login = $resource('api/users/session');


        return factory;
    }

    function config($stateProvider) {
        $stateProvider
            .state('dashboard', {
                url: '/dashboard',
                template: '<dashboard></dashboard>'
            });
    }

    function directive(UtilService) {
        return {
            templateUrl: UtilService.host + 'app/components/user/dashboard/dashboard.html',
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
    }
})();
