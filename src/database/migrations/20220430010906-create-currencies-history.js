'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('currencies_history', { 

    id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    }, 

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

     })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('currencies_history');
  }
};
