const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');


dotenv.config();

const Mainsequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
    pool: {
      max: 10,
      min: 0,
      idle: 10000
    },
    dialectOptions: {
       requestTimeout: 30000,
       ssl: { require: true,
       rejectUnauthorized: false
  },
       encrypt: true
     }
  });
  
  
// Connect to main database
Mainsequelize.authenticate()
  .then(() => {
    console.log('Connection to Main database has been established successfully.');
   // return Mainsequelize.sync(); // Sync models with the database
  })
  .then(() => {
    console.log('Models synchronized with database.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

// Associate the Company model with the mainSequelize instance
module.exports = Mainsequelize;