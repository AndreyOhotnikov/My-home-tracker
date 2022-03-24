import { locationTypes } from "../types/locationTypes"

import { takeEvery, put, call, debounce, retry, throttle } from 'redux-saga/effects';
import {getAllLocationReducer} from '../actionCreators/getAllLocations'
import {getFirebaseReducer} from '../actionCreators/firebaseConfigAC'

async function getLocationAsync(user) {
  const response = await fetch(`/global/signupLocation`, {
    method: "GET",
  });
  return await response.json();
}

function* workerGetLocation() {
  try {
    const {location, config} = yield call(() => getLocationAsync())
    yield put(getAllLocationReducer(location))
    yield put(getFirebaseReducer(config))
  } catch (err) {
    console.error('Err', err);
  } 
}

export function* watcherGetLocation() {
  yield takeEvery(locationTypes.GET_ALL_LOCATION_SAGA, workerGetLocation)
}
