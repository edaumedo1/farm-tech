import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Signup from "../pages/Signup/Signup";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import KakaoRedicrection from "./KakaoRedicrection";
import Email from "../pages/Help/Email";
import Navigation from "../components/Navigation";
import Pw from "../pages/Help/Pw";
import auth from "../hoc/auth";
import Weather from "../pages/Weather/Weather";
import UpdatePw from "../pages/Help/UpdatePw";
import Calendar from "../pages/Calendar/Calendar";

function App() {
  return (
    <BrowserRouter>
      {/* 페이지로써 라우팅 */}
      <Navigation/>
      <Routes>
        <Route path="/" element={auth(Home, true)}></Route>
        <Route path="/signup" element={auth(Signup, false)}></Route>
        <Route path="/login" element={auth(Login, false)}></Route>
        <Route path="/oauth/kakao/*" element={auth(KakaoRedicrection, false)} />
        <Route path="/help/email" element={auth(Email, false)}></Route>
        <Route path="/help/pw" element={auth(Pw, false)}></Route>
        <Route path="/help/update_pw" element={auth(UpdatePw, false)}></Route>
        <Route path="/weather" element={auth(Weather, null)}></Route>
        <Route path="/calendar" element={auth(Calendar, null)}></Route>
        <Route path="*" element={<div>없는 페이지</div>}></Route>
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
