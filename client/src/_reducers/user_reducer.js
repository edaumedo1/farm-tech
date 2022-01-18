import { REQUEST_AUTH_ASYNC, JOIN_USER_ASYNC } from "../_actions/type";

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_AUTH_ASYNC:
      return { ...state, request_data: action.dataToSubmit };
    case JOIN_USER_ASYNC:
      return { ...state, join_data: action.dataToSubmit };
    default:
      return state;
  }
}
