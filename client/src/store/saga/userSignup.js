import { types } from "../types/userTypes"
import { takeEvery, put, call, debounce, retry, throttle } from 'redux-saga/effects';
import { authUserReducer, signupUserReducer } from '../actionCreators/userAC'
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firebaseConfig } from "../types/firebaseConfig";


async function signUpAsync(user) {
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);
  if (user.isChairman) {
    const files = [...user.photoIsChairman]
    const urls = await Promise.all(await files.map(async (file, index) => {
      const storageRef = await ref(storage, `images/${Date.now()}${file.name.slice(file.name.indexOf('.'))}`);
      const snapshot = await uploadBytes(storageRef, file)
      const url = await getDownloadURL(storageRef)
      return url;
    }))
    user.photoIsChairman = urls
  }
  const response = await fetch(`user/signup`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  return await response.json()
}


function* workerSignUp({ user }) {
  try {
    const signUp = yield call(() => signUpAsync(user))
    if (!signUp.error) {
      yield put(authUserReducer(signUp))
    }
  } catch (err) {
    console.error('Err', err);
  }
}

export function* watcherSignUp() {
  yield takeEvery(types.SIGN_UP_USER_SAGA, workerSignUp)
}
