require('dotenv').config();
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
    auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_PASSWD
    }
});


function sendEmail(who,title,contents,callback) {
    transporter.sendMail({
        from: `팜테크 FarmTech`,
        to: who,
        subject: title,
        text: contents
        /*html: `<b>${generatedAuthNumber}</b>`
           html도 가능하다.*/
    }).then(()=>{
        console.log("메일을 성공적으로 송신했습니다.");
        callback ({success:true});
    }).catch((err) => {
        console.log("메일 전송을 실패했습니다.");
        console.log(err);
        callback ({success:false, reason: err});
    })
}

exports.sendEmail = sendEmail;