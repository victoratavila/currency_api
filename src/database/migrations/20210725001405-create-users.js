'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
  
  await queryInterface.createTable('users', { 

    id: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
  },

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
    
   await queryInterface.dropTable('users');
    

}};
