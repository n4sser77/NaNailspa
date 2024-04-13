const express = require('express');
const path = require('path');
const livereload = require('livereload');
const app = express();
const bodyParser = require('body-parser')
const port = process.env.PORT || 3002;


// Import the database module
const { connectToDatabase, createTable, insertData, queryJoinedData, getLastInsertedRowId, closeDatabase } = require('./database');


// Connect to the SQLite database
const db = connectToDatabase('mydatabase.db');

// Serve the static files
app.use(express.static(path.join(__dirname, 'public/static-site')));
app.get('/', function (req, res) {

  res.sendFile(path.join(__dirname, 'public/static-site', 'page1.html'));
});

// Serve the React app files
app.use(express.static(path.join(__dirname, 'build')));
app.get('/app*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Middleware to parse JSON bodies
app.use(bodyParser.json());



// Route to handle form submission
app.post('/submit-form', (req, res) => {
  // Destructure form data directly in the route handler
  const { name, email, phone, time, date, selectedTreatment } = req.body;

  // Convert the date string to a JavaScript Date object
  const formattedDate = new Date(date);

  // Format the date using toLocaleDateString with the desired locale
  const formattedDateString = formattedDate.toLocaleDateString('en-CA');



  // Process the form data (e.g., save to database)
  console.log('Form submitted:');
  console.log('Name:', name);
  console.log('Email:', email);
  console.log('Phone:', phone);
  console.log('Time:', time);
  console.log('Date:', formattedDateString);
  console.log('Treatment:', selectedTreatment)




  // Perform database operations
  db.serialize(() => {
    // Example: Create a new table
    createTable(db, 'users', 'user_id INTEGER PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL, phone TEXT NOT NULL');
    createTable(db, 'date', 'date_id INTEGER PRIMARY KEY, time TEXT NOT NULL, date TEXT NOT NULL, treatment TEXT NOT NULL, user_id INTEGER NOT NULL, FOREIGN KEY (user_id) REFERENCES users(user_id)');


    // Insert data into the 'users' table
    insertData(db, 'users', { name: name, email: email, phone: phone });


    // Get the last inserted row ID from the 'users' table
    getLastInsertedRowId(db, 'users', (userId) => {
      if (userId) {
        // Insert data into the 'date' table with the retrieved user_id
        insertData(db, 'date', { time: time, date: formattedDateString, treatment: selectedTreatment, user_id: userId });
      } else {
        console.error('Failed to retrieve last inserted row ID for user');
      }

      // Example: Query joined data from the tables
      queryJoinedData(db, (rows) => {
        console.log('Retrieved joined data:', rows);
      });

      

    });

  });

  // Respond to the client
  res.status(200).json({ message: 'Form submitted successfully' });
});


// Middleware to enable CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


// Define API endpoint to fetch joined data from the database
app.get('/api/data', (req, res) => {

  // Call the queryJoinedData function to fetch joined data
  queryJoinedData(db, (rows) => {
    // Send the fetched data as a response
    res.json(rows);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`http://localhost:${port}`);

});

// Reload the server on file changes
if (process.env.NODE_ENV !== 'production') {
  const server = livereload.createServer();
  server.watch(__dirname);
}