const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({    //회원가입 스키마()
    email: String,
    name: String,
    nickname: String,
    password: String,
    birth_day: Date,
    phone_number: String
})
userSchema.pre('save', function() {

})

const emailAuthenticationSchema = new mongoose.Schema({
    email: String,
    auth_number: String,
    createdAt: { type: Date, expires: 600, default: Date.now }
})



const User = mongoose.model("user", userSchema);
const emailAuthentication = mongoose.model("temp_emailAuthentication", emailAuthenticationSchema);

exports.userModel = User;
exports.emailAuthModel = emailAuthentication;