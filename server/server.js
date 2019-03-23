const express = require('express');
const bodyParser = require('body-parser');
var request = require("request");
const decodeJWT = require('did-jwt').decodeJWT
const { Credentials } = require('uport-credentials')
const transports = require('uport-transports').transport
const message = require('uport-transports').message.util

const app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token,X-PINGOTHER");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// const credentials = new Credentials(
//     {
//         appName: 'Login ex',
//         did: 'did:ethr:0xb70c012691f341399e993dd2c05dfca49988dd00',
//         privateKey: '1fff04c70d2814a879afd9cc15d67ed171478b970c2243dc7146f9ee3217b0b0'
//     })

    const credentials = new Credentials({
        appName: 'Create Verification Example',
        did: 'did:ethr:0x31486054a6ad2c0b685cd89ce0ba018e210d504e',
        privateKey: 'ef6a01d0d98ba08bd23ee8b0c650076c65d629560940de9935d0f46f00679e01'
      })

let endpoint = '';
app.get('/', (req, res) => {
    credentials.createDisclosureRequest({
        notifications: true,
        accountType: 'keypair',
        network_id: '0x4',
        callbackUrl: endpoint + '/callback'
    }).then(requestToken => {
        console.log("req token", requestToken)
        console.log("decoded jwt req token", decodeJWT(requestToken))  //log request token to console
        const uri = message.paramsToQueryString(message.messageToURI(requestToken), { callback_type: 'post' })
        const qr = transports.ui.getImageDataURI(uri)
        res.send(`<div><img src="${qr}"/></div>`)
    })
})

app.post('/callback', (req, res) => {
    console.log("Callback hit")
    const jwt = req.body.access_token
    credentials.authenticateDisclosureResponse(jwt).then(creds => {
        // take this time to perform custom authorization steps... then,
        // set up a push transport with the provided 
        // push token and public encryption key (boxPub)
        const push = transports.push.send(creds.pushToken, creds.boxPub)

        const txObject = {
            to: creds.mnid,
            value: '10000000000000000',
        }

        credentials.createTxRequest(txObject, { callbackUrl: `${endpoint}/txcallback`, callback_type: 'post' }).then(attestation => {
            console.log(`Encoded JWT sent to user: ${attestation}`)
            return push(attestation)  // *push* the notification to the user's uPort mobile app.
        }).then(res => {
            console.log(res)
            console.log('Push notification sent and should be recieved any moment...')
            console.log('Accept the push notification in the uPort mobile application')
        })
    })
})

app.post('/txcallback', (req, res) => {
    console.log("txCallback hit")
    console.log(req.body)
    ngrok.disconnect()
  })

var port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server started at port ${port}`);
})