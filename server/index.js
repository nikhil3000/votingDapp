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
mongoose.connect(config.db.mongoURI, { useNewUrlParser: true })
    .then(() => console.log("DB connected", config.db.mongoURI))
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

require('./Models/EmailList');
const EmailList = mongoose.model('EmailList');

require('./Models/Mobile');
const Mobile = mongoose.model('Mobile');

require('./Models/MobileList');
const MobileList = mongoose.model('MobileList');

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


app.post('/emailOTP', (req, res) => {
    console.log(req.body);
    console.log("else");
    const otp = Math.floor(100000 + Math.random() * 900000)
    utils.email(req.body.email, otp.toString());

    try {
        Email.findOne({ email: req.body.email })
            .then(emailobj => {
                if (emailobj) {
                    emailobj.otp = otp;
                    emailobj.save();
                }
                else {
                    const newEmail = new Email(
                        {
                            email: req.body.email,
                            otp: otp
                        }
                    );
                    newEmail.save();
                }
                console.log("email saved");
            })
        
    }
    catch (e) {
        console.log("email not saved", e);
    }
})

app.post('/smsOTP', (req, res) => {
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

app.post('/checkEmailOtp', (req, res) => {
    console.log("check Email otp");
    Email.findOne({ email: req.body.email })
        .then(obj => {
            if (obj) {
                console.log("now we will check otp");
                console.log("obj otp",obj.otp);
                console.log("req otp",req.body.emailOTP);
                if (obj.otp == req.body.emailOTP) {
                    console.log("otp verified");
                    EmailList.findOne({ email: req.body.email })
                        .then(emailfound => {
                            if (emailfound)
                                res.send("Email already exists");
                            else {
                                const newEmailList = new EmailList(
                                    {
                                        email: req.body.email
                                    }
                                );

                                try {
                                    newEmailList.save()
                                }
                                catch (e) {
                                    console.log(e);
                                }
                                res.send("Successfully registered");
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        })

                }
            }
            else {
                res.send("Resend OTP?")

            }
        })
        .catch(err=>{
            console.log(err);
        })
})

app.post('/checkSMSotp', (req, res) => {
    console.log("check Mobile otp");
    Mobile.findOne({ mobile: req.body.number })
        .then(obj => {
            if (obj) {
                console.log("now we will check otp");
                console.log("obj otp",obj.otp);
                console.log("req otp",req.body.mobileOTP);
                if (obj.otp == req.body.mobileOTP) {
                    console.log("otp verified");
                    EmailList.findOne({ mobile: req.body.number })
                        .then(mobilefound => {
                            if (mobilefound)
                                res.send("Mobile number already exists");
                            else {
                                const newMobileList = new MobileList(
                                    {
                                        mobile: req.body.number
                                    }
                                );

                                try {
                                    newMobileList.save()
                                }
                                catch (e) {
                                    console.log(e);
                                }
                                res.send("Successfully registered");
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        })

                }
            }
            else {
                res.send("Resend OTP?")

            }
        })
        .catch(err=>{
            console.log(err);
        })
})

var port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server started at port ${port}`);
})

