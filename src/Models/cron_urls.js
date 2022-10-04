const { Sequelize, DataTypes } = require("sequelize");
const connection = require('../database/connection');

const Cron_urls = connection.define("cron_urls", {

    currency: {
        type: Sequelize.STRING,
        allowNull: false
    },

    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },

    cron_url: {
        type: Sequelize.STRING,
        allowNull: false
    }

});


Cron_urls.sync({ force: false });

module.exports = Cron_urls;