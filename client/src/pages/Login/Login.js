import React from "react";
import styled from "styled-components";
import farmlogo from "../../images/farmlogo.PNG";
import kakaologin from "../../images/kakao_login_ko/kakao_login_large_wide.png";

function Signup() {
  // const navigate = useNavigate();
  return (
    <div>
      {/* 로고 삽입 위치 */}
      <LogoSignup>
        <Logo128 src={farmlogo} alt="React" />
      </LogoSignup>
      <Form>
        {/* 회원가입 개인 정보 입력 */}
        <Input type="email" placeholder="이메일"></Input>
        <Input type="password" placeholder="비밀번호"></Input>
      </Form>
      <Form>
        {/* 인증번호 입력 */}
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
            <container></container>
            <img src={kakaologin} alt="React" style={{ width: "17em", height: "40px" }}/>
        </Row>
      </Form>
    </div>
  );
}

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

