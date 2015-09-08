"use strict";

angular
    .module('template', ['ui.router', 'main', 'navbar', 'footer', /*'dashboard',*/ 'user', 'teams', 'competitions'])
    .constant('settings', {
        urlBase: 'http://localhost:3030'
    });
