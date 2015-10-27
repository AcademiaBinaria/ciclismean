"use strict";
(function () {
    angular
        .module('dashboard', ['ui.router', 'formMessages'])
        .config(config)
        .directive('dashboard', directive)

    function usersDataService($resource) {
        var factory = {};

        factory.login = $resource('api/users/session');


        return factory; //esechinako@gmail.com
    }

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

    function controller(usersDataService, UtilService) {
        var vm = this;


    }
})();
