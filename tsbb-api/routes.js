var user = require('./models/user.js'),
    authorize = require('./middleware/authorize.js');

module.exports = function (app, express, routeStart) {

    app.use(routeStart, require('./routes/account.js')(express, user));
    //app.use(routeStart, authorize, require('../routes/companyRoutes')(models, express));

    app.use('/', function (req, res) {
        res.send('TSBB API is at http://' + req.headers.host + '/api');
    });
}