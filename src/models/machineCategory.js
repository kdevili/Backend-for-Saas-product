// models/MachineCategory.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/postgresdb');

const MachineCategory = sequelize.define('MachineCategory', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  manufacturingName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  typeOfMachine: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image: {
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
    tableName: 'machine_categories',
    // Other model options go here
});

module.exports = MachineCategory;
