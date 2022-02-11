import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { helpEmail } from "../../redux/modules/user";
import farmlogo from "../../images/farmlogo_min.PNG";
import { Container, Button, Form, Input, Img, Box } from "../../elements"; // STYLE
import { useMovePage } from "../../hook/events";

function Email() {
  const help_email = useSelector((state) => state.user.help_email_success);
  const user_email = useSelector((state) => state.user.user_email);
  const dispatch = useDispatch();

  const helpBtn = useRef(null);

  const [name, setName] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isFind, setIsFind] = useState(false);

  useEffect(() => {
    return () => {
      setIsFind(false)
    }
  },[]);
  
  //이메일 찾기 기능
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if(name === "" || birthDay === "" || 
    phoneNumber === ""){
      return alert('모두 입력해주세요!');
    }

    const obj = {
      name,
      birth_day: birthDay,
      phone_number: phoneNumber,
    }

    if(helpBtn.current) {
        helpBtn.current.disabled = true;
    }

    dispatch(helpEmail(obj)).then((res) => {
      
      if(res.payload.success) {
        if(helpBtn.current) {
          helpBtn.current.disabled = false;
        }
        setIsFind(true);
        return ( alert('성공!'));
      }
      if(!res.payload.success &&res.payload.why === "user not exists."){
        if(helpBtn.current) {
          helpBtn.current.disabled = false;
        }
        return ( alert('가입하지 않은 사용자입니다.'));
      }
    });
  };

  const MovePage = useMovePage("/login");

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
      <Form onSubmit={ onSubmitHandler } >
        { !isFind && <Input type="text" placeholder="이름" value={name} onChange={changeName} />}
        { !isFind && <Input type="number" placeholder="생년월일(8자리)" value={birthDay} onChange={changeBirhDay} />}
        { !isFind && <Input type="number" placeholder="전화번호(' - ' 제외)" value={phoneNumber} onChange={changePhoneNumber} />}
        { help_email && isFind && 
        <Box width="17em" height="11.25em" background="#eaffd7" borderRadius="10px">
          <Box textAlign="center" padding="4.875em 0px" fontWeight="bold">{user_email}</Box>
        </Box>
        }
        
        {console.log("user_email :" + user_email)}
        {console.log("help_email :" + help_email)}

        <Box width="17em" margin="1em 0">
          { isFind && <Button type="button" width="17em" onClick={ MovePage } background="#b5f37e">로그인하러가기</Button> }
          { !isFind && <Button type="button" width="4.5em" onClick={ MovePage }>취소</Button> }
          { !isFind && <Button type="submit" id="subBtn" width="11.5em" float="right" background="#b5f37e" ref={helpBtn} >다음</Button> }
        </Box>
      </Form>
    </Container>
  );
}

export default Email;

