"use strict";
(function () {
    angular
        .module('main', ['ngAnimate'])
        .directive('mainContent', directive)

    function directive(UtilService) {
        return {
            templateUrl: UtilService.host + 'app/_common/main/main.html',
            controller: controller,
            controllerAs: "vm",
            bindToController: true
        }
    }

    function controller() {
        var vm = this;
    }
})();
