const express = require('express');
const currency = require('../../Models/currency');
const XlsxPopulate = require('xlsx-populate');
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const axios = require('axios');
const sequelize = require('sequelize');
var slugify = require('slugify');

module.exports = {

    async generateSheet(req, res){

        await currency.findAll({
            raw: true,
            order: [
                ['currency', 'ASC'],
            ]
        }).then(async currency => {

            await XlsxPopulate.fromFileAsync(path.join(__dirname, '/templates/sheet-template.xlsx'))
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

                workbook.sheet("Cotações").cell(`D${currency.length+3}`).value('Horário do relatório').style('fill', 'AEAAAA');
                workbook.sheet("Cotações").cell(`D${currency.length+4}`).value(report_generation_hour)

                workbook.sheet("Cotações").cell(`C${currency.length+3}`).value('Data das cotações').style('fill', 'AEAAAA');
                workbook.sheet("Cotações").cell(`C${currency.length+4}`).value(currency[0].lastUpdate)

                workbook.toFileAsync(path.join(__dirname, '/outputs/report.xlsx')).then(() => {
                    res.download(path.join(__dirname, '/outputs/report.xlsx'), 'relatorio.xlsx');  
                }).catch(err => {
                    console.log(err);
                });
           
                
            });

    
        }).catch(err => {
            console.log(err);
        })


 

       
    },

    async generateSheetIncluiding(req, res){

        const including_currency = req.params.currencyName;

        const currencyName =  slugify(including_currency, {
            replacement: '-',
            lower: true
        })

        await currency.findAll({
            where: {
                currency: sequelize.where(sequelize.fn('LOWER', sequelize.col('slug')), 'LIKE', '%' + currencyName + '%')
            }
        }).then(async result => {

            if(result.length >= 1){

                await XlsxPopulate.fromFileAsync(path.join(__dirname, '/templates/sheet-template.xlsx'))
                .then(workbook => {
    
                let i = 0;
                let count_from_cel = 2;
                const report_generation_hour = moment().locale('pt-br').format('LT');
    
                for(i; i<result.length; i++){
    
                       // Modify the workbook.
                       workbook.sheet("Cotações").cell(`A${count_from_cel}`).value(result[i].currency);
                       workbook.sheet("Cotações").cell(`B${count_from_cel}`).value(result[i].value);
                       workbook.sheet("Cotações").cell(`C${count_from_cel}`).value(result[i].code);
                       workbook.sheet("Cotações").cell(`D${count_from_cel}`).value(result[i].symbol);
    
                    count_from_cel += 1;
                }
    
                    workbook.sheet("Cotações").cell(`D${result.length+3}`).value('Horário do relatório').style('fill', 'AEAAAA');
                    workbook.sheet("Cotações").cell(`D${result.length+4}`).value(report_generation_hour)
    
                    workbook.sheet("Cotações").cell(`C${result.length+3}`).value('Data das cotações').style('fill', 'AEAAAA');
                    workbook.sheet("Cotações").cell(`C${result.length+4}`).value(result[0].lastUpdate)
    
                    workbook.toFileAsync(path.join(__dirname, '/outputs/report.xlsx')).then(() => {
                        res.download(path.join(__dirname, '/outputs/report.xlsx'), 'relatorio.xlsx');  
                    }).catch(err => {
                        console.log(err);
                    });
                    
                }).catch(err => {
                    console.log(err);
                });
                
            } else {
                res.json({result: `No currencies found including the slug ${currencyName}`})
            }
        
        }).catch(err => {
            console.log(err);
        })


 

       
    },

    

    async generateYesterdaySheet(req, res){
        const { code } = req.params;
        
        let baseURL;
        if(process.env.PROD != undefined){
            baseURL = 'https://currencyconverter-api.onrender.com'
        } else {
            baseURL = 'http://localhost:8080';
        }

        if(code != undefined && code !== null && code !== ""){
           axios.get(`${baseURL}/today/yesterday/${code}`, {
               raw: true
           }).then( async data => {

               if(data.data != undefined && data.data !== null){
                const report_generation_hour = moment().locale('pt-br').format('LT');
                   
            await XlsxPopulate.fromFileAsync(path.join(__dirname, '/templates/sheet-yesterday-today-template.xlsx'))
            .then(workbook => {

  

                const yesterday_value = data.data.yesterday.value;
                const yesterday_date = data.data.yesterday.date;
                const today_value = data.data.today.value;
                const today_date = data.data.today.date;
                const currency = data.data.today.currency;
                const code = data.data.today.code;
                const symbol = data.data.today.symbol;
                const difference = data.data.difference_between;
                const increased = data.data.increased;

                if(increased == false){
                    workbook.sheet("Cotações").cell('F2').value(`Diminuiu ${difference.replace('-', '')}`);
                } else if(increased === true){
                    workbook.sheet("Cotações").cell('F2').value(`Aumentou ${difference.replace('+', '')}`);
                } else {
                    workbook.sheet("Cotações").cell('F2').value('Nenhuma mudança');
                }

              
  
                workbook.sheet("Cotações").cell('A2').value(currency);
                workbook.sheet("Cotações").cell('B2').value(code);
                workbook.sheet("Cotações").cell('C2').value(symbol);

                workbook.sheet("Cotações").cell('D1').value(`Valor ontem (${yesterday_date})`);
                workbook.sheet("Cotações").cell('D2').value(yesterday_value);

                workbook.sheet("Cotações").cell('E1').value(`Valor hoje (${today_date})`);
                workbook.sheet("Cotações").cell('E2').value(today_value);

                workbook.sheet("Cotações").cell('F5').value(report_generation_hour);

                workbook.toFileAsync(path.join(__dirname, '/outputs/report-yesterday-today.xlsx')).then(() => {
                    res.download(path.join(__dirname, '/outputs/report-yesterday-today.xlsx'), 'relatorio.xlsx');  
                }).catch(err => {
                    console.log(err);
                });
           
                
            });
               }
           }).catch(err => {
               console.log(err);
           })
        } else {
            res.status(400).json({error: 'Please provide currency code to generate report'});
        }
        
     

    }

}
