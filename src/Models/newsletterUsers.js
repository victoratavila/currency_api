const { Sequelize, DataTypes } = require("sequelize");
const connection = require('../database/connection');

const Newsletter_user = connection.define("newsletter_user", {

    name: {
        type: Sequelize.STRING,
        allowNull: false
    },

    email: {
        type: Sequelize.STRING,
        allowNull: false
    },

    assigned_newsletter: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }

});


Newsletter_user.sync({ force: false });

module.exports = Newsletter_user;