import React, { useState } from "react";
import styled from "styled-components";
import farmlogo from "../../images/farmlogo.PNG";
import kakaologin from "../../images/kakao_login_ko/kakao_login_large_wide.png";
import { Link } from "react-router-dom";
import { Container, Button, Form, Input } from "../../elements";
import {useNavigate} from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const changePassword = (e) => {
    setPassword(e.target.value);
  }

  const changeEmail = (e) => {
    setEmail(e.target.value);
  }

  return (
    <Container>
      {/* 로고 삽입 위치 */}
      <LogoSignup>
        <Logo128 src={farmlogo} alt="React" />
      </LogoSignup>
      <Form>
        {/* 회원가입 개인 정보 입력 */}
        <Input type="email" placeholder="이메일" value={email} onChange={changeEmail}></Input>
        <Input type="password" placeholder="비밀번호" value={password} onChange={changePassword} autoComplete="off"></Input>
      </Form>
      <Form>
        {/* 회원가입 완료 취소 버튼 */}
        <Row style={{ margin: "1em 0 0 0" }}>
          <Button
            type="submit"
            width= "17em"
            float= "right"
            background= "#b5f37e"
          >
            로그인
          </Button>
        </Row>
        <Row>
            <img src={kakaologin} alt="React" style={{ width: "17em", height: "40px" }}/>
        </Row>
      </Form>
      
      <Footer>
        <FooterSpan>
          <span>
          <span>이메일 찾기</span>∙<span>비밀번호 찾기</span> {/* 링크 좀 만들어줍쇼 */}
          </span>
          <Link to="/Signup">회원가입</Link>
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

const Row = styled.div`
  width: 17em;
`;

const Logo128 = styled.img`
  width: 128px;
  height: 128px;
`;

const LogoSignup = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export default Signup;

