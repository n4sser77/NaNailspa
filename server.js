const express = require('express');
const path = require('path');
const livereload = require('livereload');
const app = express();
const port = process.env.PORT || 3002;


// Serve the static files
app.get('/', function(req, res) {
    app.use(express.static(path.join(__dirname, 'public/static-site')));
    res.sendFile(path.join(__dirname, 'public/static-site', 'page1.html'));
});

// Serve the React app files
app.get('/app*', function(req, res) {
    app.use(express.static(path.join(__dirname, 'build')));
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