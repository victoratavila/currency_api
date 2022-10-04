'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('currencies_histories', [{

      currency: "Dólar",
      slug: "dolar",
      value: 0,
      code: "USD",
      symbol: "$",
      date: "28/04/2022",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      currency: "Dólar Australiano",
      slug: "dolar-australiano",
      value: 0,
      code: "AUD",
      symbol: "$",
      date: "28/04/2022",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      currency: "Dólar Canadense",
      slug: "dolar-canadense",
      value: 0,
      code: "CAD",
      symbol: "$",
      date: "28/04/2022",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      currency: "Euro",
      slug: "euro",
      value: 0,
      code: "EUR",
      symbol: "€",
      date: "28/04/2022",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      currency: "Franco Suíço",
      slug: "franco-suico",
      value: 0,
      code: "CHF",
      symbol: "Fr",
      date: "28/04/2022",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      currency: "Iene",
      slug: "iene",
      value: 0,
      code: "JPY",
      symbol: "¥",
      date: "28/04/2022",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      currency: "Libra",
      slug: "libra",
      value: 0,
      code: "GBP",
      symbol: "£",
      date: "28/04/2022",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      currency: "Peso Argentino",
      slug: "peso-argentino",
      value: 0,
      code: "ARS",
      symbol: "$",
      date: "28/04/2022",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      currency: "Peso Chileno",
      slug: "peso-chileno",
      value: 0,
      code: "CLP",
      symbol: "$",
      date: "28/04/2022",
      createdAt: new Date(),
      updatedAt: new Date()
  
    },
    {
      currency: "Peso Colombiano",
      slug: "peso-colombiano",
      value: 0,
      code: "COP",
      symbol: "$",
      date: "28/04/2022",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      currency: "Peso Mexicano",
      slug: "peso-mexicano",
      value: 0,
      code: "MXN",
      symbol: "$",
      date: "28/04/2022",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      currency: "Yuan",
      slug: "yuan",
      value: 0,
      code: "CNY",
      symbol: "¥",
      date: "28/04/2022",
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
