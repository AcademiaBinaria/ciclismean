"use strict";
(function () {
    angular
        .module("formMessages", ['ngMessages'])
        .directive("formMessages", directive)

    function directive() {
        return {
            templateUrl: "app/_common/form-messages/form-messages.html",
            scope: {
                field: "="
            }
        };
    }

})();