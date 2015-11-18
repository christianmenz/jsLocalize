/* global angular */
(function () {
        'use strict';
        angular.module('jsLocalize').config(function ($stateProvider, $urlRouterProvider) {
                $urlRouterProvider.otherwise('/app');

                $stateProvider.state('app', {
                        url: '/app',
                        templateUrl: 'views/partial-app.html',
                        controller: 'AppCtrl as appCtrl'
                }).state('about', {
                        url: '/about',
                        templateUrl: 'views/partial-about.html'
                });
        });
})();
