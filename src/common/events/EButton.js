import React from "react";
import { useNavigate } from "react-router-dom";

function EButton() {
  const navigate = useNavigate(); //네비게이션 선언
  const goBack = () => { 
    navigate(-1); //number = 음수: 이전페이지, 양수: 다음페이지
  };
  return(
    goBack
  );
}

export default EButton;
