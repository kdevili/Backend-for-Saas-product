// customerDb.js
const { Sequelize } = require('sequelize');
const Mainsequelize = require('./postgresdb'); // Use the correct relative path
const Company = require('../src/models/company');

async function getSequelizeForCustomer(companyId) {
  try {
    const company = await Company.findOne({
      where: { id: companyId }
    });

    if (!company) {
      throw new Error(`Company with ID ${companyId} not found.`);
    }

    const { host, port, dbName: database, userName: username, password } = company; // Assuming 'dbName' and 'userName' are the correct properties

    //console.log(company);

    const customerSequelize = new Sequelize({
      dialect: 'postgres',
      host,
      port,
      database,
      username,
      password,
      dialectOptions: {
        requestTimeout: 30000,
        ssl: { require: true, rejectUnauthorized: false },
        encrypt: true
      },
      pool: {
        max: 10,
        min: 0,
        idle: 10000
      }
    });
    
    await testConnection(customerSequelize);

    return customerSequelize;
  } catch (error) {
    console.error('Error fetching customer database configuration:', error);
    throw error;
  }
}

async function testConnection(customerSequelize) {
  try {
    await customerSequelize.authenticate();
    console.log('Customer Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
}

module.exports = { getSequelizeForCustomer };
