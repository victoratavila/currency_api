const { Sequelize, DataTypes } = require("sequelize");
const connection = require('../database/connection');

const Suggestion = connection.define("suggestion", {

    username: {
        type: Sequelize.STRING,
        allowNull: false
    },

    email: {
        type: Sequelize.STRING,
        allowNull: false
    },

    suggestion: {
        type: Sequelize.STRING,
        allowNull: false
    },

    status: {
        type: Sequelize.STRING,
        allowNull: false
    }

  });

Suggestion.sync({ force: false });

module.exports = Suggestion;