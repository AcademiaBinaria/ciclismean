"use strict";
(function () {
    angular
        .module('loader', [])
        .directive('loader', directive)

    function directive() {
        return {
            templateUrl: 'app/_common/loader/loader.html'
        }
    }
})();
