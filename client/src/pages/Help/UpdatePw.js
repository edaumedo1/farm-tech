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
import { password } from "@mui/icons-material";

function UpdatePw() {

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


  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  //const [isFind, setIsFind] = useState(false);

  //타이머에 감시자

  //타이머 연장 기능

  //인증번호 요청할 때 사용하는 함수


  // 회원가입 기능
  const onUpdateHandler = (e) => {
    const pwdCheck = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;

    e.preventDefault();
    if(password === "" || passwordCheck ===""){
      return alert('모두 입력해주세요!');
    }

    const obj = {
      password,
      passwordCheck
    }

    if(!pwdCheck.test(password)){
        return alert("비밀번호는 영문, 숫자, 특수문자 합 8~15자리가 되어야 합니다!");
      }
  
      if(password !== passwordCheck){
        return alert("비밀번호가 일치하지 않습니다!");
      }

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
  const changePw = (e) => {
    setPassword(e.target.value);
  };
  const changePwCheck = (e) => {
    if(e.target.value.length <=8){
      setPasswordCheck(e.target.value);
    }
  };
  
  return (
    <Container top="312px">
      {/* 로고 삽입 위치 */}
      <Box display="flex" margin="1em 0" gap="6em">
        <Img src={farmlogo} width="36px" height="36px" alt="React" />
        <h2>비밀번호 찾기</h2>
      </Box>
      
      <Form onSubmit={onUpdateHandler}>
          <Input type="password" placeholder="비밀번호" value={password} onChange={changePw} />
        <Input type="password" placeholder="비밀번호확인" value={passwordCheck} onChange={changePwCheck} />
        {/* 회원가입 완료 취소 버튼 */}
        <Box width="17em" margin="1em 0">
          <Button type="button" width="4.5em" onClick={useMovePage("/login")}>취소</Button>
          <Button type="submit" id="subBtn" width="11.5em" float="right" background="#b5f37e" ref={helpBtn}>다음</Button>
        </Box>
      </Form>
    </Container>
  );
}

export default UpdatePw;

