const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: String,
    name: String,
    nickname: String,
    password: String,
    birth_day: Date,
    phone_number: String,
    auth_number: String
})

userSchema.pre('save', function() {

})

const User = mongoose.model("user", userSchema);

exports.userModel = User;