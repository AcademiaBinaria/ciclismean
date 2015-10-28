"use strict";

angular
    .module('template', ['ui.router', 'ui.bootstrap', 'ngStorage', 'main', 'navbar', 'footer', 'user', 'teams', 'competitions', 'util', 'dashboard', 'addRider'])
    .constant('settings', {
        urlBase: 'http://localhost:3030'
    });
