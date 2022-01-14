
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
        <Input placeholder="인증번호 6자리" style={{ width: '7.5em' }}></Input>
        <Button type="submit" style={{ float: 'right' }}>인증번호요청</Button>
      </Row> 
    </Form> 
    <Form>{/* 회원가입 완료 취소 버튼 */}
      <RowBtn>
        <Button type="button" style={{width: '4.5em', backgroundColor: 'gainsboro'}}>취소</Button>
        <Button type="submit" style={{width: '11.5em', float: 'right'}}>회원가입</Button>
      </RowBtn>
      
    </Form>
  </React.Fragment>
  );
}

const RowBtn = styled.div`
  width: 17em;
  margin: 35px 0px;
`;

const Row = styled.div`
  width: 17em;
`;

const Button = styled.button`
  width: 6.5em;
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
  width: 15em;
  height: 40px;
  margin: 10px 0;
  padding: 1px 15px;
  border-radius: 10px;
  border-style: none;
  border: 1px solid #11A83C;
  font-size: 16px;
`;

const LogoSignup = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export default App;
