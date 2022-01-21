require('dotenv').config();
const mongoose = require('mongoose');

function connect() {
    mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("[backend] 몽고DB 연결됨");
    })
    .catch((err) => {
        const mongoError = err.message;
        setTimeout(() => {
            console.log("!--------------------!");
            console.log("[backend] 1. 몽고DB 연결 실패!");
            console.log("[backend] 2. " + mongoError);
            if(mongoError.indexOf("bad auth : Authentication failed.") !== -1 ) {
                console.log("[backend] 3. .env파일에 적힌 계정의 패스워드가 올바르지 않음.");
                console.log("[backend] 4. .env파일에서 패스워드를 올바르게 적었는지 확인할 것.");
                console.log("[backend] 5. 패스워드는 팜프롬홈 단톡방 공지사항에 있음");
            } else if (mongoError.indexOf("IP that isn't whitelisted") !== -1 ) {
                console.log("[backend] 3. 현재 IP가 허용되지 않음.");
                console.log("[backend] 4. 몽고DB Atlas에 가서 현재 IP를 화이트리스트에 추가할 것.");
                console.log("[backend] 5. 구글에 '몽고DB IP화이트리스트' 검색하면 방법 나옴.");
            } else if (mongoError.indexOf("undefined") !== -1 ) {
                console.log("[backend] 3. .env파일이 없음.");
                console.log("[backend] 4. .env파일을 다운받아서 최상위 폴더에 위치시킬 것.");
                console.log("[backend] 5. .env파일은 노션 Farm Tech 페이지에 있음");
            } else {
                console.log(err);
                console.log("[backend] 원인 불명. 백엔드 팀한테 지원요청 할 것!");
            }
        }, 1500);
    })
}

module.exports = {connect};
