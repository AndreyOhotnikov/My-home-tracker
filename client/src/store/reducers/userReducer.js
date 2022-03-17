 import { types } from "../types/userTypes"


const defaultState = {
  auth: false,
  modale: false
}

export const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.AUTH_USER:
      console.log(action,'=>>>>>>>>>>>')
      return {...state, auth: action.payload, _user: undefined};
    case types.SIGN_UP_USER:
      return {...state, _user: action.payload};
    case types.OPEN_MODALE:
      return {...state, modale: action.payload};
    default:
      return state;
    }
  }
