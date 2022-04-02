const path = require('path');

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
    "username": "bd12bd6432ba49",
    "password": 'dc6051a2',
    "database": "heroku_a58f79385747fee",
    "host": "us-cdbr-east-04.cleardb.com",
    "dialect": "mysql"
  }
}
