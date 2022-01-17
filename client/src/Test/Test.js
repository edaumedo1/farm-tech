import React, { useState, useEffect } from "react";
import axios from "axios";

function Test() {
  const [data, setData] = useState([]);

  const getData = () => {
    axios.get("/api/memberlist").then((res) => setData(res.data));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1>테스트 페이지입니다.</h1>
      {data.length !== 0 && data}
    </div>
  );
}

export default Test;
