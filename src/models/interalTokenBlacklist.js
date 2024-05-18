const { DataTypes } = require('sequelize');
const Mainsequelize = require('../../config/postgresdb');

const TokenBlacklistInternal = Mainsequelize.define('TokenBlacklistInternal', {
    user_id: {
        type: DataTypes.INTEGER, // Assuming user_id is an integer
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
    tableName: 'internal_token_blacklists',
    // Other model options go here
});
  
  // Add methods to manage token blacklist
  TokenBlacklistInternal.addToBlacklist = async function(token, userId) {
    await TokenBlacklistInternal.create({ token, userId });
  };
  
  TokenBlacklistInternal.isTokenBlacklisted = async function(token) {
    const blacklistedToken = await TokenBlacklistInternal.findOne({ where: { token } });
    return !!blacklistedToken;
  };
  
  // Export the model
  module.exports = TokenBlacklistInternal;

