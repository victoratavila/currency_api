// const { GoogleSpreadsheet } = require('google-spreadsheet');
// const creds = require('../credentials.json');
// const docId = '1Pdl7DA86S1Y6iZQsnFeiDCI9Py7cOFmXQtl9En3rCV8';

// // spreadsheet key is the long id in the sheets URL
// const doc = new GoogleSpreadsheet(docId);

// async function accessSpreadsheet() {
//   await doc.useServiceAccountAuth(creds);

//   await doc.loadInfo(); // loads document properties and worksheets
//   console.log(doc.title);
  
// // create a sheet and set the header row
// const sheet = await doc.addSheet({ headerValues: ['A1'] });

// // read rows
// const rows = await sheet.getRows(); // can pass in { limit, offset }

// console.log(rows)

// }

// accessSpreadsheet();