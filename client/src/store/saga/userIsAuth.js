import { types } from "../types/userTypes"

import { takeEvery, put, call, debounce, retry, throttle } from 'redux-saga/effects';
import {authUserReducer, signupUserReducer} from '../actionCreators/userAC'
import SignIn from "../../components/Signin/SignIn";

async function checkIsAuthAsync() {
 
  const response = await fetch(`user/checkAuth`, {
    method: "GET",
  });
  return await response.json() // сюда примем имя пользователя
}

function* workerCheckIsAuth() {
  try {
    console.log(11111)
    const isAuth = yield call(() => checkIsAuthAsync())
    console.log(isAuth)
    if(!isAuth.error) {
      yield put(authUserReducer(isAuth)) // {name, role, home_id}
    } 
  } catch (err) {
    console.error('Err', err);
  } finally {
    console.log('finally');
  }
}

export function* watcherCheckIsAuth() {
  yield takeEvery(types.CHECK_IS_AUTH_SAGA, workerCheckIsAuth)
}
