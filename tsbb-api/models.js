'use strict';

var fs = require('fs'),
    path = require('path'),
    Sequelize = require('sequelize'),
    db = {};

var sequelize = new Sequelize(process.env.DATABASE_URL, {
    // disable logging; default: console.log
    // logging: function(data){
    //   console.log(data);
    // },
    logging: false,
    pool: {
        maxConnections: 5,
        maxIdleTime: 30
    }
});

//Load all the models
fs
    .readdirSync(__dirname + '/models')
    .filter(function (file) {
        return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js');
    })
    .forEach(function (file) {
        var model = sequelize['import'](path.join(__dirname + '/models', file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function (modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

// CREATING RELATIONSHIPS
db.Users.hasMany(db.Bulletins, {
    as: 'UserBulletins',
    foreignKey: 'User',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
db.Users.hasMany(db.Friends, {
    as: 'UserFriends',
    foreignKey: 'User',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
db.Users.hasMany(db.Friends, {
    as: 'Friends',
    foreignKey: 'UserFriend',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

db.Friends.belongsTo(db.Users, {as: 'FriendUser', foreignKey: 'UserFriend'});

db.Bulletins.hasMany(db.Stickies, {
    as: 'BulletinStickies',
    foreignKey: 'Bulletin',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
// db.FileReferences.hasMany(db.Jobs, {
//     as: 'Jobs',
//     foreignKey: 'FileReference',
//     onDelete: 'CASCADE',
//     onUpdate: 'CASCADE'
// });

// db.Jobs.belongsTo(db.Users, {
//     as: 'User',
//     foreignKey: 'User_ID_Notify'
// });

sequelize
    .sync()
    .then(function () {
        console.log('Model Synced to database!:'); // eslint-disable-line no-console

    }, function (err) {
        console.log('An error occurred while creating the table:', err); // eslint-disable-line no-console
    });
//Export the db Object
db.sequelize = sequelize;

module.exports = db;