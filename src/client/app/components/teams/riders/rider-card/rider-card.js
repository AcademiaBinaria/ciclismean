"use strict";
(function () {
    angular
        .module('riderCard', [])
        .directive('riderCard', directive)

    function directive(UtilService) {
        return {
            templateUrl: UtilService.host + 'app/components/teams/riders/rider-card/rider-card.html',
            controller: controller,
            controllerAs: "vm",
            bindToController: true,
            scope: {
                riderId: "="
            }
        }
    }

    function controller(UtilService) {
        var vm = this;
        init();

        function init() {
            vm.year = new Date().getFullYear();
            vm.riderId.age = UtilService.calculateAge(vm.riderId.dob);
            vm.riderId.dob = new Date(vm.riderId.dob);
        }
    }
})();
