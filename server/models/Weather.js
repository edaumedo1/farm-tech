const mongoose = require('mongoose');


const openWeatherSchema = new mongoose.Schema({    //Open Weather DB 스키마
    city_code: Number,
    lat: Number,
    lon: Number,
    data: Object,
    createdAt: { type: Date, default: Date.now }
})

// openWeatherSchema.pre('save', function(next){

// })

// userSchema.methods.comparePassword = function(password, cb) {

// }

const OpenWeatherSchema = mongoose.model("openWeather", openWeatherSchema);

module.exports = {OpenWeatherSchema}