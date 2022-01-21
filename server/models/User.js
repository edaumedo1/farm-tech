const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 5;

const userSchema = new mongoose.Schema({    //회원가입 스키마
    email: String,
    name: String,
    nickname: {type:String, unique:1},
    password: String,
    birth_day: String,
    phone_number: String,
    qualification_no: {type: String, default: 0}
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





const User = mongoose.model("user", userSchema);
const emailAuthentication = mongoose.model("temp_emailAuthentication", emailAuthenticationSchema);

// exports.userModel = User;
// exports.emailAuthModel = emailAuthentication;

module.exports = {User,emailAuthentication} 