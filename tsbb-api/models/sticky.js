'use strict';
module.exports = function (sequelize, DataTypes) {
    var Sticky = sequelize
        .define('Stickies', {
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
            Content: {
                field: 'Content',
                allowNull: false,
                type: DataTypes.STRING
            },
            Left: {
                field: 'Left',
                allowNull: false,
                type: DataTypes.INTEGER
            },
            Top: {
                field: 'Top',
                allowNull: false,
                type: DataTypes.INTEGER
            },
            Bulletin: {
                field: 'Bulletin',
                allowNull: false,
                type: DataTypes.INTEGER
            }
        }, {
            timestamps: false
        });
    return Sticky;
};