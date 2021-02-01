const express = require('express');
const app = express();
const connection = require('./database/connection');
const routes = require('./Router/routes');
const cors = require('cors');

// Setting cors
app.use(cors());

// Authenticate database connection
connection.authenticate().then(() => {
    console.log('Connected to database');
})

// Parsing the application to json
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))

// Setting routes
app.use(routes);

// Server listener
app.listen(3000, () => {
    console.log('The server is running');
})