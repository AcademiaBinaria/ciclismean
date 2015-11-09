"use strict";

angular
    .module('template', ['ui.router', 'ui.bootstrap', 'ngStorage', 'main', 'navbar', 'footer', 'user', 'teams', 'competitions', 'util', 'dashboard', 'riderForm', 'teamForm'])
    .constant('settings', {
        urlBase: 'http://localhost:3080/'
    })
    /*
        .config(function ($sceDelegateProvider) {
            $sceDelegateProvider.resourceUrlWhitelist([
                "self",
                "http://localhost:3000/**",
                "http://46.101.149.113/**"
            ]);
        })*/
    .config(function ($httpProvider, settings, $sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            "self",
            "http://localhost:3080/**",
            "http://46.101.149.113/**"
        ]);
    });
