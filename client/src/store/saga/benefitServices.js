import { takeEvery, put, call } from 'redux-saga/effects';
import { allServices } from '../actionCreators/benefitServicesAC';
import {  SAGA_API_SERVICES } from '../types/servicesTypes';



// function getCategories(caterory) {
//   return fetch ("http://127.0.0.1:3010/services",{
//     credentials: "include",
//   }).then(response => response.json())
// }

// function* workerGetCategory(action) {
//   try {
//     const res = yield call(getCategories, action.payload);


//     yield put(allCategories(res))
//   } catch (err) {
//     console.error('Err', err);
//   } finally {
//     console.log('finally');
//   }
// }

// export function* watcherCategorySaga() {
//   yield takeEvery(SAGA_API_CATEGORY, workerGetCategory)
// }

function getServices() {
  return fetch ("http://127.0.0.1:3010/services",{
    credentials: "include",
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
