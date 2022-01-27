import React from "react";
import { Link } from "react-router-dom";
import { Container, Button, Form, Input, Img, Box, Center } from "../elements"; // STYLE

function Navigation() {

  return (// Link = to="": (JAVA)href=""
  
    <Box display="flex" gap="12px" position="fixed" bottom="0" fontSize="32px">
      <li>
        <Link to="/login">로그인</Link>
      </li>
      <li>
        <Link to="#">날씨</Link>
      </li>
      <li>
        <Link to="/">홈</Link>
      </li>
      <li>
        <Link to="/#">달력</Link>
      </li>
      <li>
        <Link to="/#">프로필</Link>
      </li>
    </Box>
  );
}



export default Navigation;