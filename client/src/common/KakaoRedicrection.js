import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginWithKakao } from "../redux/modules/user";
import { Center, Container } from "../elements";

function KakaoRedicrection() {
  const dispatch = useDispatch();
  const code = new URL(window.location.href);
  const navigate = useNavigate();
  const authorization_code = code.searchParams.get("code");

  useEffect(() => {
    if (authorization_code) {
      dispatch(loginWithKakao(authorization_code)).then((res) => {
        const data = res.payload.why;
        if (res.payload.success) {
          navigate("/home");
        }
        if(data){
          console.log(data);
        }
      })
    }
  });
  return (
    <Container>
      <Center><h2>Loading...</h2></Center>
      <progress></progress>
    </Container>
  );
}

export default KakaoRedicrection;
