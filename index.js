const express = require('express');
const bodyParser = require('body-parser');


require('dotenv').config();
const utils = require('./utils');
const Web3 = require('web3');
const app = express();
var mongoose = require('mongoose');
var config = require('./config');
const Tx = require('ethereumjs-tx');
const path = require('path');


//Mongoose connection
mongoose.connect(config.db.mongoURI, { useNewUrlParser: true })
    .then(() => console.log("DB connected", config.db.mongoURI))
    .catch(err => console.log('err'));


app.use(express.static(path.join(__dirname, "client/public")))


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
const Email = mongoose.model('EmailOTP');

require('./Models/EmailList');
const EmailList = mongoose.model('EmailList');

require('./Models/Mobile');
const Mobile = mongoose.model('MobileOTP');

require('./Models/MobileList');
const MobileList = mongoose.model('MobileList');


app.post('/addVoter', (req, res) => {

    console.log(req.body.hashedString);
    var web3js = new Web3(new Web3.providers.HttpProvider(process.env.RINKEBY));
    var myAddress = process.env.myAddress;
    console.log("my address", myAddress);
    var voterContract = new web3js.eth.Contract(JSON.parse(config.abi.factoryABI), config.contractAddresses.voterFactoryAddress);
    EmailList.findOne({ email: req.body.email })
        .then(emailfound => {
            if (emailfound) {
                console.log('email found');
                res.send("EmailAlreadyExists");
            }

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
                // res.send("CorrectOTP");
                MobileList.findOne({ mobile: req.body.number })
                    .then(mobilefound => {
                        if (mobilefound)
                            res.send("MobileAlreadyExists");
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
                            var count;
                            console.log("email and mobile verified");
                            // get transaction count, later will used as nonce
                            web3js.eth.getTransactionCount(myAddress).then(function (v) {
                                console.log("Count: " + v);
                                count = v;
                                var amount = web3js.utils.toHex(1e16);
                                //creating raw tranaction
                                var rawTransaction =
                                {
                                    "from": myAddress,
                                    "gasPrice": web3js.utils.toHex(20 * 1e9),
                                    "gasLimit": web3js.utils.toHex(210000),
                                    "to": config.contractAddresses.voterFactoryAddress,
                                    "value": "0x0",
                                    "data": voterContract.methods['addVoter(string)'](req.body.hashedString).encodeABI(),
                                    "nonce": web3js.utils.toHex(count)
                                }
                                console.log(rawTransaction);
                                //creating tranaction via ethereumjs-tx
                                var transaction = new Tx(rawTransaction);
                                //signing transaction with private key
                                transaction.sign(new Buffer(process.env.PrivateKey, 'hex'));
                                //sending transacton via web3js module
                                try {
                                    web3js.eth.sendSignedTransaction('0x' + transaction.serialize().toString('hex'))
                                        // .then(response=>{
                                        //     console.log(response);
                                        //     res.send(response.status);
                                        // })
                                        .on('transactionHash', function (hash) { res.send(hash) });
                                }
                                catch (e) {
                                    console.log(e);
                                    res.send('TxError');
                                }

                            })
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })

            }
        })
        .catch(err => {
            console.log(err);
        })



    // res.send('abc');
});

app.post('/emailOTP', (req, res) => {
    console.log(req.body);
    console.log("else");
    const otp = Math.floor(100000 + Math.random() * 900000)

    try {
        utils.email(req.body.email, otp.toString());
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
            .catch(err => {
                console.log("otp not saved to db");
                console.log(err);
            })
        res.send('sent');
    }
    catch (e) {
        console.log("email not saved", e);
        res.send('error');
    }
})

app.post('/smsOTP', (req, res) => {
    console.log(req.body);
    console.log("else");
    const otp = Math.floor(100000 + Math.random() * 900000)
    utils.sendSMS(otp.toString(), req.body.number);
    try {
        Mobile.findOne({ mobile: req.body.number })
            .then(mobobj => {
                if (mobobj) {
                    mobobj.otp = otp;
                    mobobj.save();
                }
                else {
                    const newMobile = new Mobile(
                        {
                            mobile: req.body.number,
                            otp: otp
                        }
                    );
                    newMobile.save();
                }
                console.log("mobile saved");
            })
        res.send('sent');
    }
    catch (e) {
        console.log("mobile not saved", e);
        res.send('error');

    }
})

app.post('/checkEmailOtp', (req, res) => {
    console.log("check Email otp");
    Email.findOne({ email: req.body.email })
        .then(obj => {
            if (obj) {
                console.log("now we will check otp");
                console.log("obj otp", obj.otp);
                console.log("req otp", req.body.emailOTP);
                if (obj.otp == req.body.emailOTP) {
                    console.log("otp verified");
                    res.send("CorrectOTP");
                }
                else {
                    //incorrect otp
                    res.send("IncorrectOTP");
                }
            }
            else {
                res.send("OTPObjNotFound")
            }
        })
        .catch(err => {
            console.log(err);
        })
})

app.post('/checkSMSotp', (req, res) => {
    console.log("check Mobile otp");
    console.log(req.body.number);
    Mobile.findOne({ mobile: req.body.number })
        .then(obj => {
            if (obj) {
                console.log("now we will check otp");
                console.log("obj otp", obj.otp);
                console.log("req otp", req.body.mobileOTP);
                if (obj.otp == req.body.mobileOTP) {
                    console.log("otp verified");
                    res.send("CorrectOTP");
                }
                else {
                    //incorrect otp
                    res.send("IncorrectOTP");
                }
            }
            else {
                res.send("OTPObjNotFound");
            }
        })
        .catch(err => {
            console.log(err);
        })
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "public", "index.html"));
});

var port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`server started at port ${port}`);
})

