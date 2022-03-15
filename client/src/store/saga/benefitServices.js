import { takeEvery, put, call } from 'redux-saga/effects';
import { addService, allServices, delService } from '../actionCreators/benefitServicesAC';
import {  REQUEST_ADD_SERVICE_SAGA, REQUEST_DEL_SERVICE_SAGA,  SAGA_API_SERVICES } from '../types/servicesTypes';

function getServices() {
  // return fetch ("http://127.0.0.1:3010/services",{
    return fetch ("services", {
    // credentials: "include",
  }).then(response => response.json())
}

function* workerGetServices(action) {
  try {
    const res = yield call(getServices, action.payload);


    yield put(allServices(res))
  } catch (err) {
    console.error('Err', err);
  } finally {
    console.log('finally');
  }
}

export function* watcherServicesSaga() {
  yield takeEvery(SAGA_API_SERVICES, workerGetServices)
}

function addServicesSaga(action) {
  // return fetch("http://127.0.0.1:3010/services/add", {
    return fetch("services/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // credentials: "include",
    body: JSON.stringify(action)
  }).then((res) => res.json())
}

function* addServiceWorker(action) {
  try {
    const dataFromServer = yield call(addServicesSaga, action.payload);
    if (dataFromServer) yield put(addService(dataFromServer))
  } catch (err) {
    console.error('Err', err);
  } finally {
    console.log('finally');
  }
}
export function* watcherAddServiceSaga() {
  yield takeEvery(REQUEST_ADD_SERVICE_SAGA, addServiceWorker)
}
function deleteServiceSaga(id) {
  console.log('---------------------------', id)
  // return fetch(`http://127.0.0.1:3010/services/${id}`,{
    return fetch(`services/${id}`,{
 
    method: 'DELETE', 
  // credentials: "include",
  }).then(response => response.json())
}

function* workerDelServiceSaga(action) {
  try {
    const res = yield call(deleteServiceSaga, action.payload);
    yield put(delService(res))
  } catch (err) {
    console.error('Err', err);
  } finally {
    console.log('finally');
  }
}

export function* watcherDelServiceSaga() {
  yield takeEvery(REQUEST_DEL_SERVICE_SAGA, workerDelServiceSaga)
}



