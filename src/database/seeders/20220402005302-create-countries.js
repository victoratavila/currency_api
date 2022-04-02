'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('countries_currencies', [
      
      {
        country_name: "Estados Unidos",
        main_currency_name: "Dólar",
        main_currency_code: 'USD',
        main_currency_slug: 'dolar',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 

      {
        country_name: "Porto Rico",
        main_currency_name: "Dólar",
        main_currency_code: 'USD',
        main_currency_slug: 'dolar',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 

      {
        country_name: "Panamá",
        main_currency_name: "Dólar",
        main_currency_code: 'USD',
        main_currency_slug: 'dolar',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 

      
      {
        country_name: "Equador",
        main_currency_name: "Dólar",
        main_currency_code: 'USD',
        main_currency_slug: 'dolar',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 

      
      {
        country_name: "El Salvador",
        main_currency_name: "Dólar",
        main_currency_code: 'USD',
        main_currency_slug: 'dolar',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 

      {
        country_name: "Somália",
        main_currency_name: "Dólar",
        main_currency_code: 'USD',
        main_currency_slug: 'dolar',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 

      {
        country_name: "Turks e Caicos",
        main_currency_name: "Dólar",
        main_currency_code: 'USD',
        main_currency_slug: 'dolar',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 

      {
        country_name: "Zimbábue",
        main_currency_name: "Dólar",
        main_currency_code: 'USD',
        main_currency_slug: 'dolar',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 

      {
        country_name: "Guam",
        main_currency_name: "Dólar",
        main_currency_code: 'USD',
        main_currency_slug: 'dolar',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 

      {
        country_name: "Timor-Leste",
        main_currency_name: "Dólar",
        main_currency_code: 'USD',
        main_currency_slug: 'dolar',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 

      {
        country_name: "Ilhas Virgens Americanas",
        main_currency_name: "Dólar",
        main_currency_code: 'USD',
        main_currency_slug: 'dolar',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 

      {
        country_name: "Palau",
        main_currency_name: "Dólar",
        main_currency_code: 'USD',
        main_currency_slug: 'dolar',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 

      {
        country_name: "Ilhas Virgens Britânicas",
        main_currency_name: "Dólar",
        main_currency_code: 'USD',
        main_currency_slug: 'dolar',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 

      {
        country_name: "Bonaire",
        main_currency_name: "Dólar",
        main_currency_code: 'USD',
        main_currency_slug: 'dolar',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 

      {
        country_name: "Samoa Americana",
        main_currency_name: "Dólar",
        main_currency_code: 'USD',
        main_currency_slug: 'dolar',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 

      {
        country_name: "Estados Federados da Micronésia",
        main_currency_name: "Dólar",
        main_currency_code: 'USD',
        main_currency_slug: 'dolar',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 

      {
        country_name: "Ilhas Marshall",
        main_currency_name: "Dólar",
        main_currency_code: 'USD',
        main_currency_slug: 'dolar',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 

      {
        country_name: "Ilhas Marianas do Norte",
        main_currency_name: "Dólar",
        main_currency_code: 'USD',
        main_currency_slug: 'dolar',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 

      {
        country_name: "Países Baixos Caribenhos",
        main_currency_name: "Dólar",
        main_currency_code: 'USD',
        main_currency_slug: 'dolar',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 

      {
        country_name: "Austrália",
        main_currency_name: "Dólar Australiano",
        main_currency_code: 'AUD',
        main_currency_slug: 'dolar-australiano',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 

      {
        country_name: "Suíça",
        main_currency_name: "Franco Suíço",
        main_currency_code: 'CHF',
        main_currency_slug: 'franco-suico',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 

      {
        country_name: "Liechtenstein",
        main_currency_name: "Franco Suíço",
        main_currency_code: 'CHF',
        main_currency_slug: 'franco-suico',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 

      {
        country_name: "Reino Unido",
        main_currency_name: "Libra",
        main_currency_code: 'GBP',
        main_currency_slug: 'libra',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 

      {
        country_name: "Inglaterra",
        main_currency_name: "Libra",
        main_currency_code: 'GBP',
        main_currency_slug: 'libra',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 

      {
        country_name: "Escócia",
        main_currency_name: "Libra",
        main_currency_code: 'GBP',
        main_currency_slug: 'libra',
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        country_name: "Jersey",
        main_currency_name: "Libra",
        main_currency_code: 'GBP',
        main_currency_slug: 'libra',
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        country_name: "País de Gales",
        main_currency_name: "Libra",
        main_currency_code: 'GBP',
        main_currency_slug: 'libra',
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        country_name: "Gibraltar",
        main_currency_name: "Libra",
        main_currency_code: 'GBP',
        main_currency_slug: 'libra',
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        country_name: "Ilha de Man",
        main_currency_name: "Libra",
        main_currency_code: 'GBP',
        main_currency_slug: 'libra',
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        country_name: "Santa Helena",
        main_currency_name: "Libra",
        main_currency_code: 'GBP',
        main_currency_slug: 'libra',
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        country_name: "Ilhas Geórgia do Sul e Sandwich do Sul",
        main_currency_name: "Libra",
        main_currency_code: 'GBP',
        main_currency_slug: 'libra',
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        country_name: "Irlanda do Norte",
        main_currency_name: "Libra",
        main_currency_code: 'GBP',
        main_currency_slug: 'libra',
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        country_name: "Argentina",
        main_currency_name: "Peso Argentino",
        main_currency_code: 'ARS',
        main_currency_slug: 'peso-argentino',
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        country_name: "Chile",
        main_currency_name: "Peso Chileno",
        main_currency_code: 'CLP',
        main_currency_slug: 'peso-chileno',
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        country_name: "Colômbia",
        main_currency_name: "Peso Colombiano",
        main_currency_code: 'COP',
        main_currency_slug: 'peso-colombiano',
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        country_name: "México",
        main_currency_name: "Peso Mexicano",
        main_currency_code: 'MXN',
        main_currency_slug: 'peso-mexicano',
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        country_name: "Alemanha",
        main_currency_name: "Euro",
        main_currency_code: 'EUR',
        main_currency_slug: 'euro',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 

      {
        country_name: "Canadá",
        main_currency_name: "Dólar Canadense",
        main_currency_code: 'CAD',
        main_currency_slug: 'canada',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 

      {
        country_name: "França",
        main_currency_name: "Euro",
        main_currency_code: 'EUR',
        main_currency_slug: 'euro',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 

      {
        country_name: "Espanha",
        main_currency_name: "Euro",
        main_currency_code: 'EUR',
        main_currency_slug: 'euro',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 

      {
        country_name: "Itália",
        main_currency_name: "Euro",
        main_currency_code: 'EUR',
        main_currency_slug: 'euro',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 

      {
        country_name: "Bélgica",
        main_currency_name: "Euro",
        main_currency_code: 'EUR',
        main_currency_slug: 'euro',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 

      {
        country_name: "Finlândia",
        main_currency_name: "Euro",
        main_currency_code: 'EUR',
        main_currency_slug: 'euro',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 

      {
        country_name: "Grécia",
        main_currency_name: "Euro",
        main_currency_code: 'EUR',
        main_currency_slug: 'euro',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 

      {
        country_name: "Lituânia",
        main_currency_name: "Euro",
        main_currency_code: 'EUR',
        main_currency_slug: 'euro',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 

      {
        country_name: "Eslováquia",
        main_currency_name: "Euro",
        main_currency_code: 'EUR',
        main_currency_slug: 'euro',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 

      {
        country_name: "Portugal",
        main_currency_name: "Euro",
        main_currency_code: 'EUR',
        main_currency_slug: 'euro',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 

      {
        country_name: "Luxemburgo",
        main_currency_name: "Euro",
        main_currency_code: 'EUR',
        main_currency_slug: 'euro',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 

      {
        country_name: "Malta",
        main_currency_name: "Euro",
        main_currency_code: 'EUR',
        main_currency_slug: 'euro',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 

      {
        country_name: "Eslovênia",
        main_currency_name: "Euro",
        main_currency_code: 'EUR',
        main_currency_slug: 'euro',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 

      {
        country_name: "Letônia",
        main_currency_name: "Euro",
        main_currency_code: 'EUR',
        main_currency_slug: 'euro',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 

      {
        country_name: "Irlanda",
        main_currency_name: "Euro",
        main_currency_code: 'EUR',
        main_currency_slug: 'euro',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 

      {
        country_name: "Estônia",
        main_currency_name: "Euro",
        main_currency_code: 'EUR',
        main_currency_slug: 'euro',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 

      {
        country_name: "Chipre",
        main_currency_name: "Euro",
        main_currency_code: 'EUR',
        main_currency_slug: 'euro',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 

      {
        country_name: "Áustria",
        main_currency_name: "Euro",
        main_currency_code: 'EUR',
        main_currency_slug: 'euro',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
      {
        country_name: "Países Baixos",
        main_currency_name: "Euro",
        main_currency_code: 'EUR',
        main_currency_slug: 'euro',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 

      {
        country_name: "Japão",
        main_currency_name: "Iene",
        main_currency_code: 'JPY',
        main_currency_slug: 'iene',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 

      {
        country_name: "China",
        main_currency_name: "Yuan",
        main_currency_code: 'CNY',
        main_currency_slug: 'yuan',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
  
  ], {});

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
