const express = require('express');
const bodyParser = require('body-parser');
var request = require("request");
const fs = require('fs');
require('dotenv').config();
const utils = require('./utils');
const app = express();


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token,X-PINGOTHER");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});



app.get('/sms', (req, res) => {
    utils.sendSMS("435782", "+919868954717", res);
});

app.get('/email', (req, res) => {
    fs.readFile(__dirname + 'mail.html', 'utf8', function (err, html) {
        utils.email('nikhilyadav3000@gmail.com', "Welcome to idf");
    });
})

app.get('/getData', (req, res) => {
    var dummy =
        [
            {
                "question": "Best startup",
                "options": [
                    "Abc", "cde", "efg"
                ]
            },
            {
                "question": "Worst startup",
                "options": [
                    "Abc", "cde", "efg"
                ]
            }
        ]
    res.send(dummy);
})


var port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server started at port ${port}`);
})

