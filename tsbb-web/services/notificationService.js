'use strict';
app.factory('notificationService', [
    'toastr',
    function (toastr) {

        var notificationServiceFactory = {};
        var _getErrorMessage = function (error) {
            return error && error.message ? error.message : error
        }
        notificationServiceFactory.displaySuccess = function (message) {
            toastr.remove();
            toastr.success(message);
        }

        notificationServiceFactory.displayError = function (error) {
            toastr.remove();

            if (Array.isArray(error)) {
                error.forEach(function (err) {
                    toastr.error(_getErrorMessage(err));
                });
            } else {
                toastr.error(_getErrorMessage(error));
            }
        }

        notificationServiceFactory.displayWarning = function (message) {
            toastr.remove();
            toastr.warning(message);
        }

        notificationServiceFactory.displayInfo = function (message) {
            toastr.remove();
            toastr.info(message);
        }

        return notificationServiceFactory;

    }
]);