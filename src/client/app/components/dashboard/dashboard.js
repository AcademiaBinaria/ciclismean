"use strict";
(function () {
    angular
        .module('dashboard', ['ui.router'])
        .config(config)
        .directive('dashboard', directive)

    function config($stateProvider) {
        $stateProvider
            .state('dashboard', {
                url: '/',
                template: '<dashboard></dashboard>'
            });
    }

    function directive() {
        return {
            templateUrl: 'app/components/dashboard/dashboard.html',
            controller: controller,
            controllerAs: "vm",
            bindToController: true
        }
    }

    function controller() {
        var vm = this;
        vm.title = "the dashboard controller";
    }
})();