"use strict";
(function () {
    angular
        .module('footer', [])
        .directive('footerbar', directive)

    function directive() {
        return {
            templateUrl: 'app/_common/footer/footer.html',
            controller: controller,
            controllerAs: "vm",
            bindToController: true
        }
    }

    function controller() {
        var vm = this;
    }
})();