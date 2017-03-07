var express = require('express'),
    bodyParser = require('body-parser'),
    routes = require('./tsbb-api/routes.js');

var app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());

app.use(express.static(__dirname + '/tsbb-web'));

routes(app, express, '/tsbb-api');

var port = process.env.PORT || 3030;

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
