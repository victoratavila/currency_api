'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  
      await queryInterface.bulkInsert('currencies', [{
        currency: "Dólar",
        slug: "dolar",
        value: 0,
        code: "USD",
        symbol: "$",
        lastUpdate: "25/07/2021"
      }, {
        currency: "Dólar Australiano",
        slug: "dolar-australiano",
        value: 0,
        code: "AUD",
        symbol: "$",
        lastUpdate: "25/07/2021"
      },
      {
        currency: "Dólar Canadense",
        slug: "dolar-canadense",
        value: 0,
        code: "CAD",
        symbol: "$",
        lastUpdate: "25/07/2021"
      },
      {
        currency: "Euro",
        slug: "euro",
        value: 0,
        code: "EUR",
        symbol: "€",
        lastUpdate: "25/07/2021"
      },
      {
        currency: "Franco Suíço",
        slug: "franco-suico",
        value: 0,
        code: "CHF",
        symbol: "Fr",
        lastUpdate: "25/07/2021"
      },
      {
        currency: "Iene",
        slug: "iene",
        value: 0,
        code: "JPY",
        symbol: "¥",
        lastUpdate: "25/07/2021"
      },
      {
        currency: "Libra",
        slug: "libra",
        value: 0,
        code: "GBP",
        symbol: "£",
        lastUpdate: "25/07/2021"
      },
      {
        currency: "Peso Argentino",
        slug: "peso-argentino",
        value: 0,
        code: "ARS",
        symbol: "$",
        lastUpdate: "25/07/2021"
      },
      {
        currency: "Peso Chileno",
        slug: "peso-chileno",
        value: 0,
        code: "CLP",
        symbol: "$",
        lastUpdate: "25/07/2021"
      },
      {
        currency: "Peso Colombiano",
        slug: "peso-colombiano",
        value: 0,
        code: "COP",
        symbol: "$",
        lastUpdate: "25/07/2021"
      },
      {
        currency: "Peso Mexicano",
        slug: "peso-mexicano",
        value: 0,
        code: "MXN",
        symbol: "$",
        lastUpdate: "25/07/2021"
      },
      {
        currency: "Yuan",
        slug: "yuan",
        value: 0,
        code: "CNY",
        symbol: "¥",
        lastUpdate: "25/07/2021"
      }]);
  
  },

  down: async (queryInterface, Sequelize) => {

     await queryInterface.bulkDelete('currencies', null, {});
     
  }
};
