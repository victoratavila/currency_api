const express = require('express');
const app = express();
const connection = require('./database/connection');
const routes = require('./Router/routes');
const cors = require('cors');


// if(process.env.PROD == undefined){
//     var PORT = 8080
// } else {
//     var PORT = process.env.PORT;
// }

// Setting cors
app.use(cors());

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
app.listen(process.env.PORT || 2424, () => {
    console.log('The server is running');
})
