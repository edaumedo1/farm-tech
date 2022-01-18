require('dotenv').config();
const mongoose = require('mongoose');

const URI = process.env.MONGO_URI;

function connect() {
    mongoose
    .connect(URI)
    .then(() => {
        console.log("몽고DB 연결됨");
    })
    .catch((err) => {
        console.log("1. 몽고DB 연결 실패!");
        console.log(`2. System : ${err.message}`);
        if(err.message === "bad auth : Authentication failed.") {
            console.log("3. .env파일에 적힌 계정의 패스워드가 올바르지 않음.");
            console.log("4. .env파일에서 패스워드를 올바르게 적었는지 확인할 것.");
            console.log("5. 패스워드는 팜프롬홈 단톡방 공지사항에 있음");
        } else if (err.message = "undefined") {
            console.log("3. .env파일이 없음.");
            console.log("4. .env파일을 다운받아서 최상위 폴더에 위치시킬 것.");
            console.log("5. .env파일은 노션에 있음");
        } else {
            console.log(err);
            console.log("원인 불명. 백엔드 팀한테 지원요청 할 것!");
        }
    })
}

exports.connect = connect;
