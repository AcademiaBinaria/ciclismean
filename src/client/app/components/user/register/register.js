"use strict";
(function () {
    angular
        .module('register', ['ui.router', 'formMessages'])
        .config(config)
        .directive('register', directive)

    function config($stateProvider) {
        $stateProvider
            .state('register', {
                url: '/register',
                template: '<register></register>'
            });
    }

    function directive() {
        return {
            templateUrl: 'app/components/user/register/register.html',
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