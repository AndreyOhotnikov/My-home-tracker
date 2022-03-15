import { call, put, takeEvery } from "redux-saga/effects";
import { addBid, allBids } from "../actionCreators/bid";
import { REQUEST_ADD_BID_SAGA, SAGA_API_BIDS } from "../types/bid";

function addBidSaga(action) {
  return fetch("/bids/add", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(action)
}).then((res) => res.json())
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

function getBids() {
  return fetch ("/bids", {
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
