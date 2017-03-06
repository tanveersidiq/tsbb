'use strict';
app.factory('homeService', [
    function () {
        var _barChartData = {
            element: 'morris-bar-chart',
            data: [{
                    y: 'Sep 16',
                    a: 60,
                    b: 50,
                    c: 15
                },
                {
                    y: 'Oct 16',
                    a: 40,
                    b: 30,
                    c: 17
                },
                {
                    y: 'Nov 16',
                    a: 75,
                    b: 65,
                    c: 20
                },
                {
                    y: 'Dec 16',
                    a: 45,
                    b: 20,
                    c: 10
                },
                {
                    y: 'Jan 17',
                    a: 55,
                    b: 45,
                    c: 25
                },

                {
                    y: 'Feb 17',
                    a: 45,
                    b: 60,
                    c: 35
                }
            ],
            xkey: 'y',
            ykeys: ['a', 'b', 'c'],
            labels: ['Series A', 'Series B', 'Series C'],
            hideHover: 'auto',
            resize: true
        };

        var _donutChartData = {
            element: 'morris-donut-chart',
            data: [
                {
                label: "Jobs",
                value: 0
            }
            //     {
            //     label: "Completed Jobs",
            //     value: 0
            // }, {
            //     label: "In Process Jobs",
            //     value: 0
            // }, {
            //     label: "Failed Jobs",
            //     value: 0
            // }
            ],
            resize: true
        };

        var homeServiceFactory = {};
        homeServiceFactory.barChartData = _barChartData;
        homeServiceFactory.donutChartData = _donutChartData;

        return homeServiceFactory;
    }
]);