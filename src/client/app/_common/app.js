"use strict";

angular
    .module('template', ['ui.router', 'ui.bootstrap', 'ngStorage', 'main', 'navbar', 'footer', 'user', 'teams', 'competitions', 'util', 'dashboard', 'riderForm', 'teamForm', 'competitionForm', 'riderSeason'])
    .constant('settings', {
        urlBase: 'http://localhost:3080/'
    })
    .config(function ($httpProvider, settings, $sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
                "self",
                "http://localhost:3080/**",
                "http://46.101.149.113/**"
            ]);
        $httpProvider.interceptors.push(function ($q) {
            return {
                'request': function (config) {
                    config.url = settings.urlBase + config.url;
                    //console.log(config || $q.when(config));
                    return config || $q.when(config);
                }
            }
        });
    });
