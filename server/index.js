const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
const config = require('../config');
var mongoose = require('mongoose');

//Mongoose connection
mongoose.connect(config.db.mongoURI,{useNewUrlParser :true})
.then(()=> console.log("DB connected",config.db.mongoURI))
.catch(err => console.log(err));

//Model
require('./Models/Email');
const Email = mongoose.model('Email');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token,X-PINGOTHER");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});


app.get('/', (req, res) => {
    // console.log(req);
    res.send("welcome to node server");
});

app.get('/getData', (req,res) => {
    console.log(req);
    var dummy = 
        [
            {
                "question": "Best startup",
                "count": 5,
                "options": [
                    "Abc" ,"cde", "efg"
                ]
            },
            {
                "question": "Worst startup",
                "count": 3,
                "options": [
                    "Abc" ,"cde", "efg"
                ]
            }
        ]
    
    
    res.send(dummy);
}) 

app.post('emailOTP', (req,res) => {
    
})

var port = process.env.PORT || 5000;
// const port = 5000;
app.listen(port, () => {
    console.log(`server started at port ${port}`);
})

