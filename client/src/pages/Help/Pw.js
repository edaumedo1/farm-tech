import React, { useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { loginUser } from "../../redux/modules/user";
import farmlogo from "../../images/farmlogo.PNG";
import kakaologin from "../../images/kakao_login_ko/kakao_login_large_wide.png";
import { Container, Button, Form, Input, Img, Box, Center } from "../../elements"; // STYLE
import { kakao_uri } from '../../common/KakaoInfo';

function Pw() {
 

  return (
    <Container>
        비밀번호찾기 페이지입니다.
    </Container>
  );
}

export default Pw;

