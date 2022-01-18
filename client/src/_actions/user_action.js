import { REQUEST_AUTH, JOIN_USER } from "./type";
import axios from "axios";

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

// export const requestAuthAsync = (dataToSubmit) => {
//   return function (dispatch) {
//       const
//   }
// };
// export const joinUserAsync = (dataToSubmit) => ({

// });
