import React from "react";
import styled from "styled-components";
import farmlogo from "../../images/farmlogo.PNG";
import { useBackpage } from "../../events/useButton";

function Signup() {
  return (
    <div>
      {/* 로고 삽입 위치 */}
      <LogoSignup>
        <Logo512 src={farmlogo} alt="React" />
      </LogoSignup>
      <Form>
        {/* 회원가입 개인 정보 입력 */}
        <Input type="email" placeholder="이메일"></Input>
        <Input type="text" placeholder="이름"></Input>
        <Input placeholder="별명(10자 이내)"></Input>
        <Input type="password" placeholder="비밀번호"></Input>
        <Input type="password" placeholder="비밀번호 확인"></Input>
        <Input placeholder="생년월일(8자리)"></Input>
        <Input placeholder="전화번호(' - ' 제외)"></Input>
      </Form>
      <Form>
        {/* 인증번호 입력 */}
        <Row>
          <Input
            placeholder="인증번호 6자리"
            style={{ width: "9.5em" }}
          ></Input>
          <Button type="submit" style={{ float: "right" }}>
            인증번호요청
          </Button>
        </Row>
      </Form>
      <Form>
        {/* 회원가입 완료 취소 버튼 */}
        <Row style={{ margin: "1em 0" }}>
          <Button
            type="button"
            style={{ width: "4.5em" }}
            onClick={ useBackpage() }
          >
            취소
          </Button>
          <Button
            type="submit"
            style={{ 
              width: "11.5em", 
              float: "right", 
              background: "#b5f37e" 
            }}
          >
            회원가입
          </Button>
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
const Logo512 = styled.img`
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
