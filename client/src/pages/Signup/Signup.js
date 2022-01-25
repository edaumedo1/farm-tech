import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { joinUser, requestAuth } from "../../redux/modules/user";
import farmlogo from "../../images/farmlogo.PNG";
import { useMovePage } from "../../hook/events";
import useTimer from "../../hook/useTimer";
import { useNavigate } from "react-router-dom";
import { Img, Input, Form, Button, Box, Center } from "../../elements"; // STYLE

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { minutes, seconds, setMinutes, setSeconds } = useTimer({
    mm: 0,
    ss: 0,
  });

  const authBtn = useRef(null);
  const extensionBtn = useRef(null);
  const signupBtn = useRef(null);
  const authInput = useRef(null);


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [authNumber, setAuthNumber] = useState("");
  const [successData, setSuccessData] = useState(false);
  const [limit, setLimit] = useState(false);

  //타이머에 감시자
  useEffect(() => {
    if (minutes === "0" && seconds === "0" && successData === true) {
      console.log(minutes, typeof minutes);
      console.log("타이머 초기화 상태");
      alert('다시 요청해주세요');
      setSuccessData(false);
      setLimit(false);
    }
    if(extensionBtn.current && limit===true){
      extensionBtn.current.disabled = "false"
    }
  }, [limit, minutes, seconds, successData]);

  //타이머 연장 기능
  const ExtendHandler = () => {
    alert("3분이 더 추가 되었습니다.");
    setMinutes(1 + minutes);
    setLimit(true);
  } 

  //인증번호 요청할 때 사용하는 함수
  const Authorize = (e) => {
    e.preventDefault();
    if (email === "") {
      alert("이메일 입력해주세요!");
      return;
    }
    
    const obj = {
      email: email,
    };

    if(authBtn.current){
      authBtn.current.disabled = true;
    }
    dispatch(requestAuth(obj)).then((res) => {
      if (res.payload.success) {
        setMinutes(0);
        setSeconds(59);
        setSuccessData(true);
      }else if(res.payload.why === "Email already exists."){
        alert('이미 있는 이메일 입니다.');
        authBtn.current.disabled = false;
        return;
      }
    })
  };


  //회원가입 기능
  const onSignupHandler = (e) => {
    const pwdCheck = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;

    e.preventDefault();
    if(name === "" || email === "" || 
    nickName === "" || password === "" || 
    passwordCheck === "" || birthDay ==="" || 
    phoneNumber === "" || authNumber === ""){
      return alert('모두 입력해주세요!');
    }

    const obj = {
      name,
      email,
      nickname: nickName,
      password,
      birth_day: birthDay,
      phone_number: phoneNumber,
      auth_number: authNumber,
    }

    if(!pwdCheck.test(password)){
      return alert("비밀번호는 영문, 숫자, 특수문자 합 8~15자리가 되어야 합니다!");
    }

    if(password !== passwordCheck){
      return alert("비밀번호가 일치하지 않습니다!");
    }
    if(signupBtn.current){
      signupBtn.current.disabled = true;
    }
    
    dispatch(joinUser(obj)).then((res) => {
      if(res.payload.success) {
        alert('성공!');
        navigate('/login');
      }

      if(res.payload.why === "Auth_Number mismatch."){
        if(signupBtn.current && authInput.current) {
          signupBtn.current.disabled = false;
          authInput.current.focus();
        }
        return alert('인증번호가 틀렸습니다. 다시 입력해주세요!');
      }
      if(res.payload.why === "Authentication Time Expired or Email mismatch."){
        console.log(signupBtn.current, authInput.current);
        if(signupBtn.current && authInput.current) {
          signupBtn.current.disabled = false;
          authInput.current.focus();
        }
        return alert('이메일 인증시간이 다 됐거나, 이메일이 틀립니다.');
      }
    })
  };

  // 입력 변화를 감지하는 함수들
  const changeEmail = (e) => {
    setEmail(e.target.value);
  };
  const changeNickName = (e) => {
    if(e.target.value.length <=10){
      setNickName(e.target.value);
    }
  };
  const changeName = (e) => {
    setName(e.target.value);
  };
  const changePassword = (e) => {
    setPassword(e.target.value);
  };
  const changePhoneNumber = (e) => {
    if(e.target.value.length <=11){
      setPhoneNumber(e.target.value);
    }
  };
  const changeBirhDay = (e) => {
    if(e.target.value.length <=8){
      setBirthDay(e.target.value);
    }
  };
  const changeAuthNumber = (e) => {
    setAuthNumber(e.target.value);
  };
  const changePasswordCheck = (e) => {
    setPasswordCheck(e.target.value);
  };

  return (
    <div>
      {/* 로고 삽입 위치 */}
      <Center>
        <Img src={farmlogo} alt="Farm Tech Logo" />
      </Center>
      <Form onSubmit={Authorize}>
        {/* 인증번호 입력 */}
        <Box width="17em">
          <Input
            type="email"
            value={email}
            onChange={changeEmail}
            placeholder="이메일"
          />
            <Input
              placeholder={`${
                successData ? minutes + ":" + seconds : "인증번호 6자리"
              }`}
              width="11.5em"
              value={authNumber}
              onChange={changeAuthNumber}
              ref={authInput}
            />
            {/* 3항 연산자를 쓸 수 없다. 쓰게 되면 연장버튼에도 요청의 스타일이 묻게 된다. */}
            {successData && <Button type="button" onClick={ExtendHandler} ref={extensionBtn} float="right">연장</Button>}
            {successData === false &&<Button type="submit" ref={authBtn} float="right">
              요청
            </Button>}
        </Box>
      </Form>

      <Form>
        {/* 회원가입 개인 정보 입력 */}
        <Input
          type="text"
          placeholder="이름"
          value={name}
          onChange={changeName}
        />
        <Input
          placeholder="별명(10자 이내)"
          value={nickName}
          onChange={changeNickName}
        />
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={changePassword}
          autoComplete="off"
        />
        <Input
          type="password"
          placeholder="비밀번호 확인"
          value={passwordCheck}
          onChange={changePasswordCheck}
          autoComplete="off"
        />
        <Input
          type="number"
          placeholder="생년월일(8자리)"
          value={birthDay}
          onChange={changeBirhDay}
        />
        <Input
          type="number"
          placeholder="전화번호(' - ' 제외)"
          value={phoneNumber}
          onChange={changePhoneNumber}
        />
      </Form>
      <Form onSubmit={onSignupHandler}>
        {/* 회원가입 완료 취소 버튼 */}
        <Box width="17em" margin="1em 0">
          <Button
            type="button"
            width="4.5em"
            onClick={useMovePage("/login")}
          >
            취소
          </Button>
          <Button
            type="submit"
            id="subBtn"
            width="11.5em"
            float="right"
            background="#b5f37e"
            ref={signupBtn}
          >
            회원가입
          </Button>
        </Box>
      </Form>
    </div>
  );
}

export default Signup;