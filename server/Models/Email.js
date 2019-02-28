const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmailSchema = new Schema ({
    email:String,
    otp:String
})

mongoose.model('Email',EmailSchema);