const express = require('express');
const path = require('path');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');

// use port provided by Heroku if it exists, else revert to 3000
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

// Set up routing so React takes care of it
app.get('*', (request, response) => {
  response.sendFile(path.join(publicPath, 'index.html'));
});

// Set up port
app.listen(port, ()=> {
  console.log('Server is running');
});