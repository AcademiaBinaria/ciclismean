"use strict";
(function () {
    angular
        .module('util', ['ui.router', 'ngStorage'])
        .service('UtilService', UtilService)

    function UtilService($localStorage, $state) {

        this.saveSession = function (username, token) {
            $localStorage.username = username;
            $localStorage.xAccessToken = token;
        }

        this.removeSession = function () {
            delete $localStorage['xAccessToken'];
            delete $localStorage['username'];
            $state.go('home');
        }

        this.isLogged = function () {
            if ($localStorage.xAccessToken) {
                return {
                    username: $localStorage.username,
                    token: $localStorage.xAccessToken
                };
            } else {
                return undefined;
            }
        }

        this.calculateAge = function (birthday) {
            var dateOfBirth = new Date(birthday);
            var ageDifMs = Date.now() - dateOfBirth.getTime();
            var ageDate = new Date(ageDifMs);
            return (ageDate.getUTCFullYear() - 1970);
        };

    }
})();
