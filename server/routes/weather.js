const express = require('express');
const router = express.Router();
const axios = require('axios');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const {OpenWeatherSchema} = require('../models/Weather');
const {User} = require('../models/User');
const {Ground} = require('../models/Ground');
const cookieParser = require('cookie-parser');
router.use(cookieParser());


const findWeather = function(city_code,cb) {
    OpenWeatherSchema.findOne({city_code:city_code}, function(err,result){
        if(err) cb(err);
        else {
            if(!result) {
                updateWeather(city_code, function(UpdateResult) {
                    cb(UpdateResult);
                });
            } else {
                if(Date.now()-result.createdAt >= 3600000) {   //마지막 업데이트가 1시간 이상 지났을 경우
                    axios.get(`https://api.openweathermap.org/data/2.5/forecast?id=${city_code}&appid=${process.env.OPEN_WEATHER_KEY}&lang=kr&units=metric`)
                    .then((result) => {
                        updateWeather(city_code,result.data.city.coord.lat,result.data.city.coord.lon, function(UpdateResult) {
                            cb(UpdateResult);
                        });
                    })
                    .catch((err) => {
                        cb(err);
                    });
                } else {
                    cb(result);
                }
                
            }
        }
    }).lean();
}

const updateWeather = function(city_code,lat,lon,cb) {
    axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${process.env.OPEN_WEATHER_KEY}&lang=kr&units=metric`)
    .then((result) => {
        OpenWeatherSchema.updateOne({
            "city_code": {
                $eq:city_code
            }
        }, {
            $set: {
                "data":result.data,
                "createdAt":Date.now()
            }
        }, {
            upsert: true, //upsert : 해당 ducoment가 없으면 insert를 해줍니다.
            multi: true,
            new: true
        },function(err,result) {
            if(err) cb(err);
            else cb(result);
        }).lean();

        
    })
    .catch((err) => {
        cb(err);
    });
}

router.get("/", function (req, res) {
    const token = req.cookies.Token;
    let weatherData = [];
    jwt.verify(token,'헐',function(err,decoded) {
        if(err) res.send(err);
        else {
            Ground.find({user_id:decoded}, function(err,resultDB){
                if(err) res.send(err);
                else {
                    if(resultDB.length == 0) res.status(401).json({success:false, why:"cannot find user_id"})
                    else { //해당 유저의 밭을 찾았음
                        function setData(cb) {
                            for(const ground of resultDB){
                                findWeather(ground.city_code, function(result){
                                    weatherData.push({data:result});
                                    console.log(weatherData);
                                    console.log("위도경도");
                                });
                            }
                            cb();       //여기 코드 수정 필요,..
                        }
                        setData(function() {
                            console.log("여기로 넘어옴");
                            res.json({success:true, data:weatherData});
                        })
                    }
                }
            }).lean();
        }    
    })
});

module.exports = router;
