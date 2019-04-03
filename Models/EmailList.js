const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmailListSchema = new Schema ({
    email:String
})

mongoose.model('EmailList',EmailListSchema);