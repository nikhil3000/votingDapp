const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MobileSchema = new Schema ({
    mobile:String,
    otp:String
})

mongoose.model('Mobile',MobileSchema);