import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { joinUser, requestAuth } from "../../redux/modules/user";
import farmlogo from "../../images/farmlogo.PNG";
import { useMovePage } from "../../hook/events";
import { useNavigate } from "react-router-dom";
// import Container from "../../elements/Container";

function Signup() {
  const dispatch = useDispatch();
  const response = useSelector(state => state.user.user_success)
  const navigate = useNavigate();
  console.log(response)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [authNumber, setAuthNumber] = useState("");

  // useEffect(() => {
  //   if(response){
  //     navigate('/')
  //   }
  // },[response]);

  const onSignupHandler = (e) => {
    e.preventDefault();
    dispatch(joinUser());
  };

  const Authorize = (e) => {
    e.preventDefault();
    const obj = {
      email: email,
    };
    dispatch(requestAuth(obj)).then(res => navigate('/'));
  };

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };
  const changeNickName = (e) => {
    setNickName(e.target.value);
  };
  const changeName = (e) => {
    setName(e.target.value);
  };
  const changePassword = (e) => {
    setPassword(e.target.value);
  };
  const changePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };
  const changeBirhDay = (e) => {
    setBirthDay(e.target.value);
  };
  const changeAuthNumber = (e) => {
    setAuthNumber(e.target.value);
  };

  return (
    <div>
      {/* 로고 삽입 위치 */}
      <LogoSignup>
        <Logo128 src={farmlogo} alt="React" />
      </LogoSignup>
      <Form onSubmit={Authorize}>
        {/* 인증번호 입력 */}
        <Row>
          <Input
            type="email"
            value={email}
            onChange={changeEmail}
            placeholder="이메일"
          />
          <Input
            placeholder="인증번호 6자리"
            style={{ width: "9.5em" }}
            value={authNumber}
            onChange={changeAuthNumber}
          />
          <Button type="submit" style={{ float: "right" }}>
            인증번호요청
          </Button>
        </Row>
      </Form>

      <Form>
        {/* 회원가입 개인 정보 입력 */}

        <Input type="text" placeholder="이름" />
        <Input placeholder="별명(10자 이내)" />
        <Input type="password" placeholder="비밀번호" />
        <Input type="password" placeholder="비밀번호 확인" />
        <Input placeholder="생년월일(8자리)" />
        <Input placeholder="전화번호(' - ' 제외)" />
      </Form>
      <Form onSubmit={onSignupHandler}>
        {/* 회원가입 완료 취소 버튼 */}
        <Row style={{ margin: "1em 0" }}>
          <Button
            type="button"
            style={{ width: "4.5em" }}
            onClick={useMovePage(-1)}
          >
            취소
          </Button>
          <Button
            type="submit"
            id="subBtn"
            style={{
              width: "11.5em",
              float: "right",
              background: "#b5f37e",
            }}
          >
            회원가입
          </Button>
        </Row>
      </Form>
      {/* <Container display="flex" flexDirection="column">
        <div>아</div>
        <div>아</div>
        <div>아</div>
      </Container> */}
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
