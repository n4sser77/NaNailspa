const express = require('express');
const path = require('path');
const livereload = require('livereload');
const app = express();
const port = process.env.PORT || 3001;

// Connect to the database
connectDB();

// Serve static files from the static-site directory
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/static-site', 'page1.html'));
});

app.use('/', express.static(path.join(__dirname, 'public/static-site')));

app.use('/', express.static(path.join(__dirname, 'public/')));

// Serve the React app
app.use(express.static(path.join(__dirname, 'build')));
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
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