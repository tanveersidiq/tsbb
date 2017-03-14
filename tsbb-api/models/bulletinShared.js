'use strict';
module.exports = function (sequelize, DataTypes) {
    var BulletinsShared = sequelize
        .define('BulletinShares', {
            Id: {
                field: 'Id',
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            Bulletin: {
                field: 'Bulletin',
                allowNull: false,
                type: DataTypes.INTEGER
            },
            User: {
                field: 'User',
                allowNull: false,
                type: DataTypes.INTEGER
            }
        }, {
            timestamps: false
        });
    return BulletinsShared;
};