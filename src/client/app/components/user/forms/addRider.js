"use strict";
(function () {
    angular
        .module('addRider', ['ui.router', 'formMessages'])
        .config(config)
        .directive('addRider', directive)
        .factory('usersDataService', usersDataService)


    function config($stateProvider) {
        $stateProvider
            .state('add-rider', {
                url: '/forms/add-rider',
                template: '<add-rider></add-rider>'
            });
    }

    function directive() {
        return {
            templateUrl: 'app/components/user/forms/addRider.html',
            controller: controller,
            controllerAs: "vm",
            bindToController: true
        }
    }

    function controller(usersDataService, UtilService, $state) {
        var vm = this;

        vm.season = [];
        var roles = UtilService.getRoles();

        vm.fields = [
            {
                key: '_id',
                type: 'input',
                templateOptions: {
                    placeholder: 'Nombre y apellidos',
                    required: true,
                    type: 'text'
                }
            },
            {
                key: 'team',
                type: 'input',
                templateOptions: {
                    placeholder: 'Elige categoría',
                    required: true,
                    type: 'text'
                }
            }, {
                key: 'team_rol',
                type: 'select',
                templateOptions: {
                    placeholder: 'Rol de equipo',
                    required: true,
                    options: roles
                }
            }, {
                key: 'dob',
                type: 'input',
                templateOptions: {
                    label: 'Fecha de nacimiento',
                    required: true,
                    type: 'date'
                }
            }, {
                key: 'lob',
                type: 'input',
                templateOptions: {
                    placeholder: 'Lugar de nacimiento',
                    required: true,
                    type: 'text'
                }
            }, {
                key: 'country',
                type: 'input',
                templateOptions: {
                    placeholder: 'nacionalidad',
                    required: true,
                    type: 'text'
                }
            }, {
                key: 'dorsal_actual',
                type: 'input',
                templateOptions: {
                    placeholder: 'Dorsal en la competición actual (no obligatorio)',
                    required: false,
                    type: 'number'
                }
            }, {
                key: 'rol_icon',
                type: 'input',
                templateOptions: {
                    placeholder: 'Icono de rol',
                    required: true,
                    type: 'text'
                }
            }, {
                key: 'total_victories',
                type: 'input',
                templateOptions: {
                    placeholder: 'Victorias totales',
                    required: true,
                    type: 'number'
                }
            }
            , {
                key: 'giroBestResult',
                type: 'input',
                templateOptions: {
                    placeholder: 'Mejor resultado en el Giro',
                    required: true,
                    type: 'text'
                }
            }, {
                key: 'giroYearBestResult',
                type: 'input',
                templateOptions: {
                    placeholder: 'Año mejor resultado en el Giro',
                    required: true,
                    type: 'text'
                }
            }, {
                key: 'giroTotalVictories',
                type: 'input',
                templateOptions: {
                    placeholder: 'Victorias totales en el Giro',
                    required: true,
                    type: 'text'
                }
            }, {
                key: 'tourBestResult',
                type: 'input',
                templateOptions: {
                    placeholder: 'Mejor resultado en el Tour',
                    required: true,
                    type: 'text'
                }
            }, {
                key: 'tourYearBestResult',
                type: 'input',
                templateOptions: {
                    placeholder: 'Año mejor resultado en el Tour',
                    required: true,
                    type: 'text'
                }
            }, {
                key: 'tourTotalVictories',
                type: 'input',
                templateOptions: {
                    placeholder: 'Victorias totales en el Tour',
                    required: true,
                    type: 'text'
                }
            }, {
                key: 'vueltaBestResult',
                type: 'input',
                templateOptions: {
                    placeholder: 'Mejor resultado en el Vuelta',
                    required: true,
                    type: 'text'
                }
            }, {
                key: 'vueltaYearBestResult',
                type: 'input',
                templateOptions: {
                    placeholder: 'Año mejor resultado en el Vuelta',
                    required: true,
                    type: 'text'
                }
            }, {
                key: 'vueltaTotalVictories',
                type: 'input',
                templateOptions: {
                    placeholder: 'Victorias totales en el Vuelta',
                    required: true,
                    type: 'text'
                }
            }
        ]

    }
})();
