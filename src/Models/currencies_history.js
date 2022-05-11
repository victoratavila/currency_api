const { Sequelize, DataTypes } = require("sequelize");
const connection = require('../database/connection');

const currencies_history = connection.define("currencies_history", {

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

    date: {
        type: Sequelize.STRING,
        allowNull: false
    }


  });

  currencies_history.sync({ force: false });

module.exports = currencies_history;