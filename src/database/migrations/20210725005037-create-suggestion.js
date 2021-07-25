'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.createTable('suggestions', { 

      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },

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

     await queryInterface.dropTable('suggestions');
   
  }
};
