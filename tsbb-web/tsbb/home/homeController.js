'use strict';

app.controller('homeController', [
    '$scope',
    'homeService',
    function ($scope, homeService) {

        $scope.initialize = function () {

            Morris.Bar(homeService.barChartData);
            Morris.Donut(homeService.donutChartData);
        };

    }]);



