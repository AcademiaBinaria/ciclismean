"use strict";
(function () {
    angular
        .module('util', ['ui.router', 'ngStorage'])
        .service('UtilService', UtilService)

    function UtilService($localStorage, $state, settings) {
        var roles = [{
            role: 'Sprinter',
            rol_icon: "fa fa-flash"
        }, {
            role: 'Todoterreno',
            rol_icon: "ti-car"
        }, {
            role: 'Escalador',
            rol_icon: "help-font help-mountains"
        }, {
            role: 'Cazaetapas',
            rol_icon: "help-font help-arrow-streamline-target"
        }, {
            role: 'Gregario',
            rol_icon: "ti-settings"
        }, {
            role: 'Líder de equipo',
            rol_icon: "ti-crown"
        }, {
            role: 'Contrarrelojista',
            rol_icon: "ti-timer"
        }];
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
            return name.toLowerCase().split(" ").join("-");
        }

        this.getTeamSafeName = function (name) {
            return name.toLowerCase().split(" ").join("_");
        }

        this.calculateAge = function (birthday) {
            var dateOfBirth = new Date(birthday);
            var ageDifMs = Date.now() - dateOfBirth.getTime();
            var ageDate = new Date(ageDifMs);
            return (ageDate.getUTCFullYear() - 1970);
        };

        this.has_error = function (form, field) {
            return (form.$submitted || field.$touched) && field.$invalid;
        }

    }
})();
