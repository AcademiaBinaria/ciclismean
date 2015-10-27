"use strict";
(function () {
    angular
        .module('util', ['ui.router', 'ngStorage'])
        .service('UtilService', UtilService)

    function UtilService($localStorage, $state, $rootScope) {
        var roles = ['Sprinter', 'Todoterreno', 'Escalador', 'Cazaetapas', 'Gregario', 'Líder de equipo', 'Contrarrelojista'];

        this.saveSession = function (username, token) {
            $localStorage.username = username;
            $localStorage.xAccessToken = token;
        }

        this.removeSession = function () {
            $rootScope.username = undefined;
            delete $localStorage['xAccessToken'];
            delete $localStorage['username'];
            $state.go('home');
        }

        this.getRoles = function () {
            return roles;
        }

        this.isLogged = function () {
            if ($localStorage.xAccessToken) {
                $rootScope.username = $localStorage.username;
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
