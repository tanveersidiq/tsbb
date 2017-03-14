'use strict';
app.factory('shareService',
    function ($http, $q, tsBBSettings) {
        var serviceBase = tsBBSettings.apiBaseUri;

        var _share = function (bulletinShare) {

            var bulletinShareData = {
                bulletinShare: bulletinShare
            };

            var deferred = $q.defer();

            $http
                .post(serviceBase + 'share', bulletinShareData)
                .then(function (response) {
                    deferred.resolve(response);
                })
                .catch(function (err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        };

        var _sharedBulletins = function () {

           var deferred = $q.defer();

            $http
                .get(serviceBase + 'share')
                .then(function (response) {
                    deferred.resolve(response);
                })
                .catch(function (err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        };

        var shareServiceFactory = {};
        shareServiceFactory.share = _share;
        shareServiceFactory.sharedBulletins = _sharedBulletins;
        return shareServiceFactory;
    }
);