"use strict";
(function () {
    angular
        .module('util', ['ui.router', 'ngStorage'])
        .service('UtilService', UtilService)

    function UtilService($localStorage, $state) {
        var roles = ['Sprinter', 'Todoterreno', 'Escalador', 'Cazaetapas', 'Gregario', 'Líder de equipo', 'Contrarrelojista'];
        this.saveSession = function (username, token) {
            $localStorage.username = username;
            $localStorage.xAccessToken = token;
        }

        this.removeSession = function () {
            delete $localStorage['xAccessToken'];
            delete $localStorage['username'];
            $state.go('home');
        }

        this.getRoles = function () {
            return roles;
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

        this.getSession = function (username, token) {
            return $localStorage.username;
        }

        this.getSafeName = function (name) {
            return name.split(" ").join("_");
        }

        this.calculateAge = function (birthday) {
            var dateOfBirth = new Date(birthday);
            var ageDifMs = Date.now() - dateOfBirth.getTime();
            var ageDate = new Date(ageDifMs);
            return (ageDate.getUTCFullYear() - 1970);
        };

    }
})();
