import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { helpEmail } from "../../redux/modules/user";
import farmlogo from "../../images/farmlogo_min.PNG";
import { Container, Button, Form, Input, Img, Box } from "../../elements"; // STYLE
import { useMovePage } from "../../hook/events";

function Email() {
  const help_email = useSelector((state) => state.user.help_email_success);
  const user_email = useSelector((state) => state.user.user_email);

  console.log(help_email);
  console.log(user_email);
  const dispatch = useDispatch();

  const helpBtn = useRef(null);
  const authInput = useRef(null);


  const [name, setName] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  //회원가입 기능
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if(name === "" || birthDay ==="" || 
    phoneNumber === ""){
      return alert('모두 입력해주세요!');
    }

    const obj = {
      name,
      birth_day: birthDay.toString,
      phone_number: phoneNumber,
    }

    if(helpBtn.current){
      helpBtn.current.disabled = true;
    }
    
    dispatch(helpEmail(obj)).then((res) => {
      if(res.payload.success) {
        alert('성공!');
      }
    }).catch(res => {
      const data = res.response.data.why;
      
      if(res.request.status === 401 && data === "user not exists."){
        if(helpBtn.current && authInput.current) {
          helpBtn.current.disabled = false;
          authInput.current.focus();
        }
        return alert('가입하지 않은 사용자입니다.');
      }
      if(res.request.status === 401 && data === "Authentication Time Expired or Email mismatch."){
        console.log(helpBtn.current, authInput.current);
        if(helpBtn.current && authInput.current) {
          helpBtn.current.disabled = false;
          authInput.current.focus();
        }
        return alert('이메일 인증시간이 다 됐거나, 이메일이 틀립니다.');
      }
    });
  };

  // 입력 변화를 감지하는 함수들
  const changeName = (e) => {
    setName(e.target.value);
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


  return (
    <Container>
      {/* 로고 삽입 위치 */}
      <Box display="flex" margin="1em 0" gap="7.5em">
        <Img src={farmlogo} width="36px" height="36px" alt="React" />
        <h2>이메일 찾기</h2>
      </Box>
      <Form onSubmit={ onSubmitHandler }
      >
        <Input
          type="text"
          placeholder="이름"
          value={name}
          onChange={changeName}
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
        
          {
            {help_email} !== false ? <div>{user_email}</div> : <div>가입하지 않은 사용자입니다.</div>
          }
        
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
            ref={helpBtn}
          >
            다음
          </Button>
        </Box>
      </Form>
    </Container>
  );
}

export default Email;

