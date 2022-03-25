import { types } from "../types/userTypes"
import { takeEvery, put, call} from 'redux-saga/effects';
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firebaseConfig } from "../types/firebaseConfig";
import { infoUserPageEditReducer } from '../actionCreators/userAC'

async function profilePageEditAsync(userInfo) {
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);
  if (userInfo.photo) {
    const file = userInfo.photo
    const storageRef = await ref(storage, `images/${Date.now()}${file.name.slice(file.name.indexOf('.'))}`);
    const snapshot = await uploadBytes(storageRef, file)
    userInfo.urlPhoto = await getDownloadURL(storageRef)
  }
  const response = await fetch(`user/userInfoEdit`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userInfo)
  });

  return await response.json()
}


function* workerProfilePageEdit({ userInfo }) {
  try {
    const { linkFind2, userInfoFind2, error } = yield call(() => profilePageEditAsync(userInfo))
    if (!error) {
      yield put(infoUserPageEditReducer({ linkFind2, userInfoFind2 }))
    }
  } catch (err) {
    console.error('Err', err);
  }
}

export function* watcherProfilePageEdit() {
  yield takeEvery(types.INFO_USER_PAGE_EDIT_SAGA, workerProfilePageEdit)
}
