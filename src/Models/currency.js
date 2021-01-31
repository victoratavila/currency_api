const { Sequelize, DataTypes } = require("sequelize");
const connection = require('../database/connection');

const Currency = connection.define("currency", {

    currency: {
        type: Sequelize.STRING,
        allowNull: false
    },

    value: {
        type: Sequelize.FLOAT,
        allowNull: false
    },

    code: {
        type: Sequelize.STRING,
        allowNull: false
    },

    symbol: {
        type: Sequelize.STRING,
        allowNull: false
    },

    lastUpdate: {
        type: Sequelize.STRING,
        allowNull: false
    }


  });

Currency.sync({ force: false });

module.exports = Currency;