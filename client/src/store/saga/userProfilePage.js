import { types } from "../types/userTypes"
import { takeEvery, put, call, debounce, retry, throttle } from 'redux-saga/effects';
import {authUserReducer, signupUserReducer} from '../actionCreators/userAC'
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firebaseConfig } from "../types/firebaseConfig";
import {infoUserPageEditReducer} from '../actionCreators/userAC'

async function profilePageEditAsync(userInfo) {
  const app = initializeApp( firebaseConfig );
  const storage = getStorage(app);
  console.log(userInfo)
  if (userInfo.photo) {
    const file = userInfo.photo
    const storageRef = await ref(storage, `images/${Date.now()}${file.name.slice(file.name.indexOf('.'))}`);
    const snapshot = await uploadBytes(storageRef, file)                      // загрузка файла
    userInfo.urlPhoto = await getDownloadURL(storageRef)  
  }
  console.log(userInfo)
  const response = await fetch(`user/userInfoEdit`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userInfo) // {name: string, email: string, pass: string, idHome: string, 
                                          // city: string, city_id: string, home: string,  home_id: string, 
                                          // street: string, street_id: string,
                                          // photoIsChairman: [string, string]}
  });
  // const x = await response.json()
  // console.log(x)
  return await response.json() // сюда примем имя пользователя
}


function* workerProfilePageEdit({userInfo}) {
  try {
    console.log(userInfo)
    const {linkFind2, userInfoFind2, error} = yield call(() => profilePageEditAsync(userInfo))
    if(!error) {
      yield put(infoUserPageEditReducer({linkFind2, userInfoFind2}))
    } 
  } catch (err) {
    console.error('Err', err);
  } finally {
    console.log('finally');
  }
}

export function* watcherProfilePageEdit() {
  yield takeEvery(types.INFO_USER_PAGE_EDIT_SAGA, workerProfilePageEdit)
}
