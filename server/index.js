const express = require('express')
const app = express()
const port = 3000;

app.use(express.json()); 
app.use(express.urlencoded( {extended : false } ));

app.get('/', function (req, res) {
  res.send('Hello World')
})


//통신예제용 간단한 코드. 무조건 true 반환
app.get('/api/memberlist', function (req,res) {
    console.log(req.body);
    return res.json({success:true});
})

//에러 페이지 로드 404
app.use(function(req, res, next) {
     res.status(404).send('찾고자 하는 페이지가 없습니다. (404)');
});


app.listen(port, () => console.log(`서버가 켜졌습니다. 포트번호는 ${port} 입니다.2`));