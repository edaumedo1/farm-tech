const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();
const {OpenWeatherSchema} = require('../models/Weather');
const {User} = require('../models/User');
const cookieParser = require('cookie-parser');
router.use(cookieParser());

router.get("/", function (req, res) {
    // User.findOne({email:"myungjin2009@naver.com"}, function(err,result) {
    //     if(err) res.status(500).send(err);
    //     else {
    //         res.send(result);
    //     }
    // })
    res.send(req.cookies);
});

module.exports = router;

// const lat = 33.41283843373984;
//     const lon = 126.49424853165073;
//     axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${process.env.OPEN_WEATHER_KEY}&lang=kr&units=metric`)
//     .then((result) => {
//         const weatherDB = new OpenWeatherSchema({
//             city_code: "123",
//             lat: lat,
//             lon: lon,
//             data: result.data
//         });
//         weatherDB.save(function(err,result){
//             if(err) res.send(err);
//             else res.send(result);
//         });
//     })
//     .catch((err) => {
//         res.status(500).send(err);
//     });