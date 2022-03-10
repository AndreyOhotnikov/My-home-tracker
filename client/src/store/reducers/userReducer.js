import { types } from "../types/userTypes"


const defaultState = {
  auth: false,
  _user: {name: '', email: '', pass: ''}
}

export const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.AUTH_USER:
      return {...state, auth: action.payload};
    case types.SIGN_UP_USER:
      return {...state, _user: action.payload};
    case types.SIGN_UP_AUTH:
      return {...state, auth: action.payload, _user: {name: '', email: '', pass: ''}};
    default:
      return state;
    }
  }
