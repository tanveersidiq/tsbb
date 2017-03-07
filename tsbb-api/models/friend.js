'use strict';
module.exports = function (sequelize, DataTypes) {
    var Friend = sequelize
        .define('Friends', {
            Id: {
                field: 'Id',
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            User: {
                field: 'User',
                allowNull: false,
                type: DataTypes.INTEGER
            },
            UserFriend: {
                field: 'UserFriend',
                allowNull: false,
                type: DataTypes.INTEGER
            },
            Accepted: {
                field: 'Accepted',
                allowNull: false,
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
        }, {
            timestamps: false
        });
    return Friend;
};