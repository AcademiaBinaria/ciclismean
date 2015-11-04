"use strict";
(function () {
    angular
        .module('rider', ['ui.router'])
        .config(config)
        .directive('rider', directive)
        .factory('riderLogicService', riderLogicService);

    function config($stateProvider) {
        $stateProvider
            .state('rider', {
                url: '/equipos/:teamId/:year/:riderId',
                template: '<rider></rider>'
            });
    }

    function directive(UtilService) {
        return {
            templateUrl: UtilService.host + 'app/components/teams/riders/rider/rider.html',
            controller: controller,
            controllerAs: "vm",
            bindToController: true
        }
    }

    function controller($stateParams, ridersDataService, riderLogicService) {
        var vm = this;
        vm.riderId = $stateParams.riderId;

        init();

        function init() {
            ridersDataService.gettingRiders({
                limit: 1,
                q: 'safe_name:' + vm.riderId
            }).then(function (riders) {
                vm.rider = riders[0];
                vm.imageUrl = riderLogicService.getRiderImageUrl(vm.rider);
                vm.rider.age = riderLogicService.getRiderAge(vm.rider.dob);
                vm.rider.flag = riderLogicService.getRiderFlag(vm.rider.country);
            });
        }
    }

    function riderLogicService() {
        var factory = {};

        factory.getRiderFlag = function (country) {
            return "assets/images/flags/" + country + ".png";
        }

        factory.getRiderAge = function (dob) {
            var dateOfBirth = new Date(dob);
            var ageDifMs = Date.now() - dateOfBirth.getTime();
            var ageDate = new Date(ageDifMs);
            return (ageDate.getUTCFullYear() - 1970);
        }

        factory.getRiderImageUrl = function (rider) {
            var year = new Date().getFullYear();
            var team = rider.safe_name_team;
            var rider = rider.safe_name;
            return "assets/images/riders_img/" + year + "/" + team + "/" + rider + ".jpg";
        }

        return factory;
    }


})();
