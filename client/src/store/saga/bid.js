import { call, put, takeEvery } from "redux-saga/effects";
import { addBid, allBids, allUser, delBid } from "../actionCreators/bid";
import { REQUEST_ADD_BID_SAGA, REQUEST_DEL_BID_SAGA, SAGA_API_BIDS } from "../types/bid";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firebaseConfig } from "../types/firebaseConfig";

async function addBidSaga(bids) {
  console.log(bids, 'bids');
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);
  if (bids.link) {
    const file = bids.link
    console.log(file, 'file');
    const storageRef = await ref(storage, `images/${Date.now()}${file.name.slice(file.name.indexOf('.'))}`);
    console.log(storageRef, 'storageRef');
    const snapshot = await uploadBytes(storageRef, file)                      // загрузка файла
    const url = await getDownloadURL(storageRef)
    console.log(url, 'url');
    // ссылка на фотку

    return fetch("/bids/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({bids, url})
    }).then((res) => res.json())
  }
}

function* addBidWorker(action) {
  try {
    const dataFromServer = yield call(addBidSaga, action.payload);
    if (dataFromServer) yield put(addBid(dataFromServer))
  } catch (err) {
    console.error('Err', err);
  } finally {
    console.log('finally');
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
  } finally {
    console.log('finally');
  }
}
export function* watcherUsersSaga() {
  yield takeEvery(SAGA_API_BIDS, workerGetAllUser)
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
  } finally {
    console.log('finally');
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
    yield put(delBid(res))
  } catch (err) {
    console.error('Err', err);
  } finally {
    console.log('finally');
  }
}

export function* watcherDelBidSaga() {
  yield takeEvery(REQUEST_DEL_BID_SAGA, workerDelBidSaga)
}



