const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT, ()=>console.log(`now listening on port ${PORT}`))


app.get('/api/quotes/random', (req, res, next) =>{
    res.send(getRandomElement(quotes))
})

app.get('/api/quotes', (req, res, next) =>{
    if(req.query.person){
        res.send(quotes.filter(item => item.person === req.query.person))
    }else{
        res.send(quotes)
    }
})

app.post('/api/quotes', (req, res, next) =>{
    if(req.query.quote && req.query.person){
        let item = { quote: req.query.quote, person: req.query.person }
        quotes.push(item)
        res.send({quote: item})
    } else{
        res.status(400).send()
    }
})