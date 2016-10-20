var express = require('express');
var path = require('path');

// Create an server
var server = express();

// Serve the public directory
server.use(express.static(path.resolve(__dirname, 'public')));
server.use('/kinvey', express.static(path.resolve(__dirname, 'node_modules/kinvey-html5-sdk/dist/')));
server.use('/jquery', express.static(path.resolve(__dirname, 'node_modules/jquery/dist/')));
server.use('/bootstrap', express.static(path.resolve(__dirname, 'node_modules/bootstrap/dist/')));

// Send 404 for unknown routes
server.get('*', (request, response) => {
  response.sendFile(`${__dirname}/public/404.html`);
});

// Start the server on port 3000
server.listen(3000, () => {
  console.log('Server listening on port http://localhost:3000...');
});
