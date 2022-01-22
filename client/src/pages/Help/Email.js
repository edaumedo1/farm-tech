import React, { useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { loginUser } from "../../redux/modules/user";
import farmlogo from "../../images/farmlogo_min.PNG";
import kakaologin from "../../images/kakao_login_ko/kakao_login_large_wide.png";
import { Container, Button, Form, Input, Img, Box, Center } from "../../elements"; // STYLE
import { useMovePage } from "../../hook/events";

function Email() {
 

  return (
    <Container>
      {/* 로고 삽입 위치 */}
      <Box display="flex" margin="1em 0" gap="7.5em">
        <Img src={farmlogo} width="36px" height="36px" alt="React" />
        <h2>이메일 찾기</h2>
      </Box>
      <Form 
      // onSubmit={onSubmitHandler}
      >
        <Input
          type="text"
          placeholder="이름"
          // value={name}
          // onChange={changeName}
        />
        <Input
          type="number"
          placeholder="생년월일(8자리)"
          // value={birthDay}
          // onChange={changeBirhDay}
        />
        <Input
          type="number"
          placeholder="전화번호(' - ' 제외)"
          // value={phoneNumber}
          // onChange={changePhoneNumber}
        />
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
            // ref={signupBtn}
          >
            다음
          </Button>
        </Box>
      </Form>
    </Container>
  );
}

export default Email;

