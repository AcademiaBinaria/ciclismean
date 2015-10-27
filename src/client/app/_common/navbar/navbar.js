"use strict";
(function () {
    angular
        .module('navbar', ['ui.router'])
        .directive('navbar', directive)

    function directive() {
        return {
            templateUrl: 'app/_common/navbar/navbar.html',
            controller: controller,
            controllerAs: "vm",
            bindToController: true
        }
    }

    function controller($state, UtilService, $scope) {
        var vm = this;
        //vm.user = UtilService.isLogged();
        this.isActive = function (state) {
            return $state.is(state);
        }

        vm.logout = function () {
            UtilService.removeSession();
        }

    }
})();
