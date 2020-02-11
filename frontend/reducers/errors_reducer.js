import { RECEIVE_SESSION_ERRORS, RECEIVE_USER } from "../actions/session_actions";

const _default = {
  "login": []
}

const errorsReducer = (state = _default, action) => {
  switch (action.type) {
    case RECEIVE_SESSION_ERRORS:
      return { "login": action.errors };
    case RECEIVE_USER:
      return _default;
    default:
      return state;
  }
}

export default errorsReducer;