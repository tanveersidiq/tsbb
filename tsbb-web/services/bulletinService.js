'use strict';
app.factory('bulletinService',
    function ($http, $q, tsBBSettings) {
        var serviceBase = tsBBSettings.apiBaseUri;

        var _bulletins = function (user) {

            var deferred = $q.defer();

            $http
                .get(serviceBase + 'bulletin')
                .then(function (response) {
                    deferred.resolve(response);
                })
                .catch(function (err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        };

        var _createBulletin = function (bulletin) {

            var bulletinData = {
                title: bulletin.name
            };

            var deferred = $q.defer();

            $http
                .post(serviceBase + 'bulletin', bulletinData)
                .then(function (response) {
                    deferred.resolve(response);
                })
                .catch(function (err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        };

        var _createStickNote = function (stickNote) {

            var deferred = $q.defer();

            $http
                .post(serviceBase + 'bulletin/sticky', stickNote)
                .then(function (response) {
                    deferred.resolve(response);
                })
                .catch(function (err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        };

        var bulletinServiceFactory = {};
        bulletinServiceFactory.createBulletin = _createBulletin;
        bulletinServiceFactory.createStickNote = _createStickNote;
        bulletinServiceFactory.bulletins = _bulletins;

        return bulletinServiceFactory;
    }
);