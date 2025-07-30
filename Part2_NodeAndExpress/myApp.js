const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

console.log("Hello World");

//
app.use('/public', express.static(__dirname + '/public'));

app.get('/', (req, res) =>{
    res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", (req, res) => {

    const text = 'Hello json';
    res.json({
        "message": (process.env.MESSAGE_STYLE === 'uppercase' ? text.toLocaleUpperCase() : text),
    })
});





















module.exports = app;
