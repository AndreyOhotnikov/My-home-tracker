import { types } from "../types/userTypes"

import { takeEvery, put, call, debounce, retry, throttle } from 'redux-saga/effects';
import {authUserReducer, signupUserReducer} from '../actionCreators/userAC'
import SignIn from "../../components/Signin/SignIn";

async function signInAsync(user) {
 
  const response = await fetch(`user/signin`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user) // {name, pass}
  });
  return await response.json() // сюда примем имя пользователя
}


function* workerSignIn({user}) {
  try {
    console.log(user)
    const signIn = yield call(() => signInAsync(user))
    console.log(signIn)
    if(!signIn.error) {
      yield put(authUserReducer(signIn)) // {name, role, home_id}
    } 
  } catch (err) {
    console.error('Err', err);
  } finally {
    console.log('finally');
  }
}

export function* watcherSignIn() {
  yield takeEvery(types.SIGN_IN_USER_SAGA, workerSignIn)
}
