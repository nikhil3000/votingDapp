const express = require('express');
const bodyParser = require('body-parser');
var request = require("request");
const fs = require('fs');
require('dotenv').config();
const utils = require('./utils');
const app = express();
const config = require('../config');
var mongoose = require('mongoose');

//Mongoose connection
mongoose.connect(config.db.mongoURI,{useNewUrlParser :true})
.then(()=> console.log("DB connected",config.db.mongoURI))
.catch(err => console.log(err));



app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token,X-PINGOTHER");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('./Models/Email');
const Email = mongoose.model('Email');

require('./Models/Mobile');
const Mobile = mongoose.model('Mobile');

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
                "count": 5,
                "options": [
                    "Abc", "cde", "efg"
                ]
            },
            {
                "question": "Worst startup",
                "count": 3,
                "options": [
                    "Abc", "cde", "efg"
                ]
            }
        ]
    res.send(dummy);
})


app.post('/emailOTP', (req,res) => {
    console.log(req.body);
    console.log("else");
            const otp = Math.floor(100000 + Math.random() * 900000)
            utils.email(req.body.email, otp.toString());
            const newEmail = new Email(
                {
                    email: req.body.email,
                    otp: otp
                }
            );
            newEmail.save()
})

app.post('/smsOTP', (req,res) => {
    console.log(req.body);
    console.log("else");
    const otp = Math.floor(100000 + Math.random() * 900000)
    utils.sendSMS(otp.toString(), req.body.number);
    const newMobile = new Mobile(
        {
            mobile: req.body.number,
            otp: otp
        }
    );
    newMobile.save()
})

var port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server started at port ${port}`);
})

