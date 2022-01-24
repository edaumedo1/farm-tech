import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import {authorizeUser} from '../redux/modules/user'
import { useNavigate } from 'react-router-dom';

export default function auth(SpecificComponent, option, adminRoute = null) {
  /* option*/
  //null => 아무나 출입 가능한 페이지
  //true => 로그인한 유저만 출입 가능한 페이지
  //false => 로그인한 유저는 출입 불가능한 페이지

  /*adminRoute*/
  // true => admin이 쓸 페이지
  // null => admin 페이지로 안쓴다!

  function AuthenticationCheck(props){
    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(authorizeUser()).then(response =>{
        console.log(response);
        // 로그인 하지 않은 상태
        if(!response.payload.isAuth){
          if(option){
            navigate('/login');
          }
        }else{
          //로그인 한 상태
          //유저가 어드민 페이지에 못들어가게
          if(adminRoute && !response.payload.isAdmin){
            navigate('/');
          }else{
            if(option === false){
              navigate('/');
            }
          }
        }
      });
    });
// <SpecificComponent props={props}/> 이렇게 해도 되고
    return(
      <SpecificComponent/>
    )
  }

  return AuthenticationCheck;
}

