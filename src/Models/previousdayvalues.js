const { Sequelize, DataTypes } = require("sequelize");
const connection = require('../database/connection');

const previousdayvalues = connection.define("previousdaycurrencies", {

    currency: {
        type: Sequelize.STRING,
        allowNull: false
    },

    slug: {
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

previousdayvalues.sync({ force: false });

module.exports = previousdayvalues;