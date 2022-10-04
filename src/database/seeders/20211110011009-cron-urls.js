'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('cron_urls', [

      {
        currency: 'Dólar',
        slug: "dolar",
        cron_url: "https://www.melhorcambio.com/dolar-hoje",
        createdAt: new Date(),
        updatedAt: new Date()
      }, 

      {
        currency: 'Euro',
        slug: "euro",
        cron_url: "https://www.melhorcambio.com/euro-hoje",
        createdAt: new Date(),
        updatedAt: new Date()
      }, 

      {
        currency: 'Libra',
        slug: "libra",
        cron_url: "https://www.melhorcambio.com/libra-hoje",
        createdAt: new Date(),
        updatedAt: new Date()
      }, 

      {
        currency: 'Dólar Canadense',
        slug: "dolar-canadense",
        cron_url: "https://www.melhorcambio.com/dolar-canadense-hoje",
        createdAt: new Date(),
        updatedAt: new Date()
      }, 

      {
        currency: 'Iene',
        slug: "iene",
        cron_url: "https://www.melhorcambio.com/iene-hoje",
        createdAt: new Date(),
        updatedAt: new Date()
      }, 

      {
        currency: 'Dólar Australiano',
        slug: "dolar-australiano",
        cron_url: "https://www.melhorcambio.com/dolar-australiano-hoje",
        createdAt: new Date(),
        updatedAt: new Date()
      }, 

      {
        currency: 'Peso Mexicano',
        slug: "peso-mexicano",
        cron_url: "https://www.melhorcambio.com/peso-mexicano-hoje",
        createdAt: new Date(),
        updatedAt: new Date()
      }, 

      {
        currency: 'Peso Argentino',
        slug: "peso-argentino",
        cron_url: "https://www.melhorcambio.com/peso-argentino-hoje",
        createdAt: new Date(),
        updatedAt: new Date()
      }, 

      {
        currency: 'Peso Colombiano',
        slug: "peso-colombiano",
        cron_url: "https://www.melhorcambio.com/peso-colombiano-hoje",
        createdAt: new Date(),
        updatedAt: new Date()
      }, 

      {
        currency: 'Peso Chileno',
        slug: "peso-chileno",
        cron_url: "https://www.melhorcambio.com/peso-chileno-hoje",
        createdAt: new Date(),
        updatedAt: new Date()
      }, 

      {
        currency: 'Dirham',
        slug: "dirham",
        cron_url: "https://www.melhorcambio.com/dirham-hoje",
        createdAt: new Date(),
        updatedAt: new Date()
      }, 

      {
        currency: 'Franco Suíço',
        slug: "franco-suico",
        cron_url: "https://www.melhorcambio.com/franco-suico-hoje",
        createdAt: new Date(),
        updatedAt: new Date()
      }, 

      {
        currency: 'Yuan',
        slug: 'yuan',
        cron_url: "https://www.melhorcambio.com/iuan-hoje",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    
    ])},

  down: async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete('cron_urls', null, {});
  }
};
