"use strict";
(function () {
    angular
        .module('login', ['ui.router', 'formMessages'])
        .config(config)
        .directive('login', directive)

    function config($stateProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                template: '<login></login>'
            });
    }

    function directive() {
        return {
            templateUrl: 'app/components/user/login/login.html',
            controller: controller,
            controllerAs: "vm",
            bindToController: true
        }
    }

    function controller() {
        var vm = this;

        vm.has_error = function (form, field) {
            return (form.$submitted || field.$touched) && field.$invalid;
        }

        vm.submit = function (form) {
            form.$submitted = true;
            if (form.$valid) {
                console.log("do something");
            }
        }
    }
})();