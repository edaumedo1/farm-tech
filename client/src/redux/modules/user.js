import axios from "axios";
import produce from "immer";
import { createAction, handleActions } from "redux-actions";

//Ducks Pattern
//좀 더 편한 관리를 위해 선택함.
//2022년 01월 19일
//작성자: 박건형
//일반적인 비동기 통신을 하고싶다면, redux-promise 사용
//좀 더 복잡한 기능을 다루고 싶다면, redux-thunk 사용

//Actions
const JOIN_USER = "join_user";
const REQUEST_AUTH = "request_auth";

//Initial state
const initialState = {};

//Reducer
export default handleActions(
  {
    //인증번호 요청
    [REQUEST_AUTH]: (state, action) =>
    produce(state, (draft) => {
      draft.auth_number_success = action.payload.success
    })
  },
  initialState
);

//Action Creators: use redux-promise

export const requestAuth = (dataToSubmit) => {
  const payload = axios
  .post("/api/user/email", dataToSubmit)
  .then((res) => res.data);
  
  return {
    type: REQUEST_AUTH,
    payload,
  };
};

export const joinUser = (dataToSubmit) => {
  const payload = axios
    .post("/api/user/register", dataToSubmit)
    .then((res) => res.data);
  return {
    type: JOIN_USER,
    payload,
  };
};

//Action Creators: use redux-thunk

// const requestNumber = createAction(REQUEST_AUTH, (data) => ({data}));


//middleware

// export const requestAuth = (dataToSubmit) => {
//   return function (dispatch, getState) {
//     axios
//     .post("/api/user/email", dataToSubmit)
//     .then((res) => {
//       dispatch(requestNumber(res.data))
//     });
//   }
// };

