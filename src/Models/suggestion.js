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
    }

  });

Suggestion.sync({ force: true });

module.exports = Suggestion;