'use strict';
app.factory('accountService', [
    '$http',
    '$q',
    '$location',
    'tsBBSettings',
    function ($http, $q, $location, tsBBSettings) {

        var serviceBase = tsBBSettings.apiBaseUri;
        var accountServiceFactory = {};
      
        var _authentication = {
            token: '',
            authenticated: false,
            userName: '',
            roles: ['administrator']
        };

        var _login = function (user) {
            var userData = {
                email: user.email,
                password: user.password
            };

            var deferred = $q.defer();

            $http
                .post(serviceBase + 'account/login', userData)
                .then(function (response) {
                    _authentication.token = response.data.token;
                    _authentication.authenticated = true;
                    _authentication.email = userData.email;

                    //localStorageService.set('authorizationData', _authentication);

                    deferred.resolve(response);
                })
                .catch(function (err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        };

        var _register = function (user) {
            var userData = {
                email: user.email,
                password: user.password
            };

            var deferred = $q.defer();

            $http
                .post(serviceBase + 'account/register', userData)
                .then(function (response) {
                    _authentication.token = response.data.token;
                    _authentication.authenticated = true;
                    _authentication.userName = loginData.email;

                    //localStorageService.set('authorizationData', _authentication);

                    deferred.resolve(response);
                })
                .catch(function (err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        };

        var _logOut = function () {

            //localStorageService.remove('authorizationData');

            _authentication.authenticated = false;
            _authentication.userName = "";
            _authentication.token = "";
            $location.path('/');
        };

        // var _fillAuthData = function () {

        //     var authData = localStorageService.get('authorizationData');
        //     if (authData) {
        //         _authentication.authenticated = true;
        //         _authentication.userName = authData.userName;
        //     }

        // };

        var _authorize = function (accountService) {
            if (accountService && accountService.authentication.authenticated === true)
                return true;
            throw new AuthorizationError("User not authenticated.");
        };

        // var _isAdmin = function () {

        //     if (_authentication.roles && _authentication.roles.length < 1) {
        //         var auth = localStorageService.get('authorizationData');
        //         _authentication.authenticated = auth.authenticated;
        //         _authentication.userName = auth.userName;
        //         _authentication.token = auth.token;
        //         _authentication.roles = auth.roles;
        //     }

        //     var adminRole = $.grep(_authentication.roles, function (role) {
        //         return role.toLowerCase() === 'administrator';
        //     });

        //     if (adminRole && adminRole.length > 0) {
        //         return true;
        //     } else {
        //         return false;
        //     }
        // };

        accountServiceFactory.login = _login;
        accountServiceFactory.register = _register;
        accountServiceFactory.logOut = _logOut;
        // authServiceFactory.fillAuthData = _fillAuthData;
        accountServiceFactory.authentication = _authentication;
        accountServiceFactory.authorize = _authorize;
        // authServiceFactory.isAdmin = _isAdmin;

        return accountServiceFactory;
    }
]);

// Custom error type
function AuthorizationError(description) {
    this.forbidden = "Forbidden";
    this.message = description || this.forbidden;
    this.description = description || this.message;
}

AuthorizationError.prototype = Object.create(Error.prototype);
AuthorizationError.prototype.constructor = AuthorizationError;