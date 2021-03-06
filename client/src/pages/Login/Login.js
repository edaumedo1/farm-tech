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

function Login() {
  // 사용할 모듈 선언
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // 인가 코드 받음을 알리는 콘솔로그
  console.log(location);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const changePassword = (e) => {
    setPassword(e.target.value);
  }

  const changeEmail = (e) => {
    setEmail(e.target.value);
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if(email === "" || password === ""){
      return alert('이메일과 비밀번호 모두 입력해주세요!');
    }
    const obj = {
      email,
      password
    }
    dispatch(loginUser(obj)).then(res => {
      if(res.payload.success){
        navigate('/home');
      }
    });
    
  }
  const onClickHandler = () => {
    window.location.href = kakao_uri;
  }

  return (
    <Container>
      {/* 로고 삽입 위치 */}
      <Center>
        <Img src={farmlogo} alt="React" />
      </Center>
      <Form onSubmit={onSubmitHandler}>
        {/* 회원가입 개인 정보 입력 */}
        <Input type="email" placeholder="이메일" value={email} onChange={changeEmail}></Input>
        <Input type="password" placeholder="비밀번호" value={password} onChange={changePassword} autoComplete="off"></Input>
        {/* 회원가입 완료 취소 버튼 */}
        <Box>
          <Button
            type="submit"
            width= "17em"
            float= "right"
            background= "#b5f37e"
          >
            로그인
          </Button>
        </Box>
        <Box>
            <Img src={kakaologin} alt="React" onClick={onClickHandler} width="17em" height="40px"/>
        </Box>
      </Form>
      <Footer>
        <FooterSpan>
          <span>
          <Link to="/help/email">이메일 찾기</Link>
          ∙
          <Link to="/help/pw">비밀번호 찾기</Link> {/* 링크 좀 만들어줍쇼 */}
          </span>
          <Link to="/signup">회원가입</Link>
        </FooterSpan>
      </Footer>
    </Container>
  );
}

const Footer = styled.div`
  text-align: center;
  font-size: 13px;
`;

const FooterSpan = styled.span`
  width: 21em;
  gap: 76px;
  display: inline-flex;
  justify-content: space-around;
`;

export default Login;

