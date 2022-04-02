const path = require('path');
require('dotenv').config();

const { DB_NAME, DB_USER, DB_HOST, DB_PASSWORD } = process.env;


module.exports = {
  "development": {
    "username": 'root',
    "password": '123456',
    "database": 'cotacao_api',
    "host": 'localhost',
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": DB_USER,
    "password": DB_PASSWORD,
    "database": DB_NAME,
    "host": DB_HOST,
    "dialect": "mysql"
  }
}
