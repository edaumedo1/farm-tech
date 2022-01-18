const express = require("express");
const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.send("Hello World");
});

//통신예제용 간단한 코드. 무조건 true 반환
app.get("/api/memberlist", function (req, res) {
  console.log(req.body);
  res.json({
    success: true,
    member: ["김명진", "김덕주", "박건형", "양준석"],
  });
});

app.listen(port, () =>
  console.log(`서버가 켜졌습니다. 포트번호는 ${port} 입니다.2`)
);
