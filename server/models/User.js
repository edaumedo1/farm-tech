const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: String,
    name: String,
    nickname: String,
    password: String,
    birth_day: Date,
    phone_number: Number,
    auth_number: String
})

const User = mongoose.model("user", userSchema);

exports.User = User;