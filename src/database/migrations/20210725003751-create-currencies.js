'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  
     await queryInterface.createTable('currencies', { 

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

      lastUpdate: {
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
    await queryInterface.dropTable('currencies');
  
  }
};
