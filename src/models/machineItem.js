// models/MachineCategory.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/postgresdb');

const machineItem = sequelize.define('machineItem', {
  machineCategoryId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  serialNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
},
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')  
}
  // Add other customer details as needed
},
 {
    tableName: 'machine_items',
    // Other model options go here
});

module.exports = machineItem;
