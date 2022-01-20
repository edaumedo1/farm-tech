const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Mail = require('../middleware/mail');
const userSchema = require('../models/User');

const emailAuth_DB = mongoose.model('temp_emailAuthentication');    //temp_emailAuthentication DB
const user_DB = mongoose.model('user');                             //users DB


router.get('/',function(req,res,next){
    res.send('/api/user 입니다.');
})


router.post('/register', function(req,res) {
    const register_schema = new userSchema.userModel(req.body);
    emailAuth_DB.findOne({email:register_schema.email}, function(err,result) {
        if(err) {
            res.status(401).json({success:false, why:err})
        } else if (result == null) {
            res.status(401).json({success:false, why:"Authentication Time Expired or Email mismatch. 이메일 인증 시간이 초과되었거나, 인증된 이메일과 가입하는 이메일이 틀림."})
        } else {
            if(req.body.auth_number.trim() === result.auth_number) {   //인증번호 일치하는지 확인
                register_schema.save(function(err) {                 //users DB에 회원정보 저장, pre hook으로 bcrypt 암호화(models-User.js) 회원가입 성공
                    if(err){
                        if(err.keyPattern.nickname == 1) {
                            res.status(401).json({success:false, why:"nickName exists. 닉네임 중복됨"})
                        } else {
                            console.log(err);
                            res.status(401).json({success:false, why:err})
                        }
                    } else {
                        res.status(200).json({success:true});
                        // emailAuth_DB.deleteMany({email:register_schema.email}, function(err){
                        //     if(err) console.log(err);
                        // }); 굳이 여기서 안지워줘도, expires 함수에 의해 600초 후에 자동 말소됨(model-User.js-emailAuthenticationSchema) (불필요한 세션 줄이기)
                    }
                })
            } else {
                res.status(401).json({success:false, why:"Auth_Number mismatch. 인증번호 불일치"})
            }
        }
    })
})

router.post('/email', function(req,res){
    const email_url = req.body.email.trim();
    const num = Math.floor(Math.random()*(999999-100000+1)) + 100000; //인증번호 생성기
    //const emailAuth_DB = mongoose.model("temp_emailAuthentication");
    const emailAuth_schema = new userSchema.emailAuthModel({
        email: email_url,
        auth_number: num
    });

    function deleteData (callback) {
        emailAuth_DB.deleteMany ({email:email_url}, function(err) {
            if(err) console.log(err);
            callback();
        })
    }
    
    function sendEmail() {
        Mail.sendEmail(
            email_url,
            `팜테크 FarmTech 회원가입 인증번호`,
            `인증번호는 ${num} 입니다.`,
            (result) => {
                if (result.success === true) res.status(200).json({success:true});
                else res.status(500).json({success:false, why:result.reason});
            }
        )
    }

    user_DB.findOne({email:email_url}, function(err,result) {
        if(err) console.log(err);
        else if(result != null) {
            res.status(401).json({success:false, why:"Email already exists. 이미 가입된 이메일"})
        } else {
            deleteData(()=> {
                emailAuth_schema.save(function(err) {
                    if(err) res.status(500).json({success:false, why:err});
                    else sendEmail();
                });
            })
        }
    })
})

router.post('/find_email', function(req,res) {
    const birthday = new Date(req.body.birth_day);
    user_DB.findOne({name:req.body.name, birth_day:birthday, phone_number:req.body.phone_number}, function(err,result) {
        if(err) {
            res.status(500).json({success:false, why:err})
        } else if(result == null) {
            res.status(401).json({success:false, why:"user not exists. 일치하는 회원정보 없음"})
        } else {
            res.status(200).json({success:true, email:result.email});
        }
    })
})


/* 인증번호 따로 처리하는 부분
router.post('/auth_number',function(req,res) {
    const received_number = req.body.auth_number;
})
*/

module.exports = router;