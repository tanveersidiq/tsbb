'use strict';
app.factory('metricService',
    function ($http, $q, $location, tsBBAdminSettings) {

        var serviceBase = tsBBAdminSettings.apiBaseUri;

        var _cpuutilization = function (user) {

            var deferred = $q.defer();

            $http
                .get(serviceBase + 'metric/cpuutilization')
                .then(function (response) {
                    
                    deferred.resolve(response);
                })
                .catch(function (err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        };
        var metricServiceFactory = {};
        metricServiceFactory.cpuutilization = _cpuutilization;

        return metricServiceFactory;
    }
);