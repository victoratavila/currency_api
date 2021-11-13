'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('cron_urls', [

      {
        slug: "dolar",
        cron_url: "https://www.melhorcambio.com/dolar-hoje",
        createdAt: new Date(),
        updatedAt: new Date()
      }, 

      {
        slug: "euro",
        cron_url: "https://www.melhorcambio.com/euro-hoje",
        createdAt: new Date(),
        updatedAt: new Date()
      }, 

      {
        slug: "libra",
        cron_url: "https://www.melhorcambio.com/libra-hoje",
        createdAt: new Date(),
        updatedAt: new Date()
      }, 

      {
        slug: "dolar-canadense",
        cron_url: "https://www.melhorcambio.com/dolar-canadense-hoje",
        createdAt: new Date(),
        updatedAt: new Date()
      }, 

      {
        slug: "iene",
        cron_url: "https://www.melhorcambio.com/iene-hoje",
        createdAt: new Date(),
        updatedAt: new Date()
      }, 

      {
        slug: "dolar-australiano",
        cron_url: "https://www.melhorcambio.com/dolar-australiano-hoje",
        createdAt: new Date(),
        updatedAt: new Date()
      }, 

      {
        slug: "peso-mexicano",
        cron_url: "https://www.melhorcambio.com/peso-mexicano-hoje",
        createdAt: new Date(),
        updatedAt: new Date()
      }, 

      {
        slug: "peso-argentino",
        cron_url: "https://www.melhorcambio.com/peso-argentino-hoje",
        createdAt: new Date(),
        updatedAt: new Date()
      }, 

      {
        slug: "peso-colombiano",
        cron_url: "https://www.melhorcambio.com/peso-colombiano-hoje",
        createdAt: new Date(),
        updatedAt: new Date()
      }, 

      {
        slug: "peso-chileno",
        cron_url: "https://www.melhorcambio.com/peso-chileno-hoje",
        createdAt: new Date(),
        updatedAt: new Date()
      }, 

      {
        slug: "dirham",
        cron_url: "https://www.melhorcambio.com/dirham-hoje",
        createdAt: new Date(),
        updatedAt: new Date()
      }, 

      {
        slug: "franco-suico",
        cron_url: "https://www.melhorcambio.com/franco-suico-hoje",
        createdAt: new Date(),
        updatedAt: new Date()
      }, 

      {
        slug: 'yuan',
        cron_url: "https://www.melhorcambio.com/iuan-hoje",
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        slug: 'won',
        cron_url: "https://www.melhorcambio.com/won-hoje",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    
    ])},

  down: async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete('cron_urls', null, {});
  }
};
