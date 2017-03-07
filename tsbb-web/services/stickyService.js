'use strict';
app.factory('stickyService',
    function ($http, $q, tsBBSettings) {
        var serviceBase = tsBBSettings.apiBaseUri;

        var _createStickNote = function (stickNote) {

            var deferred = $q.defer();

            $http
                .post(serviceBase + 'sticky', stickNote)
                .then(function (response) {
                    deferred.resolve(response);
                })
                .catch(function (err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        };

        var _updateStickNotePosition = function (stickNote) {

            var deferred = $q.defer();

            $http
                .put(serviceBase + 'sticky', stickNote)
                .then(function (response) {
                    deferred.resolve(response);
                })
                .catch(function (err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        };

        var _deleteStickNote = function (stickNote) {

            var deferred = $q.defer();
          
            var config = {
                params: {
                    'Id': stickNote.Id
                }
            };

            $http
                .delete(serviceBase + 'sticky', config)
                .then(function (response) {
                    deferred.resolve(response);
                })
                .catch(function (err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        };

        var stickServiceFactory = {};
        stickServiceFactory.createStickNote = _createStickNote;
        stickServiceFactory.updateStickNotePosition = _updateStickNotePosition;
        stickServiceFactory.deleteStickNote = _deleteStickNote;

        return stickServiceFactory;
    }
);