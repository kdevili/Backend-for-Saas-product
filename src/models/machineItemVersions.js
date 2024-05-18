// models/MachineCategory.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/postgresdb');

const MachineItemVersion = sequelize.define('MachineItemVersion', {
  machieItemId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  serialNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  versionName: {
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
    tableName: 'machine_item_versions',
    // Other model options go here
});

module.exports = MachineCategory;
