 import { types } from "../types/userTypes"


const defaultState = {
  auth: false,
  modale: false,
  profilePage: {
      fullName: '', 
      phone: '', 
      photo: '', 
      adress: '', 
      email: '',
      store: [], 
      bid: [], 
      benefits: []
    }
}

export const authReducer = (state = defaultState, action) => {
  console.log('//////////////////////////////////', action)
  switch (action.type) {
    case types.AUTH_USER:
      console.log(action,'=>>>>>>>>>>>')
      return {...state, auth: action.payload, _user: undefined};
    case types.SIGN_UP_USER:
      return {...state, _user: action.payload};
    case types.OPEN_MODALE:
      return {...state, modale: action.payload};
    case types.INFO_USER_PAGE:
      console.log(action.payload)
      return {...state, profilePage: {
          ...state.profilePage, 
          fullName: action.payload.userInfo?.full_name, 
          phone: action.payload.userInfo?.phone, 
          photo: action.payload.photo?.link, 
          adress: action.payload.userInfo?.adress,
          store: action.payload.store,
          bid: action.payload.bid,
          benefits: action.payload.benefits,
          email:  action.payload?.email
        }
      }
    case types.INFO_USER_PAGE_EDIT:
      return {...state, profilePage: {
          ...state.profilePage, 
          fullName: action.payload.userInfoFind2?.full_name, 
          phone: action.payload.userInfoFind2?.phone, 
          photo: action.payload.linkFind2?.link, 
          adress: action.payload.userInfoFind2?.adress
        }
      };
    default:
      return state;
    }
  }
