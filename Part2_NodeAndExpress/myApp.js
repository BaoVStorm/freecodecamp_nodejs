const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();
const app = express();

// middleware | Use body-parser to Parse POST Requests
// dùng để cho phép dùng req.body
app.use(bodyParser.urlencoded({extended: false}))

// middleware
app.use('/public', express.static(__dirname + '/public'));

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next(); // không có sẽ request mãi, trình duyệt ko load
});


// --------------------------------- 

// routes with middleware
app.get('/now', (req, res, next) => {
    req.time = new Date().toString();
    next();
}, (req, res) => {
    res.json({
        time: req.time
    })
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

// Get Route Parameter Input from the Client
app.get('/:word/echo', (req, res) => {
    const { word } = req.params;

    res.json({
        echo: word
    })
})

// Get Query Parameter Input from the Client
app.get('/name', (req, res) => {
    const { first, last } = req.query;
    
    res.json({
        name: `${first} ${last}`
    });
})

// Get Data from POST Requests
app.post('/name', (req, res) => {
    const { first, last } = req.body;
    
    res.json({
        name: `${first} ${last}`
    });
})

















module.exports = app;
