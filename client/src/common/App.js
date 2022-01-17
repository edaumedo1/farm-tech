import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Signup from "../pages/Signup/Signup";
import Home from "../pages/Home/Home";
import Test from "../pages/Test/Test";

function App() {
  return (
    <BrowserRouter>
      {/* 페이지로써 라우팅 */}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Signup" element={<Signup />}></Route>
        <Route path="/Test" element={<Test />}></Route>
      </Routes>
      {/* <Routes>
        <Route path="/" element={<Home />}>
        // 컴포넌트로써 라우팅
        <Route path=":foods" element={<Detail />}></Route>
        <Route path="/about" element={<About />}></Route>
      </Routes> */}
    </BrowserRouter>
  );
}

export default App;
