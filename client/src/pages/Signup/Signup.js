import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { joinUser, requestAuth } from "../../redux/modules/user";
import farmlogo from "../../images/farmlogo.PNG";
import { useMovePage } from "../../hook/events";
import useTimer from "../../hook/useTimer";
// import Container from "../../elements/Container";

function Signup() {
  const dispatch = useDispatch();
  const { minutes, seconds, setMinutes, setSeconds } = useTimer({ mm: 0, ss: 0 });
  // const auth_number_success = useSelector(state => state.user.auth_number_success);

  const authBtn = useRef(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [authNumber, setAuthNumber] = useState("");
  const [successData, setSuccessData] = useState(false);

  useEffect(() => {
    if(minutes === 0 && seconds === 0){
      console.log("타이머 초기화 상태");
      authBtn.current.disabled = false;
      setSuccessData(false);
      return;
    }
  }, [minutes, seconds])

  const onSignupHandler = (e) => {
    e.preventDefault();
    dispatch(joinUser());
  };

  //인증번호 요청할 때 사용하는 함수
  const Authorize = (e) => {
    e.preventDefault();
    if(email===""){
      alert('이메일 입력해주세요!');
      return;
    }
    const obj = {
      email: email,
    };
    authBtn.current.disabled = true;
    dispatch(requestAuth(obj)).then(res => {
      if(res.payload.success && authBtn.current){ 
        setMinutes(0);
        setSeconds(59);
        setSuccessData(true);
      }
    });
  };
  // 입력 변화를 감지하는 함수들
  const changeEmail = (e) => {
    setEmail(e.target.value);
    //고민중.... 
    // authBtn.current.disabled = false;
    // setMinutes(0);
    // setSeconds(0);
    // setSuccessData(false);
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
  const changePasswordCheck = (e) => {
    setPasswordCheck(e.target.value);
  }

  return (
    <div>
      {/* 로고 삽입 위치 */}
      <LogoSignup>
        <Logo128 src={farmlogo} alt="Farm Tech Logo" />
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
            placeholder={`${ successData ? minutes+":"+seconds :"인증번호 6자리"}`}
            style={{ width: "9.5em" }}
            value={authNumber}
            onChange={changeAuthNumber}
          />
          <Button type="submit" ref={authBtn} style={{ float: "right", fontWeight:"500" }}>
            인증번호요청
          </Button>
          {/* {successData && <div>{minutes}:{seconds}</div> } */}
        </Row>
      </Form>

      <Form>
        {/* 회원가입 개인 정보 입력 */}

        <Input type="text" placeholder="이름" value={name} onChange={changeName} />
        <Input placeholder="별명(10자 이내)" value={nickName} onChange={changeNickName} />
        <Input type="password" placeholder="비밀번호" value={password} onChange={changePassword} />
        <Input type="password" placeholder="비밀번호 확인" value={passwordCheck} onChange={changePasswordCheck} />
        <Input type="number" placeholder="생년월일(8자리)" value={birthDay} onChange={changeBirhDay} />
        <Input type="number" placeholder="전화번호(' - ' 제외)" value={phoneNumber} onChange={changePhoneNumber} />
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
  font-weight: 600
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
