const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();



app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token,X-PINGOTHER");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});


app.get('/', (req, res) => {
    // console.log(req);
    res.send("welcome to node server");
});

var port = process.env.PORT || 5000;
// const port = 5000;
app.listen(port, () => {
    console.log(`server started at port ${port}`);
})

