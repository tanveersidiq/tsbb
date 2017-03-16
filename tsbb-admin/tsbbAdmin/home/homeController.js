'use strict';
app.controller('homeController',
    function (
        $scope,
        metricService) {

        var _initialize = function () {
            getCPUUtilization();
        };
        var _cpuUtilizationRefresh = function () {
            getCPUUtilization();
        };
        $scope.initialize = _initialize;
        $scope.cpuUtilizationRefresh = _cpuUtilizationRefresh;

        function getCPUUtilization() {
            metricService
                .cpuutilization()
                .then(function (data) {
                    if (data && data.data) {
                        var d = JSON.parse(data.data);
                        if (d && d.data) {
                            var jsonData = JSON.parse(d.data);
                            var chartData = [];
                            for (var i = 0; i < jsonData.length; i++) {
                                chartData.push({
                                    y: jsonData[i].Timestamp,
                                    a: parseFloat(jsonData[i].Average.toFixed(3))
                                });
                            }
                            $('#cpuutilization').html("");
                            Morris.Line({
                                element: 'cpuutilization',
                                data: chartData,
                                xkey: 'y',
                                ykeys: ['a'],
                                labels: ['Average CPU'],
                                redraw: true
                            });
                        }
                    }
                })
                .catch(function (err) {
                    console.log(err);
                });

        }
    }
);