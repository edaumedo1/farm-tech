const express = require('express');
const router = express.Router();
const Mail = require('../middleware/mail');
const userSchema = require('../models/User');


router.get('/',function(req,res,next){
    res.send('/api/user 입니다.');
})


router.post('/register', function(req,res) {
    const register_schema = new userSchema.userModel({
        email: req.body.email,
        name: req.body.name,
        nickname: req.body.nickname,
        password: req.body.password,
        birth_day: req.body.birth_day,
        phone_number: req.body.phone_number,
        auth_number: req.body.auth_number
    })
    console.log(register_schema);
    res.status(200).json({success:true, contents:register_schema});
})

router.post('/email', function(req,res){
    const email_url = req.body.email;
    const num = Math.floor(Math.random()*(999999-100000+1)) + 100000; //인증번호 (임시)

    Mail.sendEmail(
        email_url,
        `팜테크 FarmTech 회원가입 인증번호`,
        `인증번호는 ${num} 입니다.`,
        (result) => {
            if (result.success === true) res.status(200).json({success:true});
            else res.status(500).json({success:false, why:result.reason});
        }
    )
})

module.exports = router;