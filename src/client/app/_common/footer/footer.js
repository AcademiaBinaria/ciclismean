"use strict";
(function () {
    angular
        .module('footer', [])
        .directive('footerbar', directive)

    function directive(UtilService) {
        return {
            templateUrl: UtilService.host + 'app/_common/footer/footer.html',
            controller: controller,
            controllerAs: "vm",
            bindToController: true
        }
    }

    function controller() {
        var vm = this;
    }
})();
