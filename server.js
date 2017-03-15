process.env.DATABASE_URL = process.env.DATABASE_URL ||
    'mysql://' + process.env.DB_USER + ':' +
    process.env.DB_PASSWORD + '@' +
    process.env.DB_HOST + '/' +
    process.env.DB_NAME;

process.env.JWT_SECRET = process.env.JWT_SECRET || "imlovingit";

var express = require('express'),
    bodyParser = require('body-parser'),
    routes = require('./tsbb-api/routes.js');

var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use('/libs', express.static(__dirname + '/libs'));
app.use(express.static(__dirname + '/tsbb-web'));
app.use('/admin' , express.static(__dirname + '/tsbb-admin'));

routes(app, express, '/tsbb-api');

var port = process.env.PORT || 80;

app.listen(port, function () {
    console.log('Running on port: ' + port);


    // Test Database Connection
    // models.sequelize
    //     .authenticate()
    //     .then(function () {
    //         console.log('Connection successful');
    //     })
    //     .catch(function (error) {
    //         console.log("Error creating connection:", error);
    //     });

});