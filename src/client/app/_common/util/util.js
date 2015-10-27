"use strict";
(function () {
    angular
        .module('util', ['ui.router', 'ngStorage'])
        .service('UtilService', UtilService)

    function UtilService($localStorage) {

        this.saveSession = function (username, token) {
            $localStorage.username = username;
            $localStorage.xAccessToken = token;
        }

        this.calculateAge = function (birthday) {
            var dateOfBirth = new Date(birthday);
            var ageDifMs = Date.now() - dateOfBirth.getTime();
            var ageDate = new Date(ageDifMs);
            return (ageDate.getUTCFullYear() - 1970);
        };

    }
})();
