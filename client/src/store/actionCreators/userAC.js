 import { types } from "../types/userTypes"


export const authUserReducer = (payload) => ({type: types.AUTH_USER, payload})
export const signup_UserReducer = (payload) => ({type: types.SIGN_UP_USER, payload})

export const openModaleReducer = (payload) => ({type: types.OPEN_MODALE, payload})

export const infoUserPageReducer = (payload) => ({type: types.INFO_USER_PAGE, payload})
export const infoUserPageEditReducer = (payload) => ({type: types.INFO_USER_PAGE_EDIT, payload})

