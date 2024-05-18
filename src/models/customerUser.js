// customerUser.js
const { DataTypes } = require('sequelize');
const { getSequelizeForCustomer } = require('../../config/customerdb');
const Mainsequelize = require('../../config/postgresdb');

// Define customer user model based on customer database connection
async function defineCustomerUserModel(companyId) {
  const customerSequelize = await getSequelizeForCustomer(companyId);
  
  const CustomerUser = customerSequelize.define('CustomerUser', {
    // Define customer user model attributes
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: true
    },
    companyId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true // Example of adding unique constraint
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
  },
    deletedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Mainsequelize.literal('CURRENT_TIMESTAMP')  
}
    // Other attributes...
  }, {
    // Define options for the model
    tableName: 'customer_users' // Set the table name
  });

  return CustomerUser;
}

module.exports = { defineCustomerUserModel };
