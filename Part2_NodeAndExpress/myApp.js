const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

//
app.use('/public', express.static(__dirname + '/public'));

// middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next(); // không có sẽ request mãi, trình duyệt ko load
});

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
