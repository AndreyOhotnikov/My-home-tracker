import { takeEvery, put, call } from 'redux-saga/effects';
import { actiontTypes } from '../types/globalTypes';
import { addGlobalNewsRedux, getGlobalNewsRedux, addLikeToRedux, delGlobalNewsRedux } from '../actionCreators/globalNewsAC'
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firebaseConfig } from "../types/firebaseConfig";

async function delGlobalNewsFromDb(id) {
  const res = await fetch(`/globalNews/${Number(id)}`, { method: 'DELETE' })
  const data = await res.json()
}
async function addGlobalNewsToDb(obj) {
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);
  const file = [...obj.payload.link]
  const storageRef = await ref(storage, `images/${Date.now()}${file[0].name.slice(file[0].name.indexOf('.'))}`);
  const snapshot = await uploadBytes(storageRef, file[0])
  const url = await getDownloadURL(storageRef)

  const response = await fetch('/globalNews/new', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      { ...obj.payload, link: url }
    )
  });
  const data = await response.json()
  return data;
}

async function addLikeToDb(id) {
  const response = await fetch(`/globalNews/like/${id}`);
  const data = await response.json()
  return data;
}

async function getAllGlobalNews() {
  const res = await fetch('/globalNews')
  return res.json()
}

function* workerGlobalNews(obj) {
  try {
    const dataGlobalNews = yield call(addGlobalNewsToDb, obj)
    yield put(addGlobalNewsRedux(dataGlobalNews))
  } catch (err) {
    console.log(err)
  }
}

function* worker() {
  const data = yield call(getAllGlobalNews)
  yield put(getGlobalNewsRedux(data))
}

function* workerAddLike(id) {
  const dataId = id.payload
  const data = yield call(addLikeToDb, dataId)
  yield put(addLikeToRedux(data))
}
function* workerDelGlobalNews(id) {
  const delNewsId = id.payload
  const data = yield call(delGlobalNewsFromDb, delNewsId)
  yield put(delGlobalNewsRedux(data))
}


export function* watcherGlobalNews() {
  yield takeEvery(actiontTypes.ADD_GLOBAL_NEWS_SAGA, workerGlobalNews);
}
export function* watcherAllGlobalNews() {
  yield takeEvery(actiontTypes.GET_GLOBAL_NEWS_SAGA, worker);
}

export function* watcherAddLike() {
  yield takeEvery(actiontTypes.ADD_LIKE_GLOBAL_SAGA, workerAddLike);
}

export function* watcherDelGlobalNews() {
  yield takeEvery(actiontTypes.DEL_NEWS_GLOBAL_SAGA, workerDelGlobalNews);
}
