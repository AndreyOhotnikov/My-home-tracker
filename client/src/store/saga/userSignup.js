import { types } from "../types/userTypes"

import { takeEvery, put, call, debounce, retry, throttle } from 'redux-saga/effects';
import {authUserReducer} from '../actionCreators/userAC'

async function signUpAsync(user) {
  console.log(user)
  let formdata
  if (user.photoIsChairman) {
    console.log(11)
    formdata = new FormData()
    formdata.append('photo', user.photoIsChairman)
  }

  const response = await fetch(`user/signup`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user, formdata) // {name, email, pass, idHome, city, city_id, home,  home_id, street, street_id}
  });
  return await response.json() // сюда примем имя пользователя
}


function* workerSignUp({user}) {
  // yield console.log('--------------------------------',action.id)
  try {
    console.log(user)
    const signUp = yield call(() => signUpAsync(user))
    yield put(authUserReducer(signUp))
  } catch (err) {
    console.error('Err', err);
  } finally {
    console.log('finally');
  }
}

export function* watcherSignUp() {
  yield takeEvery(types.SIGN_UP_USER_SAGA, workerSignUp)
}
