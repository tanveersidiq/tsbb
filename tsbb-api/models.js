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
db.Bulletins.hasMany(db.BulletinShares, {
    as: 'BulletinShares',
    foreignKey: 'Bulletin',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
db.Friends.hasMany(db.BulletinShares, {
    as: 'BulletinShareFriend',
    foreignKey: 'User',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

db.Bulletins.hasMany(db.Stickies, {
    as: 'BulletinStickies',
    foreignKey: 'Bulletin',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

db.Friends.belongsTo(db.Users, {as: 'FriendUser', foreignKey: 'UserFriend'});
db.Friends.belongsTo(db.Users, {as: 'FriendUser2', foreignKey: 'User'});
db.BulletinShares.belongsTo(db.Bulletins, {as: 'BulletinShare', foreignKey: 'Bulletin'});
db.BulletinShares.belongsTo(db.Friends, {as: 'FriendShared', foreignKey: 'User'});

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