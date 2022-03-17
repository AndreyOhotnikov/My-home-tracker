import { types } from "../types/userTypes"
import { takeEvery, put, call, debounce, retry, throttle } from 'redux-saga/effects';
import {authUserReducer, signupUserReducer} from '../actionCreators/userAC'
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firebaseConfig } from "../types/firebaseConfig";


async function signUpAsync(user) {
  const app = initializeApp( firebaseConfig );
  const storage = getStorage(app);
  console.log(user)
  if (user.isChairman) {
    const files = [...user.photoIsChairman]
      const urls = await Promise.all(await files.map(async (file, index) => {
        const storageRef = await ref(storage, `images/${Date.now()}${file.name.slice(file.name.indexOf('.'))}`);
        const snapshot = await uploadBytes(storageRef, file)                      // загрузка файла
        const url = await getDownloadURL(storageRef)                                     // ссылка на фотку
        return url;
      }))
    user.photoIsChairman = urls
  }
  console.log(user)
  const response = await fetch(`user/signup`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user) // {name: string, email: string, pass: string, idHome: string, 
                                          // city: string, city_id: string, home: string,  home_id: string, 
                                          // street: string, street_id: string,
                                          // photoIsChairman: [string, string]}
  });
  return await response.json() // сюда примем имя пользователя
}


function* workerSignUp({user}) {
  try {
    console.log(user)
    const signUp = yield call(() => signUpAsync(user))
    if(!signUp.error) {
      yield put(authUserReducer(signUp))
    } 
  } catch (err) {
    console.error('Err', err);
  } finally {
    console.log('finally');
  }
}

export function* watcherSignUp() {
  yield takeEvery(types.SIGN_UP_USER_SAGA, workerSignUp)
}
