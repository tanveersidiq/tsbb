'use strict';
module.exports = function (sequelize, DataTypes) {
    var User = sequelize
        .define('Users', {
            Id: {
                field: 'Id',
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            Email: {
                field: 'Email',
                allowNull: false,
                type: DataTypes.STRING
            },
            Password: {
                field: 'Password',
                allowNull: false,
                type: DataTypes.STRING
            }
        }, {
            timestamps: false
        });
    return User;
};