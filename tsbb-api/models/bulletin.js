'use strict';
module.exports = function (sequelize, DataTypes) {
    var Bulletin = sequelize
        .define('Bulletins', {
            Id: {
                field: 'Id',
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            Title: {
                field: 'Title',
                allowNull: false,
                type: DataTypes.STRING
            },
            User: {
                field: 'User',
                allowNull: false,
                type: DataTypes.INTEGER
            }
        }, {
            timestamps: false
        });
    return Bulletin;
};