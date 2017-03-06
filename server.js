var express = require('express'),
    mongoose = require('mongoose'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    routes = require('./api/routes.js');

var app = express();
var port = process.env.PORT || 3030,
    dbUrl = process.env.DB_URL || 'localhost/tsbb';


app.use(express.static(__dirname + '/tsbb-web'));
// app.use(cookieParser); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({ // get information from html forms
    extended: true
}));

// required for passport
// app.use(express.session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
// app.use(passport.initialize());
// app.use(passport.session()); // persistent login sessions
// app.use(flash()); // use connect-flash for flash messages stored in session

routes(app, express, '/tsbb-api');

app.listen(port, function () {
    console.log('Running on port: ' + port);
    mongoose.connect(dbUrl);
});