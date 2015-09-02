"use strict";
(function () {
    angular
        .module('main', ['ngAnimate'])
        .directive('mainContent', directive)

    function directive() {
        return {
            templateUrl: 'app/_common/main/main.html',
            controller: controller,
            controllerAs: "vm",
            bindToController: true
        }
    }

    function controller() {
        var vm = this;
    }
})();