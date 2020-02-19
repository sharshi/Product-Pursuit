import { RECEIVE_USERS, RECEIVE_USER } from "../actions/session_actions";

const usersReducer = (state = {}, action) => {
  
  switch (action.type) {
    case RECEIVE_USERS:
      return Object.assign({}, state, action.users);
    case RECEIVE_USER:
      debugger
      return Object.assign({}, state, { 
        [action.user.id]: action.user
      });
    default:
      return state;
  }
}

export default usersReducer;