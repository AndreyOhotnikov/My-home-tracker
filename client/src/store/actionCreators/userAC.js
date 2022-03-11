import { types } from "../types/userTypes"


// при заходе на сайт и подтягивании куков
export const authUserReducer = (payload) => ({type: types.AUTH_USER, payload})
// при регистрации с указанием ид дома (запрос с саги)
export const signupUserReducer = () => ({type: types.SIGN_UP_AUTH})
// при регистрации пользователя и переходе на страницу выбора адреса
export const signup_UserReducer = (payload) => ({type: types.SIGN_UP_USER, payload})

export const openModaleReducer = (payload) => ({type: types.OPEN_MODALE, payload})
