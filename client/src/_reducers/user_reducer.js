import { REQUEST_AUTH, JOIN_USER } from "../_actions/type";

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_AUTH:
      return { ...state, request_data: action.dataToSubmit };
    case JOIN_USER:
      return { ...state, join_data: action.dataToSubmit };
    default:
      return state;
  }
}
