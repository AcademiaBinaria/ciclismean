"use strict";

angular
    .module('template', ['ui.router', 'ui.bootstrap', 'ngStorage', 'main', 'navbar', 'footer', 'user', 'teams', 'competitions', 'util', 'dashboard', 'riderForm', 'teamForm', 'competitionForm', 'riderSeason', 'addSeason', 'loader'])
    .constant('settings', {
        urlBase: 'http://ciclismania.es/',
        currentSeason: 2019
    })
    .config(function ($httpProvider, settings, $sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            "self",
            "http://ciclismania.es/**"
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