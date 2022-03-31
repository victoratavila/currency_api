'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('countries_currencies', { 

      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },

      country_name: {
        type: Sequelize.STRING,
        allowNull: false
    },

    main_currency_name: {
        type: Sequelize.STRING,
        allowNull: false
    },

    main_currency_code: {
        type: Sequelize.STRING,
        allowNull: false
    },

    
    main_currency_slug: {
      type: Sequelize.STRING,
      allowNull: false
  },

    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('NOW')
    },

    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('NOW')
    }

     });
   
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
