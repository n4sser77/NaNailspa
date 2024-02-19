// db.js
require('dotenv').config();
const mysql = require('mysql2/promise');

const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

const connectionString = `mysql://${dbUser}:${dbPassword}@${dbHost}/${dbName}`;

const connectDB = async () => {
  try {
    const connection = await mysql.createConnection(connectionString);
    console.log('Database connected successfully');
    // Use the connection object for further database operations
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;