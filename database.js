// database.js

const sqlite3 = require('sqlite3').verbose();

// Function to connect to the SQLite database
function connectToDatabase(databaseName) {
  return new sqlite3.Database(databaseName, (err) => {
    if (err) {
      console.error('Error opening database:', err.message);
    } else {
      console.log('Connected to the database');
    }
  });
}

// Function to create a new table in the database
function createTable(db, tableName, columnsDefinition) {
  db.run(`CREATE TABLE IF NOT EXISTS ${tableName} (${columnsDefinition})`, (err) => {
    if (err) {
      console.error(`Error creating table ${tableName}:`, err.message);
    } else {
      console.log(`Table ${tableName} created successfully`);
    }
  });
}

// Function to insert data into a table
function insertData(db, tableName, data) {
  const placeholders = Object.keys(data).map(() => '?').join(', ');
  const values = Object.values(data);

  db.run(`INSERT INTO ${tableName} (${Object.keys(data).join(', ')}) VALUES (${placeholders})`, values, (err) => {
    if (err) {
      console.error(`Error inserting data into ${tableName}:`, err.message);
    } else {
      console.log(`Data inserted into ${tableName} successfully`);
    }
  });
}


// Function to get the last inserted row ID from a table
function getLastInsertedRowId(db, tableName, callback) {
  const query = `SELECT last_insert_rowid() AS id FROM ${tableName}`;
  db.get(query, (err, row) => {
    if (err) {
      console.error(`Error getting last inserted row ID from ${tableName}:`, err.message);
      callback(null);
    } else {
      callback(row.id);
    }
  });
}

// Function to query joined data from the tables
function queryJoinedData(db, callback) {
  const query = `
  SELECT * FROM users INNER JOIN date ON users.user_id = date.user_id;
  `;

  db.all(query, (err, rows) => {
    if (err) {
      console.error('Error querying joined data:', err.message);
    } else {
      callback(rows);
    }
  });
}

// Function to close the database connection
function closeDatabase(db) {
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err.message);
    } else {
      console.log('Disconnected from the database');
    }
  });
}



module.exports = {
  connectToDatabase,
  createTable,
  getLastInsertedRowId,
  insertData,
  queryJoinedData,
  closeDatabase
  // Add the new function to the exports
};