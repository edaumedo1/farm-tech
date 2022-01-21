const express = require('express');
const router = express.Router();
const Mail = require('../middleware/mail');
const {User,emailAuthentication} = require('../models/User');


router.get('/',function(req,res,next){
    res.send('/api/user 입니다.');
})


router.post('/register', function(req,res) {
    const register_schema = new User(req.body);

    emailAuthentication.findOne({email:register_schema.email}).lean()
    .then((result) => {
        if(!result) res.status(401).json({success:false, why:"Authentication Time Expired or Email mismatch."})
        else {
            if(req.body.auth_number.trim() !== result.auth_number) {   //인증번호 일치하는지 확인
                res.status(401).json({success:false, why:"Auth_Number mismatch."})
            } else {
                register_schema.save(function(err) {                 //users DB에 회원정보 저장, pre hook으로 bcrypt 암호화(models-User.js) 회원가입 성공
                    if(err){
                        if(err.keyPattern.nickname == 1) {
                            res.status(401).json({success:false, why:"nickName already exists."})
                        } else {
                            console.log(err);
                            res.status(401).json({success:false, why:err})
                        }
                    } else {
                        res.status(200).json({success:true});
                    } 
                })
            }
        }
    })
})

router.post('/email', function(req,res){
    const email_url = req.body.email.trim();
    const num = Math.floor(Math.random()*(999999-100000+1)) + 100000; //인증번호 생성기
    const emailAuth_schema = new emailAuthentication({
        email: email_url,
        auth_number: num
    });

    function deleteData (callback) {
        emailAuthentication.deleteMany ({email:email_url}, function(err) {
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

    User.findOne({email:email_url}).lean()
    .then((result) => {
        if(result) res.status(401).json({success:false, why:"Email already exists."});
        else {
            deleteData(()=> {
                emailAuth_schema.save(function(err) {
                    if(err) res.status(500).json({success:false, why:err});
                    else sendEmail();
                });
            })
        }
    })
    .catch((err) => res.status(500).json({success:false, why:err}))
})

router.post('/find_email', function(req,res) {
    User.findOne({name:req.body.name, birth_day:req.body.birth_day, phone_number:req.body.phone_number}).lean()
    .then((result) => {
        if(!result) res.status(401).json({success:false, why:"user not exists."});
        else res.status(200).json({success:true, email:result.email});
    })
    .catch((err) => {
        res.status(500).json({success:false, why:err});
    })  
})

router.post('/login', function(req,res) {
    User.findOne({email:req.body.email})
    .then((resultDB) => {
        if(!resultDB) res.status(401).json({success:false, why:"email not exists."})
        else {
            resultDB.comparePassword(req.body.password, (err,result) => {
                if(err) res.status(500).json({success:false, why:err});
                else if(!result) res.status(401).json({success:false, why:"password mismatch."});
                else {
                    resultDB.generateToken(function(err,token) {
                        if (err) res.status(500).json({success:false, why: err});
                        else return res.status(200).json({success:true, token: token});
                    })   
                }
            })
        }
    })
    .catch((err) => {
        if(err) res.status(500).json({success:false, why:err});
    })
})

module.exports = router;