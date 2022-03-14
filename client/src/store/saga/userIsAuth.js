import { types } from "../types/userTypes"

import { takeEvery, put, call, debounce, retry, throttle } from 'redux-saga/effects';
import {authUserReducer, signupUserReducer} from '../actionCreators/userAC'
import SignIn from "../../components/Signin/SignIn";
import {getFirebaseReducer} from '../actionCreators/firebaseConfigAC'
async function checkIsAuthAsync() {
 
  const response = await fetch(`user/checkAuth`, {
    method: "GET",
  });
  const resp = await response.json() // {user?, config?, error?}
  return resp
}

function* workerCheckIsAuth() {
  try {
    const {user, config, error} = yield call(() => checkIsAuthAsync())
    if(!error) {
      yield put(authUserReducer(user)) // {name, role, home_id}
    } 
    yield put(getFirebaseReducer(config))
  } catch (err) {
    console.error('Err', err);
  } finally {
    console.log('finally');
  }
}

export function* watcherCheckIsAuth() {
  yield takeEvery(types.CHECK_IS_AUTH_SAGA, workerCheckIsAuth)
}
