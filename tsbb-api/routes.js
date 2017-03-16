var models = require('./models.js'),
    authorize = require('./middleware/authorize.js');

module.exports = function (app, express, routeStart) {

    app.use(routeStart, require('./routes/account')(express, models));
    app.use(routeStart, require('./routes/metric')(express, models));
    app.use(routeStart, authorize, require('./routes/bulletin')(express, models));
    app.use(routeStart, authorize, require('./routes/sticky')(express, models));
    app.use(routeStart, authorize, require('./routes/friend')(express, models));
    app.use(routeStart, authorize, require('./routes/share')(express, models));

    app.use('/', function (req, res) {
        res.send('TSBB API is at http://' + req.headers.host + '/tsbb-api');
    });
}