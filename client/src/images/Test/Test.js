import React, { useState, useEffect } from "react";
import axios from "axios";

function Test() {
  const [data, setData] = useState([]);

  const getData = () => {
    axios
      .get("/api/memberlist")
      .then((res) => setData(res.data.member))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
  }, []);
  console.log(data);
  return (
    <div>
      <h1>테스트 페이지입니다. 아래의 데이터는 맴버들입니다.</h1>
      {data.length !== 0
        ? data.map((el, index) => <div key={index}>{el}</div>)
        : ""}
    </div>
  );
}

export default Test;
