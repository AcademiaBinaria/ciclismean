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

    function controller(ridersDataService) {
        var vm = this;
        init();

        function init() {
        vm.year = new Date().getFullYear();
        vm.riderId.age = ridersDataService.calculateAge(vm.riderId.dob);
        vm.riderId.dob = new Date(vm.riderId.dob);
        }
    }
})();
