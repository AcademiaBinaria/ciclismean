"use strict";

angular
    .module('template', ['ui.router', 'main', 'navbar', 'footer', 'dashboard', 'user', 'teams', 'competition'])
    .constant('settings', {
        urlBase: 'http://localhost:3030'
    });