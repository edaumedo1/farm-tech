const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
router.use(cookieParser());
const Mail = require('../middleware/mail');
const {User,emailAuthentication} = require('../models/User');
const { JsonWebTokenError } = require('jsonwebtoken');


router.get('/',function(req,res,next){
    res.send('/api/user 입니다.');
})


router.post('/register', function(req,res) {
    const register_schema = new User(req.body);

    User.findOne({email:register_schema.email}).lean()
    .then((result) => {
        if(result) res.status(401).json({success:false, why:"Email already exists."});
        else {
            register();
        }
    })
    .catch((err) => res.status(500).json({success:false, why:err}))

    function register() {
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
    }
    
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

    deleteData(()=> {
        emailAuth_schema.save(function(err) {
            if(err) res.status(500).json({success:false, why:err});
            else sendEmail();
        });
    })
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

router.post('/find_pw', function(req,res) {
    emailAuthentication.findOne({email:req.body.email,auth_number:req.body.auth_number}, function(err,result) {
        if(err) res.status(500).json({success:false, why:err});
        else {
            if(!result) res.status(401).json({success:false, why:"Auth_Number mismatch."});
            else {
                User.findOne({email:req.body.email,birth_day:req.body.birth_day,name:req.body.name}, function(err,result) {
                    if(err) res.json({success:false, why:err});
                    else {
                        if(!result) res.status(401).json({success:true,requestAuth_success:false, why:"Authentication Time Expired or Email mismatch."});
                        else {
                            res.json({success:true,requestAuth_success:true}) //user를 찾았으니 'requestAuth_success:true' 값을 넘겨줌
                        }
                    }
                }).lean();
            }
        }
    }).lean();
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
                        else {
                            res.cookie('Token',token, {maxAge:21600000});
                            return res.status(200).json({success:true});
                        }
                    })   
                }
            })
        }
    })
    .catch((err) => {
        if(err) res.status(500).json({success:false, why:err});
    })
})

router.get('/auth', function(req,res) {
    const Token = req.cookies.Token;
    if(!Token) {
        res.status(401).send({success:true, isAuth:false, why:"Token not found."});
    } else {

        User.findOne({token:Token}) //methods로 연결할 때는 lean 쓰면 안됨
        .then((resultDB) => {
            if(!resultDB) res.status(500).json({success:true, isAuth:false, why:"not authed"});
            else {
                resultDB.verifyToken(function(result) {

                    if(result === false) res.status(401).json({success:true, isAuth:false, why:"Token verify failed."});
                    else res.json({
                        success:true,
                        isAuth:true,
                        birth_day:resultDB.birth_day,
                        email:resultDB.email,
                        name:resultDB.name,
                        nickname:resultDB.nickname
                    });
                })
            }

        })
        .catch((err) => {
            if(err) res.status(500).json({success:false, why:err});
        })
    }
})



module.exports = router;