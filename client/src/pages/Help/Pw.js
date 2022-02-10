import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { helpPw } from "../../redux/modules/user";
import { joinUser, requestAuth } from "../../redux/modules/user";//////////!!!!!!! 수정요함
import farmlogo from "../../images/farmlogo_min.PNG";
import useTimer from "../../hook/useTimer";
import { Container, Button, Form, Input, Img, Box, Center } from "../../elements"; // STYLE
import { useMovePage } from "../../hook/events";
import { NavigateBefore } from "@mui/icons-material";

function Pw() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { minutes, seconds, setMinutes, setSeconds } = useTimer({
    mm: 0,
    ss: 0,
  });

  const authBtn = useRef(null);
  const extensionBtn = useRef(null);
  const helpBtn = useRef(null);
  const authInput = useRef(null);


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [authNumber, setAuthNumber] = useState("");
  //const [isFind, setIsFind] = useState(false);
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
      }
    });
  };


  // 회원가입 기능
  const onPwHandler = (e) => {

    e.preventDefault();
    if(name === "" || email === "" || birthDay ==="" || authNumber === ""){
      return alert('모두 입력해주세요!');
    }

    const obj = {
      name,
      email,
      birth_day: birthDay,
      auth_number: authNumber,
    }

    console.log(obj.email);

    if(helpBtn.current){
      helpBtn.current.disabled = false;
    }
    
    dispatch(helpPw(obj)).then((res) => {

      const data = res.payload.why;
      if(res.payload.success) {
        if(!res.payload.helpPw_success){
          if(data === "Authentication Time Expired or Email mismatch."){
            console.log(helpBtn.current, authInput.current);
            if(helpBtn.current && authInput.current) {
              helpBtn.current.disabled = false;
              authInput.current.focus();
            }
            return alert('이메일 인증시간이 다 됐거나, 이메일이 틀립니다.');
          }
        }
        if(res.payload.requestAuth_success){
          alert('성공!');
          console.log(obj.email);
          navigate("/update_pw", {
            email: obj.email,
            success: true,
          });
        }
      }
      if(!res.payload.success){
        if(data === "Auth_Number mismatch."){
          if(helpBtn.current && authInput.current) {
            helpBtn.current.disabled = false;
            authInput.current.focus();
          }
          return alert('인증번호가 틀렸습니다. 다시 입력해주세요!');
        }
      }
    });
  };

  // 입력 변화를 감지하는 함수들
  const changeEmail = (e) => {
    setEmail(e.target.value);
  };
  const changeName = (e) => {
    setName(e.target.value);
  };
  const changeBirhDay = (e) => {
    if(e.target.value.length <=8){
      setBirthDay(e.target.value);
    }
  };
  const changeAuthNumber = (e) => {
    setAuthNumber(e.target.value);
  };
  
  return (
    <Container top="312px">
      {/* 로고 삽입 위치 */}
      <Box display="flex" margin="1em 0" gap="6em">
        <Img src={farmlogo} width="36px" height="36px" alt="React" />
        <h2>비밀번호 찾기</h2>
      </Box>
      
      <Form onSubmit={Authorize} >
        <Input type="text" placeholder="이름" value={name} onChange={changeName} />
        <Input type="number" placeholder="생년월일(8자리)" value={birthDay} onChange={changeBirhDay} />
      </Form>

      <Form onSubmit={Authorize}>
        {/* 인증번호 입력 */}
        <Box width="17em">
          <Input type="email" value={email} onChange={changeEmail} placeholder="이메일" />
          <Input placeholder={`${ successData ? minutes + ":" + seconds : "인증번호 6자리" }`}
              width="11.5em" value={authNumber} onChange={changeAuthNumber} ref={authInput} />
            {/* 3항 연산자를 쓸 수 없다. 쓰게 되면 연장버튼에도 요청의 스타일이 묻게 된다. */}
            {successData && <Button type="button" onClick={ExtendHandler} ref={extensionBtn} float="right">연장</Button>}
            {successData === false &&<Button type="submit" ref={authBtn} float="right">요청</Button>}
        </Box>
      </Form>
      
      <Form onSubmit={onPwHandler}>
        {/* 회원가입 완료 취소 버튼 */}
        <Box width="17em" margin="1em 0">
          <Button type="button" width="4.5em" onClick={useMovePage("/login")}>취소</Button>
          <Button type="submit" id="subBtn" width="11.5em" float="right" background="#b5f37e" ref={helpBtn}>다음</Button>
        </Box>
      </Form>
    </Container>
  );
}

export default Pw;

