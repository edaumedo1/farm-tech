const mongoose = require('mongoose');


const GroundSchema = new mongoose.Schema({
    name:String,
    classification:Number,
    favorite:Boolean,
    acreage:Number,
    address:String,
    reclamation_day:{
        type: Date,
        default: Date.now
    },
    user_id:String,
    city_code:Number
});


const Ground = mongoose.model("grounds", GroundSchema);
module.exports = {Ground};