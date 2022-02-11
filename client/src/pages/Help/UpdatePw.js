import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { updatePw } from "../../redux/modules/user";//////////!!!!!!! 수정요함
import farmlogo from "../../images/farmlogo_min.PNG";
import useTimer from "../../hook/useTimer";
import { Container, Button, Form, Input, Img, Box } from "../../elements"; // STYLE
import { useMovePage } from "../../hook/events";

function UpdatePw() {
  const location = useLocation();
  const dispatch = useDispatch();

  console.log(location.state.email);

  const updateBtn = useRef(null);

  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  // 회원가입 기능
  const onUpdateHandler = (e) => {
    const pwdCheck = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;

    e.preventDefault();
    if(password === "" || passwordCheck ===""){
      return alert('모두 입력해주세요!');
    }

    const obj = {
      success: location.state.success,
      email: location.state.email,
      password,
    }

    if(!pwdCheck.test(password)){
        return alert("비밀번호는 영문, 숫자, 특수문자 합 8~15자리가 되어야 합니다!");
      }
  
      if(password !== passwordCheck){
        return alert("비밀번호가 일치하지 않습니다!");
      }

    if(updateBtn.current){
      updateBtn.current.disabled = true;
    }
    
    dispatch(updatePw(obj)).then((res) => {

      const data = res.payload.why;
      if(res.payload.update_success) {
        alert('성공!');
      }
      if(!res.payload.update_success){
        if(data === "wrong path"){
          if(updateBtn.current) {
            updateBtn.current.disabled = false;
          }
          return alert('잘못된 경로입니다.');
        }
      }
    });
  };

  // 입력 변화를 감지하는 함수들
  const changePw = (e) => {
    setPassword(e.target.value);
  };
  const changePwCheck = (e) => {
    setPasswordCheck(e.target.value);
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
          <Button type="submit" id="subBtn" width="11.5em" float="right" background="#b5f37e" ref={updateBtn}>다음</Button>
        </Box>
      </Form>
    </Container>
  );
}

export default UpdatePw;

