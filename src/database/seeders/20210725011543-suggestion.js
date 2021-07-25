'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
      await queryInterface.bulkInsert('suggestions', [{

        username: 'Victor Atavila',
        email: 'victoratavila@hotmail.com',
        suggestion: 'Euro',
        status: 'pending'
     }, {
        
      username: 'Janet Jackson',
      email: 'victoratavila@hotmail.com',
      suggestion: 'Libra',
      status: 'pending'
     }, {
        
      username: 'Janet Jackson',
      email: 'victoratavila@hotmail.com',
      suggestion: 'Dólar',
      status: 'pending'
     }, {
        
      username: 'Peter William',
      email: 'victoratavila@hotmail.com',
      suggestion: 'Peso Chileno',
      status: 'pending'
     }, {
        
      username: 'Maxwell Christine',
      email: 'victoratavila@hotmail.com',
      suggestion: 'Peso Argentino',
      status: 'pending'
     }, {
        
      username: 'Oliver Potter',
      email: 'victoratavila@hotmail.com',
      suggestion: 'Iene',
      status: 'pending'
     }]
    
   )},

  down: async (queryInterface, Sequelize) => {
 
     await queryInterface.bulkDelete('suggestions', null, {});
     
  }
};
