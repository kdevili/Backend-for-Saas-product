// testConnection.js
const { sequelize: mainSequelize } = require('./index');
const customerSequelize = require('./config/customerdb'); // Import Sequelize instance

async function testMainConnection() {
  try {
    await mainSequelize.authenticate();
    console.log('Main database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the main database:', error);
  } finally {
    // Close the connection after testing
    await mainSequelize.close();
    console.log('Main database connection has been closed.');
  }
}

async function testCustomerConnection(companyId) {
  try {
    const customerSequelize = await getSequelizeForCustomer(companyId);
    await customerSequelize.authenticate();
    console.log(`Customer database connection for customer ${companyId} has been established successfully.`);
  } catch (error) {
    console.error(`Unable to connect to the customer database for customer ${companyId}:`, error);
  } finally {
    // Close the connection after testing
    await customerSequelize.close();
    console.log(`Customer database connection for customer ${companyId} has been closed.`);
  }
}

async function testConnections() {
  await testMainConnection();
  await testCustomerConnection(1); // Provide the customer ID to test here
}

testConnections();
