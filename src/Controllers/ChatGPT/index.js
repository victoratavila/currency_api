const express = require('express');
const axios = require('axios')

// New
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: ''
});


module.exports = {

    async checkData(req, res){
    
        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{"role": "user", "content": "Quem é o presidente do Brasil?"}],
            max_tokens:30
          }).then(() => {
            console.log(chatCompletion.choices[0].message);
          }).catch(err => {
            res.json(err)
          });


    }

}

