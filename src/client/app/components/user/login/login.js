"use strict";
(function () {
    angular
        .module('login', ['ui.router', 'formMessages'])
        .config(config)
        .directive('login', directive)
        .factory('usersDataService', usersDataService)

    function usersDataService($resource, UtilService) {
        var factory = {};

        factory.login = $resource(UtilService.host + 'api/users/session');


        return factory;
    }

    function config($stateProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                template: '<login></login>'
            });
    }

    function directive(UtilService) {
        return {
            templateUrl: UtilService.host + 'app/components/user/login/login.html',
            controller: controller,
            controllerAs: "vm",
            bindToController: true
        }
    }

    function controller(usersDataService, UtilService, $state) {
        var vm = this;

        vm.has_error = function (form, field) {
            if (field.$error.invalidtoken)
                return true;
            return (form.$submitted || field.$touched) && field.$invalid;
        }

        vm.submit = function (form, field) {
            form.$submitted = true;
            if (form.$valid) {
                var login = new usersDataService.login();
                login.email = vm.form.email;
                login.password = vm.form.password;
                login.$save().then(function (data) {
                    UtilService.saveSession(vm.form.email, data.token);
                    $state.go('dashboard');
                }, function (err) {
                    form.token.$error.invalidtoken = true;
                });
            }
        }
    }
})();
