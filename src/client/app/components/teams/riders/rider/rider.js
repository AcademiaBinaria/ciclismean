"use strict";
(function () {
    angular
        .module('rider', ['ui.router'])
        .config(config)
        .directive('rider', directive)

    function config($stateProvider) {
        $stateProvider
            .state('rider', {
                url: 'equipo/:teamId/:year/:riderId',
                template: '<rider></rider>'
            });
    }

    function directive() {
        function controller() {
            var vm = this;
        }

        return {
            templateUrl: 'client/app/components/teams/riders/rider/rider.html',
            controller: controller,
            controllerAs: "vm",
            bindToController: true
        }
    }

    function controller() {
        var vm = this;
    }
})();