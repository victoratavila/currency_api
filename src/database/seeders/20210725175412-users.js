'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
 
      await queryInterface.bulkInsert('users', [{
        email: 'victoratavila@hotmail.com',
        password: '$2b$10$4YdD3nxg2jKQTJSIp9auVeHieai/UF/qToh9MLHWDRevWXL7WPMbG', // 12345
        admin: true
    }], {});

  },

  down: async (queryInterface, Sequelize) => {

     await queryInterface.bulkDelete('users', null, {});
 
  }
};
