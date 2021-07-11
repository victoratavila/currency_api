const { Sequelize, DataTypes } = require("sequelize");
const connection = require('../database/connection');

const User = connection.define("user", {

    email: {
        type: Sequelize.STRING,
        allowNull: false
    },

    password: {
        type: Sequelize.STRING,
        allowNull: false
    },

    admin: {
        type: Sequelize.INTEGER,
        allowNull: false
    }

});


User.sync({ force: false });

module.exports = User;