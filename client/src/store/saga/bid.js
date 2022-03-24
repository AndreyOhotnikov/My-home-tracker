import { call, put, takeEvery } from "redux-saga/effects";
import { addBid, allBids, allUser, delBid } from "../actionCreators/bid";
import { REQUEST_ADD_BID_SAGA, REQUEST_DEL_BID_SAGA, SAGA_API_BIDS, SAGA_API_USERS } from "../types/bid";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firebaseConfig } from "../types/firebaseConfig";

async function addBidSaga(bids) {
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);
  if (bids.link) {
    const file = bids.link
    const storageRef = await ref(storage, `images/${Date.now()}${file.name.slice(file.name.indexOf('.'))}`);
    const snapshot = await uploadBytes(storageRef, file)
    const url = await getDownloadURL(storageRef)


    return fetch("/bids/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bids, url })
    }).then((res) => res.json())
  }
}

function* addBidWorker(action) {
  try {
    const dataFromServer = yield call(addBidSaga, action.payload);
    if (dataFromServer) yield put(addBid(dataFromServer))
  } catch (err) {
    console.error('Err', err);
  } 
}
export function* watcherAddBidSaga() {
  yield takeEvery(REQUEST_ADD_BID_SAGA, addBidWorker)
}

function getAllUser() {
  return fetch("/bids/users", {
  }).then(response => response.json())
}

function* workerGetAllUser(action) {
  try {
    const res = yield call(getAllUser, action.payload);
    yield put(allUser(res))
  } catch (err) {
    console.error('Err', err);
  } 
}
export function* watcherUsersSaga() {
  yield takeEvery(SAGA_API_USERS, workerGetAllUser)
}


function getBids() {
  return fetch("/bids", {
  }).then(response => response.json())
}

function* workerGetBids(action) {
  try {
    const res = yield call(getBids, action.payload);
    yield put(allBids(res))
  } catch (err) {
    console.error('Err', err);
  } 
}
export function* watcherBidsSaga() {
  yield takeEvery(SAGA_API_BIDS, workerGetBids)
}


function deleteBidSaga(id) {
  return fetch(`/bids/${id}`, {
    method: 'DELETE',
  }).then(response => response.json())
}

function* workerDelBidSaga(action) {
  try {
    const res = yield call(deleteBidSaga, action.payload);
    console.log(res, ' gfgfgfgfgfgfgfg');
    yield put(delBid(res))
  } catch (err) {
    console.error('Err', err);
  } 
}

export function* watcherDelBidSaga() {
  yield takeEvery(REQUEST_DEL_BID_SAGA, workerDelBidSaga)
}



