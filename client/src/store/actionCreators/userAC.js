import { types } from "../types/userTypes"


// при заходе на сайт и подтягивании куков
export const authUserReducer = (payload) => ({type: types.AUTH_USER, payload})
// при регистрации с указанием ид дома (запрос с саги)
export const signupUserReducer = (payload) => ({type: types.SIGN_UP_AUTH, payload})
// при регистрации пользователя и переходе на страницу выбора адреса
export const signup_UserReducer = (payload) => ({type: types.SIGN_UP_USER, payload})
