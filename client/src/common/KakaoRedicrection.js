import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function KakaoRedicrection() {
  const code = new URL(window.location.href);
  const navigate = useNavigate();
  const realCode = code.searchParams.get('code')
  useEffect(() => {
    if(realCode){
      // 예비로 링크를 login으로함
      navigate("/login", {state: {
        code: realCode
      }});
    }else {
      navigate("/login");
    }
  })
  return <div>
    하이
  </div>;
}

export default KakaoRedicrection;
