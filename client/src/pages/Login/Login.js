import React from "react";
import styled from "styled-components";
import farmlogo from "../../images/farmlogo.PNG";
import kakaologin from "../../images/kakao_login_ko/kakao_login_large_wide.png";
import { Link } from "react-router-dom";

function Signup() {
  // const navigate = useNavigate();
  return (
    <Container>
      {/* 로고 삽입 위치 */}
      <LogoSignup>
        <Logo128 src={farmlogo} alt="React" />
      </LogoSignup>
      <Form>
        {/* 회원가입 개인 정보 입력 */}
        <Input type="email" placeholder="이메일"></Input>
        <Input type="password" placeholder="비밀번호" autoComplete="off"></Input>
      </Form>
      <Form>
        {/* 회원가입 완료 취소 버튼 */}
        <Row style={{ margin: "1em 0 0 0" }}>
          <Button
            type="submit"
            style={{
              width: "17em",
              float: "right",
              background: "#b5f37e",
            }}
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

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -70%);
`;

const Row = styled.div`
  width: 17em;
`;

const Button = styled.button`
  width: 6.5em;
  height: 40px;
  margin: 10px 0;
  // padding: 1px 15px;
  border-radius: 10px;
  border-style: none;
  font-size: 16px;
`;
const Logo128 = styled.img`
  width: 128px;
  height: 128px;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
`;

const Input = styled.input`
  width: 17em;
  height: 40px;
  margin: 10px 0;
  padding: 1px 15px;
  border-radius: 10px;
  border-style: none;
  border: 1px solid #89db41; //11A83C
  font-size: 16px;
`;

const LogoSignup = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export default Signup;

