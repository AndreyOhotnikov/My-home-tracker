import { types } from "../types/userTypes"

import { takeEvery, put, call, debounce, retry, throttle } from 'redux-saga/effects';
import {authUserReducer, signupUserReducer, infoUserPageReducer} from '../actionCreators/userAC'
import SignIn from "../../components/Signin/SignIn";
import {getFirebaseReducer} from '../actionCreators/firebaseConfigAC'
async function checkIsAuthAsync() {
  const response = await fetch(`/user/checkAuth`, {
    method: "GET",
  });
  const resp = await response.json() // {user?, config?, error?}
  console.log('++++++++++++++++++++++++++++++++++++++++')
  console.log(resp)
  return resp
}

function* workerCheckIsAuth() {
  try {
    const {user, config, error, userInfo, photo, bid, benefits, store, email} = yield call(() => checkIsAuthAsync())
    if(!error) {
      yield put(authUserReducer(user))
      yield put(infoUserPageReducer({userInfo, photo, bid, benefits, store, email}))
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
