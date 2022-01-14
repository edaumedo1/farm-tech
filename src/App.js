
import React from 'react';
import styled from 'styled-components';
import farmlogo from './images/farmlogo.PNG';

function App() {
  return (
  <React.Fragment>
    <LogoSignup>{/* 로고 삽입 위치 */}
      <Logo512 src={farmlogo} alt='React' />
    </LogoSignup>
    <Form>{/* 회원가입 개인 정보 입력 */}
      <Input placeholder="이메일"></Input>
      <Input placeholder="이름"></Input>
      <Input placeholder="별명(10자 이내)"></Input>
      <Input type={'password'} placeholder="비밀번호"></Input>
      <Input type={'password'} placeholder="비밀번호 확인"></Input>
      <Input placeholder="생년월일(8자리)"></Input>
      <Input placeholder="전화번호(' - ' 제외)"></Input>
    </Form>
    <Form>{/* 인증번호 입력 */}
      <Row>
        <Input placeholder="인증번호 6자리" style={{width: '50%', float: 'left'}}></Input>
        <Button type="submit" style={{display: 'inline', float: 'right'}}>인증번호요청</Button>
      </Row> 
    </Form> 
    <div>{/* 회원가입 완료 취소 버튼 */}
      {/* <span>
        <button type="button">취소</button>
      </span>
      <span>
        <button type="submit" ">회원가입</button>
      </span> */}
    </div>
  </React.Fragment>
  );
}

const Row = styled.div`
  // place-self: normal;
`;

const Button = styled.button`
  width: 35%;
  height: 44px;
  margin: 10px 0;
  // padding: 1px 15px;
  border-radius: 10px;
  border-style: none;
  border: 1px solid #11A83C;
  font-size: 16px;
  background-color: #C9DD98;
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
  width: 82vw;
  height: 40px;
  margin: 10px 0;
  padding: 1px 15px;
  border-radius: 10px;
  border-style: none;
  border: 1px solid #11A83C;
  font-size: 20px;
`;

const LogoSignup = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export default App;
