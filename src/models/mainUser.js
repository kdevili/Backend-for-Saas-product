// models/user.js

const { DataTypes } = require('sequelize');
const Mainsequelize = require('../../config/postgresdb');

const mainUser = Mainsequelize.define('mainUser', {
    // Model attributes are defined here
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: true
    },
    userType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Mainsequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Mainsequelize.literal('CURRENT_TIMESTAMP')  
    }
}, {
    tableName: 'main_users',
    // Other model options go here
});

module.exports = mainUser;
