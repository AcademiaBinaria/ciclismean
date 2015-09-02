(function () {
    function statesConfig($urlRouterProvider, $locationProvider) {

        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');

    }
    angular
        .module("template")
        .config(statesConfig);
})();