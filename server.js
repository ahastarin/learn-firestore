const http = require('http');
const fs = require('fs');
const path = require('path');

// Define the port number
const PORT = process.env.PORT || 3000;

// Create the server
const server = http.createServer((req, res) => {
    // Check if the request is for the root URL
    if (req.url === '/') {
        // Read the contents of index.html file
        fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (req.url.endsWith('.css')) {
        // If the request is for a CSS file
        fs.readFile(path.join(__dirname, req.url), (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/css' });
                res.end(data);
            }
        });
    } else {
        // If the request is for any other URL, respond with a 404 Not Found error
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

// Start listening on the specified port
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});