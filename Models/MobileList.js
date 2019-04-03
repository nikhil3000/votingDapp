const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MobileListSchema = new Schema ({
    mobile:String
})

mongoose.model('MobileList',MobileListSchema);