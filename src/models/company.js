// models/Company.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/postgresdb');

const Company = sequelize.define('Company', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  host: {
    type: DataTypes.STRING,
    allowNull: true
  },
  dbName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  port: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  randomCode: {
    type: DataTypes.STRING,
    allowNull: false
  }
  // Add other customer details as needed
},
 {
    tableName: 'companies',
    // Other model options go here
});

module.exports = Company;
