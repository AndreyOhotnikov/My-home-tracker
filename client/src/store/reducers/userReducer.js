import { types } from "../types/userTypes"


const defaultState = {
  auth: false,
}

export const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.AUTH_USER:
      return {...state, auth: action.payload};
    
    default:
      return state;
    }
  }
