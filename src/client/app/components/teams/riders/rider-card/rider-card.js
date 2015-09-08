"use strict";
(function () {
    angular
        .module('riderCard', [])
        .directive('riderCard', directive)

    function directive() {
        return {
            templateUrl: 'app/components/teams/riders/rider-card/rider-card.html',
            controller: controller,
            controllerAs: "vm",
            bindToController: true,
            scope: {
                riderId: "="
            }
        }
    }

    function controller() {
        var vm = this;
        vm.year = new Date().getFullYear();
        init();

        function init() {
            vm.year = new Date().getFullYear();
        }
    }
})();
