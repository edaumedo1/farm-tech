const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const res = require('express/lib/response');
const cookieParser = require('cookie-parser');
const saltRounds = 5;

const userSchema = new mongoose.Schema({    //회원가입 스키마
    email: String,
    name: String,
    nickname: {type:String, unique:1},
    password: String,
    birth_day: String,
    phone_number: String,
    qualification_no: {type: String, default: 0},
    token: String
})

const emailAuthenticationSchema = new mongoose.Schema({
    email: String,
    auth_number: String,
    createdAt: { type: Date, expires: 1200, default: Date.now }
})

userSchema.pre('save', function(next){
    var user = this;
    if(user.isModified('password')) { //json중 비밀번호가 변경될 때에만
        //비밀번호를 암호화시킨다.
        bcrypt.genSalt(saltRounds, function(err,salt) {
            if(err) return next(err)
            bcrypt.hash(user.password, salt, function(err,hash) {
                if(err) return next(err)
                user.password = hash
                next()
            })
        })
    } else {
         next()
    }
})

userSchema.methods.comparePassword = function(password, cb) {
    bcrypt.compare(password, this.password, function(err,match) {
        if(err) cb(err,null);
        else cb(null, match);
    });
}

userSchema.methods.generateToken = function(cb) {
    var user = this;
    //json webToken을 이용해서 token 생성하기
    var token = jwt.sign(user._id.toHexString(), '헐');
    user.token = token;
    user.save(function(err) {
        if(err) return cb(err,null)
        cb(null, token)
    });
}

userSchema.methods.verifyToken = function(cb) {
    var info = this;
    var result = jwt.verify(info.token, '헐');
    
    if(JSON.stringify(result) === JSON.stringify(info._id)) cb(true);
    else cb(false);
}



const User = mongoose.model("user", userSchema);
const emailAuthentication = mongoose.model("temp_emailAuthentication", emailAuthenticationSchema);

module.exports = {User,emailAuthentication} 