import { locationTypes } from "../types/locationTypes"

import { takeEvery, put, call, debounce, retry, throttle } from 'redux-saga/effects';
import {getAllLocationReducer} from '../actionCreators/getAllLocations'

async function getLocationAsync(user) {
  const response = await fetch(`/global/signupLocation`, {
    method: "GET",
  });
  const {location} = await response.json();
  return location
}


function* workerGetLocation() {
  try {
    const location = yield call(() => getLocationAsync())
    yield put(getAllLocationReducer(location))
  } catch (err) {
    console.error('Err', err);
  } finally {
    console.log('finally');
  }
}

export function* watcherGetLocation() {
  yield takeEvery(locationTypes.GET_ALL_LOCATION_SAGA, workerGetLocation)
}
