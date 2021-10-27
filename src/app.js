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
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.header('Access-Control-Allow-Origin', 'https://conversordemoeda.xyz');
    res.header(
        'Access-Control-Allow-Header',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    )

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }
    next();
});

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