"use strict";

angular
    .module('template', ['ui.router', 'ngStorage', 'main', 'navbar', 'footer', 'user', 'teams', 'competitions', 'util', 'dashboard'])
    .constant('settings', {
        urlBase: 'http://localhost:3030'
    });
