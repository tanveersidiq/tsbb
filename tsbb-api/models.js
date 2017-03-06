'use strict';

var fs = require('fs'),
    path = require('path'),
    mongoose = require('mongoose'),
    db = {};
var basename = path.basename(module.filename);


//Load all the models
fs
    .readdirSync(__dirname + '/models')
    .filter(function (file) {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(function (file) {
     
        var model = mongoose['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

module.exports = db;