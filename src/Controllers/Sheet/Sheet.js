const express = require('express');
const currency = require('../../Models/currency');
const XlsxPopulate = require('xlsx-populate');
const fs = require('fs');
const path = require('path');
const moment = require('moment');

module.exports = {

    async generateSheet(req, res){

        await currency.findAll({
            raw: true,
            order: [
                ['currency', 'ASC'],
            ]
        }).then(async currency => {

            await XlsxPopulate.fromFileAsync(path.join(__dirname, 'sheet-template.xlsx'))
            .then(workbook => {

            let i = 0;
            let count_from_cel = 2;
            const report_generation_hour = moment().locale('pt-br').format('LT');

            for(i; i<currency.length; i++){

                   // Modify the workbook.
                   workbook.sheet("Cotações").cell(`A${count_from_cel}`).value(currency[i].currency);
                   workbook.sheet("Cotações").cell(`B${count_from_cel}`).value(currency[i].value);
                   workbook.sheet("Cotações").cell(`C${count_from_cel}`).value(currency[i].code);
                   workbook.sheet("Cotações").cell(`D${count_from_cel}`).value(currency[i].symbol);

                count_from_cel += 1;
            }

                workbook.sheet("Cotações").cell('C16').value(currency[0].lastUpdate);
                workbook.sheet("Cotações").cell('D16').value(report_generation_hour);
                workbook.toFileAsync(path.join(__dirname, 'report.xlsx')).then(() => {
                    res.download(path.join(__dirname, 'report.xlsx'), 'relatorio.xlsx');  
                }).catch(err => {
                    console.log(err);
                });
           
                
            });

    
        }).catch(err => {
            console.log(err);
        })


 

       
    }

}