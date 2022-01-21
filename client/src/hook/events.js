import { useNavigate } from "react-router-dom";

//작성자: 김덕주
//2022년 01월 17일
//손쉽게 페이지 이동시키기 위해서 만듦
//number에는 정수의 숫자가 들어가며, 숫자에 따라 페이지 이동이 가능하다.
export function useMovePage(data) {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(data); //data = 음수: 이전페이지, 양수: 다음페이지, 문자열: 해당 페이지
  };
  return goBack;
}
