import { types } from "../types/userTypes"

import { takeEvery, put, call, debounce, retry, throttle } from 'redux-saga/effects';
import {authUserReducer, signupUserReducer} from '../actionCreators/userAC'

async function signInAsync(user) {
 
  const response = await fetch(`user/signin`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  return await response.json()
}


function* workerSignIn({user}) {
  try {
    const signIn = yield call(() => signInAsync(user))
    if(!signIn.error) {
      yield put(authUserReducer(signIn)) 
    } 
  } catch (err) {
    console.error('Err', err);
  } 
}

export function* watcherSignIn() {
  yield takeEvery(types.SIGN_IN_USER_SAGA, workerSignIn)
}
