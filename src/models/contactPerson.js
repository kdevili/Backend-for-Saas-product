// models/contactPerson.js

const { DataTypes } = require('sequelize');
const sequelize = require('../../config/postgresdb');

const ContactPerson = sequelize.define('ContactPerson', {

  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  jobrole: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phonenumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  company: {
    type: DataTypes.STRING,
    allowNull: false
  },
  companylogo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  favorit: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  ispriority: {
    type: DataTypes.BOOLEAN,
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
},
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
},
  specialist: {
  type: DataTypes.STRING,
  allowNull: true
},
  information: {
    type: DataTypes.STRING,
    allowNull: true
  },
}
, {
    tableName: 'contact_persons',
    // Other model options go here
});

module.exports = ContactPerson;
