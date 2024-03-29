# Currency Node.js API 💵

Simple Node.js API that combines schedule functions and web scrapping to keep the values always up to date in the API, always updating and posting the updated currency values into the API every 1 hour.

## Endpoints
* `GET /currency/all`: List all the currencies 
* `GET /currency/usd`: Get the currency related to the infomed code, in this case USD (dollar)
* `GET /currency/euro`: Get the currency related to the infomed name, in this case euro
* `POST /currency/new`: Posting a new currency by informing currencyName, value, code, symbol, lastUpdate
* `PUT /currency/update`: Put new info to update the value of the currencie, informing currencyName, value and lastUpdate

## Usage
```
npm install
npm start
```

##  Run migrations 
cd src/database
npx sequelize db:migrate

## Run seeders
cd src/database
npx sequelize-cli db:seed:all

## Run migrations deploy Heroku 
heroku run npx sequelize-cli db:migrate --env production

## Run seeder deploy Heroku 
heroku run npx sequelize-cli db:seed --env production
or
heroku run npx sequelize-cli db:seed --seed seefile.js --env production