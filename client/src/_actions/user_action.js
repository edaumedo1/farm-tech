import { REQUEST_AUTH_ASYNC, JOIN_USER_ASYNC } from "./type";

export const requestAuthAsync = (dataToSubmit) => ({
  type: REQUEST_AUTH_ASYNC,
  dataToSubmit,
});
export const joinUserAsync = (dataToSubmit) => ({
  type: JOIN_USER_ASYNC,
  dataToSubmit,
});
