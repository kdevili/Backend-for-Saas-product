// tokenBlacklist.js
const { DataTypes } = require('sequelize');
const { getSequelizeForCustomer } = require('../../config/customerdb');
const Mainsequelize = require('../../config/postgresdb');

// Define TokenBlacklist model based on customer database connection
async function defineTokenBlacklistModelExternal(companyId) {
  const customerSequelize = await getSequelizeForCustomer(companyId);

  const TokenBlacklistexternal = customerSequelize.define('TokenBlacklistexternal', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    invalidated_at: {
      type: DataTypes.DATE,
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
    tableName: 'external_token_blacklists',
    timestamps: true
  });

  return TokenBlacklistexternal;
}

module.exports = { defineTokenBlacklistModelExternal };
