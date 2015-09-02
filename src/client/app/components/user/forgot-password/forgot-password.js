"use strict";
(function () {
    angular
        .module('forgotPassword', ['ui.router', 'formMessages'])
        .config(config)
        .directive('forgotPassword', directive)

    function config($stateProvider) {
        $stateProvider
            .state('forgotPassword', {
                url: '/forgot-password',
                template: '<forgot-password></forgot-password>'
            });
    }

    function directive() {
        return {
            templateUrl: 'app/components/user/forgot-password/forgot-password.html',
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