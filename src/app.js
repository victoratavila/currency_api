const express = require('express');
const app = express();
const connection = require('./database/connection');
const routes = require('./Router/routes');
// const cors = require('cors');

// const corsOptions = {
//     origin: 'http://localhost:3000',
//     optionsSuccessStatus: 200,
//     methods: "GET, PUT, POST, DELETE"
// }

// // Setting cors
// app.use(cors(corsOptions));



// Authenticate database connection
connection.authenticate().then(() => {
    console.log('Connected to database');
})

// Parsing the application to json
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))

// Setting static folder
app.use(express.static(__dirname + '/public'));



// Setting routes
app.use(routes);

// Server listener
app.listen(process.env.PORT || 8080, () => {
    console.log('The server is running');
})